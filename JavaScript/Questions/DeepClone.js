function deepClone(value) {
    // Handle primitive types and functions
    if (typeof value !== "object" || value === null) {
        return value;
    }

    // Handle Date objects
    if (value instanceof Date) {
        return new Date(value);
    }

    // Handle Array
    if (Array.isArray(value)) {
        return value.map(deepClone);
    }

    // Handle Objects
    if (typeof value === "object") {
        const clone = {};
        for (let key in value) {
            if (value.hasOwnProperty(key)) {
                clone[key] = deepClone(value[key]);
            }
        }
        return clone;
    }

    throw new Error("Unsupported data type");
}

// Example usage:
const original = {
    name: "John",
    age: 30,
    hobbies: ["reading", "gaming"],
    address: {
        city: "New York",
        zip: 10001,
    },
    createdAt: new Date(),
};

const cloned = deepClone(original);
console.log(cloned);
