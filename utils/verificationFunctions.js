/** helper functions for verifications */
import emailValidator from "email-validator"
import path from "path"
/**
 * verifymandatoryFields -> checks if an objects contains all the  required fields or keys 
 * @param {array} requiredFields : fields or keys required for objects
 * @param {object} itemObject  : object with fields or keys to check
 * @returns {array}: array of missing keys
 */
export function verifyMandatoryFields(requiredFields, itemObject) {
    let missingFields = []
    for(const requiredKey of requiredFields) {
        if(!itemObject[requiredKey]) {
            missingFields.push(requiredKey)
        }
    }
    return missingFields
}

/**
 * verifyEmail : checks if email is valid
 * @param {email} email : email to validate
 * @returns {bool} base on validity
 */
export function validateEmail(email) {
    return emailValidator.validate(email)
}
/**
 * validatePassword : validate password strength
 * @param {string} passowrd: password to validate 
 * @returns {object} object with validation status
 */
export function validatePassword(passowrd) {
    //check if passwordword does not contain digit, capital letter and has less then 6 characters
    if ((passowrd.length < 6) || !passowrd.match(/.*[A-Z]+.*/) || !passowrd.match(/.*[0-9]+.*/))
        return {validated: false, reason: "password must be at least 6 characters, should contain a digit and a capital letter"}
    return ({validated: true, reason: " success "})
}

/**
 * validateFileParentPath : ensure fileParent path doesnt contains relative path for security reason
 * file parent path is directory
 * @param {string} fileParentPath 
 * @returns {bool} true if validated
 */

