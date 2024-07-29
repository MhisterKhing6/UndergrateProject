from pythonCs4.product20 import is_production_of_20

# Test cases
tests = [
    (lambda: is_production_of_20(20), "Test if 20 is a production of 20"),
    (lambda: is_production_of_20(10 * 2), "Test if 10 * 2 is a production of 20"),
    (lambda: is_production_of_20(20*3*4), "Test if 20*3*4 is a production of 20"),
    (lambda: is_production_of_20(4 * 5), "Test if 4 * 5 is a production of 20"),
]

output_file = "result.txt"

def run_tests(tests):
    mark = 0
    with open(output_file, 'w') as file:
        for testNumber, (test, description) in enumerate(tests, start=1):
            if test():
                feedback = "very good"
                status = "pass"
                mark += 20
            else:
                feedback = "failed"
                status = "fail"
            result = f"testNumber={testNumber}\nfeedback={feedback}\nstatus={status};"
            file.write(result + "\n")
        file.write(f"marks={mark}")

run_tests(tests)

print(f"Test results written to {output_file}")
