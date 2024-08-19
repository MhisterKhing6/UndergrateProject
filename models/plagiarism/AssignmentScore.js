import { Base } from "../base.js";
import { databaseConnection } from "../../utils/databaseConnector.js";
import { DataTypes } from "sequelize";

/** A model for programming languages supported by the system */
class AssignmentScorePlagiarism extends Base {
}

AssignmentScorePlagiarism.init({
    score: {
        type: DataTypes.INTEGER, allowNull:true
    },
     
    id: { // use to unqiuly identify the compiler
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     }
     
}, {sequelize:databaseConnection})

export {AssignmentScorePlagiarism}