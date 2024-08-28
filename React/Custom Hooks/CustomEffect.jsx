import { useRef } from "react";

const useCustomEffect = (cb, deps) => {
    const isFirstRender = useRef(true);
    const prevDeps = useRef([]);

    const runCleanup = (cleanup) => {
        if (cleanup && typeof cleanup === "function") {
            cleanup();
        }
    };

    //-- First Render
    if (isFirstRender.current) {
        isFirstRender.current = false;
        const cleanup = cb();
        // we return cleanup func form callback, and if it exists, we run it
         return () => runCleanup(cleanup);
    }

    //-- Deps change and no deps array
    // const depsChange = deps
    //     ? deps.some((dep, i) => dep !== prevDeps.current[i])
    //     : true;
    const depsChange = deps
        ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current)
        : true;

    if (depsChange) {
        const cleanup = cb();
        // in case if deps array exists, we run cleanup function else in case of no deps array, we don't run cleanup function
         return () => runCleanup(cleanup);
    }

    //-- if no deps array, we run cb function and cleanup function if it exists
    if (!deps) {
        const cleanup = cb();
         return () => runCleanup(cleanup);
    }

    //-- Store the current dependencies for the next render
    prevDeps.current = deps || [];
};

export default useCustomEffect;
