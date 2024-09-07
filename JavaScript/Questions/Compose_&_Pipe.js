// In JavaScript, `compose` and `pipe` are higher-order functions that allow you to combine multiple functions into a single function. These functions are often used in functional programming to create more readable and maintainable code.

// - `compose` applies functions from right to left.
// - `pipe` applies functions from left to right.

// ### Polyfill for `compose`
// using reduce
function compose(...fns) {
    return function (initialValue) {
        return fns.reduceRight((acc, fn) => fn(acc), initialValue);
    };
}

// more detailed polyfill
function compose(...fns) {
    return function (initialValue) {
        let result = initialValue;
        for (let i = fns.length - 1; i >= 0; i--) {
            result = fn[i](result);
        }
        return result;
    };
}

// Usage example
const add1 = (x) => x + 1;
const multiply1 = (x) => x * 2;

const composedFunction = compose(multiply1, add1);
console.log(composedFunction(5)); // Output: 12 (5 + 1 = 6, 6 * 2 = 12)

// ### Explanation of `compose`
// - **Arguments:** `compose` takes a list of functions as arguments (`...fns`).
// - **reduceRight:** It uses `reduceRight` to apply these functions from right to left, starting with the `initialValue`.
// - **Execution:** In the example, `multiply` is applied after `add`.

//////////////////////////////////////////////////////////////////////////////

// ### Polyfill for `pipe`
//using reduce
function pipe(...fns) {
    return function (initialValue) {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    };
}

//more detailed
// more detailed polyfill
function pipe(...fns) {
    return function (initialValue) {
        let result = initialValue;
        for (let i = 0; i < fns.length; i++) {
            result = fn[i](result);
        }
        return result;
    };
}

// Usage example
const add = (x) => x + 1;
const multiply = (x) => x * 2;

const pipedFunction = pipe(add, multiply);
console.log(pipedFunction(5)); // Output: 12 (5 + 1 = 6, 6 * 2 = 12)

// ### Explanation of `pipe`
// - **Arguments:** `pipe` also takes a list of functions as arguments (`...fns`).
// - **reduce:** It uses `reduce` to apply these functions from left to right, starting with the `initialValue`.
// - **Execution:** In the example, `add` is applied first, followed by `multiply`.
