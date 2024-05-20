/**Task For Assignment Model */

import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

class TaskTestScript extends Base {}

TaskTestScript.init({
     id: {// identifies the scripts
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     },
     path: {// path of test scripts
        type: DataTypes.STRING,
        allowNull: false
     }
     //taskId: a foreign key to the task attribute
     //compilerId: a foreign key to the compiler attribute
}, {sequelize: databaseConnection})


export {TaskTestScript}