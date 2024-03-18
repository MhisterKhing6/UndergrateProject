import { assert } from "chai";
import { Lecturer } from "../models/lecturer.js";
import { databaseConnection } from "../utils/databaseConnector.js";
import config from "config";
import { QueryTypes } from "sequelize";

describe("Lectuer model", async () => {
    let testLecturerinfo = {name: "test1", email: "test2", githubUserName:"mking"}
    let direcsqlConnection = null
    before(async () => {
        let databaseConfig = config.get("database")
        await Lecturer.sync()
    }) 
    after( async () => {
        await Lecturer.drop()
    })
    it("true if Lectuer is model for database sequelize connection", () => {
        let result = Lecturer === databaseConnection.models.Lecturer
        assert.equal(result, true)
        
    })

    it("check if lecturer instance is saved to a database", async () => {
        let testLectuerDB = Lecturer.build(testLecturerinfo)
        let results = await testLectuerDB.saveToDatabase()
        assert.equal(results, true)
        let query =   `SELECT * FROM Lecturers WHERE name = '${testLecturerinfo.name}';`
        const queryResult = await databaseConnection.query(query, {type:QueryTypes.SELECT})
        assert.equal(queryResult[0].email, testLecturerinfo.email)
    })

})