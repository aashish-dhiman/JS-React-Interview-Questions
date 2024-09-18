/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Pagination = ({
    currentPage = 2,
    totalPages = 10,
    onPageChange = () => {
        alert("new page");
    },
}) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <nav className="flex justify-center">
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <button
                        className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {pages.map((page) => (
                    <li key={page}>
                        <button
                            className={`px-3 py-2 leading-tight border ${
                                page === currentPage
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                            }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
