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
console.log(get_arr[0]());
console.log(get_arr[1]());
console.log(get_arr[2]());
console.log(get_arr[3]());
