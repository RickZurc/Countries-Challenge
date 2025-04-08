import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex justify-between items-center py-3 text-sm font-medium text-gray-700 bg-gray-50 border-t">
            {/* Showing X of Y */}
            <span>
                Showing {(currentPage - 1) * 10 + 1} - {Math.min(currentPage * 10, totalPages * 10)} of {totalPages * 10}
            </span>

            {/* Pagination Controls */}
            <nav>
                <ul className="inline-flex items-center space-x-1">
                    {/* Previous Button */}
                    <li>
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        >
                            Prev
                        </button>
                    </li>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page) => (
                        <li key={page}>
                            <button
                                onClick={() => onPageChange(page)}
                                className={`px-3 py-1 rounded-md border ${
                                    currentPage === page
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                {page}
                            </button>
                        </li>
                    ))}

                    {/* Next Button */}
                    <li>
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-md border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;