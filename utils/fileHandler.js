import { promisify } from "util"
import { readFile, writeFile, existsSync, mkdir, unlink } from "fs"
import { v4 } from "uuid"
import path from "path"
const readFileAsync = promisify(readFile)
const writeFileAsyc = promisify(writeFile)
const mkdirAsync =    promisify(mkdir)
const unlinkAsync =   promisify(unlink)


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

let writeToFile= async (path, binary) => {
    try {
        await writeFileAsyc(path,binary)
        return path
    } catch(err) {
        console.log(err)
        return null
    }
}

const readFromFile = async (filePath) => {
    //return the data and the path of the file
    console.log(filePath)
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
            let response =  await mkdirAsync(folderPath , {recursive: true})
            return {folderPath, status:1}
     } catch(err) {
        console.log(err)
        return null
     }
    
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

const readTaskFile = async (filePath) => {
    //read the  content of the file
    return await readFromFile(filePath)
} 

const deleteTaskFile = async (filePath) => {
    //delete task file
    return await unlinkAsync(filePath)
} 

export {deleteTaskFile,readTaskFile, saveTaskFile,encodeBase64, readFromFile, decodeDataBase64, saveFile, createFolder, writeToFile }