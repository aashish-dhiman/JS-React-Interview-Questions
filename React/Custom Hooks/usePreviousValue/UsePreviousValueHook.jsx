// Implement a custom react hook which will always return the previous value -
// you can use the useRef hook for this purpose- due to the async nature of react state,
// the prev ref will be updated before the next render cycle and It will return the previously stored reference.

import { useState, useEffect, useRef } from "react";

function usePrevious(value) {
    // useRef to store the previous value
    const ref = useRef();

    // Store the current value to be used next render
    useEffect(() => {
        ref.current = value;
    }, [value]); // Runs every time the value changes

    // Return the previous value (which is stored in ref.current)
    return ref.current;
}

function CustomPreviousHook() {
    const [count, setCount] = useState(0);

    // Get the previous value of count
    const prevCount = usePrevious(count);

    useEffect(() => {
        console.log(`Current Count: ${count}, Previous Count: ${prevCount}`);
    }, [count, prevCount]);

    return (
        <div>
            <p>Current Count: {count}</p>
            <p>Previous Count: {prevCount}</p>
            <button className="border p-1" onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}

export default CustomPreviousHook;
