import { Router } from "express";
import { AssignmentSController } from "../controllers/assignmentController.js";
import { ProgramController } from "../controllers/programController.js";
import { UserController } from "../controllers/userController.js";
import { VerifyController } from "../controllers/verficationController.js";
import { Lecturer, ResetPasswordDb, Student, VerifyEmail } from "../models/relationship/relations.js";
//Routers
let nonAuthRouth = Router()


/**
 * Student registration endpoint
 * domain: public
 * method: post
 * 
*/
nonAuthRouth.post("/auth/register/student", async (req, res) => {
        return await UserController.register(req, res, Student)
})

/**
 * Student registration
 * domain: public
 * method: post
 * 
*/
nonAuthRouth.post("/program/classes", async (req, res) => {
        return await ProgramController.GetClass(req, res)
})

/**
 * Lecturer registration endpoint
 * domain: public
 * methode: post
 */
nonAuthRouth.post("/auth/register/lecturer", async (req, res) => {
        return await UserController.register(req, res, Lecturer)
})

/**
 * Lecturer login endpoint
 * domain: public
 * methode: post
 */
nonAuthRouth.post("/auth/login/lecturer", async (req, res) => {
        return await UserController.login(req, res, Lecturer)
})

/**
 * Student login endpoint
 * domain: public
 * methode: get
 */
nonAuthRouth.post("/auth/login/student", async (req, res) => {
        return await UserController.login(req, res, Student)
})

/**
 * verify email endpoint
 * domain: public
 * method: get
 */
nonAuthRouth.get("/auth/verify/email/:id/:secret", async (req, res) => {
        return await VerifyController.VerifyEmailController(req, res, VerifyEmail)
})

/**
 * resend email message 
 * domain public
 * method get
 */
nonAuthRouth.get("/auth/resend/email/:id", async (req, res) => {
        return await VerifyController.resendEmail(req, res)
})

/**
 * reset user password 
 * domain public
 * method get
 */
nonAuthRouth.get("/auth/email/reset-password/:email/:type", async (req, res) => {
        return await VerifyController.forgetPassword(req, res)
})

nonAuthRouth.get("/auth/email/reset-password/verify/:id/:secret", async (req, res,) => {
        return await VerifyController.VerifyEmailController(req, res, ResetPasswordDb)
})
/**
 * update user password returns 
 * domain: public
 * mehtod: post
 */
nonAuthRouth.post("/auth/user/reset-password", async (req, res) => {
        return await VerifyController.updatePassword(req, res)
})

/**
 * programs returns all programs in offered by the school
 * domain: public
 * mehtod: get
 */
nonAuthRouth.get("/programs", async (req, res) => {
        return await ProgramController.getPrograms(req, res)
})

/***
 * returns courses offered by a class
 * domain: public
 * method: get
 */
nonAuthRouth.get("/program/class/courses/:classId", async (req, res) => {
        return await ProgramController.GetCourses(req, res)
})

/**
 * returns classes for a program
 * domain: public
 * method: get
 */
nonAuthRouth.get("/program/class/courses/:classId", async (req, res) => {
        return await ProgramController.GetClass(req, res)
})
/**
 * return all compiler 
 * method get
 * domain public
 */

nonAuthRouth.get("/compilers", async (req, res) => {
        return await AssignmentSController.getCompilersSimple(req, res)
    })

nonAuthRouth.get("/compiler/:id", async (req, res) => {
        return AssignmentSController.compilerDetials(req, res)
})


//refresh token
nonAuthRouth.post("/auth/student/refresh/token", UserController.refreshToken)

nonAuthRouth.post("/auth/lecturer/refresh/token", async (req, res) => {
        return await UserController.refreshToken(req, res, Lecturer)
})

//export and import
nonAuthRouth.get("/download/submission/:id", async (req, res) => {
                return await AssignmentSController.ExportMarks(req, res, "ass")
})
export { nonAuthRouth };

