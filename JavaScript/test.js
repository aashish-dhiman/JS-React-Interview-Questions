function mapUsingReduce(arr, cb) {
    return arr.reduce((acc, current, i, arr) => {
        acc.push(cb(acc, current, i, arr));
        return acc;
    }, []);
}
