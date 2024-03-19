/** Model for student instance */
import { Base } from "./base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../utils/databaseConnector.js";

/**Student Model */
class Student extends Base {
   static findStudent = async (details) => {
      /**
       * findStudent: find a model instance from a database
       * @param details: object that describe user to find
       * @returns : and instance of a model
       */
      return await Student.findOne({
          where: details
      })
  }
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
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
 },
 githubUserName : {
    type: DataTypes.STRING,
    allowNull: true,
 }
}, {sequelize: databaseConnection})

export {Student}