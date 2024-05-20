/**controller for programs endpoint */
import {Class, ClassCourses, Course, Program} from "../models/relationship/relations.js"
import { verifyMandatoryFields } from "../utils/verificationFunctions.js"

export class ProgramController  {
    //template for programs
    static getPrograms = async (req, res) => {
        /**
         * Get all programs from offered by the university
         * req: request object
         * res: response object
         */
        let programs = await Program.findPrograms()
        if (programs.length === 0) {
            console.log("programs not loaded")
            return res.status(501).json({"reason": "no programs loaded"})
        } else {
           return res.status(200).json(programs)
        }
    }

    static GetClass = async (req, res) => {
         /**
         * Get all classes for a university program
         * req: request object
         * res: response object
         */
        let programDetials = req.body
        let requiredFields = ['programId']
        let missingDetails = verifyMandatoryFields(requiredFields, programDetials)
        if(missingDetails.length !== 0) {
            return res.status(400).json({"reason": "fields missings", "missing fields": missingDetails})
        }

        let program = await Program.find({id: programDetials.programId})
        if(program) {
            let classes = await Class.findClasses({ProgramId: program.id})
            if(classes.length === 0) {
                return res.status(501).json({"msg": "no class loaded for this program"})
            }
            
            return res.status(200).json(classes)
        } else {
            return res.status(400).json({"msg": "Program not found"})
        }
    }

    static GetCourses = async (req, res) => {
        /**
        * Get all classes for a university program
        * req: request object
        * res: response object
        */
       let classId = req.params.classId
       if(!classId) {
           return res.status(400).json({"reason": "fields missings", "missing fields": missingDetails})
       }

       let course = await Class.findOne({where: {id:classId}, include: Course})
       if(course) {
           if(course.Courses.length === 0) {
               return res.status(501).json({"msg": "no class loaded for this program"})
           }
           return res.status(200).json(course.Courses)
       } else {
           return res.status(400).json({"msg": "Program not found"})
       }
   }
}