import { Base } from "../base.js";
import { databaseConnection } from "../../utils/databaseConnector.js";
import { DataTypes } from "sequelize";

/** A model for programming languages supported by the system */
class SubmissionChecks extends Base {
}

SubmissionChecks.init({
   
    checkId: { // version of the programming language
       type: DataTypes.STRING, allowNull: false
    },
    submissionId: {
        type: DataTypes.STRING, allowNull:false
    },
    score: {
        type: DataTypes.INTEGER, allowNull:true
    },
     
    id: { // use to unqiuly identify the compiler
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     }
     
}, {sequelize:databaseConnection})

export {SubmissionChecks}