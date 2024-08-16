
#the student is exepcted to submit the solution in a file called question.py
from addNumber import addNumber

def write_test_results():
    test_cases = [
    {"first_number": 30, "last_number": 50, "expected": 80, "test_number": 1},
    {"first_number": 20, "last_number": 100, "expected": 120, "test_number": 2},
    {"first_number": 150, "last_number": 100, "expected": 250, "test_number": 3},
    {"first_number": 350, "last_number": 100, "expected": 450, "test_number": 4},
    ]

    total_marks = 0

    with open("result.txt", "w") as output_file:
        for test_case in test_cases:
            first_number = test_case["first_number"]
            last_number = test_case["last_number"]
            expected = test_case["expected"]
            test_number = test_case["test_number"]

            if addNumber(first_number, last_number) == expected:
                status = "pass"
                feedback = "amazing"
                total_marks += 10
            else:
                status = "failed"
                feedback = "wrong"

            output_file.write(f"status={status}\n")
            output_file.write(f"feedback={feedback}\n")
            output_file.write(f"testNumber={test_number}\n")
            output_file.write(";")

        # Write the total marks
        output_file.write(f"marks={total_marks}\n")


# Run the test
if __name__ == "__main__":
    write_test_results()
