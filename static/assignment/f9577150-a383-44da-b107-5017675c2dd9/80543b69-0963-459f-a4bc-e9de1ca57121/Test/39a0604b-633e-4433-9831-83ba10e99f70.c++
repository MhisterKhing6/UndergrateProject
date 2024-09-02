// C++

#include <iostream>
#include <fstream>
#include <string>

int factorial(int n); // Import the function from factorial.cpp

void writeTestResults() {
    struct TestCase {
        int input;
        int expected;
        int testNumber;
        int marks;
        std::string feedback;
    };

    TestCase testCases[] = {
        {5, 120, 1, 20, "Test case passed for factorial of 5."},
        {5, 120, 5, 20, "Test case passed for factorial of 5."},
        {0, 1, 2, 20, "Test case passed for factorial of 0."},
        {1, 1, 3, 20, "Test case passed for factorial of 1."},
        {10, 3628800, 4, 20, "Test case passed for factorial of 10."}
    };

    int totalMarks = 0;
    std::string output;

    for (const auto& testCase : testCases) {
        int result = factorial(testCase.input);
        std::string status = (result == testCase.expected) ? "pass" : "failed";
        
        if (status == "pass") {
            totalMarks += testCase.marks;
        }

        output += "status=" + status + "\n";  
        output += "feedback=" + testCase.feedback + "\n";
        output += "testNumber=" + std::to_string(testCase.testNumber) + "\n";
        output += ";\n";
    }

    output += "marks=" + std::to_string(totalMarks) + "\n";

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

// Test Cases:
// Test Case 1: Factorial of 5
// Input: 5
// Expected Output: 120
// Feedback: Test case passed for factorial of 5.

// Test Case 2: Factorial of 0
// Input: 0
// Expected Output: 1
// Feedback: Test case passed for factorial of 0.

// Test Case 3: Factorial of 1
// Input: 1
// Expected Output: 1
// Feedback: Test case passed for factorial of 1.

// Test Case 4: