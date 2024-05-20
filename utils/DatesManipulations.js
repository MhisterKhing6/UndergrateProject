
const TwentyFourHoursPass = (dateA) => {
    //get current date
    let dateNow = Date.now()
    //get date diff
    let hours = Math.abs(dateNow- dateA) / 36e5;

    if(hours > 24)
        return true
    return false
}

const generateSecretNumber = ()=> {
    return Math.floor(1000 + Math.random()*9000 ).toString()
}

export {TwentyFourHoursPass, generateSecretNumber}