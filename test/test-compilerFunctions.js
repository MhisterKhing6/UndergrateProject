import path from "path";
import { compileScripts } from "../utils/compileScripts.js";
import { assert } from "chai";
import shell from "shelljs"



describe("Compile scripts", () => {
    let workSpace = path.join(path.resolve("."), "test", "compileTest")
    let solutionPaths = "/test1.txt**test2.txt**test3.txt**test4.txt"
    let testScripts = "test.txt"

    before(() => shell.mkdir(workSpace))
    
    after(() =>  shell.exec(`rm -r ${workSpace}`))

    it("error should be true", () => {
        let response = compileScripts["c++"](testScripts, workSpace, "testwrong.txt**testwrong2.txt")
        assert.isTrue(response.error)
    })

    it("stderr should be defined", () => {
        let solunF = solutionPaths.split("**")
        for(const derivedPath of solunF)
            shell.touch(path.join(workSpace, derivedPath))
        let resm = compileScripts['c++'](testScripts, workSpace, solutionPaths)
        assert.isNotTrue(resm.error)
        assert.isDefined(resm.compileResponse.stderr)
    })

})