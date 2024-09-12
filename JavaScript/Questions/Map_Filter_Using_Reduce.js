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

// General form
const mapUsingReduce = (array, callback) => {
  return array.reduce((acc, current, index, arr) => {
    acc.push(callback(current, index, arr));
    return acc;
  }, []);
};

// Example usage:
const nums = [1, 2, 3, 4];
const squared = mapUsingReduce(nums, (num) => num * num);
console.log(squared); // Output: [1, 4, 9, 16]


// Filter using Reduce ->
// Let's filter out even elements
const filteredValue = arr.reduce((acc, item, i, arr) => {
    if (item % 2 === 0) {
        acc.push(item);
    }
    return acc;
}, []);

// general approach
const filterUsingReduce = (array, callback) => {
  return array.reduce((acc, current, index, arr) => {
    if (callback(current, index, arr)) {
      acc.push(current);
    }
    return acc;
  }, []);
};

// Example usage:
const numsArr = [1, 2, 3, 4];
const evens = filterUsingReduce(numsArr, (num) => num % 2 === 0);
console.log(evens); // Output: [2, 4]


console.log("filteredValue: ", filteredValue);
