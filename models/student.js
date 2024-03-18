/** Model for student instance */
import { Base } from "./base";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../utils/databaseConnector";

/**Student Model */
class Student extends Base {
}

Student.init({
name: {
    type: DataTypes.STRING, allowNull: false
},
 email: {
    type: DataTypes.STRING, allowNull: false,
 },
 index: {
    type: DataTypes.STRING, allowNull: true,
 },
 studentId: {
    type: DataTypes.STRING, allowNull: true,
 },
 id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
 },
 githubUserName : {
    type: DataTypes.STRING,
    allowNull: true,
 }
}, {databaseConnection})

export {Student}