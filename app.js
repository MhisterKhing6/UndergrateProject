/**Application Starting point*/
import express from "express"
import configuration from "config"
import cors from "cors"
import { nonAuthRouth } from "./routes/nonAuthController.js"

//starting point
let app = express()

//middlewares
app.use(express.json())
app.use(cors())

//routers
app.get("/", (req, res) => {
    res.send("ok i am workding")
})
// registration and non authentication interfaces
app.use('/api/auth', nonAuthRouth)

//application interface
let applicationInterface = configuration.get("applicationInterface")
const port = applicationInterface.port || process.env.PORT
const host = applicationInterface.host || process.env.HOST

//starting point

app.listen(port, host, () => {
    console.log(`running at http://${host}:${port}`)
})

//export for testing
export {app}
