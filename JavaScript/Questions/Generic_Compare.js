// Implement a generic compare function in javascript to compare two values and values can be nested objects, arrays, strings, and can be a mix of all data types

function compare(val1, val2) {
    // Check if both are objects or arrays and also not null as null type is also object
    if (
        typeof val1 === "object" &&
        val1 !== null &&
        typeof val2 === "object" &&
        val2 !== null
    ) {
        // Check if both are arrays
        if (Array.isArray(val1) && Array.isArray(val2)) {
            if (val1.length !== val2.length) return false; // Length mismatch
            for (let i = 0; i < val1.length; i++) {
                if (!compare(val1[i], val2[i])) return false; // Recursive comparison
            }
            return true;
        }

        // Compare object keys and values
        const keys1 = Object.keys(val1);
        const keys2 = Object.keys(val2);

        if (keys1.length !== keys2.length) return false; // Key length mismatch

        for (let key of keys1) {
            if (!compare(val1[key], val2[key])) return false; // Recursive comparison
        }

        return true;
    }
    // Primitive values (including strings, numbers, booleans, null, undefined)
    return val1 === val2;
}

// Examples:
console.log(compare({ a: 1, b: [2, 3] }, { a: 1, b: [2, 3] })); // true
console.log(compare([1, 2, 3], [1, 2, 3])); // true
console.log(compare({ a: 1 }, { a: 2 })); // false
console.log(compare({ a: { b: 2 } }, { a: { b: 2 } })); // true
console.log(compare("hello", "hello")); // true
console.log(compare(null, null)); // true
console.log(compare(undefined, undefined)); // true
