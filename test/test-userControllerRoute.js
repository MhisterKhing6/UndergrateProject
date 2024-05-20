import { app } from "../app.js";
import request from "supertest";
import { assert } from "chai";
import { Student } from "../models/relationship/relations.js";
import { databaseConnection } from "../utils/databaseConnector.js";
import { Lecturer } from "../models/relationship/relations.js";
import { Program, Class } from "../models/relationship/relations.js";
import { v4 } from "uuid";



describe("user controller route", async () => {
    let student = {
        "name": "test student", email: "testrr@gmmail.com", 'password': "test1222Kofi", username: "mhisther11",
        "studentId": "9875217", "index": "987322"
    }
    let lecturer = {
        name: "test lectuere", email: "lect@gmail.com", password: "test12333Kofi", "lecturerId": "4587774"
    }
    let program = null;
    let clasName = null;
    before(async () => {
        let programName = v4()
        let programCode = v4()
        let program = await Program.create({programName, programCode,"programDesc": "Teaches the Scssience of computing"})
        let clasName = await Class.create({"className": "TEST3", classCode: "CSM#2"})
        clasName["ProgramId"] = program.id 
        await clasName.save()
        student['ClassId'] = clasName.id
        student['ProgramId'] = program.id
    })

    beforeEach(async () => {
       await Student.destroy({truncate: {cascade: true} })
       await Lecturer.destroy({truncate: {cascade: true} })
    })

    after(async () => {
       Student.destroy({truncate: {cascade: true} })
       Lecturer.destroy({truncate: {cascade: true} })
    })

    it("should return status 200 and created to be true", async () => {
        /**registering student */
        let response = await request(app).post("/api/auth/register/student").type('json').send(student)
        console.log(response.body)
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
        assert.equal("provide valid email, password must be at least 4 characters, should contain a digit and a capital letter", response.body.reason)
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
        assert.equal("provide valid email, password must be at least 4 characters, should contain a digit and a capital letter", response.body.reason)
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
            let loginResponse = await request(app).post("/api/auth/login/student").type('json').send(student)
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
            let loginResponse = await request(app).post("/api/auth/login/student").type('json').send({studentId: student.studentId, password:student.email})
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
            let loginResponse = await request(app).post("/api/auth/login/student").type('json').send({studentId: student.name, password:student.password})
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
            let loginResponse = await request(app).post("/api/auth/login/lecturer").type('json').send(lecturer)
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
            let loginResponse = await request(app).post("/api/auth/login/lecturer").type('json').send({lecturerId: lecturer.lecturerId, password:lecturer.email})
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
            let loginResponse = await request(app).post("/api/auth/login/lecturer").type('json').send({lecturerId: lecturer.name, password:lecturer.password})
            assert.equal(401, loginResponse.status)
            assert.isDefined(loginResponse.body.reason)
            assert.equal(loginResponse.body.reason, "user is not registered")
        }else {
            assert.isFalse(true)
        }
    })
}) 