// traditional using scroll height calculation

import { useState, useEffect } from "react";

// Simulating an API call
const fetchData = (page) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = Array.from(
                { length: 10 },
                (_, i) => `Item ${(page - 1) * 10 + i + 1}`
            );
            resolve(data);
        }, 1000);
    });
};

const InfiniteScroll = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch initial data on mount
        const loadInitialData = async () => {
            setLoading(true);
            const newData = await fetchData(page);
            setData((prevData) => [...prevData, ...newData]);
            setLoading(false);
        };
        loadInitialData();
    }, [page]);

    // Add scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            // Check if user has scrolled to the bottom
            if (
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 50 &&
                !loading
            ) {
                setPage(page + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up event listener on component unmount
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, page]); // Dependency array includes loading and page state

    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Infinite Scroll Example
            </h2>
            <ul className="space-y-2">
                {data.map((item, index) => (
                    <li
                        key={index}
                        className="p-4 bg-white shadow rounded border border-gray-200 text-center"
                    >
                        {item}
                    </li>
                ))}
            </ul>

            {/* Loader */}
            <div className="py-4 text-center">
                {loading ? (
                    <p className="text-sm text-gray-500 animate-pulse">
                        Loading more items...
                    </p>
                ) : (
                    <p className="text-sm text-gray-500">
                        Scroll down to load more...
                    </p>
                )}
            </div>
        </div>
    );
};

export default InfiniteScroll;
