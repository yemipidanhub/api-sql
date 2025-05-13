def max(list):
    maximum = list[0]
    for element in list:
        if maximum < element:
            maximum = element
    return maximum

def min(list):
    minimum = list[0]
    for element in list:
        if minimum > element:
            minimum = element
    return minimum

import random
def generate(no):
    array = []
    for i in range(no):
        array.append(random.randint(1, 20))
    return array

array = generate(10)
print(array)
print("Array Maximum", max(array))
print("Array Minimum", min(array))
