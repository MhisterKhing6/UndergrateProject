import { Base } from "../base.js";
import { databaseConnection } from "../../utils/databaseConnector.js";
import { DataTypes } from "sequelize";

/** A model for programming languages supported by the system */
class File extends Base {
}

File.init({
    url: { //Name of the programming languge
        type: DataTypes.STRING, allowNull: false
    },
    type: { // version of the programming language
       type: DataTypes.STRING, allowNull: true
    },
     
     id: { // use to unqiuly identify the compiler
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     },
     diskPath: {
       type:DataTypes.STRING, allowNull:true
     },
     fileName: {
      type:DataTypes.STRING, allowNull:true
    },
     size: {
      type:DataTypes.SMALLINT, allowNull:true,
     }
}, {sequelize:databaseConnection})

export {File}