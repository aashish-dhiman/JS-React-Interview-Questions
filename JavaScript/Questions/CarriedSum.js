// Q. implement a fn to handle carried sum such as:
// carriedSum(1,2)(3,4)
// carriedSum(1)(3,4)(2)
// carriedSum(1,2,3)(4)

// Sol. To implement a function that handles a carried sum in a curried fashion, allowing calls like carriedSum(1,2)(3,4) or carriedSum(1)(3,4)(2), we need to return a function that keeps accumulating the sum until it's explicitly invoked to return the final result

function carriedSum(...args1) {
    // Inner function to handle subsequent calls
    const sumFn = (...args2) => {
        // Concatenate the current arguments with the previous ones
        args1 = [...args1, ...args2];
        return sumFn;
    };

    // Convert the function to return the final sum when it's called as a value
    sumFn.valueOf = () => {
        return args1.reduce((acc, curr) => acc + curr, 0);
    };

    return sumFn;
}

// Usage examples
// The final sum is calculated and returned when the function is coerced to a primitive value, using the + operator or implicitly through console.log valueOf
console.log(+carriedSum(1, 2)(3, 4)); // Output: 10
console.log(carriedSum(1)(3, 4)(2).valueOf()); // Output: 10
console.log(+carriedSum(1, 2, 3)(4)); // Output: 10
console.log(+carriedSum(1)(2)(3)(4)(5)); // Output: 15
