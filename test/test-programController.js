import { app } from "../app.js";
import request from "supertest";
import {assert} from 'chai'

describe("testing programs outpus", () => {
    it("should return program offered by the school", async ()=> {
        let response = await request(app).get("/programs")
        console.log(response)
        assert.equal(response.status, 200)
    })
})