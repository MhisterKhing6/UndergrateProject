import { Router } from "express";
import { Student } from "../models/student.js";
import { Lecturer } from "../models/lecturer.js";
import { UserController } from "../controllers/userController.js";

//Routers
let nonAuthRouth = Router()


/**
 * Student registration endpoint
 * domain: public
 * method: post
 * 
*/
nonAuthRouth.post("/register/student", async (req, res) => {
        return await UserController.register(req, res, Student)
})

/**
 * Lecturer registration endpoint
 * domain: public
 * methode: post
 */
nonAuthRouth.post("/register/lecturer", async (req, res) => {
        return await UserController.register(req, res, Lecturer)
})

/**
 * Lecturer login endpoint
 * domain: public
 * methode: post
 */
nonAuthRouth.post("/login/lecturer", async (req, res) => {
        return await UserController.login(req, res, Lecturer)
})

/**
 * Student login endpoint
 * domain: public
 * methode: post
 */
nonAuthRouth.post("/login/student", async (req, res) => {
        return await UserController.login(req, res, Student)
})


export {nonAuthRouth}
