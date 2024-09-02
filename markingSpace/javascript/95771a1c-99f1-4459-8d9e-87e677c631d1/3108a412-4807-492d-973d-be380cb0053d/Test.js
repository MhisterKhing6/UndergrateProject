// Test Script for Power Function

// Import the power function from power.js
import  { power } from './power.js';

import fs  from "fs"

// Define test cases
const testCases = [
    { a: 2, b: 3, expected: 8, testNumber: 1, marks: 5, feedback: "Test case passed for positive integers." },
    { a: 5, b: 0, expected: 1, testNumber: 2, marks: 10, feedback: "Test case passed for any number raised to the power of 0." },
    { a: -3, b: 2, expected: 9, testNumber: 3, marks: 15, feedback: "Test case passed for negative base number." },
    { a: 10, b: -1, expected: 0.1, testNumber: 4, marks: 10, feedback: "Test case passed for negative exponent." },
    { a: 0, b: 5, expected: 0, testNumber: 5, marks: 5, feedback: "Test case passed for base number 0." }
];

let totalMarks = 0;
let output = '';

// Run tests
testCases.forEach((testCase) => {
    const result = power(testCase.a, testCase.b);
    const status = result === testCase.expected ? 'pass' : 'failed';
    
    if (status === 'pass') {
        totalMarks += testCase.marks;
    }

    output += `status=${status}\n`;
    output += `feedback=${testCase.feedback}\n`;
    output += `testNumber=${testCase.testNumber}\n`;
    output += ';\n';
});

output += `marks=${totalMarks}\n`;

// Write results to result.txt file
fs.writeFileSync('result.txt', output);

// Output completion message
