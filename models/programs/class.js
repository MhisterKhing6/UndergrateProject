/** Model for student instance */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

/**Student Model */
class Class extends Base {
   static find = async (details) => {
      /**
       * find: retrieve an instance from a database
       * @param details: object that describe user to find
       * @returns : and instance of a model
       */
      return await Class.findOne({
          where: details
      })
  }

  static findClasses = async (condition="") => {
   /**
    * findAll: finds more than one record in the db
    * @param where: the condition to match if given
    * @return : a list of enteries
    */
   const result = await Class.findAll({where: condition, raw:true, attributes:["className", "id"], order:[["ClassName", "ASC"]]})
   return result
  }
  
}

Class.init({
className: {
   type: DataTypes.STRING, allowNull: false
},
 classCode: {
    type: DataTypes.STRING, allowNull: false,
 },
 classDesc: {
    type: DataTypes.STRING, allowNull: true,
 },
 id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
 }
}, {sequelize: databaseConnection})

export {Class}