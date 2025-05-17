import React from 'react'

const Pagination = () => {
    return (
        <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">Showing 1 to 2 of 2 entries</div>
            <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-md">Previous</button>
                <button className="px-3 py-1 border rounded-md bg-blue-500 text-white">1</button>
                <button className="px-3 py-1 border rounded-md">Next</button>
            </div>
        </div>
    )
}

export default Pagination