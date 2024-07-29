import { existsSync } from "fs"
import path from "path"
import shell from "shelljs"
import {execa} from 'execa'

const checkSolutionFile = (workSpace, studenSolutionPath, presence, repo=null) => {
/**
 * workSpace : the folder path to student directory
 */
//get student paths
let solutionFiles = studenSolutionPath.split("**")//get all student path in list
workSpace = repo ? path.join(workSpace, repo) : workSpace
let fullSolutionPath = solutionFiles.map((derivedPath) => path.join(workSpace,  derivedPath) )
let compiledPath = [] //to prevent compiling header files in c which will generate errors
//check if the path exits
 for (let i = 0; i < fullSolutionPath.length; i++) {
    if(presence){
    if(!existsSync(fullSolutionPath[i])) //check if student submission contains the required files
        return {"allGiven": false, "message": `file ${solutionFiles[i]} not found`}
    }
    if(path.extname(fullSolutionPath[i]) !== '.h')
        compiledPath.push(fullSolutionPath[i])
 }
    return {"allGiven": true, solutionPath: compiledPath}
}


const compileCode = async (testScript,workSpace, runCode)  => {
      try {
            const baseName = path.basename(testScript)
            await execa('cp', [testScript,baseName], {cwd:workSpace})
            return await runCode(baseName, workSpace)
      } catch(err) {
        return {stderr: err.stderr.replaceAll(path.join(path.resolve("."),workSpace),"").replaceAll(path.dirname(testScript),""), stdout:err.stdout}}
      }
      

const compileScripts = {
    "c++":  async (testScript, workSpace, solutionFiles) => {
                if(!shell.which("g++"))
                    {
                        console.log("g++ not installed")
                        return {"error": true, message: "g++ compiler not installed"}
                    }
                let response = await compileCode(testScript, workSpace, async (base, currentWd) =>{ 
                    await execa('g++',[base, ...solutionFiles], {cwd:currentWd})
                    return await execa("./a.out", {cwd:currentWd})     
                })
                return {"error": false, compileResponse: response}
    },
    "c":  async (testScript, workSpace, ...solutionFiles) => {
                if(!shell.which("gcc"))
                    {
                        console.log("gcc not installed")
                        return {"error": true, message: "gcc compiler not installed"}
                    }
                let response = await compileCode(testScript, workSpace, async (base, currentWd) =>{ 
                        await execa('gcc',[base, solutionFiles], {cwd:currentWd})
                        return await execa("./a.out", {cwd:currentWd})     
                })
                return {"error": false, compileResponse: response}
                
    },
    "js": async (testScript, workSpace, solutionFiles) => {
                if(!shell.which("node"))
                    {
                        console.log("node not installed")
                        return {"error": true, message: "node compiler not installed"}
                    }
                let response = await compileCode(testScript, workSpace, async (base, currentWd) => await execa('node',[base], {cwd:currentWd}))
                return {"error": false, compileResponse: response}
    },
    "python": async (testScript, workSpace, solutionFiles) => {
                if(!shell.which("python"))
                    {
                        console.log("python not installed")
                        return {"error": true, message: "python compiler not installed"}
                    }
                let response = await compileCode(testScript, workSpace, async (base, currentWd) => await execa('python',[base], {cwd:currentWd}))
                return {"error": false, compileResponse: response}
    },

    "java": async (testScript, workSpace, solutionFiles) => {
                if(!shell.which("javac"))
                    {
                        console.log("java compiler not installed")
                        return {"error": true, message: "java compiler not installed"}
                    }
                let response = await compileCode(testScript, workSpace, async (base, currentWd) =>{ 
                        return await execa('java',[base, ...solutionFiles], {cwd:currentWd})
                })
                return {"error": false, compileResponse: response}
                
    },
    "php": async (testScript, workSpace, solutionFiles) => {
                if(!shell.which("php"))
                    {
                        console.log("php not installed")
                        return {"error": true, message: "php not installed"}
                    }
                let response = await compileCode(testScript, workSpace, async (base, currentWd) => await execa('php',[base], {cwd:currentWd}))
                return {"error": false, compileResponse: response}
    },
    "mysql": null,
    "ruby": async (testScript, workSpace, solutionFiles) => {
        if(!shell.which("ruby"))
            {
                console.log("ruby not installed")
                return {"error": true, message: "ruby not installed"}
            }
        let response = await compileCode(testScript, workSpace, async (base, currentWd) => await execa('ruby',[base], {cwd:currentWd}))
        return {"error": false, compileResponse: response}
},
}

export {compileScripts, checkSolutionFile}