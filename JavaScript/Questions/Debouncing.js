/*
- Debouncing is a technique that prevents unnecessary executions by ensuring a task or operation is only executed once after a specified delay, even if it's triggered multiple times within that delay
*/
const debounce = function (fn, delay) {
    let timeout;
    return function (...args) {
        if (timeout) clearTimeout(timeout);

        let context = this;
        // let args = arguments;
        timeout = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
};

let counter = 0;
const fetchData = function () {
    console.log("It is debounced", counter++);
};

// call handleChange on input change
const handleChange = debounce(fetchData, 200);
