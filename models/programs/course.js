/**Assignment Creation Model */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

class Course extends Base {}

Course.init({
    courseName: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.STRING,
        defaultValue: false
    },
    courseCode: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.STRING,
        allowNull: false
    },
     id: {// uniquly identify the assigemtn
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     }
}, {sequelize: databaseConnection})

export {Course}