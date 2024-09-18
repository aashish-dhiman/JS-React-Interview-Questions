/*
    Q. Create a auto increment counter with start, pause and rest functionality

*/

import { useRef, useState } from "react";

const Auto_Increment_Counter = () => {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    let timer = useRef(null);

    const handleStart = () => {
        if (timer.current) return;
        setIsRunning(true);

        timer.current = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);
    };
    const handlePause = () => {
        clearInterval(timer.current);
        timer.current = null;
        setIsRunning(false);
    };
    const handleReset = () => {
        clearInterval(timer.current);
        timer.current = null;
        setIsRunning(false);
        setCount(0);
    };
    return (
        <div>
            <div className="flex flex-col gap-4 items-center justify-center">
                <div>{count}</div>
                <div className="flex gap-2">
                    <button
                        className="border px-2 py-1 bg-gray-200"
                        onClick={() =>
                            isRunning ? handlePause() : handleStart()
                        }
                    >
                        {isRunning ? "Resume" : "Start"}
                    </button>
                    <button
                        className="border px-2 py-1 bg-gray-200"
                        onClick={() => handleReset()}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auto_Increment_Counter;
