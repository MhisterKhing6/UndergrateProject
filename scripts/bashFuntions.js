/** bash operations funcitons */
import shell from "shelljs"
import { createStudentMarkSpace } from "../utils/fileHandler.js"

const cloneGithub  =  async (compilerEnviroment, assignemntId,studentId, link=null) => {
    //clone from github repositorycd
    if(!shell.which('git')) {
        console.log("git is not installed")
    } else {
        //create folder
        let abs = await createStudentMarkSpace(compilerEnviroment,assignemntId, studentId)
        if(!abs) 
            return null

        let cdResponse = shell.cd(abs)
        if(cdResponse.code !== 0)
            return null 
        let cloneRes = shell.exec(`git clone ${link}`)
        if(cloneRes.code !== 0) 
            return {code:cloneRes.code, abs:""} 
        return {code:0, abs}       
        
    }
}

shell.cd("./markingSpace/python")
shell.exec("python3 new.py")