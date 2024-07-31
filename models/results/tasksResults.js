/**Assignment Creation Model */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

class TaskResult extends Base {}

TaskResult.init({
    mark: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.DOUBLE,
        defaultValue: 0
    },
    completion: { // indicate if the mode of submission for assignment will be github
        type: DataTypes.DOUBLE,
        defaultValue: 0
    },
    
     id: {// uniquly identify the assigemtn
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     },
     filePath: {// uniquly identify the assigemtn
        type: DataTypes.STRING, allowNull:true
     }
     //compilerId: relationship attribute use to identify the type of compiler or the programming language
}, {sequelize: databaseConnection})

export {TaskResult}