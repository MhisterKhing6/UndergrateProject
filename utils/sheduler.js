import { Assignment } from "../models/assignment/assignment.js"
import jobeSheduler from "node-schedule"

const changeAssignmentState = async (id, close=null) => {
    let assignemnt = await Assignment.findByPk(id)
    if(!close)
        assignemnt.open = true
    else {
        assignemnt.open = false
    }
    await assignemnt.save()
}

const sheduleOpenAssignment = async(assignmentObject) => {
    jobeSheduler.scheduleJob(new Date(assignmentObject.startDate), async () => {
        await changeAssignmentState(assignmentObject.id)}
        )
}

const sheduleCloseAssignment = async(assignmentObject) => {
    jobeSheduler.scheduleJob(new Date(assignmentObject.startDate), async () => {
        await changeAssignmentState(assignmentObject.id, "close")}
        )
}

jobeSheduler.scheduleJob(new Date(Date.now()+ 5000), async ()=> {
    console.log("just trying you now")
})