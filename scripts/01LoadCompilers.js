import { Compiler } from "../models/relationship/relations.js";

let data = [
    {
        extension:".js", enviroment:"node",name: "node", "version": "22.00",
        "requirement": `<h1>General requirement</h1>
        <ul> 
            <li>All your files will be executed on ubuntu 20.xx using node 22.x.x </li>
            <li>All your files should end with a new </li>
            <li>Your file should use the js file extension </li>
            <li>Your code will be tested using the Jest testing framework</li>
            <li>Your Code will be analysed with the Eslint rule we specify </li>
            <li>All of your functions must be exported </li>
        </ul>`, setupLink: "https://nodejs.org/en"

    },
    {
        extension:".sql","name": "sql", "version": "8.00",
        "requirement": `<h1>General Requirement </h1>
        <ul>
            <li>All your files will be executed on Ubuntu 20.04 LTS using MySQL</li>
            <li>All your files should end with a new line</li>
            <li>All your SQL queries should have a comment just before (i.e. syntax above)</li>
            <li>All SQL keywords should be in uppercase (SELECT, WHERE…)</li>
            <li>The length of your files will be tested using wc</li>
            <li>A README.md file, at the root of the folder of the project, is mandatory</li>
            <li>Your file should use the sql estention </li>
        </ul>`, setupLink: "https://nodejs.org/en", 

    },
    ,
    {
        extension:".c++,.cpp","name": "c++", "version": "2.xx",
        "requirement": `
        <h1>General requirement </h1>
        <ul>
            <li>All your files will be compiled on Ubuntu 20.04 LTS using g++ </li>
            <li>All your files should end with a new line </li>
            <li>All your files must be executable </li>
            <li>The length of your files will be tested using wc </li>
            <li>All you modules should be well documented </li>
            <li>If github assignment README.md at the root of the repository is mandatory </li>
        </ul>`, setupLink: "https://nodejs.org/en"

    },
    {
        extension:"c","name": "c", "version": "2.xx",
        "requirement": `<h1>General requirement </h1>
        <ul>
            <li>All your files will be compiled on Ubuntu 20.04 LTS using gcc </li>
            <li>All your files should end with a new line </li>
            <li>All your files must be executable </li>
            <li>The length of your files will be tested using wc </li>
            <li>All you modules should be well documented </li>
            <li>If github assignment README.md at the root of the repository is mandatory </li>
        </ul>`, setupLink: "https://nodejs.org/en"

    },
    {
        extension:".java","name": "java", "version": "2.xx",
        "requirement": `
        <h1>General Requirement </h1>
        <ul>
            <li>All your files will be executed on Ubuntu 20.04 LTS using Javac</li>
            <li>All your files should end with a new line</li>
            <li>All your SQL queries should have a comment just before (i.e. syntax above)</li>
            <li>All SQL keywords should be in uppercase (SELECT, WHERE…)</li>
            <li>The length of your files will be tested using wc</li>
            <li>A README.md file, at the root of the folder of the project, is mandatory</li>
            <li>Your file should use the sql estention </li>
        </ul>`, setupLink: "https://nodejs.org/en"

    },
    {
        extension:".py", enviroment: "python", "name": "python", "version": "3.xx",
        "requirement": `<h1>General requirement </h1>
        <ul>
            <li>All your files will be interpreted/compiled on Ubuntu 18.04 LTS using python3 (version 3.7) </li>
            <li>All your files should end with a new line </li>
            <li>All your files must be executable </li>
            <li>The length of your files will be tested using wc </li>
            <li>The first line of all your files should be exactly #!/usr/bin/env python3 </li>
            <li>Your code should use the pycodestyle style (version 2.5x) </li>
            <li>All you modules should be well documented </li>
            <li>If github assignment README.md at the root of the repository is mandatory </li>
        </ul>`, setupLink: "https://nodejs.org/en"

    }
]

const loadCompilers = async() => {
    await Compiler.sync({alter: true})
    let check = await Compiler.findOne({name:data[0].name})
    if (check)
        return null
    return await Promise.all(data.map(compiler => Compiler.create(compiler)))
}

export {loadCompilers}