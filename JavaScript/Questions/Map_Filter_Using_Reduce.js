// Q. Implement map and filter using reduce:

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// Map using Reduce ->
// Let's multiply each element by 2
const mappedValue = arr.reduce((acc, item, i, arr) => {
    const newItem = item * 2;
    acc.push(newItem);
    return acc;
}, []);

console.log("mappedValue: ", mappedValue);

// Filter using Reduce ->
// Let's filter out even elements
const filteredValue = arr.reduce((acc, item, i, arr) => {
    if (item % 2 === 0) {
        acc.push(item);
    }
    return acc;
}, []);

console.log("filteredValue: ", filteredValue);
