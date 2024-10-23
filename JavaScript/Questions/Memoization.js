// Understand memoization is JavaScript:
// Memoization is a optimization technique of remembering the results of a function call for the same input.

function sumOfNumbers(num) {
    let sum = 0;
    for (let i = 1; i <= num; i++) {
        sum += i;
    }
    return sum;
}

function memoize(fun) {
    let cache = {};
    return function (num) {
        console.log(cache);
        if (cache[num]) {
            console.log("result from cache");
            return cache[num];
        }
        cache[num] = fun(num);
        console.log("result from function: first time calculation");
        return cache[num];
    };
}

const memoizedSumOfNumbers = memoize(sumOfNumbers);

console.time("memoization");
console.log(memoizedSumOfNumbers(100));
console.timeEnd("memoization");

console.log("-------------!-------------------");

console.time("memoization");
console.log(memoizedSumOfNumbers(100));
console.timeEnd("memoization");

console.log("-------------!-------------------");

console.time("memoization");
console.log(memoizedSumOfNumbers(500));
console.timeEnd("memoization");

console.log("-------------!-------------------");

console.time("memoization");
console.log(memoizedSumOfNumbers(100));
console.timeEnd("memoization");

// one more question from CARS 24-> sum of infinite params passed and
// for i/p 1,2,3 it computes but for 1,3,2 it shouldn't compute again so we sort it
function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        // Sort the arguments to ensure order doesn't matter
        const key = args.sort((a, b) => a - b).toString();

        if (cache.has(key)) {
            console.log("Fetching from cache");
            return cache.get(key);
        }

        console.log("Computing result");
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Function to sum all the arguments
function sum(...args) {
    return args.reduce((acc, curr) => acc + curr, 0);
}

// Memoized version of the sum function
const memoizedSum = memoize(sum);

// Example usage
console.log(memoizedSum(1, 2, 3)); // Computing result, output: 6
console.log(memoizedSum(3, 2, 1)); // Fetching from cache, output: 6
console.log(memoizedSum(1, 3, 2)); // Fetching from cache, output: 6
console.log(memoizedSum(4, 5)); // Computing result, output: 9
