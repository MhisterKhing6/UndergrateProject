/** Model for student instance */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

/**Student Model */
class Program extends Base {
   static find = async (details) => {
      /**
       * find: retrieve an instance from a database
       * @param details: object that describe user to find
       * @returns : and instance of a model
       */
      return await this.findOne({
          where: details
      })
  }
  static findPrograms = async (condition="") => {
    /**
     * findAll: finds more than one record in the db
     * @param where: the condition to match if given
     * @return : a list of enteries
     */
    const result = await Program.findAll({where: condition, raw:true, attributes: ["programName", "id"]})
    return result
  } 
}

Program.init({
programName: {
   type: DataTypes.STRING, allowNull: false
},
 programCode: {
    type: DataTypes.STRING, allowNull: false
 },
 programDesc: {
    type: DataTypes.STRING, allowNull: true,
 },
 id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
 }
}, {sequelize: databaseConnection, indexes: [{unique: true, fields: ["programName", "programCode"]}]})

export {Program}