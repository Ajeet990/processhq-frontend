import {
  useDeleteOrganizationMutation,
  useLazyGetOrganizationByIdQuery,
  useLazyGetOrganizationQuery,
} from "../../../apis/management/OrganizationApiSlice";
import { toast } from "react-toastify";
import { OrgMessage } from "../../../messages/Messages";
import { useState, useEffect } from "react";
import OrganizationForm from "./OrganizationForm";
import Modal from "../../../components/modal/Modal";
import Pagination from "../../../components/pagination/Pagination";
import FullPageLoader from "../../../components/loader/FullPageLoader";
import { STATUS, PAGE } from "../../../utils/constants/Constants";
import { useDeleteConfirmation } from "../../../components/deleteConfirmation/DeleteConfirmation";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const OrganizationTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(STATUS.ACTIVE);
  const [showModal, setShowModal] = useState(false);
  const [organization, setOrganization] = useState(null);

  const [getOrganizations, { data: response, isLoading, isError, error }] = useLazyGetOrganizationQuery();
  const [deleteOrganization, { isLoading: isDeleting }] = useDeleteOrganizationMutation();
  const [getOrganizationById] = useLazyGetOrganizationByIdQuery();

  const organizations = response?.data?.organizations || [];

  const fetchOrganizations = (page = currentPage, search = searchTerm) => {
    setCurrentPage(page);
    getOrganizations({ page, search, status: statusFilter });
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrganizations(PAGE.FIRST, searchTerm); // Reset to page 1 when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter]);

  // Initial load
  useEffect(() => {
    fetchOrganizations(currentPage);
  }, []);

  const handleDeleteOrganization = useDeleteConfirmation({
    mutationHook: useDeleteOrganizationMutation,
    entityName: "organization"
  });

  const handleEditOrganization = async (id) => {
    try {
      const response = await getOrganizationById(id).unwrap();
      setOrganization(response.data);
      setShowModal(true);
    } catch (error) {
      toast.error(error.data?.message || error.message);
    }
  };

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading organizations:{" "}
              {error?.data?.message || error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Search and Filter Section */}
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
              placeholder="Search by name, username or email..."
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Status Filter Dropdown */}
        <div className="w-full md:w-48">
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value={STATUS.ACTIVE}>Active</option>
            <option value={STATUS.INACTIVE}>Inactive</option>
          </select>
        </div>

        {/* Reset Filters Button */}
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

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Organization Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {organizations.length > 0 ? (
              organizations.map((org, index) => {
                const startingNumber = response?.data?.pagination
                  ? (response.data.pagination.current_page - 1) * response.data.pagination.per_page + 1
                  : 1;

                return (
                  <tr
                    key={org.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {startingNumber + index}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {org.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{org.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{org.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${org.status === "1" || org.status === 1
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {org.status === "1" || org.status === 1
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button
                          className="text-blue-600 hover:text-blue-800 text-2xl hover:cursor-pointer"
                          onClick={() => handleEditOrganization(org.id)}
                        >
                          <FaEdit />
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          className="text-red-500 hover:text-red-800 text-2xl hover:cursor-pointer"
                          onClick={() => handleDeleteOrganization(org.id)}
                          disabled={isDeleting}
                        >
                          {/* {isDeleting ? "Deleting..." : "Delete"} */}
                          <MdDeleteForever />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No organizations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={organization ? "Edit Organization" : "Add Organization"}
      >
        <OrganizationForm
          onSuccess={() => {
            setShowModal(false);
            setOrganization(null);
            fetchOrganizations(currentPage); // Refresh current page after success
          }}
          onCancel={() => {
            setShowModal(false);
            setOrganization(null);
          }}
          organization={organization}
        />
      </Modal>

      <div className='mt-6'>
        {response?.data?.pagination && (
          <Pagination
            pagination={response.data.pagination}
            currentPage={currentPage}
            onPageChange={(page) => {
              fetchOrganizations(page);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizationTable;