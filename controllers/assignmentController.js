/*
controls assignment endpoints
*/

import { Assignment, Compiler, AssignmentClasses, Task, Class, AssignmentRequirement } from "../models/relationship/relations.js"
import { deleteTaskFile, readTaskFile, saveTaskFile, writeToFile } from "../utils/fileHandler.js"
import { verifyMandatoryFields } from "../utils/verificationFunctions.js"
import { v4 } from "uuid"

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
        
        let entry = await Assignment.findOne({where:{id}, attributes:['endDate', "startDate", "title", "objectives",  "plagiarism", "documentation", "codingStandards",
        'gitMode',"readme", "repository", "CourseId", "LecturerId"]})
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
        return res.status(200).json({reason: "operation success"})
    }

    static viewAssingments = async (req, res) => {
        let lecturerId = req.user.id
        //get all assingments with lecturer id
        let assignements = await Assignment.findAll({where: {
            lecturerId
        }, attributes:['endDate', "startDate", "title", "objectives",  "plagiarism", "documentation", "codingStandards",
        'gitMode',"readme", "repository", "CourseId", "LecturerId"]})
        ///return all assignment created by a lecturer
        return res.status(200).json(assignements)
    }
    

    static updateAssignment = async (req, res) => {
        //updates alreadedy created assignments
        let details = req.body
        //check for right enteries
        let correctColumns = ['endDate', "startDate", "title", "objectives",  "plagiarism", "documentation", "codingStandards",
                              'gitMode',"readme", "repository", "CourseId", "LecturerId", "CompilerId"]
        if(!details.id)
            return res.status(400).json({reason: "fields missing", missingFields: "id"})
        //get assignment by id
        let assignment = await Assignment.findByPk(details.id)
        if(!assignment)
            return res.status(400).json({reason: "assignment not found"})
        //update right enteries
        for (const column of Object.keys(details)) {
            //exclude id
            if(!(column === "id" || column ==="open" || column === "createdAt" || column === "updatedAt")) {
                if(correctColumns.includes(column)) {
                   //update information for entry
                   assignment[column] = details[column] 
                } else {
                    return res.status(400).json({"reason": "wrong column entry given", "wrong column": column})
                }
            }
        }
        //save information in the database
        await assignment.save()
        return res.status(200).json({"reason": "success", assignmentId: details.id})
    }

    static addClass = async (req, res) => {
        //add class to assignment
        let classDetails = req.body
        if(!(classDetails.classId && classDetails.assId))
            return res.status(400).json({"reason": "fileds missing, fields name classId, assId"})
        let assignement = await Assignment.findByPk(assId)
        if(!assignement)
            return res.status(400).json({"reason": "assignment not found"})
        //save the class to assignment
        await assignement.addClass(await Class.findByPk(classDetails.classId))
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
                                                studentSolutionFileNames:task.solutionPath
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
        let compilers = await Compiler.findAll({attributes: ['name', 'id', 'extension']})
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
}
export {AssignmentSController}