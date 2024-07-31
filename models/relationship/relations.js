/*Foreign relationships between object */
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";
import { Assignment } from "../assignment/assignment.js";
import { AssignmentRequirement } from "../assignment/assignmentRequirements.js";
import { Task } from "../assignment/task.js";
import { File } from "../forum/file.js";
import { Message } from "../forum/message.js";
import { Notification } from "../forum/notificatoin.js";
import { Compiler } from "../programming/compiler.js";
import { Class } from "../programs/class.js";
import { Course } from "../programs/course.js";
import { Program } from "../programs/program.js";
import { AssignmentResult } from "../results/assignmentResults.js";
import { TaskResult } from "../results/tasksResults.js";
import { TestResult } from "../results/testResults.js";
import { TestStatistics } from "../statistics/testStatistics.js";
import { Lecturer } from "../users/lecturer.js";
import { Student } from "../users/student.js";
import { VerifyEmail } from "../verifications/emailVerication.js";
import { ResetPasswordDb } from "../verifications/passwordsReset.js";
import { TaskChecks } from "../plagiarism/TaskChecks.js";
import { SubmissionChecks } from "../plagiarism/Submission.js";
import { AssignmentScorePlagiarism } from "../plagiarism/AssignmentScore.js";

const AssignmentClasses = databaseConnection.define('AssignmentClasses', {
    ClassId: {
      type: DataTypes.UUID,
      references: {
        model: Class, // 'Movies' would also work
        key: 'id',
      },
    },
    AssignmentId: {
      type: DataTypes.UUID,
      references: {
        model: Assignment, // 'Actors' would also work
        key: 'id',
      },
    },
  });

  const ClassCourses = databaseConnection.define('ClassCourses', {
    ClassId: {
      type: DataTypes.UUID,
      references: {
        model: Class, // 'Movies' would also work
        key: 'id',
      },
    },
    CourseId: {
      type: DataTypes.UUID,
      references: {
        model: Course, // 'Actors' would also work
        key: 'id',
      },
    },
  });

//relationship between reset password and users
Student.hasOne(ResetPasswordDb, {constraints: false, onDelete:"CASCADE"})
ResetPasswordDb.belongsTo(Student)
Lecturer.hasOne(ResetPasswordDb,  {constraints: false, onDelete:"CASCADE"})
ResetPasswordDb.belongsTo(Student)

//relationship between Student and email Verifcation
Student.hasOne(VerifyEmail,  {constraints: false, onDelete:"CASCADE"})
VerifyEmail.belongsTo(Student)

//relationship betwn Lecturer and email Verification
Lecturer.hasOne(VerifyEmail, {constraints: false, onDelete:"CASCADE"})
VerifyEmail.belongsTo(Lecturer, {constraints: false})

//relationship between program and class 
Program.hasMany(Class,  {constraints: false, onDelete:"CASCADE"})
Class.belongsTo(Program)

//realtionship between assignments and requirements
Assignment.hasMany(AssignmentRequirement, {constraints:false, onDelete:"CASCADE"})
AssignmentRequirement.belongsTo(Assignment)
//relationship between student and program
Program.hasMany(Student,  {constraints: false, onDelete:"CASCADE"})
Student.belongsTo(Program)
//relationship between class and Student
Class.hasMany(Student,  {constraints: false,  onDelete:"CASCADE"})
Student.belongsTo(Class)

//relationship between lecturer and Assignment
Lecturer.hasMany(Assignment,  {constraints: false, onDelete:"CASCADE"})
Assignment.belongsTo(Lecturer)

//relationship between class and assignemnt

Assignment.belongsTo(Class, {constraints: false})
Class.hasMany(Assignment, {constraints: false, onDelete:"CASCADE"})

//relationship between course and class
Program.hasMany(Course, {constraints: false})
Course.belongsTo(Program, {constraints: false})

//relationship between courese and assignment
Course.hasMany(Assignment, {constraints: false})
Assignment.belongsTo(Course, {constraints: false})
//realtionship course and class
Class.belongsToMany(Course, {through: ClassCourses, constraints: false})
Course.belongsToMany(Class, {through:ClassCourses, constraints: false})


//relationship between task and assignment
Assignment.hasMany(Task,  {constraints: false, onDelete: "CASCADE"})
Task.belongsTo(Assignment, {constraints: false})

//relations between Assignment and compiler
Compiler.hasMany(Assignment,  {constraints: false, onDelete:"CASCADE"})
Assignment.belongsTo(Compiler)

//relationship between student TaskResult
Student.hasMany(TaskResult, {constraints:false})
TaskResult.belongsTo(Student, {constraints:false})
//RelationShip between taskResult and Task
Task.hasMany(TaskResult, {constraints:false, onDelete: "CASCADE"})
TaskResult.belongsTo(Task, {constraints:false})
//RelationShip between assignment and Task result
Assignment.hasMany(TaskResult, {constraints:false, onDelete:"CASCADE"})
TaskResult.belongsTo(Assignment, {constraints:false})
/////
//relationship between student and assignment results
Student.hasMany(AssignmentResult,{constraints:false} )
AssignmentResult.belongsTo(Student, {constraints:false})

//relationship Assignment student and assignment results
Assignment.hasMany(AssignmentResult,{constraints:false, onDelete: "CASCADE"} )
AssignmentResult.belongsTo(Assignment, {constraints:false})


//relations between test result and task
Task.hasMany(TestStatistics, {constraints:false, onDelete: "CASCADE"})
TestStatistics.belongsTo(Task)

//relationship between task and test results
Task.hasMany(TestResult, {constraints:false})
TestResult.belongsTo(Task, {constraints:false})
//relationship between Student and Task Results
Student.hasMany(TestResult, {constraints:false})
TestResult.belongsTo(Student, {constraints:false})

//relationships between message and assignment
Assignment.hasMany(Message, {constraints:false})
Message.belongsTo(Assignment, {constraints:false})

//relations between file and message
Message.hasMany(File, {constraints:false})
File.belongsTo(Message, {constraints:false})

//relationship between notification and message

//relation between notification and assignment id


//relationship between message and message
Message.belongsTo(Message, {constraints:false, as:"parentMessage"})

//plagiarism relationships
//relationship between task and checks
Task.hasOne(TaskChecks,{constraints:false})
TaskChecks.belongsTo(Task)

Assignment.hasMany(TaskChecks)
TaskChecks.belongsTo(Assignment)

//relations check submission and task
Student.hasMany(SubmissionChecks, {constraints:false})
SubmissionChecks.belongsTo(Student, {constraints:false})

//relationships between submissionChecks
Task.hasMany(SubmissionChecks, {constraints:false})
SubmissionChecks.belongsTo(Task)

Assignment.hasMany(SubmissionChecks, {constraints:false})
SubmissionChecks.belongsTo(Assignment, {constraints:false})

//relationship between Assignment score plagiarism
Assignment.hasMany(AssignmentScorePlagiarism, {constraints:false, onDelete: "CASCADE"})
AssignmentScorePlagiarism.belongsTo(Assignment, {constraints:false})

//relationship between plagiarism and assignment score
Student.hasMany(AssignmentScorePlagiarism, {constraints:false})
AssignmentScorePlagiarism.belongsTo(Student, {constraints:false})



databaseConnection.sync({alter: true})
export {AssignmentScorePlagiarism, TaskChecks, SubmissionChecks, Assignment, AssignmentClasses, AssignmentRequirement, AssignmentResult, Class, ClassCourses, Compiler, Course, File, Lecturer, Message, Notification, Program, ResetPasswordDb, Student, Task, TaskResult, TestResult, TestStatistics, VerifyEmail };

