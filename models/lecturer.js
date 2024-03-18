/** Model for Lecturer intances */
import { Base } from "./base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../utils/databaseConnector.js";

class Lecturer extends Base {}

Lecturer.init({
name: {
    type: DataTypes.STRING, allowNull: false
},
 email: {
    type: DataTypes.STRING, allowNull: false,
 },
 id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
 },
 githubUserName : {
    type: DataTypes.STRING,
    allowNull: true,
 }
}, {sequelize: databaseConnection})

export { Lecturer }