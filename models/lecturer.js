/** Model for Lecturer intances */
import { Base } from "./base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../utils/databaseConnector.js";

class Lecturer extends Base {

   static findLecturer = async (details) => {
      /**
       * findLectuer: find a model instance from a database
       * @param details: object that describe user to find
       * @returns : and instance of a lecturer model
       */
      return await Lecturer.findOne({
          where: details
      })
  }
}

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