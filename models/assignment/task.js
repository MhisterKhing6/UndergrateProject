/**Task For Assignment Model */

import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

class Task extends Base {}

Task.init({
    number: {// titile for the task
        type: DataTypes.INTEGER, allowNull: false
    },
    requirement: {
        type: DataTypes.TEXT, allowNull: false
    },
    examples: {
        type: DataTypes.TEXT, allowNull: true
    },
    solutionScriptPath : {
        type: DataTypes.STRING, allowNull: false
    },
     id: {// uniquly identify the task
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     },


     //assignmentId: relationship atrribute that identify the assignment the task belongs to
     //exampleScriptsId: example id that uniquly identify example scripst for the assignment
     //taskTestScriptId: identifies the test script for the assignment
}, {sequelize: databaseConnection})


export {Task}