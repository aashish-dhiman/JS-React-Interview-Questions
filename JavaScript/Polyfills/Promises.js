// Polyfill for Promise.all ->
// This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.
Promise.myAll = function (promises) {
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

///////////////////////////////////////////////////////////////

// Polyfill for Promise.race ->
// This returned promise settles with the eventual state of the first promise that settles.
Promise.myRace = function (promises) {
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

///////////////////////////////////////////////////

// Polyfill for Promise.any ->
// This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value. It rejects when all of the input's promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.
Promise.myAny = function (promises) {
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

/////////////////////////////////////////////////////////////

// Polyfill for Promise.allSettled ->
// This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), with an array of objects that describe the outcome of each promise.
Promise.myAllSettled = function (promises) {
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

const promises = [
    Promise.resolve(1),
    Promise.reject("Error"),
    Promise.resolve(3),
];

Promise.myAllSettled(promises).then((results) => console.log(results));

// Output:
// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected", reason: "Error" },
//   { status: "fulfilled", value: 3 }
// ]
