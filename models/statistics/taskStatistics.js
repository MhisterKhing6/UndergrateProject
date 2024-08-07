/**Assignment Creation Model */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

class TaskStatistics extends Base {}

Course.init({
    bad: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    good: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.INTEGER,
        default: 0
    },
    veryGood: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.INTEGER,
        default: 0
    },
    veryGood: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.INTEGER,
        default: 0
    },
    numberAttempted: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.INTEGER,
        default: 0
    },
    totalNumber: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.INTEGER,
        default: 0
    },
     id: {// uniquly identify the assigemtn
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     }
}, {sequelize: databaseConnection})

export {TaskStatistics}