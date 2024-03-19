import { assert } from "chai";
import { Student } from "../models/student.js";
import { databaseConnection } from "../utils/databaseConnector.js";
import { QueryTypes } from "sequelize";

describe("student model", async () => {
    let testStudentinfo = {name: "test1", email: "test2", githubUserName:"mking"}
    before(async () => {
        await Student.sync()
    }) 
    after( async () => {
        await Student.drop()
    })
    it("true if Lectuer is model for database sequelize connection", () => {
        let result = Student === databaseConnection.models.Student
        assert.equal(result, true)      
    })

    it("check if Student instance is saved to a database", async () => {
        let testStudentDB = Student.build(testStudentinfo)
        let results = await testStudentDB.saveToDatabase()
        assert.equal(results, true)
        let query =   `SELECT * FROM Students WHERE name = '${testStudentinfo.name}';`
        const queryResult = await databaseConnection.query(query, {type:QueryTypes.SELECT})
        assert.equal(queryResult[0].email, testStudentinfo.email)
    })

    it("check if student can be retrieve from a database", async () => {
        let uniqueStudent = {"name": "kofi", 'email': "how@gmail.com", githubUserName: "kk@gmail.com"}
        let testStudentDB = Student.build(uniqueStudent)
        let results = await testStudentDB.saveToDatabase()
        let student = await Student.findStudent({name:uniqueStudent.name})
        assert.equal(student.email, uniqueStudent.email)
        assert.equal(results, true) 
    })

})