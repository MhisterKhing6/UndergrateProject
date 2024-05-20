
import { assert } from "chai";
import { saveFile, createFolder, encodeBase64, writeToFile, readFromFile, saveTaskFile, readTaskFile, decodeDataBase64 } from "../utils/fileHandler.js";
import { existsSync, rm, rmdirSync, unlink } from "fs";
import { v4 } from "uuid";
import { promisify } from "util";
let unlinkAsync = promisify(unlink)
let rmAsync = promisify(rm)



describe("test for file saving",async () => {
    after( async () => {
        await rmAsync("./static/", {recursive: true})
    })
    let folderPath = "static/test"
    let data = Buffer("kofi asare ama how are you", "ascii")
    let fileName = "test.txt"
    before(async () => {

    })
    it("folder should be saved", async () => {
        let response = await createFolder(folderPath)
        let status = existsSync(folderPath)
        assert.isTrue(status)
        await writeToFile("static/ama.txt", "kofi amamaa")
    })


    it("should read a file", async () => {
        await createFolder(folderPath)
        let fileId = v4()
        let response = await saveFile({data, origFileName: "text.kofi.textkofi.txt"},fileId, folderPath)
        let fileD = await readFromFile(response.filePath)
        let fileContent = fileD.file.toString("ascii")
        assert.equal(data, fileContent)
    })

    it("should save requirement file",async () => {
        let assId = v4()
        let taskId = v4()
        let response = await saveTaskFile({data, origFileName:fileName }, assId, taskId, "requirement")
        console.log(response)
        assert.isTrue(existsSync(response.filePath))
    })
    //should save a file
    it("should read a file as base 64", async () => {
        let assId = v4()
        let taskId = v4()
        let response = await saveTaskFile({data, origFileName:fileName }, assId, taskId, "examples")
        let fileContent = await readTaskFile(response.filePath)
        assert.equal(fileContent, await encodeBase64(data))
        assert.equal((await decodeDataBase64(fileContent)).toString("ascii"), (await decodeDataBase64(data)).toString("ascii"))
    })
})