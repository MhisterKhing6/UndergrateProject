const   {checkDiff} = require("./checkDiffTest.js")
const  fs = require("node:fs")
let marks = 0;
let completion = 0

let result = "Fail"
let feedback = ""

let test1 = checkDiff(20, 40)
if(test1){
    marks = 5
    completion = 20
    result = 'pass'
    feedback = "Very good"
} else {
    feedback = "Test suit failed for integer values"
}
let test1result = `testNumber=1\nresult=${result}\nfeedback=${feedback};`

let test2 = checkDiff(40, 10)
if(test2) {
    marks += 20
    completion += 30
    result = "pass"
    feedback = "wonderful"
} else {
    result = "fail"
    feedback  = "try to ensure you test work"
}
let test2result = `testNumber=2\nresult=${result}\nfeedback=${feedback};`

let test4 = checkDiff(10, 10)
if(test4) {
    marks += 20
    completion += 50
    result = "pass"
    feedback = "impresive"
} else {
    result = "fail"
    feedback = "test failed for double values"
}
let test3result = `testNumber=3\nresult=${result}\nfeedback=${feedback};`

let markresult = `mark=${marks}\ncompletion=${completion}`

content = test1result + test2result + test3result + markresult


//write them to file
fs.writeFileSync("result.txt", content)


