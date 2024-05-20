/**Task For Assignment Model */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

class ExampleScript extends Base {}

ExampleScript.init({

     id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     },
     path: {//path to example scripts
        type: DataTypes.STRING,
        allowNull: false
     }
}, {sequelize: databaseConnection})


export {ExampleScript}