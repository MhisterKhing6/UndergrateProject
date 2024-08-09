/**Controller for student endpoints */
import { Op } from '@sequelize/core';
import path from "path";
import { Assignment, AssignmentRequirement, AssignmentResult, Class, Compiler, Course, Lecturer, Task, TaskResult, TestResult, TestStatistics } from "../models/relationship/relations.js";
import { checkSolutionFile, compileScripts } from "../utils/compileScripts.js";
import { createStudentMarkSpace, deletFolder, writeToFile } from "../utils/fileHandler.js";
import { checkIfResulstsFileExits, sanitizeResults } from "../utils/markingHelperFunction.js";
import { codingStandard } from "../utils/requirementScripts.js";
import { cloneRepository, repositoryLink } from "../utils/submissionFunctions.js";
export class StudentController {

    static assignments = async (req, res) => {
        /**
         * studentAssignment get all assignemnt that is opened for student
         * req: http request object
         * res: http response object
         */

        let ClassId = req.user.ClassId
       
        let openAss = await Class.findAll( {where:{id:ClassId},raw:true, nest:true,
            attributes: [],
            include:{ model:Assignment,
                attributes: {exclude: ['createdAt', "updatedAt"]}
            },
            order: [[{model:Assignment}, 'endDate', 'DESC'] ]

        })
        //find all the assignment that are open
        let response = openAss.map(val => {
            delete val.Assignments.AssignmentClasses
            return val.Assignments
        })
        return res.status(200).json(response)
    } 
    
    static openAssignments= async (req, res) => {
        /**
         * openAssignments retrun all asssignments that are open
         * req: http request object
         * res: http response object
         */

        let ClassId = req.user.ClassId
        //get all assignment of the student that are open for submission
        let openAss = await Class.findAll( {where:{id:ClassId},raw:true, nest:true,
            attributes: [],
            raw:true, 
            nest:true,
            include:{ model:Assignment, 
                where: {
                startDate: {
                    [Op.lte]: Date.now()
                },
                endDate: {
                    [Op.gte]:Date.now()
                },
                },
                include: [
                    {model:AssignmentResult, required:false, where: {StudentId:req.user.id}, attributes:['mark']},
                    {model:Course, attributes:['courseCode']}],
                attributes: ['title', "startDate", 'endDate', "id"],
                order: [['endDate', 'DESC']]    
            },
            order: [[{model:Assignment}, 'endDate', 'DESC'] ]
        })
        //find all the assignment that are open
        let response = openAss.map(val => {
            delete val.Assignments.AssignmentClasses
            return val.Assignments
        })
        return res.status(200).json(response)
    }

    static closeAssignments= async (req, res) => {
        /**
         * closeAssignments return all asssignments that are close
         * req: http request object
         * res: http response object
         */

        let ClassId = req.user.ClassId
        //get all assignment of the student that are open for submission
        let closeAss = await Class.findAll( {where:{id:ClassId},raw:true, nest:true,
            attributes: [],
            include:{ model:Assignment, 
                where: {
                endDate: {
                    [Op.lt]:Date.now()
                },
                },
                attributes: {exclude: ['createdAt', "upatedAt"]},
            },
            order: [[{model:Assignment}, 'endDate', 'DESC'] ]
        })

        //find all the assignment that are open
        let response = closeAss.map(val => {
            delete val.Assignments.AssignmentClasses
            return val.Assignments
        })
        return res.status(200).json(response)
    }

    static classCourses = async (req, res) => {
        /**
         * classCourses retruns all course offered by a student in a class
         * req: http request object
         * res: http response object
         */

        let ClassId = req.user.ClassId
        //get all the course of a class
        let courses = await Class.findAll( {where:{id:ClassId},raw:true, nest:true,
            attributes: [],
            include:{ model:Course, 
                attributes: ['courseName', "courseCode", "id", "ProgramId"]
            }
        })
        //find all the assignment that are open
        let response = courses.map(val => {
            delete val.Courses.ClassCourses
            return val.Courses
        }) 
        return res.status(200).json(response)
    } 


    static openCourseAssignments = async (req, res) => {
        /**
         * courseAssignments retruns all assignments offered by a course
         * req: http request object
         * res: http response object
         */

        let courseId = req.params.courseId
        //get all the course of a class
        let assCourse = await Assignment.findAll( {
            where:{
                CourseId:courseId,
                startDate: {
                  [Op.lte]: Date.now()
                    },
                endDate: {
                  [Op.gte]:Date.now()
                }
            },
            include: [
                {model:AssignmentResult, required:false, where: {StudentId:req.user.id}, attributes:['mark']},
                {model:Compiler, attributes:['name']},
                {model:Course, attributes:['courseCode']}
            ],
            raw:true, 
            nest:true,
            attributes: ['title', "startDate", 'endDate', 'id', 'gitMode'],
            order: [['endDate', 'DESC']]

        })
        //find all the assignment that are open
        return res.status(200).json(assCourse)
    }

    static closeCourseAssignments = async (req, res) => {
        /**
         * closeCourseAssignments retruns all assignments of a course that are open
         * req: http request object
         * res: http response object
         */

        let courseId = req.params.courseId
        //get all the course of a class
        let assCourse = await Assignment.findAll( {
            where:{
                CourseId:courseId,
                endDate: {
                  [Op.lt]:Date.now()
                }
            },
            raw:true, 
            nest:true,
            attributes: {exclude: ['createdAt', "upatedAt"]},
            order: [['endDate', 'DESC']]

        })
        //find all the assignment that are open
        return res.status(200).json(assCourse)
    }

    static courseAssignments = async (req, res) => {
        /**
         * closeCourseAssignments retruns all assignments of a course that are open
         * req: http request object
         * res: http response object
         */

        let courseId = req.params.courseId
        //get all the course of a class
        let assCourse = await Assignment.findAll( {
            where:{
                CourseId:courseId
            },
            raw:true, 
            nest:true,
            attributes: {exclude: ['createdAt', "upatedAt"]},
            order: [['endDate', 'DESC']]

        })
        //find all the assignment that are open
        return res.status(200).json(assCourse)
    }

    static assignmentTasks = async (req, res) => {
        /**
         * courseAssignments retruns all assignments offered by a course
         * req: http request object
         * res: http response object
         */

        let assId = req.params.assId
        //get all the course of a class
        let ass = await Assignment.findOne( {where:{id:assId},raw:true, nest:true,
            attributes: ["title", "objectives", "id", "gitMode", "repository"], 
            include: {model:Compiler, attributes:['name', 'requirement', 'setupLink', 'extension']}, 
        })
        if(!ass)
            return res.status(400).json({"message": "not found"})
        let tasks = await Task.findAll(
            {raw:true, nest:true , where: {AssignmentId:assId}, order:[["number","ASC"]],
            include : {model:TaskResult, attributes:["mark"], where: {StudentId:req.user.id}, required: false}
            })
        let assReq = await AssignmentRequirement.findOne({
            raw:true, nest:true, 
            where:{AssignmentId:assId},
            attributes: ['readme', 'plagiarism', 'documentation', 'codingStandard']
            
        
        })
        let score = await AssignmentResult.findOne({where:{StudentId:req.user.id, AssignmentId:assId}, raw:true, nest:true, attributes:["mark"]})
        ass.tasks = tasks
        ass.assReq = assReq
        ass.score = score
        //find all the assignment that are open
        return res.status(200).json(ass)
    }

    static submitAssignmentGihub = async (req, res) => {
        /**
         * summiteAssignmentGithu : clone student assignment from github
         * req: http request object
         * res: http response object
         */
        let detials = req.body
        try {
        //check for required fields
        if(!(detials.taskId)) {
            return res.status(400).json({"message": "fields missing"})
        }
        //get assignment id from task
        let task = await Task.findByPk(detials.taskId)
        if(!task)
            return res.status(400).json({"message": "task not found"})
        if(!req.user.githubUserName)
            return res.status(400).json({"message": "github username no given"})
        let asignment = await Assignment.findByPk(task.AssignmentId, {include:{model:Compiler}})
        if(!asignment)
            return res.status(400).json({"message": "cant retrieve assignemnt"})
        //get compiler id from assignment
        let markSpacePath = await createStudentMarkSpace(asignment.Compiler.enviroment,task.AssignmentId, req.user.id)
        if(!markSpacePath)
            return res.status(400).json({"message": "internal error contact backen adminstrator"})
        //get repoitory link
        let link = await repositoryLink(markSpacePath, req.user.githubUserName, asignment.repository)
        //clone repository
        let cloningRespone = await cloneRepository(link, markSpacePath)
        if(!cloningRespone) {
                return res.status(500).json({message:"no internet to clone file"})
        }
        if(cloningRespone.failed)
            return res.status(400).json({"message": cloneRepository.message})
        //check if solution file exist
        let solutionFileList = checkSolutionFile(markSpacePath, task.studentSolutionFileNames, true, asignment.repository)
        if(!solutionFileList.allGiven)
            return res.status(400).json({"message": solutionFileList.message})
        //compute marks here
        let compileFunction = await compileScripts[asignment.Compiler.name]
        if(!compileFunction)
             return res.status(501).json({"messages": "compile function not found"})
        //generate result of test and mark here
        let compileOutput = await compileFunction(task.testFile, markSpacePath, solutionFileList.solutionPath)
        if(compileOutput.compileResponse.stderr) // type: 2 errors represent errros occured during compilation/ such as file not found
             return res.status(400).json({"message": compileOutput.compileResponse.stderr.replaceAll(markSpacePath, ""), type:2})
         //check to see if result file is given
         let lecturer = await Lecturer.findByPk(asignment.LecturerId)
         let resultFile = await checkIfResulstsFileExits(markSpacePath, lecturer.email, asignment.title,task.number)
         if(!resultFile)
            {    
                asignment.stop = true
                await asignment.save()
                return res.status(400).json({"message": "error in generatig meta data for student grading, assignment is now close, contact lecturer for fix, this is not student fault"})
            }
        //start compilation here
         //compile codes here
         let genRequirementMark = 0;
         let genRequirementResult = []
         let requirements   = await AssignmentRequirement.findAll({where: {AssignmentId:task.AssignmentId}})
         if(true){
            if(true)
                {
                    //run coding standard function
                    let standardFunction = codingStandard[asignment.Compiler.name]
                    if(standardFunction) {
                        let result = await standardFunction(solutionFileList.solutionPath, markSpacePath)
                        if(result.pass) {
                            genRequirementMark += 5
                        }
                        genRequirementResult.push({"name": "coding Standard", ...result})
                    }
                }
         }
         //start marking here
         let studentMarkResult = await sanitizeResults(markSpacePath)
         console.log(studentMarkResult)
         if(!studentMarkResult)
            return res.status(501).json({"message": "error generating student meta data wrong format"})
         //save results statistics
         for(const result of studentMarkResult.testResult) {
            //check to see if a stats entry is already saved
            let testEntry = await TestStatistics.findOne({where: {TaskId:task.id, testNumber:result.testnumber}})
            let studenResults = await TestResult.findOne({where: {StudentId:req.user.id, TaskId:task.id, testNumber:result.testnumber}})
            //check for the previous entry
            if(testEntry) {
                //check for current results
                if(result.status) {
                    //check for previous results
                    if(!studenResults) {
                        testEntry.passNumber += 1
                        studenResults = TestResult.build({StudentId:req.user.id , TaskId:task.id,testNumber:result.testnumber, ...result})
                    }
                    else {
                        if(!studenResults.status) {
                            testEntry.failedNumber -= 1
                            testEntry.passNumber += 1
                            studenResults.status = true
                            studenResults.feedback = result.feedback
                        }
                    }
                } else {
                    //consider only situation where it is wrong entry
                    if(!studenResults) {
                        testEntry.failedNumber += 1
                        studenResults = TestResult.build({StudentId:req.user.id, TaskId:task.id, testNumber:result.testnumber, ...result})
                    }
                }
                await studenResults.save()
                await testEntry.save()
            } else {
                //make new stat entry and saved //situations for first submission
                let statEntry = {"TaskId": task.id, feedback:result.feedback, testNumber:result.testnumber, failedNumber:0, passNumber:0}
                if(result.status){
                    statEntry.passNumber = 1
                }
                 else {
                    console.log("failed")
                    statEntry.failedNumber = 1
                 }
                testEntry = TestStatistics.build(statEntry)

                studenResults = TestResult.build({StudentId:req.user.id, TaskId:task.id, testNumber:result.testnumber, ...result})
                console.log(statEntry)
                await testEntry.save()
                await studenResults.save()
            }
            
         }

         let lesserThanPrevMark = true
         //add marks obtain from coding standards
         studentMarkResult.marks += genRequirementMark
         //save option here
         let savedTaskResult = await TaskResult.findOne({where: {TaskId:task.id, StudentId:req.user.id}})
         let totallAssResult = await AssignmentResult.findOne({where: {StudentId:req.user.id, AssignmentId:task.AssignmentId}})
         //if not already saved results
         if(!savedTaskResult) {
            //form new results entry in the database
            lesserThanPrevMark = false
            let resultObject = {StudentId:req.user.id, TaskId:task.id, AssignmentId:task.AssignmentId, mark:studentMarkResult.marks, completion:studentMarkResult.marks.completion} //create result for task object
            //check if the student has saved results
            if(totallAssResult){
                totallAssResult.mark += studentMarkResult.marks
            }else {
                totallAssResult = AssignmentResult.build({StudentId:req.user.id, mark:studentMarkResult.marks, AssignmentId:task.AssignmentId})
            }
            await Promise.all([totallAssResult.save(), TaskResult.create(resultObject)])
         } else {
            //check if prev mark is creater than current mark
            if(savedTaskResult.mark < studentMarkResult.marks)
               {
                lesserThanPrevMark = false
                totallAssResult.mark += (studentMarkResult.marks - savedTaskResult.mark)
                savedTaskResult.mark = studentMarkResult.marks
                await Promise.all([totallAssResult.save(), savedTaskResult.save()])
               }
         }
         await deletFolder(markSpacePath)
         return res.status(200).json({...studentMarkResult, genralRequirements: genRequirementResult, lesserThanPrevMark, assignmentScore:totallAssResult.mark})
    } catch(err) {
        console.log(err)
        return res.status(501).json({message: "error occured"})
    }
}




    static submitAssignmentFile = async (req, res) => {
        /**
         * summiteAssignmentFile : submit student assignment as file
         * req: http request object
         * res: http response object
         */
        let detials = req.body// format {taskId, codes: [{code, fileName}]}
        //check for required fields
        if(!(detials.codes, detials.taskId)) {
            return res.status(400).json({"message": "fields missing"})
        }
        try {
        //get assignment id from task
        let task = await Task.findByPk(detials.taskId)
        if(!task)
            return res.status(400).json({"message": "task not found"})
        let asignment = await Assignment.findByPk(task.AssignmentId, {include:{model:Compiler}})

        if(!asignment)
            return res.status(400).json({"message": "cant retrieve assignemnt"})
        //get compiler id from assignment
        let markSpacePath = await createStudentMarkSpace(asignment.Compiler.enviroment,task.AssignmentId, req.user.id)
        if(!markSpacePath)
            return res.status(500).json({"message": "internal error contact backen adminstrator"})
        let solutionFilNames = task.studentSolutionFileNames.split("**")
        let studentGivenFileNames = [] //get student file names
        for(const code of detials.codes){
            studentGivenFileNames.push(code.fileName)
        }
        //check if all required files are given
        for(const requireFile of solutionFilNames){
            if(!studentGivenFileNames.includes(requireFile))
                return res.status(400).json({"message": `${requireFile} not found`})
        }
        //creat student code in path
        for(const studentCode of detials.codes) {
            let response = await writeToFile(path.join(markSpacePath, studentCode.fileName), studentCode.code)
            if(!response)
                return res.status(500).json({"message": "internal error couldnt create student script"})
        }
        let solutionFileList = checkSolutionFile(markSpacePath, task.studentSolutionFileNames, false)
         //compile codes here
         let genRequirementMark = 0;
         let genRequirementResult = []
         let requirements   = await AssignmentRequirement.findAll({where: {AssignmentId:task.AssignmentId}})
         if(true){
            if(true)
                {
                    //run coding standard function
                    let standardFunction = codingStandard[asignment.Compiler.name]
                    if(standardFunction) {
                        let result = await standardFunction(solutionFileList.solutionPath, markSpacePath)
                        if(result.pass) {
                            genRequirementMark += 5
                        }
                        genRequirementResult.push({"name": "coding Standard", ...result})
                    }
                }
         }
         let compileFunction = compileScripts[asignment.Compiler.name]
         if(!compileFunction)
              return res.status(501).json({"messages": "compile function not found"})
         //generate result of test and mark here
         let compileOutput = await compileFunction(task.testFile, markSpacePath, solutionFileList.solutionPath)
         //check if the student code  compiled successfully
         if(compileOutput.compileResponse.stderr) // type: 2 errors represent errros occured during compilation/ such as file not found
             return res.status(400).json({"message": compileOutput.compileResponse.stderr.replaceAll(markSpacePath, ""), type:2})
         //check to see if result file is given
         let lecturer = await Lecturer.findByPk(asignment.LecturerId)
         let resultFile = await checkIfResulstsFileExits(markSpacePath, lecturer.email, asignment.title,task.number)
         if(!resultFile)
            {    
                asignment.stop = true
                await asignment.save()
                return res.status(400).json({"message": "error in generatig meta data for student grading, assignment is now close, contact lecturer for fix, this is not student fault"})
            }
         //start marking here
         let studentMarkResult = await sanitizeResults(markSpacePath)
         if(!studentMarkResult){
            return res.status(501).json({"message": "error generating student meta data wrong format"})

         }
         for(const result of studentMarkResult.testResult) {
            //check to see if a stats entry is already saved
            let testEntry = await TestStatistics.findOne({where: {TaskId:task.id, testNumber:result.testnumber}})
            let studenResults = await TestResult.findOne({where: {StudentId:req.user.id, TaskId:task.id, testNumber:result.testnumber}})
            //check for the previous entry
            if(testEntry) {
                //check for current results
                if(result.status) {
                    //check for previous results
                    if(!studenResults) {
                        testEntry.passNumber += 1
                        studenResults = TestResult.build({StudentId:req.user.id , TaskId:task.id,testNumber:result.testnumber, ...result})
                    }
                    else {
                        if(!studenResults.status) {
                            testEntry.failedNumber -= 1
                            testEntry.passNumber += 1
                            studenResults.status = true
                            studenResults.feedback = result.feedback
                        }
                    }
                } else {
                    //consider only situation where it is wrong entry
                    if(!studenResults) {
                        testEntry.failed += 1
                        studenResults = TestResult.build({StudentId:req.user.id, TaskId:task.id, testNumber:result.testNumber, ...testNumber})
                    }
                }
                await studenResults.save()
                await testEntry.save()
            } else {
                //make new stat entry and saved //situations for first submission
                let statEntry = {"TaskId": task.id, feedback:result.feedback, testNumber:result.testnumber}
                if(result.status)
                    statEntry.passNumber += 1
                else 
                    statEntry.failedNumber += 1
                testEntry = TestStatistics.build(statEntry)

                studenResults = TestResult.build({StudentId:req.user.id, TaskId:task.id, testNumber:result.testnumber, ...result})
                await testEntry.save()
                await studenResults.save()
            }
            
         }
         let lesserThanPrevMark = true
         //add marks obtain from coding standards
         studentMarkResult.marks += genRequirementMark
         //save option here
         let savedTaskResult = await TaskResult.findOne({where: {TaskId:task.id, StudentId:req.user.id}})
         let totallAssResult = await AssignmentResult.findOne({where: {StudentId:req.user.id, AssignmentId:task.AssignmentId}})
         //if not already saved results
         if(!savedTaskResult) {
            //form new results entry in the database
            lesserThanPrevMark = false
            let resultObject = {StudentId:req.user.id, TaskId:task.id, AssignmentId:task.AssignmentId, mark:studentMarkResult.marks, completion:studentMarkResult.marks.completion} //create result for task object
            //check if the student has saved results
            if(totallAssResult){
                totallAssResult.mark += studentMarkResult.marks
            }else {
                totallAssResult = AssignmentResult.build({StudentId:req.user.id, mark:studentMarkResult.marks, AssignmentId:task.AssignmentId})
            }
            await Promise.all([totallAssResult.save(), TaskResult.create(resultObject)])
         } else {
            //check if prev mark is creater than current mark
            if(savedTaskResult.mark < studentMarkResult.marks)
               {
                lesserThanPrevMark = false
                totallAssResult.mark += (studentMarkResult.marks - savedTaskResult.mark)
                savedTaskResult.mark = studentMarkResult.marks
                await Promise.all([totallAssResult.save(), savedTaskResult.save()])
               }
         }
         await deletFolder(markSpacePath)
         return res.status(200).json({...studentMarkResult, genralRequirements: genRequirementResult, lesserThanPrevMark, assignmentScore:totallAssResult.mark})
        } catch(err) {
            console.log(err)
            return res.status(501).json({"message": "internal error"})
        }
    }
}