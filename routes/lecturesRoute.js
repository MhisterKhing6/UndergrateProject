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


lecturerRoute.post("/assignment", async (req, res) => {
    return  await AssignmentSController.createAssignment(req, res)
})

lecturerRoute.post("/assignment/task", async (req, res) => {
    return await AssignmentSController.addTask(req, res)
})
export {lecturerRoute}