// Approach 1:
function flattenArray(arr) {
    const result = [];

    arr.forEach((item) => {
        if (Array.isArray(item)) {
            result.push(...flattenArray(item)); // Recursively flatten the nested array and spread the returned result
        } else {
            result.push(item); // Push non-array items directly
        }
    });

    return result;
}

// const arr = [1, 2, 3, [4, 5, [6], 7], 8, 9, 10];
// const flattened = flattenArray(arr);
// console.log(flattened); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/////////////////////////////////////////////////////////////

// Approach 2: Using reduce
function flattenArray(arr) {
    return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
            acc.push(...flattenArray(item)); // Recursively flatten the nested array and spread the returned result
        } else {
            acc.push(item); // Push non-array items directly
        }
        return acc;
    }, []);
}

// const arr = [1, 2, 3, [4, 5, [6], 7], 8, 9, 10];
// const flattened = flattenArray(arr);
// console.log(flattened); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


// Approach 3: Efficient Approach
function flattenArray(arr) {
    const result = [];
    const stack = [...arr]; // Start with a copy of the original array in the stack

    while (stack.length) {
        const item = stack.pop(); // Pop the last item in the stack

        if (Array.isArray(item)) {
            stack.push(...item); // Push all elements of the nested array onto the stack
        } else {
            result.unshift(item); // Push the item to the front of the result array
        }
    }

    return result;
}

const arr = [1, 2, 3, [4, 5, [6], 7], 8, 9, 10];
const flattened = flattenArray(arr);
console.log(flattened); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
