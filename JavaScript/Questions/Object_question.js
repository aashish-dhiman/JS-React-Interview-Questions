/* Q1: Create a function getValueByPath that takes two arguments:
The nested object (like data).
A string path (like "user.profile.settings.notifications.email").
The function should return the value at the specified path in the object, or undefined if the path does not exist.

*/
// This question was asked in Groww SDE Intern Interview
const data = {
    user: {
        profile: {
            details: {
                name: {
                    firstName: "Aashish",
                    lastName: "Dhiman",
                },
            },
            settings: {
                theme: "dark",
                notifications: {
                    email: true,
                    sms: false,
                },
            },
        },
    },
};

function getValueByPath(obj, path) {
    const properties = path.split(".");

    let current = obj;

    for (let i = 0; i < properties.length; i++) {
        const prop = properties[i];

        if (!current[prop]) {
            return undefined; // Return undefined if the property doesn't exist
        }

        current = current[prop];
    }

    return current;
}

console.log(getValueByPath(data, "user.profile.details.name.firstName")); // Outputs: "Aashish"
console.log(getValueByPath(data, "user.profile.details.address")); // Outputs: undefined

///////////////////////////////////////////////////////////////////////

/* Q 2: Write a function setValueByPath(obj, path, value) that takes:
 an object, 
 a string path (like "user.profile.details.firstName"), 
 and a value, 
 then sets the value at the specified path in the object. 
 If the path doesn't exist, it should create the necessary structure.
 */

function setValueByPath(obj, path, value) {
    // Split the path into an array of keys
    const keys = path.split(".");

    // Iterate through the keys, except the last one
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        // If the key doesn't exist, create an empty object at that key
        if (!current[key]) {
            current[key] = {};
        }

        // Move to the next level in the object
        current = current[key];
    }

    // Set the value at the final key
    current[keys[keys.length - 1]] = value;
}

// Example usage
const obj = {};
setValueByPath(obj, "user.profile.details.firstName", "Aashish");
console.log(obj.user.profile.details.firstName); // Outputs: "Aashish"
console.log(JSON.stringify(obj)); // Outputs: "Aashish"

////////////////////////////////////////////////////////

/* Q 3: Given a object containing data of student with their name and score in each subject.
Calculate the avg marks of each student.

 */

const students = {
    Alice: { math: 85, english: 70 },
    Bob: { math: 45, english: 60 },
    Amit: { math: 35, english: 86 },
};

// Solution
const keys = Object.keys(students);
const studentAvg = keys.map((student) => {
    const scores = Object.values(students[student]);
    const avgScore =
        scores.reduce((acc, mark) => acc + mark, 0) / scores.length;

    return { [student]: avgScore };
});
console.log(studentAvg);
