import { Base } from "../base.js";
import { databaseConnection } from "../../utils/databaseConnector.js";
import { DataTypes } from "sequelize";

/** A model for programming languages supported by the system */
class Compiler extends Base {
    install = async () => {
        return "not implemented"
    }

    checkInstallationStatus = async () => {
        return "Not implemented"
    }
}

Compiler.init({
    name: { //Name of the programming languge
        type: DataTypes.STRING, allowNull: false
    },
    version: { // version of the programming language
       type: DataTypes.STRING, allowNull: true
    },
     requirement: {// requirement for student to take notice when doing assignment for programming language
        type: DataTypes.TEXT, allowNull: false,
     },
     setupLink: { // link to the official website of the programming language, this will help student in installing the compiler
        type: DataTypes.STRING, allowNull: false,
     },
     id: { // use to unqiuly identify the compiler
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     },
     enviroment: {
       type:DataTypes.STRING, allowNull:true
     },
     extension : {
      type: DataTypes.STRING, allowNull: false
    },
    explanationExamples: {
        type: DataTypes.TEXT, allowNull: false,
    },
    testExamples : {
        type: DataTypes.TEXT, allowNull: false,
    }

}, {sequelize:databaseConnection})

export {Compiler}