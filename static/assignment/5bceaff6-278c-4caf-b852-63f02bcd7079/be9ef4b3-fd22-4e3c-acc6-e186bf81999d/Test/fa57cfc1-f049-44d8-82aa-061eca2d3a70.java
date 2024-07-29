#include <iostream>
#include <fstream>
#include <string>

// Function to return the largest integer between a and b
int largestInteger(int a, int b);

// Function to write test results to a file
void writeTestResults() {
    std::ofstream outputFile("result.txt");

    // Check if the file is open
    if (!outputFile) {
        std::cerr << "Error: Could not open file for writing." << std::endl;
        return;
    }

    std::string feedback = "";
    std::string status = "";
    std::string testNumber = "";
    int totalMarks = 0;

    // Test 1
    int firstNumber = 30;
    int lastNumber = 50;
    if (largestInteger(firstNumber, lastNumber) == 50) {
        status = "pass";
        feedback = "amazing";
        testNumber = "1";
        totalMarks += 10;
    } else {
        status = "failed";
        feedback = "wrong";
        testNumber = "1";
    }
    outputFile << "status=" << status << "\n";
    outputFile << "feedback=" << feedback << "\n";
    outputFile << "testNumber=" << testNumber << "\n";
    outputFile << ";\n";

    // Test 2
    firstNumber = 50;
    lastNumber = 100;
    if (largestInteger(firstNumber, lastNumber) == 100) {
        status = "pass";
        feedback = "amazing";
        testNumber = "2";
        totalMarks += 10;
    } else {
        status = "failed";
        feedback = "wrong";
        testNumber = "2";
    }
    outputFile << "status=" << status << "\n";
    outputFile << "feedback=" << feedback << "\n";
    outputFile << "testNumber=" << testNumber << "\n";
    outputFile << ";\n";

    // Test 3
    firstNumber = 150;
    lastNumber = 100;
    if (largestInteger(firstNumber, lastNumber) == 150) {
        status = "pass";
        feedback = "amazing";
        testNumber = "3";
        totalMarks += 10;
    } else {
        status = "failed";
        feedback = "wrong";
        testNumber = "3";
    }
    outputFile << "status=" << status << "\n";
    outputFile << "feedback=" << feedback << "\n";
    outputFile << "testNumber=" << testNumber << "\n";
    outputFile << ";\n";

    // Test 4
    firstNumber = 350;
    lastNumber = 100;
    if (largestInteger(firstNumber, lastNumber) == 350) {
        status = "pass";
        feedback = "amazing";
        testNumber = "4";
        totalMarks += 10;
    } else {
        status = "failed";
        feedback = "wrong";
        testNumber = "4";
    }
    outputFile << "status=" << status << "\n";
    outputFile << "feedback=" << feedback << "\n";
    outputFile << "testNumber=" << testNumber << "\n";
    outputFile << ";\n";

    // Write the total marks
    outputFile << "marks=" << totalMarks << "\n";

    // Close the file
    outputFile.close();
}

int main() {
    writeTestResults();
    return 0;
}
