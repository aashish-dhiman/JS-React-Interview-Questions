function fn() {
    try {
        console.log(1);
        return;
    } catch (e) {
        console.log(2);
    } finally {
        console.log(3);
    }
    console.log(4);
}
fn();
// OP: 1 3

(async function () {
    console.log(1);
    setTimeout(() => console.log(2), 0);
    await Promise.resolve().then(() => console.log(3));
    setTimeout(() => console.log(4), 0);
    console.log(5);
    await Promise.resolve().then(() => console.log(6));
    Promise.reject().catch(() => console.log(7));
    console.log(8);
})();

// OP: 1 3 5 6 8 7 2 4 : because of await Promise.then() will run first as await will pause the execution
// and reject.catch() will run in next tick of event loop as we are not using await there

console.log([1, 2] == "1,2");
// op: true because non primitive will be converted to primitive "1,2"=="1,2"

// Q: Asked in CRED Frontend Interview Q:
// Given an array of Promises and output of each promise is used as input of next promises.
// Write a function to find final output and in case of reject maintain a separate array to find out which promise is rejected
// Given:
const arr = [
    function () {
        return new Promise((res, rej) => {
            setTimeout(() => res(10), 1000);
        });
    },
    function (param) {
        console.log("param is", param);
        return new Promise((res) => {
            setTimeout(() => res(10 + param), 1000);
        });
    },
    function (param) {
        console.log("param is", param);
        return new Promise((res, rej) => {
            setTimeout(() => rej(10 + param), 1000);
        });
    },
    function (param) {
        console.log("param is", param);
        return new Promise((res) => {
            setTimeout(() => res(10 + param), 1000);
        });
    },
    function (param) {
        console.log("param is", param);
        return new Promise((res, rej) => {
            setTimeout(() => rej(10 + param), 1000);
        });
    },
];

// Answer:
async function executeSequentiallyWithRejections(arr) {
    let input = undefined;
    let rejectedPromises = []; // Array to track rejected promises

    for (let i = 0; i < arr.length; i++) {
        try {
            // Execute the current function and wait for its result
            input = await arr[i](input);
        } catch (error) {
            // Log the rejection and add it to the rejectedPromises array
            console.error(
                `Promise at index ${i} was rejected with error:`,
                error
            );
            rejectedPromises.push({ index: i, error });
        }
    }

    // Log the final resolved value and the rejected promises
    console.log("Final resolved value:", input);
    console.log("Rejected promises:", rejectedPromises);

    return { finalOutput: input, rejectedPromises };
}

executeSequentiallyWithRejections(arr);
