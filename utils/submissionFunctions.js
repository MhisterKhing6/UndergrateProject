/** bash operations funcitons */
import shell from "shelljs"

const cloneRepository  =  async (url, markSpace) => {
    //clone from github repositorycd
    if(!shell.which('git')) {
        console.log("git is not installed")
    } else {
        //create folder
        let cdResponse = shell.cd(markSpace)
        if(cdResponse.code !== 0)
            return null 
        let cloneRes = shell.exec(`git clone ${link}`)
        return cloneRes 
    }
}

const repositoryLink = (githubUser, repository) => {
    return `https://github.com/${githubUser}/${repository}.git`
}

export {cloneRepository, repositoryLink}