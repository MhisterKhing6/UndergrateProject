import configurations from "config"
import plagiarim, { checks } from 'codequiry'
import { SubmissionChecks, Task } from "../models/relationship/relations.js"
import { Student, TaskChecks, TaskResult } from "../models/relationship/relations.js"
import schedule from "node-schedule"
import path from "path"

//set api token

plagiarim.setAPIKey(configurations.plagToken)
const makeCheck = (checkName, programId) => {
    return new Promise((resolve, reject) => {
        plagiarim.checks(checkName, programId, function(data, err) {
            if (!err) resolve(data);
           else reject(err)
       });
    })
}


const uploadSubmission = (checkId, filePath, task) => {
    return new Promise((resolve, reject) => {
        Codequiry.uploadFile(checkId, filePath, async function(data, err) {
           if(!err) {
            let submissionDetails = {submissionId: data[0].id,checkId, TaskId:task.id, StudentId:task.StudentId}
            await SubmissionChecks.create(submissionDetails)
            resolve("done")
           }else {
            reject(err)
           }
       });
    })
}

const startCheck = (checkId) => {
    return new Promise((resolve, reject) => {
        plagiarim.startCheck(checkId, false, false, function(data, err) {
            if (!err) 
                resolve(data) ;
            else reject(err)
       });
    })
}

const getStatus = (checkId) => {
    return new Promise((resolve, reject) => {
        plagiarim.getCheck(checkId, function(data, err) {
            if (!err) resolve(data);
            else reject(err)
       });
    })
}

const checkOverview = (checkId) => {
    return new Promise((resolve, reject) => {
        plagiarim.getOverview(checkId, function(data, err) {
            if (!err) resolve(data);
            else reject(err)
       });
    })
}

const checkSubmission = (checkId, subId) => {
    return new Promise((resolve, reject) => {
        plagiarim.getResults(checkId, subId, function(data, err) {
            if (!err) resolve(data);
            else reject(err)
       });
    })
}


const startChecks = async (assId, code) => {
    try {
    //get all task
    let tasks = await Task.findAll({where:{AssignmentId: assId}})
    //now i have list of tasks
    //for each task submit code for check
    let subs = []
    for (const task of tasks) {
        //create task
        response = null
            response = await makeCheck(task.id, code)
            if(response.id) {
                //create task check
                let checks  = {AssignmentId:assId, name:task.id, checkId:response.id, TaskId:task.id}
                await Task.create(checks)
                //upload functions here

                //find all submission for student
                let submissions = await TaskResult.findAll({where:{TaskId:task.id}, raw:true, nest:true})
                //for every submission upload task solution
                for (const submission of submissions) 
                        subs.push(uploadSubmission(response.checkId, task.filePath,  task))
                //start check
                await startCheck(response.id)
                } else {
                    console.log("couldn't create a test")
                }
                await Promise.all(subs)
                
    }
}catch(err) {
        console.log(err)
    }
}

const jobSchedule = async (assId, programmingCode, date) => {
    schedule.scheduleJob(date, async () => {
        try {
        await startCheck(assId, programmingCode)
        } catch(error) {
            console.log(error)
        }
    } )
}

const dummyTest = () => {
    plagiarim.startCheck("96054",false, false, function(data, err) {
        if (!err) console.log(data);
        else console.log(err)
    });
}


export {jobSchedule}