/** bash operations funcitons */
import { execa } from "execa"
import fs from "fs"
import path from "path"
import { deletFolder } from "./fileHandler.js"

const cloneRepository  =  async (url, workSpace) => {
   try {
        //check if path exist
        let cloneRes = await execa('git', ["clone",url], {cwd:workSpace})
        if(cloneRes.exitCode !== 0)
            return {failed:true, message: cloneRes.stderr}
        else
            return {failed:false}
}catch(err) {
    return null
}
    
}

const repositoryLink = async (workspace,githubUser, repository) => {
    if(fs.existsSync(path.join(workspace, repository)) )
        await deletFolder(path.join(workspace,repository))
    return `https://github.com/${githubUser}/${repository}.git`
}

export { cloneRepository, repositoryLink }
