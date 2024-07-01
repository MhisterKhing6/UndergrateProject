/**Assignment Creation Model */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

class AssignmentRequirement extends Base {}

AssignmentRequirement.init({
    plagiarism: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    documentation: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    codingStandard: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    readme: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
     id: {// uniquly identify the assigemtn
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     }
     //compilerId: relationship attribute use to identify the type of compiler or the programming language
}, {sequelize: databaseConnection})

export {AssignmentRequirement}