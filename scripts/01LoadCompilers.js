import { Compiler } from "../models/relationship/relations.js";

let data = [
    {
extension:".js", enviroment:"Js",name: "javascript", "version": "22.00",
"requirement": `
<ul> 
    <li>All your files will be executed on ubuntu 20.xx using node 22.x.x </li>
    <li>All your files should end with a new </li>
    <li>Your file should use the js file extension </li>
    <li>All of your functions must be exported </li>
</ul>`, setupLink: "https://nodejs.org/en",
testExamples : 
`
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
    { firstNumber: 100, secondNumber: 250, expectedResult: 350 }
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
    output += "status=" + status + "\\n" +
    "feedback=" + feedback + "\\n" +
    "testNumber=" + (i + 1) + "\\n" +
    ";\\n";
    }

    // Write total marks
    output += "marks=" + totalMarks + "\\n";

    // Write output to result.txt
    writeFileSync('result.txt', output, 'utf8');
}
writeTestResult();
`,
explanationExamples:`
//explanation examples give more information about the task in developer view
import { addNumbers } from './question.js';
// Test cases
const test1 = addNumber(20, 4);  // should return 24
const test2 = addNumber(30, 40); // should return 70
const test3 = addNumber(80, 9);  // should return 89

// Output the results
console.log("Test 1:", test1);
console.log("Test 2:", test2);
console.log("Test 3:", test3);
`
    },
    /*{
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

    },*/
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
</ul>`, setupLink: "https://gcc.gnu.org",
testExamples:`
//A test for adding two numbers
//The student is expected to write the function definition in a file question 1
//The file will be compiler together with submission file

#include <iostream>
#include <fstream>
#include <string>

// Function declaration to use the student's function
int largestInteger(int a, int b);

// Function to write test results to a file
void writeTestResults() {
    std::ofstream outputFile("result.txt");

    // Check if the file is open
    if (!outputFile.is_open()) {
std::cerr << "Error: Could not open file for writing." << std::endl;
return;
    }

    std::string output = "";
    int totalMarks = 0;

    struct TestCase {
    int firstNumber;
    int secondNumber;
    int expectedResult;
    }
    testCases[] = {
                {30, 50, 50},
                {50, 100, 100},
                {150, 100, 150},
                {350, 100, 350}
                    };

    int numTests = sizeof(testCases) / sizeof(testCases[0]);

    // Loop through the test cases
    for (int i = 0; i < numTests; i++) {
        int result = largestInteger(testCases[i].firstNumber, testCases[i].secondNumber);
        std::string status = "";
        std::string feedback = "";

        if (result == testCases[i].expectedResult) {
            status = "pass";
            feedback = "amazing";
            totalMarks += 10;
        } else {
            status = "failed";
            feedback = "wrong";
        }

// Using normal string concatenation with indentation for C++ formatting
output += "status=" + status + "\\n" +
  "feedback=" + feedback + "\\n" +
  "testNumber=" + std::to_string(i + 1) + "\\n" +
  ";\\n";
    }

    // Write total marks with indentation
    output += "marks=" + std::to_string(totalMarks) + "\\n";

    // Write the final string to the file
    outputFile << output;

    // Close the file
    outputFile.close();
}

int main() {
    writeTestResults();
    return 0;
}
`,
explanationExamples:`
//explanation examples give more information about the task in developer view
#include <iostream>
#include <fstream>
#include <string>

// Function definition
int largestInteger(int a, int b);

int main() {
    // Test cases
    int test1 = largestInteger(20, 4);  // should return 20
    int test2 = largestInteger(30, 40); // should return 40
    int test3 = largestInteger(80, 9);  // should return 80

    // Output the results
    std::cout << "Test 1: " << test1 << std::endl;
    std::cout << "Test 2: " << test2 << std::endl;
    std::cout << "Test 3: " << test3 << std::endl;

    return 0;
}
`

    },
    {
extension:"c",enviroment:"c", "name": "c", "version": "2.xx",
"requirement": `<h1>General requirement </h1>
<ul>
    <li>All your files will be compiled on Ubuntu 20.04 LTS using gcc </li>
    <li>All your files should end with a new line </li>
    <li>All your files must be executable </li>
    <li>The length of your files will be tested using wc </li>
</ul>`, setupLink: "https://gcc.gnu.org",
testExamples : 
"#include <stdio.h>\n" +
"#include <string.h>\n" +
"\n" +
"// Function declaration to use the student's function\n" +
"int addNumbers(int a, int b);\n" +
"\n" +
"void writeTestResults() {\n" +
"    char output[2048] = \"\"; // Buffer to store the concatenated output\n" +
"    int totalMarks = 0;\n" +
"\n" +
"    // Array of test cases\n" +
"    struct TestCase {\n" +
"int firstNumber;\n" +
"int secondNumber;\n" +
"int expectedResult;\n" +
"    } testCases[] = {\n" +
"{3, 5, 8},\n" +
"{10, 20, 30},\n" +
"{-5, 5, 0},\n" +
"{100, 250, 350}\n" +
"    };\n" +
"\n" +
"    int numTests = sizeof(testCases) / sizeof(testCases[0]);\n" +
"\n" +
"    // Start the JS string variable\n" +
"    strcat(output, \"const testResults = \\\"\\n\");\n" +
"\n" +
"    // Loop through the test cases\n" +
"    for (int i = 0; i < numTests; i++) {\n" +
"int result = addNumbers(testCases[i].firstNumber, testCases[i].secondNumber);\n" +
"char status[10] = \"\";\n" +
"char feedback[10] = \"\";\n" +
"\n" +
"if (result == testCases[i].expectedResult) {\n" +
"    strcpy(status, \"pass\");\n" +
"    strcpy(feedback, \"correct\");\n" +
"    totalMarks += 10;\n" +
"} else {\n" +
"    strcpy(status, \"failed\");\n" +
"    strcpy(feedback, \"incorrect\");\n" +
"}\n" +
"\n" +
"// Using normal string concatenation with indentation for JS formatting\n" +
"char buffer[256];\n" +
"sprintf(buffer, \"    status=%s\\\\n    feedback=%s\\\\n    testNumber=%d\\\\n    ;\\\\n\", status, feedback, i + 1);\n" +
"strcat(output, buffer);\n" +
"    }\n" +
"\n" +
"    // Write total marks with indentation\n" +
"    char marksBuffer[50];\n" +
"    sprintf(marksBuffer, \"    marks=%d\\\\n\", totalMarks);\n" +
"    strcat(output, marksBuffer);\n" +
"\n" +
"    // End the JS string variable\n" +
"    strcat(output, \\\"\\\";\n" +
"\n" +
"    // Write the final string to the console (or you could save it to a file if needed)\n" +
"    printf(\"%s\", output);\n" +
"}\n" +
"\n" +
"int main() {\n" +
"    writeTestResults();\n" +
"    return 0;\n" +
"}\n",

explanationExamples: `
//explanation examples gives more information about the task in developer view
#include <stdio.h>

// Function definition
int addNumbers(int a, int b)

int main() {
    // Test cases
    int test1 = addNumbers(10, 5);  // should return 15
    int test2 = addNumbers(20, 30); // should return 50
    int test3 = addNumbers(100, 200); // should return 300

    // Output the results
    printf("Test 1: %d\\n", test1);
    printf("Test 2: %d\\n", test2);
    printf("Test 3: %d\\n", test3);

    return 0;
}
`
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
</ul>`, setupLink: "https://nodejs.org/en",
testExamples:`
//the student is suppose to add implement laragestNumber number function definintion
//in class called Question
//the class should be saved in a file called question.java
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class TestRunner {

    public static void main(String[] args) {
    // Run the test
    writeTestResults();
    }

    public static void writeTestResults() {
    // Define test cases
    Object[][] testCases = {
        {30, 50, 50, 1},
        {50, 100, 100, 2},
        {150, 100, 150, 3},
        {350, 100, 350, 4}
    };

int totalMarks = 0;

try (PrintWriter outputFile = new PrintWriter(new FileWriter("result.txt"))) {
    // Iterate through each test case
    for (Object[] testCase : testCases) {
    int firstNumber = (int) testCase[0];
    int lastNumber = (int) testCase[1];
    int expected = (int) testCase[2];
    int testNumber = (int) testCase[3];

    // Call the method to be tested
    int result = Question.largestInteger(firstNumber, lastNumber);
    String status;
    String feedback;

    // Check if the result matches the expected value
    if (result == expected) {
        status = "pass";
        feedback = "amazing";
        totalMarks += 10; // Award marks for passing
    } else {
        status = "failed";
        feedback = "wrong";
    }

    // Write the test result to the file
    outputFile.println("status=" + status);
    outputFile.println("feedback=" + feedback);
    outputFile.println("testNumber=" + testNumber);
    outputFile.println(";");
        }

    // Write the total marks to the file
    outputFile.println("marks=" + totalMarks);
        } catch (IOException e) {
            // Handle any IO errors
            System.err.println("Error: Could not write to file.");
            e.printStackTrace();
        }
    }
}

`,
explanationExamples:`
//explanation examples gives more information about developer view
public class Main {

    // Function definition
    public static int largestInteger(int a, int b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }

    public static void main(String[] args) {
        // Test cases
        int test1 = largestInteger(20, 4);  // should return 20
        int test2 = largestInteger(30, 40); // should return 40
        int test3 = largestInteger(80, 9);  // should return 80

        // Output the results
        System.out.println("Test 1: " + test1);
        System.out.println("Test 2: " + test2);
        System.out.println("Test 3: " + test3);
    }
}
`



    },
    {
extension:".py", enviroment: "python", "name": "python", "version": "3.xx",
"requirement": `<h1>General requirement </h1>
<ul>
    <li>All your files will be interpreted/compiled on Ubuntu 20.0 LTS using python3 (version 3.7) </li>
    <li>All your files should end with a new line </li>
    <li>All your files must be executable </li>
    <li>The length of your files will be tested using wc </li>
</ul>`, setupLink: "https://www.python.org",
explanationExamples: `
# explanation examples gives more information about the task in developer view
from question import largestInteger

def write_test_results():
    # Test cases
    test_cases = [
    (20, 4, 20),
    (30, 40, 40),
    (80, 9, 80)
    ]

    for i, (first_number, last_number, expected) in enumerate(test_cases, start=1):
        result = largestInteger(first_number, last_number)
        status = "pass" if result == expected else "failed"
        feedback = "amazing" if status == "pass" else "wrong"

        # Print the test result
        print(f"Test {i}: {result} // should return {expected}")
        print(f"status={status}")
        print(f"feedback={feedback}")
        print(";")

# Run the test
write_test_results()
`,
testExamples: `
#the student is exepcted to submit the solution in a file called question.py
from question import largestInteger

def write_test_results():
    test_cases = [
    {"first_number": 30, "last_number": 50, "expected": 50, "test_number": 1},
    {"first_number": 50, "last_number": 100, "expected": 100, "test_number": 2},
    {"first_number": 150, "last_number": 100, "expected": 150, "test_number": 3},
    {"first_number": 350, "last_number": 100, "expected": 350, "test_number": 4},
    ]

    total_marks = 0

    with open("result.txt", "w") as output_file:
        for test_case in test_cases:
            first_number = test_case["first_number"]
            last_number = test_case["last_number"]
            expected = test_case["expected"]
            test_number = test_case["test_number"]

            if largestInteger(first_number, last_number) == expected:
                status = "pass"
                feedback = "amazing"
                total_marks += 10
                    else:
                status = "failed"
                feedback = "wrong"

            output_file.write(f"status={status}\\n")
            output_file.write(f"feedback={feedback}\\n")
            output_file.write(f"testNumber={test_number}\\n")
            output_file.write(";\n")

    # Write the total marks
    output_file.write(f"marks={total_marks}\\n")

# Run the test
if __name__ == "__main__":
    write_test_results()
`



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
</ul>`, setupLink: "https://www.ruby-lang.org",
explanationExamples: `
# Explanation examples gives more information about the requirements in program view
require_relative 'question1'

def write_test_results
  # Test cases
  test_cases = [
    {first_number: 20, last_number: 4, expected: 20},
    {first_number: 30, last_number: 40, expected: 40},
    {first_number: 80, last_number: 9, expected: 80}
  ]

  test_cases.each_with_index do |test_case, index|
    result = largestInteger(test_case[:first_number], test_case[:last_number])
    status = result == test_case[:expected] ? 'pass' : 'failed'
    feedback = status == 'pass' ? 'amazing' : 'wrong'
    
    # Print the test result
    puts "Test #{index + 1}: #{result} // should return #{test_case[:expected]}"
    puts "status=#{status}"
    puts "feedback=#{feedback}"
    puts ";"
  end
end

# Run the test
write_test_results
`


,testExamples : `
# A simple test for testing the largest of two numbers
# The student is to write the function definition in a file called question.rb

require_relative 'question' #import student file and run the scripts

# Function to write test results to a file
def write_test_results
  test_cases = [
    { first_number: 30, last_number: 50, expected: 50, test_number: 1 },
    { first_number: 50, last_number: 100, expected: 100, test_number: 2 },
    { first_number: 150, last_number: 100, expected: 150, test_number: 3 },
    { first_number: 350, last_number: 100, expected: 350, test_number: 4 }
  ]

  total_marks = 0

  File.open('result.txt', 'w') do |output_file|
    test_cases.each do |test_case|
      first_number = test_case[:first_number]
      last_number = test_case[:last_number]
      expected = test_case[:expected]
      test_number = test_case[:test_number]

      if largestInteger(first_number, last_number) == expected
        status = "pass"
        feedback = "amazing"
        total_marks += 10
      else
        status = "failed"
        feedback = "wrong"
      end

      output_file.puts "status=#{status}"
      output_file.puts "feedback=#{feedback}"
      output_file.puts "testNumber=#{test_number}"
      output_file.puts ";"
    end

    # Write the total marks
    output_file.puts "marks=#{total_marks}"
  end
end

# Run the test
write_test_results
`,


    },
    {
extension:".php", enviroment: "php", "name": "php", "version": "3.xx",
"requirement": `
<ul>
     <li>All your files will be executed on Ubuntu 20.04 LTS using php</li>
    <li>All your files should end with a new line</li>
    <li>Your file should use .rb extension </li>
    <li>wc will be use to count the length of your file </li>
</ul>`, setupLink: "https://www.php.net",
testExamples: `
<?php

//the student is expected to writh the definition of the code function in
//question1.php and submit it

// Include the file where largestInteger is defined
require_once 'question1.php'; 

function writeTestResults() {
    // Define test cases
    $testCases = [
        ['first_number' => 30, 'last_number' => 50, 'expected' => 50, 'test_number' => 1],
        ['first_number' => 50, 'last_number' => 100, 'expected' => 100, 'test_number' => 2],
        ['first_number' => 150, 'last_number' => 100, 'expected' => 150, 'test_number' => 3],
        ['first_number' => 350, 'last_number' => 100, 'expected' => 350, 'test_number' => 4],
    ];

    $totalMarks = 0;

    // Open the file for writing
    $outputFile = fopen("result.txt", "w");
    if (!$outputFile) {
        echo "Error: Could not open file for writing.\\n";
    return;
    }

    // Iterate through each test case
    foreach ($testCases as $testCase) {
        $firstNumber = $testCase['first_number'];
        $lastNumber = $testCase['last_number'];
        $expected = $testCase['expected'];
        $testNumber = $testCase['test_number'];

        // Call the function to be tested
        $result = largestInteger($firstNumber, $lastNumber);
        $status;
        $feedback;

        // Check if the result matches the expected value
        if ($result === $expected) {
            $status = "pass";
            $feedback = "amazing";
            $totalMarks += 10; // Award marks for passing
        } else {
            $status = "failed";
            $feedback = "wrong";
        }

        // Write the test result to the file
        fwrite($outputFile, "status={$status}\\n");
        fwrite($outputFile, "feedback={$feedback}\\n");
        fwrite($outputFile, "testNumber={$testNumber}\\n");
        fwrite($outputFile, ";\\n");
    }

    // Write the total marks to the file
    fwrite($outputFile, "marks={$totalMarks}\\n");

    // Close the file
    fclose($outputFile);
}

// Run the test
writeTestResults();
?>
`,
explanationExamples : `
<?php
// give more information about studen question
require_once 'question1.php';

// Test cases
echo "Test 1: " . largestInteger(20, 4) . " // should return 20\\n";
echo "Test 2: " . largestInteger(30, 40) . " // should return 40\\n";
echo "Test 3: " . largestInteger(80, 9) . " // should return 80\\n";

?>
`
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