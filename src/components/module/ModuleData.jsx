import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../modal/Modal'
import AddModule from './AddModule'
import {
    useGetModulesQuery,
    useLazyGetModulesQuery,
    useDeleteModuleMutation,
    useToggleModuleStatusMutation
} from '../../apis/management/SuperManagement'
import FullPageLoader from '../loader/FullPageLoader'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Pagination from '../../components/pagination/Pagination';
import NoRecordFound from '../no-record-found/NoRecordFound';
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import Swal from 'sweetalert2';
// import { useDeleteConfirmation } from '../deleteConfirmation/DeleteConfirmation';
// import DeleteConfirmation from '../deleteConfirmation/DeleteConfirmation';
import { useDeleteConfirmation } from '../deleteConfirmation/DeleteConfirmation';
import { STATUS, PAGE } from '../../utils/constants/Constants'
import { TOAST_MESSAGE_TYPE } from '../../utils/constants/Constants'
import { toast } from 'react-toastify';


const ModuleData = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [deleteModule] = useDeleteModuleMutation();
    const [getModules, { data: moduleList, isLoading, isError }] = useLazyGetModulesQuery();
    const [toggleModuleStatus] = useToggleModuleStatusMutation();

    const fetchModules = (page = currentPage, search = searchTerm) => {
        setCurrentPage(page); // Update current page
        getModules({ page, search: searchTerm, status: statusFilter });
    };


    // Handle search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchModules(currentPage, searchTerm, statusFilter); // Reset to page 1 when searching
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, statusFilter]);

    // Initial load
    useEffect(() => {
        fetchModules(currentPage);
    }, []);


    const handleToggleStatus = async (id, status) => {
        let toastMessage = '';
        let toastType = TOAST_MESSAGE_TYPE.ERROR;
        // console.log('Toggling status for module ID:', id, status);
        let toggleResult = await toggleModuleStatus({ id }).unwrap();
        // console.log('Toggle result:', toggleResult);
        toastMessage = toggleResult.message;
        if (toggleResult.success) {
            toastType = TOAST_MESSAGE_TYPE.SUCCESS;
        }
        toast[toastType](toastMessage);

    }
    const handleEdit = (id) => {
        console.log('Editing module ID:', id);
    }
    const handleDelete = useDeleteConfirmation({
        mutationHook: useDeleteModuleMutation,
        entityName: "module"
    });
    if (isLoading) {
        return <FullPageLoader />
    }
    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-6">

                {/* Header with Add Button */}
                <div className='flex justify-between items-center mb-6'>
                    <h1 className="text-2xl font-semibold text-gray-800">Modules</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200'
                    >
                        <IoMdAdd />
                        <span>Add Module</span>
                    </button>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    {/* Search Filter */}
                    <div className="flex-1">
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="module-search"
                                placeholder="Search by name, slug and description..."
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Status Filter Dropdown */}
                    <div className="w-full md:w-48">
                        <select
                            id="status-filter"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    {/* Optional: Reset Filters Button */}
                    <div className="flex items-end">
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => {
                                setSearchTerm('');
                                setStatusFilter(STATUS.ACTIVE);
                                setCurrentPage(PAGE.FIRST);
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Table */}

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>#</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Module
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Slug
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
                            {moduleList?.data?.modules?.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-0">
                                        <NoRecordFound />
                                    </td>
                                </tr>
                            )}
                            {
                                moduleList?.data?.modules?.map((module, index) => {
                                    const startingNumber = moduleList?.data?.pagination
                                        ? (moduleList.data.pagination.current_page - 1) * moduleList.data.pagination.per_page + 1
                                        : 1;

                                    return (
                                        <tr key={module.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td>{startingNumber + index}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {module.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {module.slug}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {module.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex space-x-1">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800 text-2xl hover:cursor-pointer"
                                                        title='Edit'
                                                        onClick={() => handleEdit(module.id)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <span className="text-gray-300">|</span>
                                                    <button
                                                        className={`text-2xl ${module.status === '1' ? 'text-green-600 hover:text-green-800' : 'text-red-400 hover:text-red-600'} hover:cursor-pointer`}
                                                        onClick={() => handleToggleStatus(module.id, module.status)}
                                                        title={module.status === '1' ? 'Deactivate' : 'Activate'}
                                                    >
                                                        {module.status === '1' ? <FaToggleOn /> : <FaToggleOff />}
                                                    </button>
                                                    <span className="text-gray-300">|</span>
                                                    <button
                                                        className="text-red-500 hover:text-red-800 text-2xl hover:cursor-pointer"
                                                        title="Delete"
                                                        onClick={() => handleDelete(module.id)}
                                                    >
                                                        <MdDeleteForever />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Module Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <AddModule
                    onSuccess={() => setShowModal(false)}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>


            {/* Pagination */}
            <div className='mt-6'>
                {moduleList?.data?.pagination && (
                    <Pagination
                        pagination={moduleList.data.pagination}
                        currentPage={currentPage} // Pass current active page
                        onPageChange={(page) => {
                            fetchModules(page); // Will call API with page=2, etc.
                        }}
                    />
                )}
            </div>
        </>
    )
}

export default ModuleData
