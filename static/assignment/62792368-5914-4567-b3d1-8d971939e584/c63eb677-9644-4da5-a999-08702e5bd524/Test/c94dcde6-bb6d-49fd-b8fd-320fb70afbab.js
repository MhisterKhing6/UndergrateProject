const {checkDiff} = require("./checkDiff")
const  fs = require("node:fs")
let marks = 0;
let completion = 0

let test1 = checkDiff(20, 40)
if(test1){
    marks = 5
    completion = 20
}
let test2 = checkDiff(40, 10)

if(test2) {
    marks += 20
    completion += 30
}

let test4 = checkDiff(10, 10)
if(test4) {
    marks += 20
    completion += 50
}
console.log(test1, test2, test4)


//write them to file
let content = `mark=${marks}\ncompletion=${completion}`
fs.writeFileSync("result.txt", content)


