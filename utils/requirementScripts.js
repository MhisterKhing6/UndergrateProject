import {execa} from "execa"
import shell from "shelljs"

const checkStandard =async (command,args , workSpace) => {
    if(!shell.which(command))
        return null
 try {
    return await execa(command, args, {cwd:workSpace})
 } catch (error) {
    return error 
 }
}
const codingStandard = {
    "c++": async (args, workSpace) =>  {
        let response = await checkStandard("cpplint", ['--filter=-legal/copyright' ,...args], workSpace)
        if(response.exitCode !== 0)
            return {pass:false, output:(response.stderr + response.stdout).replaceAll(workSpace,"")}
        return {pass:true, stdout:response.stdout}
    },
    "c": async (args, workSpace) =>  {
        let response = await checkStandard("cpplint", ['--filter=-legal/copyright' ,...args], workSpace)
        if(response.exitCode !== 0)
            return {pass:false, output:(response.stderr + response.stdout).replaceAll(workSpace,"")}
        return {pass:true, stdout:response.stdout}
    },
    "js": async (args, workSpace) => {
        let response = await checkStandard("standard", args, workSpace)
        if(response.exitCode !== 0)
            return {pass:false, output:(response.stderr + response.stdout).replaceAll(workSpace,"")}
        return {pass:true, stdout:response.stdout}
    },
    "java":  async (args, workSpace) => {
        let response = await checkStandard("checkstyle", ['--c','../../../codingStandards/javaStandards.xml',...args], workSpace)
        if(response.exitCode !== 0)
            return {pass:false, output:(response.stderr + response.stdout).replaceAll(workSpace,"")}
        return {pass:true, stdout:response.stdout}},

    "python": async (args, workSpace) => {
        let response = await checkStandard("pylint", args, workSpace)
        if(response.exitCode !== 0)
            return {pass:false, output:(response.stderr + response.stdout).replaceAll(workSpace,"")}
        return {pass:true}
    },

    "php": async (args, workSpace) => {
        let response = await checkStandard("phpcs", args, workSpace)
        if(response.exitCode !== 0)
            return {pass:false, output:(response.stderr + response.stdout).replaceAll(workSpace,"")}
        return {pass:true}
    },

    "ruby": async (args, workSpace) => {
        let response = await checkStandard("rubocop", args, workSpace)
        if(response.exitCode !== 0)
            return {pass:false, output:(response.stderr + response.stdout).replaceAll(workSpace,"")}
        return {pass:true}
    },
    "mysql": async () => {
        let response = await checkStandard("sqlfluff", ['--disable','--dialect', 'mysql','--',...args], workSpace)
        if(response.exitCode !== 0)
            return {pass:false, output:(response.stderr + response.stdout).replaceAll(workSpace,"")}
        return {pass:true}
    },
    
}

export {codingStandard}