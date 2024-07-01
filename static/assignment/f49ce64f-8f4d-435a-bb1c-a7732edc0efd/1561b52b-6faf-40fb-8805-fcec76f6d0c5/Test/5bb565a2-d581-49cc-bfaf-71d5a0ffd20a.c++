#include <iostream>
#include <fstream>
#include <string>

//function declaration
bool checkDiff(int a, int b);

double multiply3(double a);

int main() {
    // Create an output file stream
    std::ofstream outFile("result.txt");
    std::string feedback = "";
    int testNumber = 1;
    std::string status = "";

    //general marking
    double mark = 0;
    double completion = 0;
    // Check if the file is open
    if (outFile.is_open()) {
        // Write to the file
        testNumber = 1;
        status = "fail";
        if(checkDiff(10,20)) {
            feedback = "Amazinly good";
            status = "pass";
            mark += 20;
            completion += 10;
        } else {
            feedback = "test failed";
        }
        outFile<<"testNumber="<< testNumber <<std::endl << "status=" << status <<std::endl<<"feedback="<<feedback << ";";
        
        testNumber=2;
        status="fail";
        if(!checkDiff(5, 7)) {
            feedback = "Amazinly good";
            status = "pass";
            mark += 20;
            completion += 10;
        } else {
            feedback = "poor test failed for a number";
        }
        outFile<<"testNumber="<<testNumber<<std::endl << "status=" << status <<std::endl<<"feedback="<<feedback << ";";

        testNumber = 3;
        status = "fail";
        if(multiply3(10) == 30) {
            feedback = "Amazinly good";
            status = "pass";
            mark += 20;
            completion += 10;
        } else {
            feedback = "test failed";
        }
        outFile<<"testNumber="<< testNumber <<std::endl << "status=" << status <<std::endl<<"feedback="<<feedback << ";";
        
        testNumber = 4;
        status = "fail";
        if(multiply3(20) == 60) {
            feedback = "Amazinly good";
            status = "pass";
            mark += 20;
            completion += 10;
        } else {
            feedback = "test failed";
        }
        outFile<<"testNumber="<< testNumber <<std::endl << "status=" << status <<std::endl<<"feedback="<<feedback << ";";
        
        outFile << "mark=" << mark << std::endl;
        outFile << "completion="<< completion << std::endl;

        // Close the file
        outFile.close();
        std::cout << "Data written to file successfully." << std::endl;
    } else {
        std::cerr << "Unable to open file for writing." << std::endl;
    }

    return 0;
}
