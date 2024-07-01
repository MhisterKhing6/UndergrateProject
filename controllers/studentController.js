/**Controller for student endpoints */
import { Assignment, AssignmentClasses, AssignmentResult, Class, Compiler, Course, Lecturer, Task, TaskResult } from "../models/relationship/relations.js"
import { Op } from '@sequelize/core';
import { createStudentMarkSpace, deletFolder, writeToFile } from "../utils/fileHandler.js"
import path from "path"
import {compileScripts} from "../utils/compileScripts.js"
import { cloneRepository, repositoryLink } from "../utils/submissionFunctions.js"
import { checkIfResulstsFileExits, sanitizeResults } from "../utils/markingHelperFunction.js"
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
            include:{ model:Assignment, 
                where: {
                startDate: {
                    [Op.lte]: Date.now()
                },
                endDate: {
                    [Op.gte]:Date.now()
                },
                },
                attributes: {exclude: ['createdAt', "upatedAt"]},
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
         * closeAssignments retrun all asssignments that are close
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
            raw:true, 
            nest:true,
            attributes: {exclude: ['createdAt', "upatedAt"]},
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
        let tasks = await Assignment.findAll( {where:{id:assId},raw:true, nest:true,
            attributes: [], 
            include: {
                model:Task,
                attributes: {exclude: ['createdAt', 'updatedAt', 'testFile']},
            },
            order: [[{model:Task}, "number", "ASC"]]
        })
        let response = tasks.map(val => {
            return val.Tasks
        })
        //find all the assignment that are open
        return res.status(200).json(response)
    }

    static submitAssignmentGihub = async (req, res) => {
        /**
         * summiteAssignmentGithu : clone student assignment from github
         * req: http request object
         * res: http response object
         */
        let detials = req.body
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
            return res.status(500).json({"message": "internal error contact backen adminstrator"})
        //get repoitory link
        let link = repositoryLink(req.user.githubUserName, asignment.repository)
        //clone repository
        let cloningRespone = await cloneRepository(link, markSpacePath)
        if(cloningRespone.code !== 0)
            return res.status(400).json({"message": "repository not found"})

        //compute marks here
        let compileFunction = await compileScripts[Assignment.Compiler.name]
        if(!compileFunction)
             return res.status(501).json({"messages": "compile function not found"})
        //generate result of test and mark here
        let compileOutput = await compileFunction(task.testFile, markSpacePath, task.studentSolutionFileNames)
        if(compileOutput.error) //type: 1 errors represent error that occured b4 compilation
            return res.status(400).json({"message": compileOutput.message, type:1})
        //check if the student code  compiled successfully
        if(compileOutput.response.stderr) // type: 2 errors represent errros occured during compilation
            return res.status(400).json({"message": compileOutput.response.stderr, "type": "compile error", type:2})
        //check to see if results is given
        console.log("implement marking here")
        return res.status(501).json({"message": "not implemented"})
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
        //good
        //creat student code in path
        for(const studentCode of detials.codes) {
            let response = await writeToFile(path.join(markSpacePath, studentCode.fileName), studentCode.code)
            if(!response)
                return res.status(500).json({"message": "internal error couldnt create student script"})
        }
         //compile codes here
         let compileFunction = compileScripts[asignment.Compiler.name]
         if(!compileFunction)
              return res.status(501).json({"messages": "compile function not found"})
         //generate result of test and mark here
         let compileOutput = await compileFunction(task.testFile, markSpacePath, task.studentSolutionFileNames)
         if(compileOutput.error) //type: 1 errors represent error that occured b4 compilation
             return res.status(400).json({"message": compileOutput.message, type:1})
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
         //get mark object
         let markobject = studentMarkResult[studentMarkResult.length -1] //get mark objec
         //save option here
         let savedTaskResult = await TaskResult.findOne({where: {TaskId:task.id}})
         let totallAssResult = await AssignmentResult.findOne({where: {StudentId:req.user.id, AssignmentId:task.AssignmentId}})
         if(!savedTaskResult) {
            //save new entry in the database
            let resultObject = {StudentId:req.user.id, TaskId:task.id, AssignmentId:task.AssignmentId, mark:markobject.mark, completion:markobject.completion} //create result for task object
            if(totallAssResult){
                totallAssResult.mark += markobject.mark
            }else {
                totallAssResult = AssignmentResult.build({StudentId:req.user.id, mark:markobject.mark, AssignmentId:task.AssignmentId})
            }
            await Promise.all([totallAssResult.save(), TaskResult.create(resultObject)])
         } else {
            //check if prev mark is creater than cureent mark
            if(savedTaskResult.mark < markobject.mark)
               {
                totallAssResult += (markobject.mark - savedTaskResult.mark)
                savedTaskResult.mark = markobject.mark
                await Promise.all([totallAssResult.save(), savedTaskResult.save()])
               }
         }
         await deletFolder(markSpacePath)
         return res.status(200).json(studentMarkResult)
        }
}