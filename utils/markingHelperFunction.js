import { existsSync } from "fs"
import path from "path"
import { notifyLecturer } from "./emailHandler.js"
import { readFromFile } from "./fileHandler.js"


const checkIfResulstsFileExits = async (markSpace, repository=null) => {
    let testPath = repository ? path.join(markSpace, repository) : markSpace
    if(!existsSync(path.join(testPath, "result.txt"))) {
        notifyLecturer(lecturerEmail, assTitle, questionNumber)
        return false
    }
     return true
    
}

//marking engine, converting results to object for manipulation

const sanitizeResults = async (workspace, repository=null) => {
let testPath = repository ? path.join(workspace, repository) : workspace
 const content = await readFromFile(path.join(testPath, "result.txt"))
 //convert content to lines
 let tasks = content.split(";") // get the task in as list
 let formated = "" // formated
 let markingOjbect = [] //get task as marks
 for(let i = 0; i< tasks.length; i++) {
    // check for format such as multiple spacing and multiple lines
    tasks[i] = tasks[i].replace(/ {2, }/g,"" ).replace(/\n{1,}/g, "\n").replace(/\n$/g, "")
    let entries = tasks[i].split('\n') // split each test to paramters and values
    let entryOjbect = {} // entries represent parameters=value
    for(let j = 0; j < entries.length; j++)
        {
            formated = entries[j].trim() //ensure no space
            if(formated.length !== 0 && formated.includes("="))  { //split entry to parameters and values to form object
                let [option, value]= formated.split("=")
                option = option.trim().toLocaleLowerCase()
                value = value.trim().toLocaleLowerCase()
                if(option === "status") { //convert status to actual boolean
                    if(value.startsWith("p"))
                        value = true
                    else
                        value = false
                }
                    
                entryOjbect[option] = value //form object
            }
        }
    markingOjbect.push(entryOjbect) //adding to mark object
 }
//check if the results are right
 if(markingOjbect.length === 0) // if no test return null
        return null
 else {
    let markStatus = markingOjbect.pop() //get marks
    markStatus.marks = parseFloat(markStatus.marks) 
    if(markStatus.marks === NaN)
        return null
    return {marks : markStatus.marks, testResult:markingOjbect} //return objects
 }
}

export { checkIfResulstsFileExits, sanitizeResults }

