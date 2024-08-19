
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
        output += "status=" + status + "\n";
        output += "feedback=" + testCase.feedback + "\n";
        output += "testNumber=" + std::to_string(testCase.testNumber) + "\n";
        output += ";\n";
    }

    // Add the total marks to the output
    output += "marks=" + std::to_string(totalMarks) + "\n";

    // Write the output to result.txt
    std::ofstream file("result.txt");
    if (file.is_open()) {
        file << output;
        file.close();
    } else {
        std::cerr << "Unable to open file for writing.\n";
    }
}

int main() {
    writeTestResults();
    return 0;
}

