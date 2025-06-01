import {
  useDeleteOrganizationMutation,
  useGetOrganizationByIdMutation,
  useGetOrganizationQuery
} from "../../../apis/management/OrganizationApiSlice";
import { toast } from "react-toastify";
import { OrgMessage } from "../../../messages/Messages";
import { useState } from "react";
import OrganizationForm from "./OrganizationForm";
import Modal from "../../../components/modal/Modal";
import Pagination from "../../../components/pagination/Pagination";

const OrganizationTable = () => {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch
  } = useGetOrganizationQuery();

  const [currentPage, setCurrentPage] = useState(1);
  

  const [deleteOrganization, { isLoading: isDeleting }] =
    useDeleteOrganizationMutation();
  const [getOrganizationById] = useGetOrganizationByIdMutation();

  const organizations = response?.data?.organizations || [];``
  const [showModal, setShowModal] = useState(false);
  const [organization, setOrganization] = useState(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleDeleteOrganization = async (id) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      try {
        await deleteOrganization(id).unwrap();
        toast.success(OrgMessage.ORG_DELETE_SUCCESS);
        refetch();
      } catch (error) {
        toast.error(
          error.data?.message || error.message || OrgMessage.ORG_DELETE_FAILED
        );
      }
    }
  };

  const handleEditOrganization = async (id) => {
    try {
      const response = await getOrganizationById(id).unwrap();
      setOrganization(response.data);
      setShowModal(true);
    } catch (error) {
      toast.error(error.data?.message || error.message);
    }
  };

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
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
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
            organizations.map((org) => (
              <tr
                key={org.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {org.id}
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
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                      onClick={() => handleEditOrganization(org.id)}
                    //   disabled={isEditing}
                    >
                      Edit
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      className="text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                      onClick={() => handleDeleteOrganization(org.id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}{" "}
                    </button>
                  </div>
                </td>
              </tr>
            ))
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

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Edit Organization"
      >
        <OrganizationForm
          onSuccess={() => {
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
          organization={organization}
        />
      </Modal>

      <div className='mt-6'>
        {response?.data?.pagination && (
          <Pagination
            pagination={response.data.pagination}
            currentPage={currentPage} // Pass current active page
            onPageChange={(page) => {
              fetchModules(page); // Will call API with page=2, etc.
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizationTable;
