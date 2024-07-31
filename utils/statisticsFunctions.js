import path from "path";
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import XLSX from "xlsx";
import { Assignment, AssignmentClasses, AssignmentResult, Student, Task, TaskResult, TestStatistics } from "../models/relationship/relations.js";
import { createFolder, writeToFile } from "./fileHandler.js";
const assignmentStats = async (assignmentId) => {
    let good = 0;
    let bad = 0;
    let veryGood = 0;
    let excellent = 0;
    let min = 0;
    let max = 0;
    let totalScore = 0;
    //get all assignment
    let assignmentScores = await AssignmentResult.findAll({where:{AssignmentId:assignmentId},raw:true, nest:true})
    if(assignmentScores.length !== 0)
        min = max = assignmentScores[0].mark
    for(const score of assignmentScores) {
        if(score.mark < 40)
            bad += 1
        else if (score.mark < 60)
            good += 1
        else if (score.mark < 80)
            veryGood  += 1
        else
            excellent += 1

    totalScore += score.mark
    //compute for min and max
    if(min > score.mark)
        min = score.mark
    
    if(max < score.mark)
        max = score.mark
    }
    let avg = 0
    let attempted = assignmentScores.length
    
    let assignment = await Assignment.findByPk(assignmentId)
    //find total student in the class
    let totalStudent = await Student.findAll({where:{ClassId:assignment.ClassId}, raw:true, attributes:["id"]})
    if(totalScore)
        avg = totalScore / attempted
    //form assignment object
    let bands = [bad, good, veryGood, excellent]
    return {totalScore, bands, totalStudent:totalStudent.length, attempted, avg, min, max}
}

const taskStats = async (assignmentId) => {
    let output = []
    //get task in assignment
    let tasks = await Task.findAll({where:{AssignmentId:assignmentId}, raw:true, nest:true})
    for(const task of tasks) {
        let bad = 0;
        let good = 0;
        let veryGood = 0;
        let excellent = 0;
        
        //get statistics
        let stats = await TaskResult.findAll(
            {where:{TaskId:task.id, AssignmentId:assignmentId}, raw:true, nest:true })
        //band algorithm
        for(const stat of  stats) {
            console.log(stat)
            if(stat.mark < 40)
                bad += 1
            else if (stat.mark < 60)
                good += 1
            else if (stat.mark < 80)
                veryGood  += 1
            else
                excellent += 1
        }
        //all bands computed
        //get test results
        let testResult = await TestStatistics.findAll({order:[["testNumber", "ASC"]],where:{TaskId:task.id}, nest:true, raw:true})
        //form output object
        let bands = [bad, good, veryGood, excellent]
        output.push({taskNumber:task.number, bands, testResult, attempted:stats.length})
    }
    return output
}

const exportExcell = async (data, id, plagiarism) => {
    try {
    let folderPath = path.join(path.resolve("."),"assignmentFiles")
    let fullPath = path.join(folderPath, `${id}.xlsx`)
    await createFolder(folderPath)

    // Define the headers and data
    const headers = ['Name', 'Index', 'Marks'];
    if(plagiarism)
        headers.push("Plagiarism")
    /*const data = [
        { name: 'John Doe', index: '001', marks: 85 },
        { name: 'Jane Smith', index: '002', marks: 92 },
        { name: 'Sam Johnson', index: '003', marks: 78 },
        { name: 'Emily Davis', index: '004', marks: 89 },
    ]; */
    
    // Create an array of arrays (rows) for Excel
    const worksheetData = [
        headers, // Header row
        ...data.map(row => {
            let datum = [row.name, row.index, row.marks] 
            if(plagiarism)
                datum.push(row.plagiarism)
            return datum
        }) // Data rows
    ];
    
    // Create a new workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Adjust column widths (optional, to ensure proper alignment)
    worksheet['!cols'] = [
        { wch: plagiarism ? 30 : 50 },  // Width of the "Name" column
        { wch: 20 },  // Width of the "Index" column
        { wch: 20 }, 
        plagiarism ? {wch: 20} : ""  // Width of the "Marks" column
    ];
    
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
    // Write the workbook to a file
    XLSX.writeFile(workbook, fullPath);
    return fullPath
 } catch(error) {}
    console.log(error)
}

const exportPdf = async (data, id, plagiarism) => {
    
    try {

        function getPdfBuffer(docDefinition) {
            return new Promise((resolve, reject) => {
                const pdfDocGenerator = pdfMake.createPdf(docDefinition);
                pdfDocGenerator.getBuffer((buffer) => {
                    if (buffer) {
                        resolve(buffer);
                    } else {
                        reject(new Error('Failed to generate PDF buffer'));
                    }
                });
            });
        }

    let folderPath = path.join(path.resolve("."),"assignmentFiles")
    let fullPath = path.join(folderPath, `${id}.pdf`)
    await createFolder(folderPath) 
    // Create a new PDF document

    // Pipe the PDF into a writable stream
    
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
    let wid = ['*', 'auto', 'auto']
    let bod = [{ text: 'Name', style: 'tableHeader' }, 
        { text: 'Index', style: 'tableHeader' }, 
        { text: 'Marks', style: 'tableHeader' },
       ]
    if(plagiarism) {
        wid.push("auto")
        bod.push({text:"Plagiarism", style:'tableHeader'})
    }
    
    // Define the document definition
    const docDefinition = {
        content: [
            { text: 'Student Marks Report', style: 'header' },
            {
                table: {
                    headerRows: 1,
                    widths: wid, // Adjust column widths
                    body: [
                        bod, // Table header
                        ...data.map(val => {
                            let data = [val.name, val.index, val.marks]
                            if(plagiarism)
                                data.push(val.plagiarism)
                            return data
                        })
                    ]
                }
            }
        ],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                color: 'black'
            }
        }
    };
    
    // Generate the PDF and save it to a file
    let buffer = await getPdfBuffer(docDefinition)
    await writeToFile(fullPath, buffer)
    return fullPath
    }catch(error) {
        console.log(error)
        return null
    }

}
export { assignmentStats, exportExcell, exportPdf, taskStats };

