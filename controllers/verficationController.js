import { VerifyEmail } from "../models/relationship/relations.js";
import {TwentyFourHoursPass, generateSecretNumber } from "../utils/DatesManipulations.js";
import { Lecturer, Student } from "../models/relationship/relations.js";
import { sendResetPassword, sendVerification } from "../utils/emailHandler.js";
import { ResetPasswordDb } from "../models/verifications/passwordsReset.js";
import sha1 from "sha1"

class VerifyController {
    static VerifyEmailController = async (req, res, model ) => {
        //get user id from parameters
        let id = req.params.id;
        let secret = req.params.secret
        //check if id and secrets are given
        if ( !(id && secret)) {
            return res.status(400).json({"verified": false, "reason": "id or secret not given"})
        }
        let userEmailDetails = null
        if (model === VerifyEmail) 
            userEmailDetails = await VerifyEmail.find({id})
        else 
            userEmailDetails = await ResetPasswordDb.find({id})
        console.log(userEmailDetails)
        if(!userEmailDetails) 
            return res.status(400).json({"verified": false, "reason": "verification details not found, probably user is not registerd"})
        //check if link has expired
        if(TwentyFourHoursPass(userEmailDetails.createdAt))
            return res.status(400).json({"verified": false, "reason": "link expired"})
        //check if secrets number match
        if (userEmailDetails.secreteText !== secret) {
            return res.status(400).json({"verified": false, "reason": "wrong verification code"})
        }
        //check if a user is student or lecturer
        let user = null;
        if(userEmailDetails.StudentId) {
            user = await Student.find({id:userEmailDetails.StudentId})
        } else {
            user = await Lecturer.find({id:userEmailDetails.LecturerId})
        }
        //verify user email
        if(model === VerifyEmail) {
            user.verified  = true;
            await user.save()
            userEmailDetails.destroy()
        }else{
            userEmailDetails.verified = true;
            await userEmailDetails.save()
        }
        //delete userDetails entry
        return res.status(200).json({"verified": true, id:userEmailDetails.id})
        
    }

    static resendEmail = async (req, res) => {
        let id = req.params.id
        let userEmailDetails = await VerifyEmail.findByPk(id)
        if(!userEmailDetails) {
            return res.status(401).json({"sent": "false", "reason": "user verficication details not found"})
        } 
        //get new random test
        userEmailDetails.secreteText = generateSecretNumber()
        //check if a user is student or lecturer
        let user = null;
        if(userEmailDetails.StudentId) {
            user = await Student.find({id:userEmailDetails.StudentId})
        } else {
            user = await Lecturer.find({id:userEmailDetails.LecturerId})
        }
        await userEmailDetails.save()
        sendVerification(user, userEmailDetails)
        return res.status(200).json({"sent": true, email: user.email, id: userEmailDetails.id})
    }

    static forgetPassword =  async (req, res) => {
        let email = req.params.email
        let user = req.params.type
        // check if email is given details are given
        if(email && user) {
            //check for user
            let userInstance = null
            if(user.toUpperCase() === "STUDENT") {
                userInstance = await Student.find({email})
            }else if (user.toUpperCase() === "LECTURER") {
                userInstance = await Lecturer.find({email})
            } else {
                return res.status(401).json({"reason": "wrong type given, type shoulb be lecturer or student"})
            }
            if (!userInstance) {
                //check if user is not registered
                return res.status(401).json({"reason": "user not registered, please check email"})
            }
            //save user information in a database
            let userObj= {email,"secreteText": generateSecretNumber(), user}
            if (user.toUpperCase() === "STUDENT")
                userObj["StudentId"] = userInstance.id
            else
                userObj["LecturerId"] = userInstance.id

            let resetDb  = await ResetPasswordDb.create(userObj)
            //send email
            sendResetPassword(userInstance, resetDb)
            return res.status(200).json({"created": true, "id": resetDb.id})

        }
    }

    static updatePassword = async (req, res) => {
        //get Verification secrete Text,
        let {pwd, verificationId} = req.body

        if(!(pwd && verificationId)) 
            return res.status(400).json({"reason": "fields missing"})
        //check if user has verified
        let verificationDetails = await ResetPasswordDb.find({id:verificationId})
        if(!(verificationDetails && verificationDetails.verified))
            return res.status(400).json({"reason": "user not authorized"})
        // get user object
        let user  = null
        if(verificationDetails.StudentId)
            user = await Student.find({id:verificationDetails.StudentId})
        else 
            user = await Lecturer.find({id:verificationDetails.LecturerId})
        //change user password and save
        user.password = sha1(pwd)
        let userDB = await user.save()
        verificationDetails.destroy()
        return res.status(200).json({"created": true, userId: userDB.id})
        

    }
}


export {VerifyController}