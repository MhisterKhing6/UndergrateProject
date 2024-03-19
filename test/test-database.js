//Test the database instances
import {assert } from "chai";
import { verifyDatabaseConnection, databaseConnection, databaseConnector } from "../utils/databaseConnector.js";

describe("if database connector is connected to an intance", async () => {
    let wrongdbCredentials = {
        "user" : "wrong user",
        "password": "wrong password",
        "dbName": "wrong Dbname",
        "dialect": "mysql",
        "host": "wrong host"
                    }
    
    let correctdbCredentials = {
        "user": "root",
        "password": "9%8%7521KofiKofi",
        "dbName": "test",
        "dialect": "mysql",
        "host": "localhost"
    }
    it("should return false when database credentials are wrong", async () => {
        let connectionInstance = databaseConnector(wrongdbCredentials.dbName, wrongdbCredentials.user, wrongdbCredentials.password, {
            host: wrongdbCredentials.host, dialect: wrongdbCredentials.dialect
        })
        console.log(connectionInstance)
        let result = await verifyDatabaseConnection(connectionInstance)
        assert.equal(false, false)
    })

    it("should return true with correct credentials", async () => {
        let connectionInstance = databaseConnector(correctdbCredentials.dbName, correctdbCredentials.user, correctdbCredentials.password, {
            host: correctdbCredentials.host, dialect: correctdbCredentials.dialect
        })
        let result = await verifyDatabaseConnection(connectionInstance)
        assert.equal(true, result)
    })

})