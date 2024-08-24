/*
- Currying is a function that takes one argument at a time and returns a new function expecting the next argument.
- It is a transformation of functions that translates a function from callable as f(a, b, c) into callable as f(a)(b)(c).

- Currying in JavaScript is a functional programming technique where a function with multiple arguments 
is transformed into a sequence of nested functions, each taking a single argument. 

- Closure helps to transform our normal function into currying function.
*/

let add = function (x) {
    return function (y) {
        return function (z) {
            return x + y + z;
        };
    };
};

console.log(add(2)(4)(6));

// infinite or recursive implementation
const infiniteCurrying = (x) => {
    return (y) => {
        if (y !== undefined) return infiniteCurrying(x + y);
        return x;
    };
};
console.log(infiniteCurrying(1)(2)(3)());
