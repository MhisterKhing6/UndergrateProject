import { Base } from "../base.js";
import { databaseConnection } from "../../utils/databaseConnector.js";
import { DataTypes } from "sequelize";

/** A model for programming languages supported by the system */
class Message extends Base {
    
}

Message.init({
    userId: { //Name of the programming languge
        type: DataTypes.STRING, allowNull: false
    },
    userName: { // version of the programming language
       type: DataTypes.STRING, allowNull: true
    },
     message: {// requirement for student to take notice when doing assignment for programming language
        type: DataTypes.TEXT, allowNull: true,
     },
     userProfile: { // link to the official website of the programming language, this will help student in installing the compiler
        type: DataTypes.STRING, allowNull: true,
     },
     id: { // use to unqiuly identify the compiler
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     },
     type: {
       type:DataTypes.STRING, defaultValue:"Text",
     },
     parentId: {
        type:DataTypes.STRING, defaultValue:"Text"
      },
}, {sequelize:databaseConnection})

export {Message}