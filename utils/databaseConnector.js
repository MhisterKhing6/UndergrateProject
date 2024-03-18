/*Provides configurations for mysql database */

import { Sequelize } from "sequelize"
import config  from "config"
//Get database configuration from config files
const database = config.get("database")


export const databaseConnector = (dbName, user, password, databaobj) => {

    /** 
     * connector: connect to a database instance
     * params:
     *  dbName: database name to connect
     *  user: user detials for the database
     *  password: database user password
     *  databaojc: describes the type of database
     * returns: instance of sequelize database connection
    */
   return new Sequelize(dbName, user, password, databaobj)
}

//Get instance of database connection
let databaseConnection = databaseConnector(database.dbName, database.user, database.password, 
                                  {host:database.host, dialect: database.dialect})


export let verifyDatabaseConnection = async (dbConnectionInstance) => {
    /**
     * verifyConnection: check if database connected is connected to an instance
     * params: 
     *      dbConnectionInstance: instance of a database connection
     * returns: true if connected false otherswise
     */
    let connected = false
    if (!connected) {
        try {
            await databaseConnection.authenticate()
            connected = true;
        } catch(err){
            console.log(err)
        }
    }
    return connected
}

export {databaseConnection}