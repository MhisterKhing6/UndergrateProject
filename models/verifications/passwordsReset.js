/** Model for VerifyEmail instance */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

/**VerifyEmail Model */
class ResetPasswordDb extends Base {
   static find = async (details) => {
      /**
       * find: retrieve an instance from a database
       * @param details: object that describe user to find
       * @returns : and instance of a model
       */
      return await ResetPasswordDb.findOne({
          where: details
      })
  }
}

ResetPasswordDb.init({
 id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
 },
 secreteText: {
   type: DataTypes.STRING,
   allowNull: false,
},user :{
    type: DataTypes.STRING,
    allowNull: true
}, email :{
    type: DataTypes.STRING,
    allowNull: true
}, verified :{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
}
 
}, {sequelize: databaseConnection})

export {ResetPasswordDb}