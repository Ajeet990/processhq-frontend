import React from 'react'

const Pagination = ({ pagination, onPageChange }) => {
    const { current_page, last_page, per_page, total, from, to } = pagination;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= last_page && page !== current_page) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
                Showing {from} to {to} of {total} entries
            </div>
            <div className="flex space-x-2">
                <button 
                    onClick={() => handlePageChange(current_page - 1)}
                    disabled={current_page === 1}
                    className={`px-3 py-1 border rounded-md ${current_page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                    Previous
                </button>
                
                {/* First page */}
                {current_page > 1 && (
                    <button 
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-1 border rounded-md hover:bg-gray-100"
                    >
                        1
                    </button>
                )}
                
                {/* Ellipsis if needed */}
                {current_page > 2 && (
                    <span className="px-3 py-1">...</span>
                )}
                
                {/* Current page */}
                <button className="px-3 py-1 border rounded-md bg-blue-500 text-white">
                    {current_page}
                </button>
                
                {/* Ellipsis if needed */}
                {current_page < last_page - 1 && (
                    <span className="px-3 py-1">...</span>
                )}
                
                {/* Last page */}
                {current_page < last_page && (
                    <button 
                        onClick={() => handlePageChange(last_page)}
                        className="px-3 py-1 border rounded-md hover:bg-gray-100"
                    >
                        {last_page}
                    </button>
                )}
                
                <button 
                    onClick={() => handlePageChange(current_page + 1)}
                    disabled={current_page === last_page}
                    className={`px-3 py-1 border rounded-md ${current_page === last_page ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Pagination