/**Auth router for controllers */
import { getAuthorizationtoken, verifyToken } from "../utils/authenticationFunctions.js";
import { Lecturer, Student } from "../models/relationship/relations.js";
import { UserController } from "../controllers/userController.js";
import { Router } from "express";
import { AssignmentSController } from "../controllers/assignmentController.js";
//get user login detailsl
let authRouter = Router()
authRouter.use(async (req, res, next) => {
    let type = req.originalUrl.split("/")[2]
    if(!((type.toUpperCase() === "STUDENT") || type.toUpperCase() === "LECTURER"))
        return res.status(400).json({"reason": "wrong user type"})
    let token = getAuthorizationtoken(req)
    if (!token) {
        return res.status(401).json({"reason": "authorization token not given"})
    }
    let userPayload = verifyToken(token.token)
    if(!userPayload.verified)
        return res.status(403).json({"reson": "wrong token"})
    let userInstance = null
    if (type.toLocaleUpperCase() === "STUDENT")
        userInstance = await Student.find({id:userPayload.id})
    else 
        userInstance = await Lecturer.find({id:userPayload.id})
    if(!userInstance)
        return res.status(401).json({"reson": "user hasnt log in"})
    //check if users email match
    if(userInstance.email !== userPayload.email)
        return res.status(401).json({"reason": "wrong token"})
    req.user = userInstance
    next()

})
/**
 * response for only one user
 */

authRouter.get("/me", async (req, res) => {
    return UserController.me(req, res)
})


/**
 * view task description
 * method: get
 * domain: authenticated users
 */
authRouter.get("/assignment/task/:id", AssignmentSController.getTaskDetails)

/**
 * get the details of the assignment with id
 * method: get
 */
authRouter.get("/assignment/:id", AssignmentSController.getAssignmentDetails)

export {authRouter}