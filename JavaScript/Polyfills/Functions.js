const obj1 = {
    first: "Aashish",
};

const greet = function (...args) {
    console.log(`Hello ${this.first} ${args}`);
};

// Actual Functions->
greet.apply(obj1, ["Software", "Engineer"]);
greet.call(obj1, "Software", "Developer");
const fn1 = greet.bind(obj1, "FullStack", "Developer");
fn1();

// Let's write Polyfills ->
Function.prototype.myApply = function (context = {}, args) {
    if (typeof this !== "function") {
        return new Error("Not a function");
    }
    if (!Array.isArray(args)) {
        return new Error("Second argument should be an array");
    }
    context.fn = this;
    context.fn(...args);
};

Function.prototype.myCall = function (context = {}, ...args) {
    if (typeof this !== "function") {
        return new Error("Not a function");
    }

    context.fn = this;
    context.fn(...args);
};

Function.prototype.myBind = function (context = {}, ...args) {
    if (typeof this !== "function") {
        return new Error("Not a function");
    }
    context.fn = this;
    return (...innerArgs) => {
        context.fn(...args, ...innerArgs);
    };
};

greet.myApply(obj1, ["Software", "Engineer"]);
greet.myCall(obj1, "Software", "Developer");
const fn = greet.myBind(obj1, "FullStack", "Developer");
fn("Professional");
