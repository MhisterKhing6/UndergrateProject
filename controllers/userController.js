/**Controller for student endpoints */
import { verifyMandatoryFields, validateEmail, validatePassword } from "../utils/verificationFunctions.js"
import sha1 from 'sha1'
import { getToken, verifyToken } from "../utils/authenticationFunctions.js"
import { Student } from "../models/users/student.js"
import { generateSecretNumber } from "../utils/DatesManipulations.js"
import { VerifyEmail } from "../models/verifications/emailVerication.js"
import { sendVerification } from "../utils/emailHandler.js"
import { Lecturer } from "../models/users/lecturer.js"

export class UserController {
    static register = async (req, res, model ) => {
        /**
         * register: register user to the system
         * @param {object} req: request object
         * @param {object }res: response
         * @retuns {object} : returns json response
         */
        let requiredDetials = ['email', 'password', 'name']
        let userDetails  = req.body;
        if(model === Student) {
            requiredDetials.push("index", "ClassId", "ProgramId", "username")
        } else {
            requiredDetials.push("lecturerId")
        }
        //check if all user details are provided
        let missingDetails = verifyMandatoryFields(requiredDetials, userDetails)
        if (missingDetails.length != 0) {
            return res.status(400).json({"created": false, "reason": "fields missings", "missing fields": missingDetails})
        } else {
            //check if user has already registered
            let userAlreadyExist = await model.find({"email": userDetails.email})
            if (userAlreadyExist) {
                return res.status(400).json({"created": false, reason: "user already exist", student: {name: userAlreadyExist.name, id: userAlreadyExist.id, email: userAlreadyExist.email}})
            } else {
                //validate email and password
                let validEmail = validateEmail(userDetails.email)
                let validPwd =  validatePassword(userDetails.password)
                if (!validEmail  || !validPwd.validated) {
                    let errorMessage = !validEmail ? "provide valid email, " : ""
                    errorMessage += !validPwd.validated ? validPwd.reason : ""
                    return res.status(400).json({created: false, "reason": errorMessage})
                } else {
                    //encrypt password
                    userDetails.password = sha1(userDetails.password)
                    //save information to a database
                    let user = model.build(userDetails)
                    let saved = await user.save()
                    //verify email
                    let LecturerId, StudentId = null;
                    if (model === Student) 
                        StudentId = user.id
                    else 
                        LecturerId = user.id
                    let emailDetials = {secreteText: generateSecretNumber(), StudentId, LecturerId}
                    let email = await VerifyEmail.create(emailDetials)
                    if(saved) {
                        //send user email
                        sendVerification(user, emailDetials)
                        return res.status(201).json({created: true, verificationId: email.id})
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
        let requireLoginDetails = ['password']
        //get login details
        if (model === Student) {
            requireLoginDetails.push("studentId")
        } else {
            requireLoginDetails.push("lecturerId")
        }
        let loginDetials =  req.body
        //check if all the detials are given
        let missingDetails = verifyMandatoryFields(requireLoginDetails, loginDetials)
        if (missingDetails.length != 0) {
            return res.status(400).json({"reason": "fields missings", "missing fields": missingDetails})
        } else {
            //check if user is registered
            let user = null
            if(model === Student)
                user = await model.find({'studentId': loginDetials.studentId})
            else
                user = await model.find({'lecturerId': loginDetials.lecturerId})
            if (user) {
                //check if ther hashed password match
                if(user.password === sha1(loginDetials.password)) {
                    //generate json web token
                    let token = getToken({id: user.id, email:user.email})
                    let refreshToekn = getToken({"id":user.id})
                    res.status(200).json({token,"refresh_token": refreshToekn})
                } else {
                    return res.status(401).json({"reason" : "wrong password"})
                }
            } else {
                return res.status(401).json({"reason": "user is not registered"})
            }
        }
        
    }

    static refreshToken = async (req, res, model=false) => {
        //return new token
        let refreshToken = req.body.refresh_token
        if(!refreshToken)
            return res.status(400).json({"reason": "requires token"})
        //verify token
        let userId = verifyToken(refreshToken)
        if(!userId)
            return res.status(401).json({"reson": "wrong token"})
        let user = null
        if(model === Lecturer) {
            user = await Lecturer.findByPk(userId.id)
        }
        else
            user = await Student.findByPk(userId.id)
        if(!user)
            return res.status(400).json({"reason": "user not found"})
        //generate new token and send
        let newToken = getToken({'id': user.id, 'email': user.email})
        return res.status(200).json({token:newToken, 'refresh_token':refreshToken})
    }
    static me = async (req, res) => {
        //return user details
        if (req.user.studentId)
            return res.status(200).json({
                name:req.user.name,
                id:req.user.id,
                email: req.user.email,
                studentId : req.user.StudentId,
                index: req.user.index
            })
        return res.status(200).json({name: req.user.name, id: req.user.id, email: req.user.email, lecturerId: req.user.lecturerId})
    } 
}