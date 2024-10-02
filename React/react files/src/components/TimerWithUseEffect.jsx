import { useState, useEffect } from "react";

const TimerWithUseEffect = () => {
    const [time, setTime] = useState(0); // Timer state in seconds
    const [isActive, setIsActive] = useState(false); // State to check if timer is active
    const [isPaused, setIsPaused] = useState(true); // State to check if timer is paused

    // This useEffect controls the timer interval
    useEffect(() => {
        let interval = null;

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1); // Increment time by 1 second
            }, 1000);
        }

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, [isActive, isPaused, time]);

    // Start or Resume the timer
    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    // Pause the timer
    const handlePause = () => {
        setIsPaused(true);
    };

    // Reset the timer
    const handleReset = () => {
        setIsActive(false);
        setTime(0);
        setIsPaused(true);
    };

    return (
        <div className="timer">
            <h1 className="bg-gray-300 text-black">{time} seconds</h1>
            <div className="controls">
                {isPaused ? (
                    <button
                        className="border px-2 py-1 bg-gray-200"
                        onClick={handleStart}
                    >
                        Start
                    </button>
                ) : (
                    <button
                        className="border px-2 py-1 bg-gray-200"
                        onClick={handlePause}
                    >
                        Pause
                    </button>
                )}
                <button
                    className="border px-2 py-1 bg-gray-200"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default TimerWithUseEffect;
