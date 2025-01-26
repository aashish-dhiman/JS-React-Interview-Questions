import { useEffect, useRef, useState } from "react";

// Simulating an API call
const fetchData = (page) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = Array.from(
                { length: 10 },
                (_, i) => `Item ${(page - 1) * 10 + i + 1}`
            );
            console.log("Data fetched from here!");
            resolve(data);
        }, 1000);
    });
};

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [totalPage, setTotalPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    let timeout = useRef(null);
    const debounce = function (fn, delay) {
        return function (...args) {
            if (timeout.current) clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    const debouncedSetPage = debounce((page) => setCurrentPage(page), 300);

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                const data = await fetchData(currentPage);
                setData(data);
            } catch (error) {
                console.log("error: ", error);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, [currentPage]);

    return (
        <div className="flex justify-center flex-col items-center">
            {/* data content */}
            <div className="h-[200px] overflow-y-scroll">
                {isLoading ? (
                    <div>Loading new data...</div>
                ) : (
                    <ul className="space-y-2">
                        {data?.map((item, index) => (
                            <li
                                key={index}
                                className="p-2 bg-white shadow rounded border border-gray-200 text-center"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* pagination part */}
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <button
                        className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => debouncedSetPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {Array.from({ length: totalPage }, (_, i) => i + 1)?.map(
                    (page) => (
                        <li key={page}>
                            <button
                                className={`px-3 py-2 leading-tight border ${
                                    page === currentPage
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                                onClick={() => debouncedSetPage(page)}
                            >
                                {page}
                            </button>
                        </li>
                    )
                )}
                <li>
                    <button
                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => debouncedSetPage(currentPage + 1)}
                        disabled={currentPage === totalPage}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
