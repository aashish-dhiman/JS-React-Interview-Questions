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