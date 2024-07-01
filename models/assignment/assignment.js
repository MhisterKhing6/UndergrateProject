/**Assignment Creation Model */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

class Assignment extends Base {}

Assignment.init({
    gitMode: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    repository: {// path in the 
        type: DataTypes.STRING, allowNull: true
    },
    title: { // title for the assignemnt
        type: DataTypes.STRING, allowNull: false
    },
    endDate: {// the date the assignment will not be open
        type: DataTypes.DATE,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    stop: { // indicate if assignment is open for submission
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
     objectives: {// the objective for the assignment
         type: DataTypes.STRING, allowNull: true
     },
     id: {// uniquly identify the assigemtn
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     }
     //compilerId: relationship attribute use to identify the type of compiler or the programming language
}, {sequelize: databaseConnection})

export {Assignment}