import { Assignment } from "../models/assignment/assignment.js"
import job from "node-schedule"


job.scheduleJob(new Date(Date.now()+ 5000), async ()=> {
    console.log("just trying you now")
})