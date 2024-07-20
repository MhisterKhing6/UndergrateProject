import { promisify } from "util"
import { rm, readFile, writeFile, existsSync, mkdir, unlink } from "fs"
import { v4 } from "uuid"
import config from "config"
import path from "path"
const readFileAsync = promisify(readFile)
const writeFileAsyc = promisify(writeFile)
const mkdirAsync =    promisify(mkdir)
const unlinkAsync =   promisify(unlink)
const rmAsync = promisify(rm)


const encodeBase64 = async (buffer) => {
    //encodes data to base64
    //buffer -> streams of objects
    let data = buffer.toString("base64")
    return data
    
}

const decodeDataBase64 = async (base64) => {
    let file = Buffer.from(base64, "base64")
    return file
}

let writeBinaryFile = async (base64, userId, origName)=> {
    try {
    let file = await decodeDataBase64(base64)
    //create relative filename for url
    let relativePath = path.join("public","profilePics")
    //create file name
    let fileName = `${userId}${path.extname(origName)}`
    //create full path folder
    let fullPath = path.join(path.resolve("."),relativePath)
    //create folder if not exist
    if(!existsSync(fullPath))
        await createFolder(fullPath)
    //generate full file name with fileName
    fullPath = path.join(fullPath, fileName)
    //write the file to file
    let obs = await writeToFile(fullPath, file)
    //add file filename to relative path to generate url
    relativePath = path.join(relativePath, fileName)
    if(!obs)
        return null
    return {relativePath,fullPath}
    }
    catch(err) {
        console.log(err)
        return null
    }
}
let writeToFile= async (path, binary) => {
    try {
        if(existsSync(path))
            await deleteTaskFile(path)
        await writeFileAsyc(path,binary)
        return path
    } catch(err) {
        console.log(err)
        return null
    }
}

const generateFileUrl = (filePath) => {
    let appHost = config.get("applicationInterface")
    let host = process.env.HOST || appHost.host
    let port = process.env.PORT || appHost.port

    return `${appHost.protocol}://${host}:${port}/${filePath}`
}
const readFromFile = async (filePath) => {
    //return the data and the path of the file
    if(existsSync(filePath)) {
        try {
            let file = await readFileAsync(filePath)
            return file.toString("ascii")
        } catch (err) {
            console.log(err)
            return null
        }
    } else {
        return null
    }
}
let createFolder = async (folderPath) => {
    //create folder
     try {
            await mkdirAsync(folderPath , {recursive: true})
            return {folderPath, status:1}
     } catch(err) {
        console.log(err)
        return null
     }
}

let createStudentMarkSpace =  async (compilerEnviroment, assignemntId, studentId) => {
    let baseFolder = path.join(path.resolve("."), "markingSpace")
        let abs = path.join(baseFolder, compilerEnviroment,assignemntId, studentId)
        let response = await createFolder(abs)
        return response ? abs : null
}

let extenSion = (fileName) => {
    if (!fileName)
        return null
    let arrays = fileName.split(".")
    return arrays[arrays.length - 1]
}

const saveFile = async ({data, ext}, fileId, parentFolder) => {
    //decode the data
    //save the file
    //generate the file Id name for the requeirment
    let fileName = `${fileId.toString()}.${ext}`
    let filePath = `${parentFolder}/${fileName}`
    let response = await writeToFile(filePath, data)
    return response ? {fileId, filePath} : null

}

const saveTaskFile = async ({data, ext}, assId, taskId, type ) => {
    //create parent folder 
    let base = path.resolve("./static")
    let parentFolder = base + `/assignment/${assId}/${taskId}/${type}`
    let folderSaved = await createFolder(parentFolder)
    if(!folderSaved) 
        return null
    //decode the data
    //generate file id 
    let fileId = v4()
    //file saved status
    let fileSavedStatus = await saveFile({data, ext},fileId, parentFolder)
    //file path
    return fileSavedStatus
}
const deletFolder = async (path) => {
    await rmAsync(path, {recursive:true, force:true})
}

const readTaskFile = async (filePath) => {
    //read the  content of the file
    return await readFromFile(filePath)
} 

const deleteTaskFile = async (filePath) => {
    //delete task file
    return await unlinkAsync(filePath)
} 

export {generateFileUrl, deletFolder, writeBinaryFile, createStudentMarkSpace, deleteTaskFile,readTaskFile, saveTaskFile,encodeBase64, readFromFile, decodeDataBase64, saveFile, createFolder, writeToFile }