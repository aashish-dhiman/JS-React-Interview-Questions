setTimeout(() => {
    console.log("1");
}, 0);
setTimeout(() => {
    console.log("3");
}, 1000);
setTimeout(() => {
    console.log("2");
}, 0);

function f() {
    for (let i = 0; i < 10000000000; i++) {}
}

f();

// output: 1 2 3
