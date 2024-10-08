/**Application Starting point*/
import configuration from "config"
import cors from "cors"
import express from "express"
import { Server } from "socket.io"
import http from "http"
import { authRouter } from "./routes/authRouter.js"
import { lecturerRoute } from "./routes/lecturesRoute.js"
import { nonAuthRouth } from "./routes/nonAuthController.js"
import { studentRoute } from "./routes/studentRoute.js"

//starting point
let app = express()

let httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: " http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Listen for chat messages from a client
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

//middlewares
app.use(express.json({limit: "100mb"}))
app.use(cors())

//static path
app.use('/public',express.static('public'))
//routers
app.get("/", (req, res) => {
    res.send("ok i am working")
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

httpServer.listen(port, host, () => {
    console.log(`running at http://${host}:${port}`)
})

//export for testing
export { app, io }
 