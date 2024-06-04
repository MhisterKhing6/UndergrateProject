/*Foreign relationships between object */
import { Lecturer } from "../users/lecturer.js";
import { Assignment } from "../assignment/assignment.js";
import {Compiler} from "../programming/compiler.js"
import { Task } from "../assignment/task.js";
import { databaseConnection } from "../../utils/databaseConnector.js";
import {Student} from "../users/student.js"
import { Class } from "../programs/class.js";
import { Program } from "../programs/program.js";
import { VerifyEmail } from "../verifications/emailVerication.js";
import { ResetPasswordDb } from "../verifications/passwordsReset.js";
import { DataTypes } from "sequelize";
import { Course } from "../programs/course.js";

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

Assignment.belongsToMany(Class, {through: AssignmentClasses , constraints: false, onDelete:"CASCADE"})
Class.belongsToMany(Assignment, {through: AssignmentClasses, constraints: false, onDelete:"CASCADE"})

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
Assignment.hasMany(Task,  {constraints: false})
Task.belongsTo(Assignment, {constraints: false})

//relations between task and compiler
Compiler.hasMany(Task,  {constraints: false})
Task.belongsTo(Compiler)

databaseConnection.sync({alter: true})
export {ClassCourses, Course, AssignmentClasses,ResetPasswordDb,VerifyEmail,Task, Lecturer, Assignment, Compiler, Student, Program, Class }