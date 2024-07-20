#include <iostream>
#include <fstream>
#include <string>

// Function to check if a number is divisible by 10
bool isDivisibleBy10(int number);

// Function to write test results to a file
void writeTestResults() {
    std::ofstream outputFile("result.txt");

    // Check if the file is open
    if (!outputFile) {
        std::cerr << "Error: Could not open file for writing." << std::endl;
        return;
    }

    // Define test cases
    struct TestCase {
        int number;
        bool expected;
        std::string positiveFeedback;
        std::string negativeFeedback;
    };
    
    TestCase testCases[] = {
        {20, true, "Test case passed for number divisible by 10.", "Test Failed for some Integers"},
        {30, true, "Test case passed for number divisible by 10.", "Test Failed for 30"},
        {15, false, "Test case passed for number not divisible by 10.", "Test failed for 15"},
        {0, true, "Test case passed for zero which is divisible by 10.", "Test failed for 0"}
    };

    int totalMarks = 0;

    // Iterate over test cases and write results to the file
    for (int i = 0; i < sizeof(testCases) / sizeof(testCases[0]); ++i) {
        TestCase& test = testCases[i];
        bool result = isDivisibleBy10(test.number);
        bool passed = (result == test.expected);
        
        outputFile << "status=" << (passed ? "pass" : "fail") << "\n";
        outputFile << "feedback=" <<(passed ? test.positiveFeedback : test.negativeFeedback) <<  "\n";
        outputFile << "testNumber=" << (i + 1) << "\n";
        outputFile << ";\n";

        // Accumulate total marks (if any specific criteria are used, update here)
        if (passed) {
            totalMarks += 10; // Example if we are tracking total marks, even if individual tests don't show marks
        }
    }

    // Write the total marks
    outputFile << "marks" << "=" << totalMarks << "\n";

    // Close the file
    outputFile.close();

}

int main() {
    writeTestResults();
    return 0;
}
