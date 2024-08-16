/*
controls assignment endpoints
*/

import { Op } from "sequelize"
import { v4 } from "uuid"
import { Assignment, AssignmentClasses, AssignmentRequirement, AssignmentResult, Class, Compiler, Course, Program, Student, Task, TaskResult } from "../models/relationship/relations.js"
import { deleteTaskFile, readTaskFile, saveTaskFile, writeToFile } from "../utils/fileHandler.js"
import { assignmentStats, exportExcell, exportPdf, taskStats } from "../utils/statisticsFunctions.js"
import { verifyMandatoryFields } from "../utils/verificationFunctions.js"

class AssignmentSController {
    static createAssignment = async (req, res) => {
        //get assignemt details from body
        let assignmendetails = req.body
        //get requiredFiels
        let requiredFields = ["title", "ClassId", "CompilerId", "startDate", "endDate"]
        let missingFields = verifyMandatoryFields(requiredFields, assignmendetails)
        if(missingFields.length !== 0)
            return res.status(400).json({"reason": "fields missing", "missingFields": missingFields})
        //create assignement
        try {
            //check if the assignemnt is open
            let assignmentObject = {"title": assignmendetails.title, "gitMode": assignmendetails.gitMode,
                                    "objectives":assignmendetails.objectives, "CompilerId": assignmendetails.CompilerId,
                                    "startDate":assignmendetails.startDate, "endDate":assignmendetails.endDate, "repository":assignmendetails.repository,
                                    "ClassId": assignmendetails.ClassId, "CourseId": assignmendetails.CourseId
            }
            let response = await Assignment.create({...assignmentObject, LecturerId: req.user.id})
            let assRequiremnt = await AssignmentRequirement.create({"plagiarism": assignmendetails.plagiarism, "documentation": assignmendetails.documentation, "codingStandard":assignmendetails.codingStandard, "readme":assignmendetails.readme})
            await response.addAssignmentRequirement(assRequiremnt)
            //save to class
            await AssignmentClasses.create({"AssignmentId":response.id, "ClassId": assignmendetails.ClassId })
            return res.status(201).json({"created": true, "id": response.id})
        } catch (err) {
            console.log(err)
            return res.status(501).json({"reason": "couldnt create assignemnt"})
        } 
        
        
    }

    static getAssignmentDetails = async (req, res) => {
        //delete enteries
        let id = req.params.id
        if(!id)
            return req.status(200).json({"reason": "fields missing", missingFields: "id"})
        //get assignment
        
        let entry = await Assignment.findOne({where:{id},include:[
            {model:Course}, {model:Class, include:[{model:Program}]}, {model:Compiler}
        ], attributes:['endDate', "startDate", "title", "objectives",
        'gitMode', "repository", "CourseId", "LecturerId"]})
        //delete assignemnt
        if(!entry)
            return res.status(400).json({reason: "assignment not found"})
        return res.status(200).json(entry)
    }

    static deletAssignment = async (req, res) => {
        //delete enteries
        let id = req.params.id
        let entry = await Assignment.findByPk(id)  
        await AssignmentClasses.destroy(
            {where:{
                AssignmentId:id
            }}
        )
        await entry.destroy()
        await Task.destroy({
            where: {
                AssignmentId:id
            }
        })
        await AssignmentResult.destroy({
            where: {
                AssignmentId:id
            }
        })
        return res.status(200).json({reason: "operation success"})
    }

    static viewAssingments = async (req, res) => {
        let lecturerId = req.user.id
        //get all assingments with lecturer id
        let assignements = await Assignment.findAll({where: {
            lecturerId
        },
        order:[["endDate", "DESC"]],
        include :[
            {model:Compiler, attributes:['name']},
            {model:Class, attributes:['className']},
            {model:Course, attributes:['courseName']}
        ]
        ,attributes:['endDate', "startDate", "title", "objectives","id"]})

        ///return all assignment created by a lecturer
        return res.status(200).json(assignements)
    }
    

    static updateAssignment = async (req, res) => {
        //updates alreadedy created assignments
        let details = req.body
        //check for right enteries
        let correctColumns = ['programId','ClassId', 'endDate', "startDate", "title", "objectives",  "plagiarism", "documentation", "codingStandards",
                              'gitMode',"readme", "repository", "CourseId", "LecturerId", "CompilerId"]
        if(!details.id)
            return res.status(400).json({reason: "fields missing", missingFields: "id"})
        //get assignment by id
        let assignment = await Assignment.findByPk(details.id)
        let assRequiremnt = await AssignmentRequirement.findOne({where:{AssignmentId:details.id}})
        if(!assignment)
            return res.status(400).json({reason: "assignment not found"})
        //update right enteries
        for (const column of Object.keys(details)) {
            //exclude id
            if(!(column === "id" || column ==="open" || column === "createdAt" || column === "updatedAt")) {
                if(["codingStandards", "plagiarism", "documentation"].includes(column))
                    assRequiremnt[column] = details[column]
                else if(correctColumns.includes(column)) {
                   //update information for entry
                   assignment[column] = details[column] 
                } else {
                    return res.status(400).json({"reason": "wrong column entry given", "wrong column": column})
                }
            }
        }
        //save information in the database
        await assignment.save()
        console.log(assignment)
        await assRequiremnt.save()
        return res.status(200).json({"reason": "success", assignmentId: details.id})
    }

    static addClass = async (req, res) => {
        //add class to assignment
        let classDetails = req.body
        if(!(classDetails.ClassId && classDetails.AssignmentId))
            return res.status(400).json({"reason": "fileds missing, fields name ClassId, AssignmentId"})
        let assignement = await Assignment.findByPk(classDetails.AssignmentId)
        if(!assignement)
            return res.status(400).json({"reason": "assignment not found"})
        //save the class to assignment
        await assignement.addClass(await Class.findByPk(classDetails.ClassId))
        return res.status(200).json({"reason": "success"})
    }
    static addTask = async (req, res) => {
        let task = req.body
        let requiredFields = ["ext", "requirement", "solutionPath", "AssignmentId", "number", "examples", "solutionScript"]
        let missingFields = verifyMandatoryFields(requiredFields, task)
        if(missingFields.length !== 0)
            return res.status(400).json({"reason": "fields missing", "missingFields": missingFields})
        //get task id
        let taskId = v4()
        let file = await saveTaskFile({data:task.solutionScript, ext:task.ext}, task.AssignmentId, taskId, "Test")
        //save the file to the database
        if(!file)
            return res.status(501).json({"reason": "cant save file"})
        console.log(task.solutionPath)
        //save taskt
        try {   
                let taskDb = await Task.create({
                                                id:taskId,requirement: task.requirement, examples:task.examples,
                                                testFile: file.filePath, AssignmentId:task.AssignmentId,number:task.number,
                                                studentSolutionFileNames:task.solutionPath,
                                                totalMarks : task.totalMarks
                                              })
                return res.status(201).json({"taskId": taskDb.id})

        }catch(err){
            console.log(err)
            return res.status(501).json({"reason": "cant add task, contack backend admin"})
        }
    }

    static viewAssignmentTasks = async (req, res) => {
            let id  = req.params.assId
            //check if id is given
            if(!id) 
            return res.status(400).json({"reason": "fields missing", missingFields: "assignmentId"})
            //retrive assignment information
            let assignement = await Assignment.findByPk(id)
            //check if assignment is given
            if(!assignement)
                return res.status(400).json({"reasson": "assignment not found"})
            //get assignment quesiont
            let questions = await Task.findAll({where:{AssignmentId:id}, attributes: ["id","number", "requirement"]})
            return res.status(200).json(questions)
    }


    static updateTask = async (req, res) => {
        //updates alreadedy created assignments
        let details = req.body
        //check for right enteries
        let correctColumns = ['solutionScript', "number", "examples", "requirement"]
        if(!details.id)
            return res.status(400).json({reason: "fields missing", missingFields: "id"})
        //get assignment by id
        let taskEntry = await Task.findByPk(details.id)
        if(!taskEntry)
            return res.status(400).json({reason: "question not found"})
        //update right enteries
        for (const column of Object.keys(details)) {
            //exclude id and solutionPath
            if(!(column === "id" || column ==="testFile")) {
                if(correctColumns.includes(column)) {
                   //update information for entry
                   if(column === "solutionScript"){
                    //upldate the scolutionCript file
                    let response = await writeToFile(taskEntry.testFile, details.solutionScript)
                    if(!response)
                        return res.status(400).json({reason: "couldnt upadate script history"})
                   }  
                    else
                        taskEntry[column] = details[column] 
                } else {
                    return res.status(400).json({"reason": "wrong column entry given", "wrong column": column})
                }
            }
        }
        //save information in the database
        await taskEntry.save()
        return res.status(200).json({"reason": "success", questionId: details.id})
    }

    static getTaskDetails = async (req, res) => {
        //get question id
        let taskId  = req.params.id
        if(!taskId)
        return res.status(400).json({"reason": "fields missing", missingFields: "id"})
        //get task id
        let task = await Task.findByPk(taskId)
        if(!task)
        return res.status(400).json({"reason": "couldnt find question"})
        //read solution script content
        let solutionScript = await readTaskFile(task.testFile)
        return res.status(200).json({number:task.number,id:task.id,examples:task.examples, requirement:task.requirement, solutionScript})

    }

    static getCompilersSimple = async (req, res) => {
        //get all programs
        let compilers = await Compiler.findAll({attributes: ['name', 'id', 'extension', 'explanationExamples', 'testExamples']})
        if(!compilers)
            return res.status(401).json({"reason": "no compilers loaded"})
        return res.status(200).json(compilers)
    }

    static deleteTask = async (req, res) => {
        //delete enteries
        let id = req.params.id
        let entry = await Task.findByPk(id)  
        deleteTaskFile(entry.testFile)
        await entry.destroy()
        return res.status(200).json({reason: "operation success"})
    }



    static compilerDetials = async (req, res) => {
        //return compiler information with id
        let id = req.params.id
        let compiler = await Compiler.findByPk(id)
        if(!compiler) 
            return res.status(400).json({"reason": "compiler not found"})
        return res.status(200).json(compiler)
    }
    static AssignmentDetailsWithInfo = async (req, res) => {
        try {
            let assId = req.params.id
            let assWithDetails = await Assignment.findOne({where:{id:assId}
            ,include:[
                {model:Compiler},
                {model:Course},
                {model:Class},
                {model:AssignmentRequirement},

            ],
        raw:true,
        nest:true
        })
        let tasks = await Task.findAll({where:{AssignmentId:assId}, order:[["number","ASC"]], raw:true, nest:true})
        assWithDetails.tasks = tasks
        return res.status(200).json(assWithDetails)
        } catch(err) {
            console.log(err)
            res.status(500).json({"message": "internal error"})
        }        
    }

    //get assignment statistics
    static AssignmentStatistics = async (req, res) => {
        let assignmentId = req.params.id
        try {
        //check if there is assignment with id
        let assignment = await Assignment.findByPk(assignmentId)
        if(!assignment)
            return res.status(400).json({"message": "no assignment entry found"})
        let assStats = await assignmentStats(assignmentId)
        let tasks = await taskStats(assignmentId)
        console.log({assStats, "taskStats": tasks})
        return res.status(200).json({assStats: {...assStats, title:assignment.title}, "taskStats": tasks})
        } catch(error) {
            console.log(error)
        }
        return res.status(500).json({"message": "wrong assignment id"})
    }

    static ExportMarks = async (req, res, type) => {
        let id  = req.params.id
        try {
        let exportType = req.query
        let scores = []
        if(type === "task")
            scores  = await TaskResult.findAll({nest:true, raw:true,where:{TaskId:id}, include: {model:Student}})
        else {
            scores  = await AssignmentResult.findAll({where:{AssignmentId:id}, nest:true, raw:true, include: {model:Student}})
        }
        let mapResults = scores.map(val => {
            if(type === "task")
                return {name:val.Student.name, index:val.Student.index, marks:val.completion}
            else
                return {name:val.Student.name, index:val.Student.index, marks:val.mark}
        })
        let filePath = null
        if(exportType.type === "pdf") {
        filePath = await exportPdf(mapResults, id)
        }//call pdf export function
        else {
        filePath = await exportExcell(mapResults, id)
        }
        //call excel export function
        return filePath ? res.status(200).download(filePath) : res.status(501).json({message:"internal error"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"internal error"})

    } 
    }

    static ViewSubmissionAssignment = async (req , res) => {
        //get assignment
        try {
        let id = req.params.id
        let assignment = await Assignment.findByPk(id, {raw:true, attributes:["title"]})
        if(!assignment)
            return res.status(400).json({"message": "wrong assignment title"})
        let assignmentClass = await AssignmentClasses.findOne({where:{AssignmentId:id}, raw:true})
        let totalStudents = await Student.count({where:{ClassId:assignmentClass.ClassId}})
        let query = req.query
        let page = 1
        let filter = {}
        let limit = 30;
        let offset = 0
        if (query.search)
            {
                filter.index = {[Op.like]:`%${query.search}%` }
            }
        
        if(query.page) {
            offset = limit * (query.page - 1)
            page = query.page
        }
        let {count, rows} = await AssignmentResult.findAndCountAll({where: {AssignmentId:id}, 
            include: {model: Student, where: filter},offset, nest:true, raw:true, limit
        })
        return res.status(200).json({totalStudents, title:assignment.title, limit, items: rows, page, totalCount: count})
    }catch(error) {
        console.log(error)
        return res.status(500).json({message:"internal"})
    }
    }


}
export { AssignmentSController }
