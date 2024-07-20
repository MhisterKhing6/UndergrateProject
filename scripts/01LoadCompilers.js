import { Compiler } from "../models/relationship/relations.js";

let data = [
    {
        extension:".js", enviroment:"Js",name: "Js", "version": "22.00",
        "requirement": `
        <ul> 
            <li>All your files will be executed on ubuntu 20.xx using node 22.x.x </li>
            <li>All your files should end with a new </li>
            <li>Your file should use the js file extension </li>
            <li>All of your functions must be exported </li>
        </ul>`, setupLink: "https://nodejs.org/en"

    },
    {
        extension:".sql", enviroment:"mysql", "name": "sql", "version": "8.00",
        "requirement": `
        <ul>
            <li>All your files will be executed on Ubuntu 20.04 LTS using MySQL</li>
            <li>All your files should end with a new line</li>
            <li>All your SQL queries should have a comment just before (i.e. syntax above)</li>
            <li>All SQL keywords should be in uppercase (SELECT, WHERE…)</li>
            <li>The length of your files will be tested using wc</li>
            <li>Your file should use the sql extension </li>
        </ul>`, setupLink: "https://nodejs.org/en", 

    },
    ,
    {
        extension:".c++,.cpp","enviroment":"c++", "name": "c++", "version": "2.xx",
        "requirement": `
        <h1>General requirement </h1>
        <ul>
            <li>All your files will be compiled on Ubuntu 20.04 LTS using g++ </li>
            <li>All your files should end with a new line </li>
            <li>All your files must be executable </li>
            <li>The length of your files will be tested using wc </li>
        </ul>`, setupLink: "https://gcc.gnu.org"

    },
    {
        extension:"c",enviroment:"c", "name": "c", "version": "2.xx",
        "requirement": `<h1>General requirement </h1>
        <ul>
            <li>All your files will be compiled on Ubuntu 20.04 LTS using gcc </li>
            <li>All your files should end with a new line </li>
            <li>All your files must be executable </li>
            <li>The length of your files will be tested using wc </li>
        </ul>`, setupLink: "https://gcc.gnu.org"

    },
    {
        extension:".java",enviroment: "java","name": "java", "version": "2.xx",
        "requirement": `
        <ul>
            <li>All your files will be executed on Ubuntu 20.04 LTS using JDK</li>
            <li>All your files should end with a new line</li>
            <li>All your SQL queries should have a comment just before (i.e. syntax above)</li>
            <li>All SQL keywords should be in uppercase (SELECT, WHERE…)</li>
            <li>The length of your files will be tested using wc</li>
            <li>Your file should use the sql extension </li>
        </ul>`, setupLink: "https://nodejs.org/en"

    },
    {
        extension:".py", enviroment: "python", "name": "python", "version": "3.xx",
        "requirement": `<h1>General requirement </h1>
        <ul>
            <li>All your files will be interpreted/compiled on Ubuntu 20.0 LTS using python3 (version 3.7) </li>
            <li>All your files should end with a new line </li>
            <li>All your files must be executable </li>
            <li>The length of your files will be tested using wc </li>
        </ul>`, setupLink: "https://www.python.org"

    },
    {
        extension:".rb", enviroment: "ruby", "name": "ruby", "version": "3.xx",
        "requirement": `<h1>General requirement </h1>
        <ul>
            <li>All your files will be executed on Ubuntu 20.04 LTS using Ruby</li>
            <li>All your files should end with a new line</li>
            <li>The length of your files will be tested using wc</li>
            <li>Your file should use .rb extension </li>
            <li>WC will be use to count the length of your file </li>
        </ul>`, setupLink: "https://www.ruby-lang.org"

    },
    {
        extension:".php", enviroment: "php", "name": "php", "version": "3.xx",
        "requirement": `
        <ul>
             <li>All your files will be executed on Ubuntu 20.04 LTS using php</li>
            <li>All your files should end with a new line</li>
            <li>Your file should use .rb extension </li>
            <li>wc will be use to count the length of your file </li>
        </ul>`, setupLink: "https://www.php.net"

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