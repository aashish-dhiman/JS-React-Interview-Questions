/* 
- Throttling is a technique used to control the rate at which a function is executed. It ensures that the function is called at most once within a specified time interval, regardless of how many times the event triggering the function is fired.
*/

const throttle1 = function (fn, limit) {
    let flag = true;
    return function () {
        let context = this;
        let args = arguments;
        if (flag) {
            fn.apply(context, args);
            flag = false;
            setTimeout(() => {
                flag = true;
            }, limit);
        }
    };
};

function throttle2(func, delay) {
    let timeout;
    return function () {
        if (!timeout) {
            func.apply(this, arguments);
            timeout = setTimeout(() => {
                timeout = null;
            }, delay);
        }
    };
}

let counter = 0;
const fetchData = function () {
    console.log("It is throttled", counter++);
};
const handleChange = throttle1(fetchData, 1000);
