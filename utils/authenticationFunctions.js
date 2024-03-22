/**contains authentication common functions */
import jsonwebtoken from "jsonwebtoken";
import config from "config"

export const getToken = (detials) => {
    /**
     * getToken: generate a json web token
     * @param {object} detials: payload to generate token
     * @param {string} secreteKey: key for token generation
     * @returns {string}: json web token
     */
    let secreteKey = config.get("jwt.secrete")
    let token = jsonwebtoken.sign(detials, secreteKey)
    return token
}

export const verifyToken = (token) => {
    /**
     * verifyToken: verify json web token
     * @param {string} token: token to verify
     * @returns {object}: {bool, object}
     */
    let secreteKey = config.get("jwt.secrete")
    let result = ""
    try {
        let payload = jsonwebtoken.verify(token, secreteKey)
        result = {"verified": true, payload}
    } catch (error) {
        result = {"verified": false}
    }
    return result
}

export const getAuthorizationtoken = (request) => {
    /**
     * getAuthorizationtoken: get authorization token from request header
     * @param {object} request: http request header
     * @returns {string} : token 
     */
    let token = request.header("Authorization").trim()
    if(!token) {
        return {"auth": false}
    }
    if (token.startsWith("Bearer ")) {
        token = token.slice("7")
        token = token.trim()
    }
    return {"auth": true, token}
}
