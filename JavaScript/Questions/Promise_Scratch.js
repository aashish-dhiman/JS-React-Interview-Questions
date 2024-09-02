class MyPromise {
    constructor(executor) {
        this.state = "pending"; // Initial state
        this.value = undefined; // Resolved value
        this.reason = undefined; // Rejected reason
        this.onFulfilledCallbacks = []; // Queue for .then handlers
        this.onRejectedCallbacks = []; // Queue for .catch handlers

        // The resolve function to change the state to fulfilled
        const resolve = (value) => {
            if (this.state === "pending") {
                this.state = "fulfilled";
                this.value = value;
                this.onFulfilledCallbacks.forEach((callback) =>
                    callback(this.value)
                );
            }
        };

        // The reject function to change the state to rejected
        const reject = (reason) => {
            if (this.state === "pending") {
                this.state = "rejected";
                this.reason = reason;
                this.onRejectedCallbacks.forEach((callback) =>
                    callback(this.reason)
                );
            }
        };

        try {
            executor(resolve, reject); // Execute the executor function with resolve and reject
        } catch (err) {
            reject(err); // If executor throws an error, reject the promise
        }
    }

    // The then method for handling resolved values
    then(onFulfilled, onRejected) {
        // If onFulfilled is not a function, make it a passthrough
        onFulfilled =
            typeof onFulfilled === "function" ? onFulfilled : (value) => value;

        // If onRejected is not a function, make it a passthrough
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : (reason) => {
                      throw reason;
                  };

        // Returning a new promise to chain
        return new MyPromise((resolve, reject) => {
            if (this.state === "fulfilled") {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolve(x);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }

            if (this.state === "rejected") {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolve(x);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }

            if (this.state === "pending") {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolve(x);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolve(x);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
            }
        });
    }

    // The catch method for handling rejected promises
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    // The finally method
    finally(onFinally) {
        return this.then(
            (value) => {
                return MyPromise.resolve(onFinally()).then(() => value);
            },
            (reason) => {
                return MyPromise.resolve(onFinally()).then(() => {
                    throw reason;
                });
            }
        );
    }
    // These methods are used within finally to create resolved promises from the onFinally callback, ensuring it runs asynchronously.
    static resolve(value) {
        return new MyPromise((resolve) => resolve(value));
    }

    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }
}

// Usage example
const customPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Success!");
    }, 1000);
});

customPromise
    .then((value) => {
        console.log(value); // "Success!"
        return value;
    })
    .catch((error) => {
        console.error(error);
    });
