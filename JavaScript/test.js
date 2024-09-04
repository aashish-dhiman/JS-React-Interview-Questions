Array.prototype.myPush = function (...elements) {
    elements.forEach((element) => {
        this[this.length] = element;
    });

    return this.length;
};

console.log([1, 2, 3, 4, 5].myPush(6, 7, 8));
