/**Application Starting point*/
import configuration from "config"
import cors from "cors"
import express from "express"
import { authRouter } from "./routes/authRouter.js"
import { lecturerRoute } from "./routes/lecturesRoute.js"
import { nonAuthRouth } from "./routes/nonAuthController.js"
import { studentRoute } from "./routes/studentRoute.js"
//starting point
let app = express()

//middlewares
app.use(express.json({limit: "40mb"}))
app.use(cors())

//static path
app.use('/public',express.static('public'))
//routers
app.get("/", (req, res) => {
    res.send("ok i am workding")
})
// registration and non authentication interfaces
app.use('/api', nonAuthRouth)
app.use('/user/:type', authRouter)
app.use("/coder/lecturer", lecturerRoute)
app.use("/coder/student", studentRoute)

//application interface
let applicationInterface = configuration.get("applicationInterface")
const port = applicationInterface.port || process.env.PORT
const host = applicationInterface.host || process.env.HOST

//starting point

app.listen(port, host, () => {
    console.log(`running at http://${host}:${port}`)
})

//export for testing
export { app }
 