import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../modal/Modal'
import AddModule from './AddModule'

const ModuleData = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div className="bg-white rounded-lg shadow-md p-6">

            {/* Header with Add Button */}
            <div className='flex justify-between items-center mb-6'>
                <h1 className="text-2xl font-semibold text-gray-800">Modules</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200'
                >
                    Add Module
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Module Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Module 1
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                This is module 1 description
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-3">
                                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                    <span className="text-gray-300">|</span>
                                    <button className="text-red-600 hover:text-red-800">Delete</button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Module 2
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                This is module 2 description
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-3">
                                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                    <span className="text-gray-300">|</span>
                                    <button className="text-red-600 hover:text-red-800">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <AddModule
                    onSuccess={() => {
                        setShowModal(false);
                    }}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </div>
    )
}

export default ModuleData