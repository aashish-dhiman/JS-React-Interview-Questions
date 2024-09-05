import { useEffect, useRef } from "react";

function areEqual(newDeps, oldDeps) {
    if (newDeps.length !== oldDeps.length) {
        return false;
    }

    for (let i = 0; i < newDeps.length; i++) {
        if (newDeps[i] !== oldDeps[i]) {
            return false;
        }
    }

    return true;
}

function useCustomMemo(cb, deps) {
    // 1. Persist the value of the callback function
    // We'll use useRef as it persists values for the full lifetime of component
    const memoisedValue = useRef(null);

    // 2. Check for deps changes
    // If the dependencies change, we'll re-run the callback function
    if (!memoisedValue.current || !areEqual(deps, memoisedValue.current.deps)) {
        memoisedValue.current = {
            value: cb(),
            deps,
        };
    }

    // 3. Perform the clean up on unmount
    // We'll use useEffect with an empty dependency array to perform clean up
    useEffect(() => {
        return () => {
            memoisedValue.current = null;
        };
    }, []);

    // 4. Return the memoised value
    return memoisedValue.current.value;
}

export default useCustomMemo;
