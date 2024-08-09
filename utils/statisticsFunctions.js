import { Assignment, AssignmentClasses, AssignmentResult, Student, Task, TaskResult, TestStatistics } from "../models/relationship/relations.js";
const assignmentStats = async (assignmentId) => {
    let good = 0;
    let bad = 0;
    let veryGood = 0;
    let excellent = 0;
    let min = 0;
    let max = 0;
    let totalScore = 0;
    //get all assignment
    let assignmentScores = await AssignmentResult.findAll({where:{AssignmentId:assignmentId},raw:true, nest:true})
    if(assignmentScores.length !== 0)
        min = max = assignmentScores[0].mark
    for(const score of assignmentScores) {
        if(score.mark < 40)
            bad += 1
        else if (score.mark < 60)
            good += 1
        else if (score.mark < 80)
            veryGood  += 1
        else
            excellent += 1

    totalScore += score.mark
    //compute for min and max
    if(min > score.mark)
        min = score.mark
    
    if(max < score.mark)
        max = score.mark
    }
    let avg = 0
    let attempted = assignmentScores.length
    
    let assignment = await Assignment.findByPk(assignmentId)
    let assClass = await AssignmentClasses.findOne({where:{AssignmentId:assignment.id}})
    //find total student in the class
    let totalStudent = await Student.findAll({where:{ClassId:assClass.ClassId}, raw:true, attributes:["id"]})
    if(totalScore)
        avg = totalScore / attempted
    //form assignment object
    let bands = [bad, good, veryGood, excellent]
    return {totalScore, bands, totalStudent:totalStudent.length, attempted, avg, min, max}
}

const taskStats = async (assignmentId) => {
    let output = []
    //get task in assignment
    let tasks = await Task.findAll({where:{AssignmentId:assignmentId}, raw:true, nest:true})
    for(const task of tasks) {
        let bad = 0;
        let good = 0;
        let veryGood = 0;
        let excellent = 0;
        
        //get statistics
        let stats = await TaskResult.findAll(
            {where:{TaskId:task.id, AssignmentId:assignmentId}, raw:true, nest:true })
        //band algorithm
        for(const stat of  stats) {
            console.log(stat)
            if(stat.mark < 40)
                bad += 1
            else if (stat.mark < 60)
                good += 1
            else if (stat.mark < 80)
                veryGood  += 1
            else
                excellent += 1
        }
        //all bands computed
        //get test results
        let testResult = await TestStatistics.findAll({where:{TaskId:task.id}, nest:true, raw:true})
        //form output object
        let bands = [bad, good, veryGood, excellent]
        output.push({taskNumber:task.number, bands, testResult, attempted:stats.length})
    }
    return output
}

export { assignmentStats, taskStats };
