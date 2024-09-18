import { useEffect, useMemo, useState } from "react";

const TrafficLight = () => {
    const [currentLight, setCurrentLight] = useState("red");

    // Define a mapping for the traffic light states and their durations
    const trafficLightStates = useMemo(() => {
        return {
            red: { next: "green", duration: 4000 }, // 4 seconds
            green: { next: "yellow", duration: 3000 }, // 3 seconds
            yellow: { next: "red", duration: 500 }, // 0.5 seconds
        };
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentLight((prevLight) => trafficLightStates[prevLight].next);
        }, trafficLightStates[currentLight].duration);

        // Clear the timeout when the component unmounts or before running the effect again
        return () => clearTimeout(timeout);
    }, [currentLight, trafficLightStates]); // Dependency on currentLight

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
                <div
                    className={`w-24 h-24 rounded-full mb-2 ${
                        currentLight === "red" ? "bg-red-600" : "bg-gray-400"
                    }`}
                />
                <div
                    className={`w-24 h-24 rounded-full mb-2 ${
                        currentLight === "yellow"
                            ? "bg-yellow-600"
                            : "bg-gray-400"
                    }`}
                />
                <div
                    className={`w-24 h-24 rounded-full ${
                        currentLight === "green"
                            ? "bg-green-600"
                            : "bg-gray-400"
                    }`}
                />
            </div>
            <h2 className="mt-4 text-xl font-semibold">
                {currentLight.charAt(0).toUpperCase() + currentLight.slice(1)}{" "}
                Light
            </h2>
        </div>
    );
};

export default TrafficLight;
