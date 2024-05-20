/** Model for VerifyEmail instance */
import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

/**VerifyEmail Model */
class VerifyEmail extends Base {
   static find = async (details) => {
      /**
       * find: retrieve an instance from a database
       * @param details: object that describe user to find
       * @returns : and instance of a model
       */
      return await VerifyEmail.findOne({
          where: details
      })
  }
}

VerifyEmail.init({
 id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
 },
 secreteText: {
   type: DataTypes.STRING,
   allowNull: false,
},
 
}, {sequelize: databaseConnection})

export {VerifyEmail}