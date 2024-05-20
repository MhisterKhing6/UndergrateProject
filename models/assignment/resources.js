/**Resources For Assignment Model */

import { Base } from "../base.js";
import { DataTypes } from "sequelize";
import { databaseConnection } from "../../utils/databaseConnector.js";

class Resources extends Base {}

Resources.init({
    title: {
        type: DataTypes.STRING, allowNull: false
    },
   
     link: {
        type: DataTypes.STRING, allowNull: false,
     },
     id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     }
}, {sequelize: databaseConnection})


export {Resources}