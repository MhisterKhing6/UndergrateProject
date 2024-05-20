//**Loads database before the program starts */
import { databaseConnection, verifyDatabaseConnection } from "../utils/databaseConnector.js";
import { loadPrograms } from "./00LoadPrograms.js";
import { loadCompilers } from "./01LoadCompilers.js";


let loaded = false;

const startSetup = async () => {
    /**
     * startSetup = set up program
     * @returns boolean
     */
    const connected = await verifyDatabaseConnection()
    if (connected) {
        await loadPrograms()
        await loadCompilers()
    } else {
        console.log("Database conection failed")
    }
}

(async () => {
    await startSetup()
})()