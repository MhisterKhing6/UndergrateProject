/** common codes for database intances */
import { Model, Sequelize } from "sequelize";
import { verifyDatabaseConnection } from "../utils/databaseConnector.js";

/**
 * Base: A Base class template for all models
 */
class Base extends Model {
    saveToDatabase =  async () => {
    /**
     * saveToDatabse: save model instance into a database
     * @params: None
     * @returns  user
     */
        try {
            let Dbconnected = await verifyDatabaseConnection()
            if(Dbconnected) {
                let user = await this.save()
                return user
            } 
        } catch(err) {
            console.log(err)
            return null
        }
    }
}

export {Base}