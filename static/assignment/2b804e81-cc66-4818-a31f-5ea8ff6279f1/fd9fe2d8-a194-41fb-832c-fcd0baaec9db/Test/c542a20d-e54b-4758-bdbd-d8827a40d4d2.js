
//A simple test to for adding two numbers
//The student is expected to submit the solution in a file question.js

import { writeFileSync } from 'fs';
// Import the student's function
import { addNumbers } from './question.js';

// Array of test cases
const testCases = [
    { firstNumber: 3, secondNumber: 5, expectedResult: 8 },
    { firstNumber: 10, secondNumber: 20, expectedResult: 30 },
    { firstNumber: -5, secondNumber: 5, expectedResult: 0 },
    { firstNumber: 100, secondNumber: 250, expectedResult: 350, "30" }
];

// Function to write test results to a file
function writeTestResults() {
    let totalMarks = 0;
    let output = '';

    // Loop through the test cases
    for (let i = 0; i < testCases.length; i++) {
        const result = addNumbers(testCases[i].firstNumber, testCases[i].secondNumber);
        let status = '';
        let feedback = '';

        if (result === testCases[i].expectedResult) {
            status = 'pass';
            feedback = 'correct';
            totalMarks += 10;
        } else {
            status = 'failed';
            feedback = 'incorrect';
        }

// Generating output
    output += "status=" + status + "\n" +
    "feedback=" + feedback + "\n" +
    "testNumber=" + (i + 1) + "\n" +
    ";\n";
    }

    // Write total marks
    output += "marks=" + totalMarks + "\n";

    // Write output to result.txt
    writeFileSync('result.txt', output, 'utf8');
}
writeTestResult();
