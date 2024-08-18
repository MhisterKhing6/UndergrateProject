
#The student is to write the function and submit in a file question.py
from question import largestInteger  # Import the function from question.py

def write_test_results():
    # Test cases with unique marks for each test
    test_cases = [
        {'firstNumber': 20, 'lastNumber': 4, 'expected': 20, 'testNumber': 1, 'marks': 5, 'feedback': "Test case for 5 and 10."},
        {'firstNumber': 30, 'lastNumber': 40, 'expected': 40, 'testNumber': 2, 'marks': 10, 'feedback': "Test case passed for 10."},
        {'firstNumber': 80, 'lastNumber': 9, 'expected': 80, 'testNumber': 3, 'marks': 15, 'feedback': "Test case passed for  by 5 and 20."},
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
        output += f"status={status}\n"
        output += f"feedback={test_case['feedback']}\n"
        output += f"testNumber={test_case['testNumber']}\n"
        output += ';\n'

    # Add the total marks to the output
    output += f"marks={total_marks}\n" 
    # Write the output to result.txt
    with open('result.txt', 'w') as file:
        file.write(output)

# Run the test
write_test_results()
