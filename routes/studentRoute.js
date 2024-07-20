/**Auth router for controllers */
import { Router } from "express";
import { StudentController } from "../controllers/studentController.js";
import { Student, } from "../models/relationship/relations.js";
import { getAuthorizationtoken, verifyToken } from "../utils/authenticationFunctions.js";
//get user login detailsl
let studentRoute = Router()
studentRoute.use(async (req, res, next) => {
    let token = getAuthorizationtoken(req)
    if (!token) {
        return res.status(401).json({"reason": "no token given"})
    }
    let userPayload = verifyToken(token.token)
    if(!userPayload.verified)
        return res.status(403).json({"reason": "token expired"})
    let userInstance = await Student.find({id:userPayload.id})
    if(!userInstance)
        return res.status(401).json({"reason": "user hasn't log in"})
    //check if users email match
    if(userInstance.email !== userPayload.email)
        return res.status(401).json({"reason": "wrong token"})
    req.user = userInstance
    next()
})


/**
 * view student asignments
 * method: get
 * domain:  restricted to students
 */
studentRoute.get("/assignments", StudentController.assignments)

/**
 * view student asignments that are open for submission
 * method: get
 * domain:  restricted to students
 */
studentRoute.get("/open/assignments", StudentController.openAssignments)

/**
 * view student asignments that are closed for submission
 * method: get
 * domain:  restricted to students
 */
studentRoute.get("/close/assignments", StudentController.closeAssignments)

/**
 * view student student courses
 * method: get
 * domain:  restricted to students
 */
studentRoute.get("/courses", StudentController.classCourses)


/**
 * get all assignments for a course
 * method: get
 * domain:  restricted to students
 */
studentRoute.get("/course/assignments/:courseId", StudentController.courseAssignments)


/**
 * get all assignments for a course that are open for submission
 * method: get
 * domain:  restricted to students
 */
studentRoute.get("/open/course/assignments/:courseId", StudentController.openCourseAssignments)

/**
 * get all assignments for a course that are closed for submission
 * method: get
 * domain:  restricted to students
 */
studentRoute.get("/close/course/assignments/:courseId", StudentController.closeCourseAssignments)



/**
 * get all questions for assignments
 * method:get
 * domain: restricted
 */
studentRoute.get("/tasks/assignment/:assId", StudentController.assignmentTasks)
export { studentRoute };

/**
 * submit student assignment file
 * method: post
 * domain restricted to student
 */
studentRoute.post("/submit/task/file", StudentController.submitAssignmentFile)