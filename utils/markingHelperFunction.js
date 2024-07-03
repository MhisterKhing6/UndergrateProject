import { existsSync } from "fs"
import path from "path"
import { notifyLecturer } from "./emailHandler.js"
import { readFromFile } from "./fileHandler.js"


const checkIfResulstsFileExits = async (markSpace, lecturerEmail,assTitle, questionNumber) => {
    if(!existsSync(path.join(markSpace, "result.txt"))) {
        notifyLecturer(lecturerEmail, assTitle, questionNumber)
        return false
    }
     return true
    
}

//marking engine, converting results to object for manipulation

const sanitizeResults = async (workspace) => {
 const content = await readFromFile(path.join(workspace, "result.txt"))
 //convert content to lines
 let tasks = content.split(";")
 let formated = ""
 let markingOjbect = []
 for(let i = 0; i< tasks.length; i++) {
    tasks[i] = tasks[i].replace(/ {2, }/g,"" ).replace(/\n{1,}/g, "\n").replace(/\n$/g, "")
    let entries = tasks[i].split('\n')
    let entryOjbect = {}
    for(let j = 0; j < entries.length; j++)
        {
            formated = entries[j].trim()
            if(formated.length !== 0 && formated.includes("="))  {
                let [option, value]= formated.split("=")
                option = option.trim().toLocaleLowerCase()
                value = value.trim().toLocaleLowerCase()
                if(option === "status") {
                    if(value.startsWith("p"))
                        value = true
                    else
                        value = false
                }
                    
                entryOjbect[option] = value
            }
        }
    markingOjbect.push(entryOjbect)
 }
//check if the resultrs are right
 if(markingOjbect.length === 0) 
        return null
 else {
    let markStatus = markingOjbect.pop()
    markStatus.mark = parseFloat(markStatus.mark)
    markStatus.completion = parseFloat(markStatus.completion)
    if(markStatus.mark === NaN || markStatus.completion === NaN)
        return null
    return {marks : markStatus, testResult:markingOjbect}
 }
}

export {sanitizeResults, checkIfResulstsFileExits}
