/**Controller for student endpoints */
import { verifyMandatoryFields, validateEmail, validatePassword } from "../utils/verificationFunctions.js"
import sha1 from 'sha1'
import { getToken } from "../utils/authenticationFunctions.js"
import { Student } from "../models/users/student.js"
import { Assignment, AssignmentClasses, Class, Compiler, Course, Task } from "../models/relationship/relations.js"
import { json } from "sequelize"
import { Op } from '@sequelize/core';
import { createStudentMarkSpace, writeToFile } from "../utils/fileHandler.js"
import path from "path"
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
                attributes: {exclude: ['createdAt', 'updatedAt', 'solutionScriptPath']},
            },
            order: [[{model:Task}, "number", "ASC"]]
        })
        let response = tasks.map(val => {
            return val.Tasks
        })
        //find all the assignment that are open
        return res.status(200).json(response)
    }

    static submitAssignmentFile = async (req, res) => {
        /**
         * summiteAssignmentFile : submit student assignment as file
         * req: http request object
         * res: http response object
         */
        let detials = req.body
        //check for required fields
        if(!(!detials.code && detials.fileName && detials.taskId)) {
            return res.status(400).json({"message": "fields missing"})
        }
        //get compilerId from task
        let task = await Task.findByPk(detials.taskId)
        if(task)
            return res.status(400).json({"message": "task not found"})
        let compiler = await Compiler.findByPk(task.CompilerId)
        //create the script in student marking space
        let markSpacePath = await createStudentMarkSpace(compiler.enviroment,task.AssignmentId, req.user.id)
        if(!markSpacePath)
            return res.status(500).json({"message": "internal error contact backen adminstrator"})
        //good
        //creat student code in path
        let response = await writeToFile(path.join(markSpacePath, detials.fileName))
        if(!response)
            return res.status(500).json({"message": "internal error couldnt create student script"})
        //compute marks here
        return res.status(501).json({"message": "not implemented"})


    }
}