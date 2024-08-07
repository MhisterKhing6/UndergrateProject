/**Assignment Creation Model */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

class TestStatistics extends Base {}

Course.init({
    testNumber: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    passNumber: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.INTEGER,
        default: 0
    },
    failedNumber: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.INTEGER,
        default: 0
    },
    feedBack: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.STRING,
        default: 0
    },
     id: {// uniquly identify the assigemtn
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     }
}, {sequelize: databaseConnection})

export {TestStatistics}