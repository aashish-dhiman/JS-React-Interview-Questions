// const obj = {
//     ad: 1,
// };
// console.log(Object.prototype.hasOwnProperty.call(obj,"ad"));

// setTimeout(() => {
//     console.log("1");
// }, 0);
// setTimeout(() => {
//     console.log("3");
// }, 1000);
// setTimeout(() => {
//     console.log("2");
// }, 0);

// function f() {
//     for (let i = 0; i < 10000000000; i++) {}
// }

// f();

Array.prototype.myFlat = function (depth) {
    let flatten = function (arr, depth) {
        return depth > 0
            ? arr.reduce(
                  (acc, val) =>
                      acc.concat(
                          Array.isArray(val) ? flatten(val, depth - 1) : val
                      ),
                  []
              )
            : arr;
    };

    return flatten(this, depth || 1);
};

let arr = [1, 2, 3, [4, [45, 6, [6, 7]]]];
arr.myFlat(3);
console.log(arr);
