// Output based Questions

// Q1.
var fn = 1;
console.log(fn); // 1
function fn() {
    console.log("Inside fn");
}
console.log(fn); // 1
// Reason: initially in memory var fn is registered with undefined then gets over ride by function fn and we know function are not initialised again after hoisting. After execution starts fn will be initialised with 1.

// Q2.
var fn;
console.log(fn); // function
function fn() {
    console.log("Inside fn");
}
console.log(fn); // function
// Reason: initially in memory var fn is registered with undefined then gets over ride by function fn and after execution starts we are not initialising fn with any other value.

// Q3.
var x = 1;
function foo() {
    x = 10;
    function x() {}
    console.log("x: ", x); // 10
}
foo();
console.log(x); // 1

// Q4.
var x = 10;
function testNum() {
    console.log(x); // undefined
    if (true) {
        var x = 20;
    }
    console.log(x); //20
}
testNum();
console.log(x); //10

// Q5.
var x = 10;
function testNum() {
    console.log(x); // 10
    if (true) {
        let x = 20;
    }
    console.log(x); //10
}
testNum();
console.log(x); //10

// Q6.
function hoistingExample() {
    a = 1; // Variables which are assigned without a var declaration are considered to be global variables
}
hoistingExample();
console.log(a); //1
// ----------------------------
function hoistingExample() {
    var a = 1;
}
hoistingExample();
console.log(a); // undefined

// Q7.
function a() {
    console.log("1");
}
a(); // 2
function a() {
    console.log("2");
}
a(); // 2
