#include <iostream>
bool checkDiff(int a, int b) {
int sum = a + b;
int product = a * b;
int result = product - sum;
return (result % 10 == 0);}