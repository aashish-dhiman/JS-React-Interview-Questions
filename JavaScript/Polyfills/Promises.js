if (!Promise.all) {
    Promise.all = function (promises) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError("Argument must be an array"));
            }

            let results = [];
            let completedPromises = 0;

            promises.forEach((promise, index) => {
                Promise.resolve(promise)
                    .then((result) => {
                        results[index] = result;
                        completedPromises++;

                        if (completedPromises === promises.length) {
                            resolve(results);
                        }
                    })
                    .catch(reject);
            });

            if (promises.length === 0) {
                resolve([]);
            }
        });
    };
}

if (!Promise.race) {
    Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError("Argument must be an array"));
            }

            promises.forEach((promise) => {
                Promise.resolve(promise).then(resolve, reject);
            });
            // for (let i = 0; i < promises.length; i++) {
            //     Promise.resolve(promises[i]).then(resolve, reject);
            // }
        });
    };
}

if (!Promise.any) {
    Promise.any = function (promises) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError("Argument must be an array"));
            }

            let rejections = [];
            let rejectedPromises = 0;

            promises.forEach((promise, index) => {
                Promise.resolve(promise)
                    .then(resolve)
                    .catch((error) => {
                        rejections[index] = error;
                        rejectedPromises++;

                        if (rejectedPromises === promises.length) {
                            reject(
                                new AggregateError(
                                    rejections,
                                    "All promises were rejected"
                                )
                            );
                        }
                    });
            });

            if (promises.length === 0) {
                reject(new AggregateError([], "No promises were passed"));
            }
        });
    };
}

// Polyfill for AggregateError if needed
if (typeof AggregateError === "undefined") {
    function AggregateError(errors, message) {
        this.name = "AggregateError";
        this.message = message || "";
        this.errors = errors;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AggregateError);
        }
    }
    AggregateError.prototype = Object.create(Error.prototype);
    AggregateError.prototype.constructor = AggregateError;
}

if (!Promise.allSettled) {
    Promise.allSettled = function (promises) {
        return new Promise((resolve) => {
            let results = [];
            let completedPromises = 0;

            promises.forEach((promise, index) => {
                Promise.resolve(promise)
                    .then((value) => {
                        results[index] = { status: "fulfilled", value: value };
                    })
                    .catch((reason) => {
                        results[index] = { status: "rejected", reason: reason };
                    })
                    .finally(() => {
                        completedPromises++;
                        if (completedPromises === promises.length) {
                            resolve(results);
                        }
                    });
            });

            if (promises.length === 0) {
                resolve([]);
            }
        });
    };
}

const promises = [
    Promise.resolve(1),
    Promise.reject("Error"),
    Promise.resolve(3),
];

Promise.allSettled(promises).then((results) => console.log(results));

// Output:
// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected", reason: "Error" },
//   { status: "fulfilled", value: 3 }
// ]
