/**Controller for student endpoints */
import sha1 from 'sha1'
import { Class } from "../models/programs/class.js"
import { Program } from "../models/programs/program.js"
import { Lecturer } from "../models/users/lecturer.js"
import { Student } from "../models/users/student.js"
import { VerifyEmail } from "../models/verifications/emailVerication.js"
import { generateSecretNumber } from "../utils/DatesManipulations.js"
import { getToken, verifyToken } from "../utils/authenticationFunctions.js"
import { sendVerification } from "../utils/emailHandler.js"
import { generateFileUrl, writeBinaryFile } from "../utils/fileHandler.js"
import { validateEmail, validatePassword, verifyMandatoryFields } from "../utils/verificationFunctions.js"

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
            requiredDetials.push("index", "ClassId", "ProgramId")
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
                    if (model === Student) {
                        StudentId = user.id
                    }
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
            return res.status(401).json({"reason": "wrong token"})
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
        if (req.user.studentId) {
            let userClass = await Class.findByPk(req.user.ClassId, {attributes:['className']})
            let program = await Program.findByPk(req.user.ProgramId, {attributes:['programName']})
            return res.status(200).json({
                name:req.user.name,
                "class":userClass.className,
                program:program.programName,
                profilePic : req.user.profileUrl,
                studentId : req.user.studentId,
                id:req.user.id,
                email: req.user.email,
                studentId : req.user.studentId,
                index: req.user.index,
                githubUserName: req.user.githubUserName
            }) }
        return res.status(200).json({profilePic: req.user.profileUrl,name: req.user.name, id: req.user.id, email: req.user.email, lecturerId: req.user.lecturerId})
    }

    static update = async (req, res) => {
        //request contains request object
        //response contains response object
        let userDetails = req.body
        try {
            if(!(userDetails.name || userDetails.profilePic || userDetails.githubUserName)) {
                return res.status(400).json({"reason": "no fields given"})
            if(userDetails.name)
                req.user.name = userDetails.name
            if(userDetails.githubUserName)
                req.user.githubUserName = userDetails.githubUserName
            }
            if(userDetails.profilePic && userDetails.fileName)
                {
                    let encodedFile = userDetails.profilePic.split("base64,")[1]
                    let saved = await writeBinaryFile(encodedFile,req.user.id, userDetails.fileName)
                        if(saved) {
                            req.user.profileUrl = generateFileUrl(saved.relativePath)
                            req.user.profileDisk = saved.fullPath
                        } else {
                            await req.user.save()
                            return res.status(501).json({"message": "couldn't save file"})
                        }
                }
            await req.user.save()
            res.status(200).json("updated")
        }catch(error) {
            console.log(error)
            return res.status(501).json({"reason": "error"})
        }
    }
}