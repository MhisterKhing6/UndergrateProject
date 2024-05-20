/*
controls assignment endpoints
*/

import { Assignment, Compiler, AssignmentClasses, Task } from "../models/relationship/relations.js"
import { saveTaskFile } from "../utils/fileHandler.js"
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
            if(new Date(assignmendetails.startDate) <= new Date())
                assignmendetails.open = true

            let response = await Assignment.create({...assignmendetails, LecturerId: req.user.id})
            //save to class
            await AssignmentClasses.create({"AssignmentId":response.id, "ClassId": assignmendetails.ClassId })
            return res.status(201).json({"created": true, "id": response.id})
        } catch (err) {
            console.log(err)
            return res.status(501).json({"reason": "couldnt create assignemnt"})
        } 
        
        
    }
    static addTask = async (req, res) => {
        let task = req.body
        let requiredFields = ["ext", "requirement", "solutionPath", "AssignmentId", "number", "examples", "solutionScript"]
        let missingFields = verifyMandatoryFields(requiredFields, task)
        if(missingFields.length !== 0)
            return res.status(400).json({"reason": "fields missing", "missingFields": missingFields})
        //get task id
        let taskId = v4()
        let file = await saveTaskFile({data:task.solutionScript, ext:task.ext}, task.AssignmentId, taskId, "Test Script")
        //save the file to the database
        if(!file)
            return res.status(501).json({"reason": "cant save file"})
        //save taskt
        try {
                let taskDb = await Task.create({id:taskId,requirement: task.requirement, examples:task.examples,
                solutionScriptPath: file.filePath, AssignmentId:task.AssignmentId,number:task.number})
                return res.status(201).json({"taskId": taskDb.id})

        }catch(err){
            console.log(err)
            return res.status(501).json({"reason": "cant add task, contack backend admin"})
        }
    }

    static getCompilersSimple = async (req, res) => {
        //get all programs
        let compilers = await Compiler.findAll({attributes: ['name', 'id', 'extension']})
        if(!compilers)
            return res.status(401).json({"reason": "no compilers loaded"})
        return res.status(200).json(compilers)
    }

    static compilerDetials = async (req, res) => {
        let id = req.params.id
        let compiler = await Compiler.findByPk(id)
        if(!compiler) 
            return res.status(400).json({"reason": "compiler not found"})
        return res.status(200).json(compiler)
    }
}
export {AssignmentSController}