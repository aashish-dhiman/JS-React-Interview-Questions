// Q1.
for (var i = 0; i < 5; i++) {
    setTimeout(function result() {
        console.log(i);
    }, 1000);
}

// Output: 5 5 5 5 5

// q2.
for (var i = 0; i < 5; i++) {
    (function () {
        var j = i;
        setTimeout(function result() {
            console.log(j);
        }, 1000);
    })();
}

// Output: 0 1 2 3 4

// Q3.
// Outer function
function outer() {
    var arr = [];
    var i;
    for (i = 0; i < 4; i++) {
        // storing anonymous function
        arr[i] = function () {
            return i;
        };
    }
    // returning the array.
    return arr;
}
var get_arr = outer();
console.log(get_arr[0]()); //4
console.log(get_arr[1]()); //4
console.log(get_arr[2]()); //4
console.log(get_arr[3]()); //4

// Q4.
function outer() {
    var arr = [];
    var i;
    for (i = 0; i < 4; i++) {
        //IIFE
        (function (i) {
            // storing anonymous function
            arr[i] = function () {
                return i;
            };
        })(i);
    }
    // returning the array.
    return arr;
}
var get_arr = outer();
console.log(get_arr[0]()); //0
console.log(get_arr[1]()); //1
console.log(get_arr[2]()); //2
console.log(get_arr[3]()); //3
