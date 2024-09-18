/*
Q. Create a autocomplete search using debouncing for optimisation
*/

import { useEffect, useRef, useState } from "react";

const AutoComplete = () => {
    // City data for autocompletion
    const data = [
        "Amsterdam",
        "Berlin",
        "London",
        "New York",
        "Paris",
        "Rome",
        "San Francisco",
        "Tokyo",
        "Washington DC",
        "Zurich",
        "Copenhagen",
        "Helsinki",
        "Madrid",
        "Reykjavik",
        "Stockholm",
        "Vancouver",
        "Vienna",
        "Zagreb",
        "Budapest",
        "Dublin",
        "Hamburg",
        "Krakow",
        "Lisbon",
        "Ljubljana",
    ];

    // State variables for user input and filtered data display
    const [inputValue, setInputValue] = useState("");
    const [show, setShow] = useState(false);
    const [filteredData, setFilteredData] = useState(data);

    // Ref to manage the autocomplete component element
    const autocompleteRef = useRef(null);

    // Timeout ref for debouncing functionality
    let timeout = useRef(null);

    // Handles document click to close autocomplete list on outside click
    useEffect(() => {
        const handleFocus = (e) => {
            // Check if click is outside the autocomplete component
            if (
                autocompleteRef.current &&
                !autocompleteRef.current.contains(e.target)
            ) {
                setShow(false); // Close list on outside click
            } else {
                setShow(true); // Open list on focus or inside click
            }
        };

        // Add click event listener on document
        document.addEventListener("click", handleFocus);

        // Cleanup function to remove listener on unmount
        return () => document.removeEventListener("click", handleFocus);
    }, []);

    // Debounce function to delay execution for a specified time
    const debounce = (fn, delay) => {
        return (...args) => {
            if (timeout.current) clearTimeout(timeout.current); // Clear previous timeout
            timeout.current = setTimeout(() => fn(...args), delay); // Set new timeout
        };
    };

    // Filters data based on user input (case-insensitive)
    const filterData = (value) => {
        if (value.trim() === "") {
            setFilteredData(data); // Show all data if input is empty
        } else {
            const newData = data.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            console.log("newData: ", newData);
            setFilteredData(newData); // Update filtered data
            console.log("Search API called"); // (Simulate) Search API call
        }
    };

    // Debounced version of filterData for delayed filtering
    const debouncedFilterData = debounce(filterData, 300); // Delay by 300 ms

    // Handles user input change, updates state and triggers debounced filtering
    const handleChange = (e) => {
        setInputValue(e.target.value);
        debouncedFilterData(e.target.value); // Call debounced filter function
    };

    return (
        <div className="mx-auto max-w-sm" ref={autocompleteRef}>
            <input
                type="text"
                name="cityName"
                value={inputValue}
                className="border w-full p-1"
                placeholder="enter city name"
                onChange={(e) => handleChange(e)}
            />
            {show && (
                <ul className="max-h-[200px] overflow-y-scroll mt-2">
                    {filteredData?.map((item, i) => (
                        <li
                            key={i}
                            className="cursor-pointer hover:bg-gray-200"
                            onClick={() => {
                                setInputValue(item);
                                setShow(false);
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;
