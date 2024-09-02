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

// 3. polyfill for Reduce and ReduceRight
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

////////////////////////////////////////////////////////////////////
Array.prototype.myReduceRight = function (cb, initialVal) {
    let acc = initialVal;
    for (let i = this.length - 1; i >= 0; i--) {
        if (acc !== undefined) {
            acc = cb(acc, this[i], i, this);
        } else {
            acc = this[i];
        }
    }
    return acc;
};

// Usage example
const arr = [1, 2, 3, 4];
const sum = arr.myReduceRight((acc, curr) => acc + curr, 0);
console.log(sum); // Output: 10

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

// 7. polyfill for GroupBy method
Array.prototype.myGroupBy = function (callback) {
    return this.reduce((acc, item) => {
        const key = callback(item);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
};

// 8. polyfill for find and findIndex method
Array.prototype.myFind = function (callback) {
    for (let i = 0; i < this.length; i++) {
        const res = callback(this[i], i, this);
        if (res) {
            return this[i];
        }
    }
    return undefined;
};

Array.prototype.myFindIndex = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return i;
        }
    }
    return -1;
};

// 9. Polyfill of every() method
Array.prototype.myEvery = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i], i, this)) {
            return false;
        }
    }
    return true;
};

// 10. Polyfill of some() method
Array.prototype.mySome = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return true;
        }
    }
    return false;
};

// 11. Polyfill of shift() method
Array.prototype.myShift = function () {
    if (this.length > 0) {
        const firstEl = this[0];

        for (let i = 0; i < this.length - 1; i++) {
            this[i] = this[i + 1];
        }

        this.length -= 1;

        return firstEl;
    }
};

// 12. Polyfill of unshift() method
Array.prototype.myUnshift = function () {
    if (arguments.length > 0) {
        // move elements of the array ahead
        for (let i = this.length - 1; i >= 0; i--) {
            this[i + arguments.length] = this[i];
        }

        // add the args elements at the start
        for (let i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
        }
    }

    return this.length;
};

// 13. Polyfill for flat method
Array.prototype.myFlat = function (depth) {
    const flatten = function (arr, depth) {
        return depth > 0
            ? arr.reduce(
                  (acc, val) =>
                      acc.concat(
                          Array.isArray(val) ? flatten(val, depth - 1) : val
                      ),
                  []
              )
            : arr.slice(); // Ensures a shallow copy of the array when depth is 0
    };

    return flatten(this, depth === undefined ? 1 : depth);
};

// 14. Polyfill for slice method
Array.prototype.mySlice = function (start = 0, end = this.length) {
    let ans = [];

    // Handle negative start
    if (start < 0) {
        start = Math.max(this.length + start, 0);
    }

    // Handle negative end
    if (end < 0) {
        end = Math.max(this.length + end, 0);
    }

    for (let i = start; i < end && i < this.length; i++) {
        ans.push(this[i]);
    }
    return ans;
};

// 15. Polyfill for splice method
Array.prototype.mySplice = function (start, deleteCount, ...items) {
    let removed = [];
    let len = this.length;

    // Handle negative start index
    if (start < 0) {
        start = Math.max(len + start, 0);
    } else {
        start = Math.min(start, len);
    }

    // Handle deleteCount
    if (deleteCount === undefined) {
        deleteCount = len - start;
    } else {
        deleteCount = Math.min(Math.max(deleteCount, 0), len - start);
    }

    // Remove elements
    for (let i = 0; i < deleteCount; i++) {
        removed.push(this[start + i]);
    }

    // Move elements after the removed ones
    let itemsToMove = this.slice(start + deleteCount);
    this.length = start + items.length; // Adjust length for insertion

    // Insert new items
    for (let i = 0; i < items.length; i++) {
        this[start + i] = items[i];
    }

    // Add the remaining elements back
    for (let i = 0; i < itemsToMove.length; i++) {
        this[start + items.length + i] = itemsToMove[i];
    }

    return removed;
};
