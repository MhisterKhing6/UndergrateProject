import { app } from "../app.js";
import request from "supertest";
import { assert } from "chai";
import { Student } from "../models/student.js";
import { databaseConnection } from "../utils/databaseConnector.js";
import { Lecturer } from "../models/lecturer.js";



describe("user controller route", async () => {
    let student = {
        "name": "test student", email: "test@gmmail.com", 'password': "test1222Kofi", githubUsername: "mhisther11"
    }
    let lecturer = {
        name: "test lectuere", email: "lect@gmail.com", password: "test12333Kofi"
    }
    beforeEach(async () => {
       await Student.truncate()
       await Lecturer.truncate()
    })

    after(async () => {
        Student.truncate()
        Lecturer.truncate()
    })

    it("should return status 200 and created to be true", async () => {
        /**registering student */
        let response = await request(app).post("/api/auth/register/student").type('json').send(student)
        assert.equal(201, response.status)
        assert.equal(true, response.body.created)
    })

    it("should return status 400, bad email format and bad password format", async () => {
        /**registering student */
        let student1= {...student}
        student1.password = "kofikofi"
        student1.email = "dddd"
        let response = await request(app).post("/api/auth/register/student").type('json').send(student1)
        assert.equal(400, response.status)
        assert.equal(false, response.body.created)
        assert.isUndefined(response.body["missing fields"])
        assert.isDefined(response.body.reason)
        assert.isString(response.body.reason)
        assert.equal("provide valid email, password must be at least 6 characters, should contain a digit and a capital letter", response.body.reason)
    })

    it("lecturer: should return status 200 and created to be true", async () => {
        /**registering lectuerer */
        let response = await request(app).post("/api/auth/register/lecturer").type('json').send(lecturer)
        assert.equal(201, response.status)
        assert.equal(true, response.body.created)
    })

    it("should return status 400, bad email format and bad password format", async () => {
        /**registering lecturer */
        let lecturer1= {...lecturer}
        lecturer1.password = "kofikofi"
        lecturer1.email = "dddd"
        let response = await request(app).post("/api/auth/register/lecturer").type('json').send(lecturer1)
        assert.equal(400, response.status)
        assert.equal(false, response.body.created)
        assert.isUndefined(response.body["missing fields"])
        assert.isDefined(response.body.reason)
        assert.isString(response.body.reason)
        assert.equal("provide valid email, password must be at least 6 characters, should contain a digit and a capital letter", response.body.reason)
    })

    it("should return status 400, and missing fields", async () => {
        /**registering student */
        let student1= {...student}
        student1.password = "kofikofi"
        student1.email = ""
        let response = await request(app).post("/api/auth/register/student").type('json').send(student1)
        assert.equal(400, response.status)
        assert.equal(false, response.body.created)
        assert.isDefined(response.body["missing fields"])
        assert.isArray(response.body['missing fields'])
        assert.equal(response.body['missing fields'].length, 1)
        assert.equal(response.body['missing fields'][0], "email")
        assert.isDefined(response.body.reason)
        assert.isString(response.body.reason)
    }) 

    // testing login endpoint student
    it("should return successfully loging", async () => {

        let response = await request(app).post("/api/auth/register/student").type('json').send(student)
        if(response.status === 201) {
            let loginResponse = await request(app).post("/api/auth/login/student").type('json').send({email: student.email, password:student.password})
            assert.equal(200, loginResponse.status)
            assert.isDefined(loginResponse.body.token)
            assert.isString(loginResponse.body.token)
        }else {
            assert.isFalse(true)
        }
    })

    it("wrong password", async () => {
        let response = await request(app).post("/api/auth/register/student").type('json').send(student)
        if(response.status === 201) {
            let loginResponse = await request(app).post("/api/auth/login/student").type('json').send({email: student.email, password:student.email})
            console.log(loginResponse.body)
            assert.equal(401, loginResponse.status)
            assert.isDefined(loginResponse.body.reason)
            assert.equal(loginResponse.body.reason, "wrong password")
        } else {
            assert.isFalse(true)
        }
    })

    it("user not registered", async () => {
        let response = await request(app).post("/api/auth/register/student").type('json').send(student)
        if(response.status === 201) {
            let loginResponse = await request(app).post("/api/auth/login/student").type('json').send({email: student.name, password:student.password})
            assert.equal(401, loginResponse.status)
            assert.isDefined(loginResponse.body.reason)
            assert.equal(loginResponse.body.reason, "user is not registered")
        }else {
            assert.isFalse(true)
        }
    })

    // testing login endpoint lecturer
    it("should return successfully loging", async () => {

        let response = await request(app).post("/api/auth/register/lecturer").type('json').send(lecturer)
        if(response.status === 201) {
            let loginResponse = await request(app).post("/api/auth/login/lecturer").type('json').send({email: lecturer.email, password:lecturer.password})
            assert.equal(200, loginResponse.status)
            assert.isDefined(loginResponse.body.token)
            assert.isString(loginResponse.body.token)
        }else {
            assert.isFalse(true)
        }
    })

    it("wrong password", async () => {
        let response = await request(app).post("/api/auth/register/lecturer").type('json').send(lecturer)
        if(response.status === 201) {
            let loginResponse = await request(app).post("/api/auth/login/lecturer").type('json').send({email: lecturer.email, password:lecturer.email})
            console.log(loginResponse.body)
            assert.equal(401, loginResponse.status)
            assert.isDefined(loginResponse.body.reason)
            assert.equal(loginResponse.body.reason, "wrong password")
        } else {
            assert.isFalse(true)
        }
    })

    it("lecturer not registered", async () => {
        let response = await request(app).post("/api/auth/register/lecturer").type('json').send(lecturer)
        if(response.status === 201) {
            let loginResponse = await request(app).post("/api/auth/login/lecturer").type('json').send({email: lecturer.name, password:lecturer.password})
            assert.equal(401, loginResponse.status)
            assert.isDefined(loginResponse.body.reason)
            assert.equal(loginResponse.body.reason, "user is not registered")
        }else {
            assert.isFalse(true)
        }
    })
}) 