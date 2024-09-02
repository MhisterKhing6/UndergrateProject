# Test Script for Power Function in Python

# Import the power function from power.py
from power import power

# Define the test cases
test_cases = [
    {'a': 2, 'b': 3, 'expected': 8, 'test_number': 1, 'marks': 5, 'feedback': "Test case passed for positive integers."},
    {'a': 0, 'b': 5, 'expected': 0, 'test_number': 2, 'marks': 5, 'feedback': "Test case passed for zero as base."},
    {'a': -2, 'b': 3, 'expected': -8, 'test_number': 3, 'marks': 5, 'feedback': "Test case passed for negative base."},
    {'a': 5, 'b': 0, 'expected': 1, 'test_number': 4, 'marks': 5, 'feedback': "Test case passed for any base raised to power 0."},
    {'a': -3, 'b': 2, 'expected': 9, 'test_number': 5, 'marks': 5, 'feedback': "Test case passed for negative base and positive power."},
]

# Initialize variables
total_marks = 0
output = ""

# Run the test cases
for test_case in test_cases:
    result = power(test_case['a'], test_case['b'])
    status = 'pass' if result == test_case['expected'] else 'failed'
    
    if status == 'pass':
        total_marks += test_case['marks']

    output += f"status={status}\n"
    output += f"feedback={test_case['feedback']}\n"
    output += f"testNumber={test_case['test_number']}\n"
    output += ";\n"

output += f"marks={total_marks}\n"
output += "completion\n"

# Write the results to result.txt
with open('result.txt', 'w') as file:
    file.write(output)
