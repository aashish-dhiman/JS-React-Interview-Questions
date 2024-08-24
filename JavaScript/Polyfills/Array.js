const students = [
    { name: "John", age: 20, grade: "A" },
    { name: "Alice", age: 22, grade: "B" },
    { name: "Bob", age: 21, grade: "C" },
    { name: "Emily", age: 19, grade: "A" },
    { name: "Michael", age: 23, grade: "B" },
];

// 1. pollyFill for Map
Array.prototype.myMap = function (cb) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        temp.push(cb(this[i], i, this));
    }
    return temp;
};
const mapped = students.myMap((student, i) => {
    return student.name.toUpperCase();
});

console.log(mapped);

// 2. polyfill for Filter
Array.prototype.myFilter = function (cb) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) temp.push(this[i]);
    }
    return temp;
};
const filtered = students.myFilter((student) => {
    return student.name.includes("A");
});

console.log(filtered);

// 3. polyfill for Reduce
Array.prototype.myReduce = function (cb, initialVal) {
    let acc = initialVal;
    for (let i = 0; i < this.length; i++) {
        if (acc !== undefined) {
            acc = cb(acc, this[i], i, this);
        } else {
            acc = this[i];
            // for given example have to set initial value as this.age
            // acc = this[i].age;
        }
    }
    return acc;
};
const reduced = students.myReduce((acc, student, i, arr) => {
    return acc + student.age;
}, 0);

console.log(reduced);

// 4. polyfill for forEach
Array.prototype.myForEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};

students.myForEach((element) => {
    console.log(element);
});

// 5. polyfill for Push method
Array.prototype.myPush = function (element) {
    this[this.length] = element;
    return this.length;
};

console.log([1, 2, 3, 4, 5].myPush(6));

// 6. polyfill for Pop method
Array.prototype.myPop = function () {
    let poppedElement = this[this.length - 1];
    this.length = this.length - 1;
    return poppedElement;
};

console.log([1, 2, 3, 4, 5].myPop());
