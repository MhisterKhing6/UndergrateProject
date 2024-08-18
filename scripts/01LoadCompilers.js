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
testExamples:`
//A Simple test for  finding largestInteger
//The student is to write the the function in file question1.js and submit
import fs from ('fs');
import { largestInteger } from './question1';  // Import the function from question1.js

function writeTestResults() {
    // Test cases with unique marks for each test
    const testCases = [
        { firstNumber: 20, lastNumber: 4, expected: 20, testNumber: 1, marks: 5, feedback: "Test case passed for number divisible by 10." },
        { firstNumber: 30, lastNumber: 40, expected: 40, testNumber: 2, marks: 10, feedback: "Test case passed for number divisible by 10." },
        { firstNumber: 80, lastNumber: 9, expected: 80, testNumber: 3, marks: 15, feedback: "Test case passed for number not divisible by 10." },
        { firstNumber: 0, lastNumber: 10, expected: 10, testNumber: 4, marks: 10, feedback: "Test case passed for zero which is divisible by 10." }
    ];

    let totalMarks = 0;
    let output = '';

    testCases.forEach((testCase) => {
        const result = largestInteger(testCase.firstNumber, testCase.lastNumber);
        const status = result === testCase.expected ? 'pass' : 'failed';
        
        // Add marks if the test passed
        if (status === 'pass') {
            totalMarks += testCase.marks;
        }

        // Save the test result to the output string
        output += \`status=\${status}\\\n\`;
        output += \`feedback=\${testCase.feedback}\\\n\`;
        output += \`testNumber=\${testCase.testNumber}\\\n\`;
        output += ';\\n';
    });

    // Add the total marks to the output
    output += \`marks=\${totalMarks}\\\n\`;

    // Write the output to result.txt
    fs.writeFileSync('result.txt', output);
}

// Run the test
writeTestResults();
`
,
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
testExamples:
`
// A test for  largestInteger
// The Student solution will be compiled together with the function
#include <iostream>
#include <fstream>
#include <string>

// Function declaration the student definition for the funtion will be compiled together with the tes
int largestInteger(int firstNumber, int lastNumber);

void writeTestResults() {
    // Test cases with unique marks for each test
    struct TestCase {
        int firstNumber;
        int lastNumber;
        int expected;
        int testNumber;
        int marks;
        std::string feedback;
    };

    TestCase testCases[] = {
        {20, 4, 20, 1, 5, "Test case passed for number divisible by 10."},
        {30, 40, 40, 2, 10, "Test case passed for number divisible by 10."},
        {80, 9, 80, 3, 15, "Test case passed for number not divisible by 10."},
        {0, 10, 10, 4, 10, "Test case passed for zero which is divisible by 10."}
    };

    int totalMarks = 0;
    std::string output;

    for (const auto& testCase : testCases) {
        int result = largestInteger(testCase.firstNumber, testCase.lastNumber);
        std::string status = (result == testCase.expected) ? "pass" : "failed";
        
        // Add marks if the test passed
        if (status == "pass") {
            totalMarks += testCase.marks;
        }

        // Save the test result to the output string
        output += "status=" + status + "\\n";
        output += "feedback=" + testCase.feedback + "\\n";
        output += "testNumber=" + std::to_string(testCase.testNumber) + "\\n";
        output += ";\\n";
    }

    // Add the total marks to the output
    output += "marks=" + std::to_string(totalMarks) + "\\n";

    // Write the output to result.txt
    std::ofstream file("result.txt");
    if (file.is_open()) {
        file << output;
        file.close();
    } else {
        std::cerr << "Unable to open file for writing.\\n";
    }
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
`
// A simple test for finding largest number
// The Student is function definition will be compiled together with the test file
#include <stdio.h>

// Function declaration
int largestInteger(int firstNumber, int lastNumber);

void writeTestResults() {
    // Test cases with unique marks for each test
    struct TestCase {
        int firstNumber;
        int lastNumber;
        int expected;
        int testNumber;
        int marks;
        const char *feedback;
    };

    struct TestCase testCases[] = {
        {20, 4, 20, 1, 5, "Test case passed for number divisible by 10."},
        {30, 40, 40, 2, 10, "Test case passed for number divisible by 10."},
        {80, 9, 80, 3, 15, "Test case passed for number not divisible by 10."},
        {0, 10, 10, 4, 10, "Test case passed for zero which is divisible by 10."}
    };

    int totalMarks = 0;
    char output[1024] = {0}; // Buffer to accumulate the result text

    for (int i = 0; i < sizeof(testCases) / sizeof(testCases[0]); i++) {
        struct TestCase testCase = testCases[i];
        int result = largestInteger(testCase.firstNumber, testCase.lastNumber);
        const char *status = (result == testCase.expected) ? "pass" : "failed";

        // Add marks if the test passed
        if (status == "pass") {
            totalMarks += testCase.marks;
        }

        // Append the test result to the output buffer
        snprintf(output + strlen(output), sizeof(output) - strlen(output), 
                 "status=%s\\nfeedback=%s\\ntestNumber=%d\\n;\\n", 
                 status, testCase.feedback, testCase.testNumber);
    }

    // Append the total marks to the output buffer
    snprintf(output + strlen(output), sizeof(output) - strlen(output), "marks=%d\\n", totalMarks);

    // Write the output to result.txt
    FILE *file = fopen("result.txt", "w");
    if (file) {
        fputs(output, file);
        fclose(file);
    } else {
        fprintf(stderr, "Unable to open file for writing.\\n");
    }
}

int main() {
    writeTestResults();
    return 0;
}
`,explanationExamples: 
`
#include <stdio.h>

// Function declaration
int largestInteger(int firstNumber, int lastNumber);

int main() {
    // Test cases
    int test1 = largestInteger(20, 4);  // should return 20
    int test2 = largestInteger(30, 40); // should return 40
    int test3 = largestInteger(80, 9);  // should return 80
    int test4 = largestInteger(0, 10);  // should return 10

    // Output the results to the console
    printf("Test 1: %s\\n", test1 == 20 ? "pass" : "fail");
    printf("Test 2: %s\\n", test2 == 40 ? "pass" : "fail");
    printf("Test 3: %s\\n", test3 == 80 ? "pass" : "fail");
    printf("Test 4: %s\\n", test4 == 10 ? "pass" : "fail");

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
testExamples:
`
//simple test for finding laragest integer function
//the student is suppose to write the funtion definition in a file
//question.java. the function should be in a class Question
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

// Test class
public class Test {
    public static void main(String[] args) {
        writeTestResults();
    }

    private static void writeTestResults() {
        // Test cases with unique marks for each test
        class TestCase {
            int firstNumber;
            int lastNumber;
            int expected;
            int testNumber;
            int marks;
            String feedback;

            TestCase(int firstNumber, int lastNumber, int expected, int testNumber, int marks, String feedback) {
                this.firstNumber = firstNumber;
                this.lastNumber = lastNumber;
                this.expected = expected;
                this.testNumber = testNumber;
                this.marks = marks;
                this.feedback = feedback;
            }
        }

        TestCase[] testCases = {
            new TestCase(20, 4, 20, 1, 5, "Test case passed for number divisible by 10."),
            new TestCase(30, 40, 40, 2, 10, "Test case passed for number divisible by 10."),
            new TestCase(80, 9, 80, 3, 15, "Test case passed for number not divisible by 10."),
            new TestCase(0, 10, 10, 4, 10, "Test case passed for zero which is divisible by 10.")
        };

        int totalMarks = 0;
        StringBuilder output = new StringBuilder();

        for (TestCase testCase : testCases) {
            int result = Question.largestInteger(testCase.firstNumber, testCase.lastNumber);
            String status = (result == testCase.expected) ? "pass" : "failed";
            
            // Add marks if the test passed
            if ("pass".equals(status)) {
                totalMarks += testCase.marks;
            }

            // Save the test result to the output string
            output.append("status=").append(status).append("\\n");
            output.append("feedback=").append(testCase.feedback).append("\\n");
            output.append("testNumber=").append(testCase.testNumber).append("\\n");
            output.append(";\\n");
        }

        // Add the total marks to the output
        output.append("marks=").append(totalMarks).append("\\n");

        // Write the output to result.txt
        try (PrintWriter writer = new PrintWriter(new FileWriter("result.txt"))) {
            writer.print(output.toString());
        } catch (IOException e) {
            System.err.println("Unable to open file for writing.");
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
testExamples:
`
#The student is to write the function and submit in a file question.py
from question import largestInteger  # Import the function from question.py

def write_test_results():
    # Test cases with unique marks for each test
    test_cases = [
        {'firstNumber': 20, 'lastNumber': 4, 'expected': 20, 'testNumber': 1, 'marks': 5, 'feedback': "Test case passed for number divisible by 10."},
        {'firstNumber': 30, 'lastNumber': 40, 'expected': 40, 'testNumber': 2, 'marks': 10, 'feedback': "Test case passed for number divisible by 10."},
        {'firstNumber': 80, 'lastNumber': 9, 'expected': 80, 'testNumber': 3, 'marks': 15, 'feedback': "Test case passed for number not divisible by 10."},
        {'firstNumber': 0, 'lastNumber': 10, 'expected': 10, 'testNumber': 4, 'marks': 10, 'feedback': "Test case passed for zero which is divisible by 10."}
    ]

    total_marks = 0
    output = ''

    for test_case in test_cases:
        result = largestInteger(test_case['firstNumber'], test_case['lastNumber'])
        status = 'pass' if result == test_case['expected'] else 'failed'
        
        # Add marks if the test passed
        if status == 'pass':
            total_marks += test_case['marks']

        # Save the test result to the output string
        output += f"status={status}\\n"
        output += f"feedback={test_case['feedback']}\\n"
        output += f"testNumber={test_case['testNumber']}\\n"
        output += ';\\n'

    # Add the total marks to the output
    output += f"marks={total_marks}\\n"

    # Write the output to result.txt
    with open('result.txt', 'w') as file:
        file.write(output)

# Run the test
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

,
testExamples:`require_relative 'question'  # Import the function from question.rb

def write_test_results
  # Test cases with unique marks for each test
  test_cases = [
    { first_number: 20, last_number: 4, expected: 20, test_number: 1, marks: 5, feedback: "Test case passed for number divisible by 10." },
    { first_number: 30, last_number: 40, expected: 40, test_number: 2, marks: 10, feedback: "Test case passed for number divisible by 10." },
    { first_number: 80, last_number: 9, expected: 80, test_number: 3, marks: 15, feedback: "Test case passed for number not divisible by 10." },
    { first_number: 0, last_number: 10, expected: 10, test_number: 4, marks: 10, feedback: "Test case passed for zero which is divisible by 10." }
  ]

  total_marks = 0
  output = ''

  test_cases.each do |test_case|
    result = largestInteger(test_case[:first_number], test_case[:last_number])
    status = result == test_case[:expected] ? 'pass' : 'failed'
    
    # Add marks if the test passed
    if status == 'pass'
      total_marks += test_case[:marks]
    end

    # Save the test result to the output string
    output += "status=#{status}\\n"
    output += "feedback=#{test_case[:feedback]}\\n"
    output += "testNumber=#{test_case[:test_number]}\\n"
    output += ";\\n"
  end

  # Add the total marks to the output
  output += "marks=#{total_marks}\\n"

  # Write the output to result.txt
  File.open('result.txt', 'w') do |file|
    file.write(output)
  end
end

# Run the test
write_test_results
`



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
testExamples:
 `
 <?php
// A test for largest Integer function
// The student is to submit the the solution in a question.php file
// Include the function definition
include 'question.php';

function writeTestResults() {
    // Test cases with unique marks for each test
    $testCases = [
        ['firstNumber' => 20, 'lastNumber' => 4, 'expected' => 20, 'testNumber' => 1, 'marks' => 5, 'feedback' => 'Test case passed for number divisible by 10.'],
        ['firstNumber' => 30, 'lastNumber' => 40, 'expected' => 40, 'testNumber' => 2, 'marks' => 10, 'feedback' => 'Test case passed for number divisible by 10.'],
        ['firstNumber' => 80, 'lastNumber' => 9, 'expected' => 80, 'testNumber' => 3, 'marks' => 15, 'feedback' => 'Test case passed for number not divisible by 10.'],
        ['firstNumber' => 0, 'lastNumber' => 10, 'expected' => 10, 'testNumber' => 4, 'marks' => 10, 'feedback' => 'Test case passed for zero which is divisible by 10.']
    ];

    $totalMarks = 0;
    $output = '';

    foreach ($testCases as $testCase) {
        $result = largestInteger($testCase['firstNumber'], $testCase['lastNumber']);
        $status = ($result === $testCase['expected']) ? 'pass' : 'failed';

        // Add marks if the test passed
        if ($status === 'pass') {
            $totalMarks += $testCase['marks'];
        }

        // Save the test result to the output string
        $output .= "status=$status\\n";
        $output .= "feedback={$testCase['feedback']}\\n";
        $output .= "testNumber={$testCase['testNumber']}\\n";
        $output .= ";\\n";
    }

    // Add the total marks to the output
    $output .= "marks=$totalMarks\\n";

    // Write the output to result.txt
    file_put_contents('result.txt', $output);
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
echo "Test 1: " . largestInteger(20, 4) . " // should return 20\\\n";
echo "Test 2: " . largestInteger(30, 40) . " // should return 40\\\n";
echo "Test 3: " . largestInteger(80, 9) . " // should return 80\\\n";

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