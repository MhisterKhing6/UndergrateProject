


const runTest = async (runCodes, runScript, markSpace)=> {
    let codes = `${runCodes} ${runScript}`
    //move to run directory
    let response = shell.cd(markSpace)
    if(response.code !== 0)
        return null
    //run execution codes
    let output = shell.exec(codes)
    return output

}

export {runTest }