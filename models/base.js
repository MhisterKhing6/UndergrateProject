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
     * @returns  true if saved, false otherwise
     */
        try {
            let Dbconnected = await verifyDatabaseConnection()
            if(Dbconnected) {
                await this.save()
                return true
            } 
        } catch(err) {
            console.log(err)
            return false
        }
    }

}

export {Base}