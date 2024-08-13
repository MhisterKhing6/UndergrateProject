/**Auth router for controllers */
import { getAuthorizationtoken, verifyToken } from "../utils/authenticationFunctions.js";
import { Lecturer,  } from "../models/relationship/relations.js";
import { Router } from "express";
import { Compiler } from "../models/relationship/relations.js";
import { AssignmentSController } from "../controllers/assignmentController.js";
//get user login detailsl
let lecturerRoute = Router()
lecturerRoute.use(async (req, res, next) => {
    let type = req.originalUrl.split("/")[2]
    if(!(type.toUpperCase() === "LECTURER"))
        return res.status(401).json({"reason": "wrong user type"})
    let token = getAuthorizationtoken(req)
    if (!token) {
        return res.status(401).json({"reason": "user hasnt log in"})
    }
    let userPayload = verifyToken(token.token)
    if(!userPayload.verified)
        return res.status(403).json({"reson": "wrong token"})
    let userInstance = await Lecturer.find({id:userPayload.id})
    if(!userInstance)
        return res.status(401).json({"reson": "user hasnt log in"})
    //check if users email match
    if(userInstance.email !== userPayload.email)
        return res.status(401).json({"reason": "wrong token"})
    req.user = userInstance
    next()

})
/**
 * response -> get all compilers
 * method get
 * return all compilers offered by the program
 */

/**
 * create assignment
 * method: post
 * domain:  restricted to lecturers
 */
lecturerRoute.post("/assignment", AssignmentSController.createAssignment)

/**
 * assignment created by a lecturer
 * method get
 * domain restricted to lecturers
 */
lecturerRoute.get("/assignments", AssignmentSController.viewAssingments)

/**
 * update created assignment
 * method put
 * domain restricted to lecturers
 */
lecturerRoute.put("/assignment", AssignmentSController.updateAssignment)



/**
 * update delete assignment
 * method delete
 * domain restricted to lecturers
 */
lecturerRoute.delete("/assignment/:id", AssignmentSController.deletAssignment)
/*
 * add questions to assignments
 * method: post
 * domain: restricted to lecturers
 */
lecturerRoute.post("/assignment/task", AssignmentSController.addTask)

/*
 * update assignment task
 * method: put
 * domain: restricted to lecturers
 */
lecturerRoute.put("/assignment/task", AssignmentSController.updateTask)

/*
 * view task for assignments
 * method: post
 * domain: restricted to lecturers
 */
lecturerRoute.get("/assignment/tasks/:assId", AssignmentSController.viewAssignmentTasks)

/*
 * delete question
 * method: post
 * domain: restricted to lecturers
 */
lecturerRoute.delete("/assignment/task/:id", AssignmentSController.deleteTask)

/*
 * add class to assignment
 * method: post
 * domain: restricted to lecturers
 */
lecturerRoute.post("/assignment/add/class", AssignmentSController.addClass)

/**
 * getAssignment details
 * get assignment with id
 */
lecturerRoute.get("/assignment/view/:id", AssignmentSController.AssignmentDetailsWithInfo)

/**
 * getAssignment status
 * get assignment with id
 */
lecturerRoute.get("/assignment/stats/:id", AssignmentSController.AssignmentStatistics)

/**
 * export assignment
 */
lecturerRoute.get("/export/assignment/:id", AssignmentSController.ExportMarks)

/**
 * export task task
 */
lecturerRoute.get("/export/tasks/:id", async (req, res) => {
        return await AssignmentSController.ExportMarks(req, res, "task")
})

/**
 * lecturer routes
 */
lecturerRoute.get("/submission/:id", AssignmentSController.ViewSubmissionAssignment)
export {lecturerRoute}