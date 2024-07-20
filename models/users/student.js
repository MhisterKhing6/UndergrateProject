/** Model for student instance */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

/**Student Model */
class Student extends Base {
   static find = async (details) => {
      /**
       * find: retrieve an instance from a database
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
password: {
   type: DataTypes.STRING, allowNull: false
},
verified: {
   type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false
},
 email: {
    type: DataTypes.STRING, allowNull: false
 },
 index: {
    type: DataTypes.STRING, allowNull: true
 },
 studentId: {
    type: DataTypes.STRING, allowNull: true
 },
 id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
 },
 githubUserName : {
    type: DataTypes.STRING,
    allowNull: true,
 },profileUrl : {
   type: DataTypes.STRING,
   allowNull: true,
},
profileDisk : {
   type: DataTypes.STRING,
   allowNull: true,
}
}, {sequelize: databaseConnection, indexes: [{unique: true, fields: ["email", "studentId", "index", "githubUserName"]}]})

export {Student}