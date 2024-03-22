import { getToken, verifyToken, getAuthorizationtoken } from "../utils/authenticationFunctions.js";
import { assert } from "chai";

describe("authentication funcitons", () => {
    it('getToken',() => {
        let detials = {"user": "kingsley"}
        let token = getToken(detials)
        assert.isString(token)
        assert.isDefined(token)
        
    })

    it('verifyToken',() => {
        let detials = {"user": "kingsley"}
        let token = getToken(detials)
        let payload = verifyToken(token)
        assert.equal(payload.verified, true)
        assert.equal(payload.payload.user, 'kingsley')
        assert.isObject(payload)
        assert.isDefined(payload)
        
    })

    it("getAuthorizationtoken", () => {
        let token = "9*##@@#@@@#@3232"
        let mockedRequest = {header: (objc) => `Bearer ${token}`}
        let resultToken = getAuthorizationtoken(mockedRequest)
        assert.equal(token, resultToken.token)
        assert.isObject(resultToken)
        assert.isTrue(resultToken.auth)
    })
})