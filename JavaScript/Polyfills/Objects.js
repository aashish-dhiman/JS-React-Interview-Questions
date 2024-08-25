// Object.assign
if (typeof Object.assign !== "function") {
    Object.assign = function (target, ...sources) {
        if (target == null) {
            throw new TypeError("Cannot convert undefined or null to object");
        }

        let to = Object(target);

        sources.forEach((source) => {
            if (source != null) {
                for (let key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        to[key] = source[key];
                    }
                }
            }
        });

        return to;
    };
}

// Object.keys
if (typeof Object.keys !== "function") {
    Object.keys = function (obj) {
        if (obj === null || typeof obj !== "object") {
            throw new TypeError("Object.keys called on non-object");
        }

        let keys = [];
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                keys.push(key);
            }
        }

        return keys;
    };
}

// Object.values
if (typeof Object.values !== "function") {
    Object.values = function (obj) {
        if (obj === null || typeof obj !== "object") {
            throw new TypeError("Object.values called on non-object");
        }

        let values = [];
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                values.push(obj[key]);
            }
        }

        return values;
    };
}

// Object.entries
if (typeof Object.entries !== "function") {
    Object.entries = function (obj) {
        if (obj === null || typeof obj !== "object") {
            throw new TypeError("Object.entries called on non-object");
        }

        let entries = [];
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                entries.push([key, obj[key]]);
            }
        }

        return entries;
    };
}
