import { Base } from "../base.js";
import { databaseConnection } from "../../utils/databaseConnector.js";
import { DataTypes } from "sequelize";

/** A model for programming languages supported by the system */
class Notification extends Base {
    
}

Notification.init({
    userId: { //Name of the programming languge
        type: DataTypes.STRING, allowNull: false
    },
    replyName: { //Name of the programming languge
        type: DataTypes.STRING, allowNull: false
    },
    id: { // use to unqiuly identify the notification
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     },
     read : {
        type:DataTypes.BOOLEAN, defaultValue:false
     }
    
}, {sequelize:databaseConnection})

export {Notification}