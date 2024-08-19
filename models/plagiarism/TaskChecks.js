import { Base } from "../base.js";
import { databaseConnection } from "../../utils/databaseConnector.js";
import { DataTypes } from "sequelize";

/** A model for programming languages supported by the system */
class TaskChecks extends Base {
}

TaskChecks.init({
    name: { //Name of the programming languge
        type: DataTypes.STRING, allowNull: false
    },
    checkId: { // version of the programming language
       type: DataTypes.STRING, allowNull: true
    },
     
     id: { // use to unqiuly identify the compiler
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     }
     
}, {sequelize:databaseConnection})

export {TaskChecks}