// Q. given two array name and marks arrange the name array based on decreasing order of corresponding marks

function arrangeNamesByMarks(names, marks) {
    // Create an array of objects with name and marks
    const nameMarksPairs = names.map((name, index) => ({
        name,
        marks: marks[index],
    }));

    // Sort the array of objects by marks in descending order
    nameMarksPairs.sort((a, b) => b.marks - a.marks);

    // Extract the names from the sorted array
    const arrangedNames = nameMarksPairs.map((pair) => pair.name);

    return arrangedNames;
}

// Example usage:
const names = ["Alice", "Bob", "Charlie", "David"];
const marks = [85, 92, 78, 90];

const arrangedNames = arrangeNamesByMarks(names, marks);
console.log(arrangedNames); // Output: ["Bob", "David", "Alice", "Charlie"]
