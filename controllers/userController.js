/**Controller for student endpoints */
import { verifyMandatoryFields, validateEmail, validatePassword } from "../utils/verificationFunctions.js"
import sha1 from 'sha1'
import { getToken } from "../utils/authenticationFunctions.js"
import { Student } from "../models/student.js"
export class UserController {
    static register = async (req, res, model ) => {
        /**
         * register: register student to the system
         * @param {object} req: request object
         * @param {object }res: response
         * @retuns {object} : returns json response
         */
        let requiredDetials = ['email', 'password', 'name']
        if(model === Student) {
            requiredDetials.push("githubUsername")
        }
        let studentDetails  = req.body;
        //check if all student details are provided
        let missingDetails = verifyMandatoryFields(requiredDetials, studentDetails)
        if (missingDetails.length != 0) {
            return res.status(400).json({"created": false, "reason": "fields missings", "missing fields": missingDetails})
        } else {
            //check if student has already registered
            let studentAlreadyExist = await model.find({"email": studentDetails.email})
            if (studentAlreadyExist) {
                return res.status(400).json({"created": false, reason: "student already exist", student: {name: studentAlreadyExist.name, id: studentAlreadyExist.id, email: studentAlreadyExist.email}})
            } else {
                //validate email and password
                let validEmail = validateEmail(studentDetails.email)
                let validPwd = validatePassword(studentDetails.password)
                if (!validEmail  || !validPwd.validated) {
                    let errorMessage = !validEmail ? "provide valid email, " : ""
                    errorMessage += !validPwd.validated ? validPwd.reason : ""
                    return res.status(400).json({created: false, "reason": errorMessage})
                } else {
                    //encrypt password
                    studentDetails.password = sha1(studentDetails.password)
                    //save information to a database
                    let user = model.build(studentDetails)
                    let saved = await user.saveToDatabase()
                    if(saved) {
                        return res.status(201).json({created: true})
                    } else {
                        return res.status(500).json({create: false, reason: "internal error, contact adminstrator"})
                    }
                }

            }
        }

    }


    static login = async (req, res, model) => {
        /** 
         * login: login in controller for user
         * @param {object} req: http request object
         * @param {object} res: http response object
         * @returns {object}: json response depending on the status of the login
          */

        //get required fields
        let requireLoginDetails = ['email', 'password']
        //get login details
        let loginDetials =  req.body

        //check if all the detials are given
        let missingDetails = verifyMandatoryFields(requireLoginDetails, loginDetials)
        if (missingDetails.length != 0) {
            return res.status(400).json({"reason": "fields missings", "missing fields": missingDetails})
        } else {
            //check if user is registered
            let user = await model.find({'email': loginDetials.email})
            if (user) {
                //check if ther hashed password match
                if(user.password === sha1(loginDetials.password)) {
                    //generate json web token
                    let token = getToken({id: user.id})
                    res.status(200).json({token})
                } else {
                    return res.status(401).json({"reason" : "wrong password"})
                }
            } else {
                return res.status(401).json({"reason": "user is not registered"})
            }
        }
        
    }
}