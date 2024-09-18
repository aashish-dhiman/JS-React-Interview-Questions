/**
 * Create a counter
 * create a button
 *
 * When you click on the button
 * counter should go from 5 to 0
 * decrementing every 1 second
 *
 * Reset button should reset all
 */
import { useState, useRef } from "react";

function Timer() {
    const [time, setTime] = useState(5);
    // to preserve interval id during rerender
    let interval = useRef(null);

    const handleClick = () => {
        if (interval.current) return;
        interval.current = setInterval(() => {
            setTime((prev) => {
                let newVal = prev - 1;
                if (newVal === 0) {
                    clearInterval(interval.current);
                }
                return newVal;
            });
        }, 1000);
    };
    const handleReset = () => {
        setTime(5);
        clearInterval(interval.current);
        interval.current = null;
    };

    return (
        <div>
            <div>{time}</div>
            <button onClick={() => handleClick()} className="border">
                Start
            </button>
            <button onClick={() => handleReset()} className="border">
                Reset
            </button>
        </div>
    );
}

export default Timer;
