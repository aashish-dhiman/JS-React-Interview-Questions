import { useState, useEffect, useRef } from "react";

// Simulating an API call
const fetchData = (page) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = Array.from(
                { length: 10 },
                (_, i) => `Item ${page * 10 + i + 1}`
            );
            resolve(data);
        }, 1000);
    });
};

const InfiniteScroll = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef();

    // Fetch initial data on mount
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                console.log("Fetch called");
                const newData = await fetchData(page);
                setData((prev) => [...prev, ...newData]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loading) {
                    setPage((prev) => prev + 1);
                }
            },
            {
                root: null,
                rootMargin: "20px",
                threshold: 1.0,
            }
        );

        const currentObserverRef = observerRef.current;
        if (currentObserverRef) {
            observer.observe(currentObserverRef);
        }

        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef);
            }
        };
    }, [loading]);

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

            {/* Observer Target */}
            <div ref={observerRef} />

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
