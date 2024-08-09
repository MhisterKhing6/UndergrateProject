/**Assignment Creation Model */
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";
import { Base } from "../base.js";

class TestResult extends Base {}

TestResult.init({
    testNumber: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    feedback: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.STRING,
        
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    
     id: {// uniquly identify the assigemtn
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     }
     //compilerId: relationship attribute use to identify the type of compiler or the programming language
}, {sequelize: databaseConnection})

export { TestResult };
