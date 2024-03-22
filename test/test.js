import { Lecturer } from "../models/lecturer.js"

(async () => {
    await Lecturer.sync()
    let lecturer = {"name": "name", "email": "email", "password": "password"}
    let lec = Lecturer.build(lecturer)
    let respons = await lec.saveToDatabase()
    console.log(respons)

} )()