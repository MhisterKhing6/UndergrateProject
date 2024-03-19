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

    static findUser = async (details) => {
        /**
         * findUser: find a model instance from a database
         * @param details: object that describe user to find
         * @returns : and instance of a model
         */
        return await findOne({
            where: details
        })
    }
    

}

export {Base}