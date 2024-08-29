
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
            output.append("status=").append(status).append("\n");
            output.append("feedback=").append(testCase.feedback).append("\n");
            output.append("testNumber=").append(testCase.testNumber).append("\n");
            output.append(";\n");
        }

        // Add the total marks to the output
        output.append("marks=").append(totalMarks).append("\n");

        // Write the output to result.txt
        try (PrintWriter writer = new PrintWriter(new FileWriter("result.txt"))) {
            writer.print(output.toString());
        } catch (IOException e) {
            System.err.println("Unable to open file for writing.");
        }
    }
}
