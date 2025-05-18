import React from "react";

const OrganizationTable = () => {
  // Static data for organizations
  const organizations = [
    {
      id: 1,
      name: "Tech Solutions Inc.",
      email: "contact@techsolutions.com",
      status: "active",
      created_at: "2023-05-15"
    },
    {
      id: 2,
      name: "Global Enterprises",
      email: "info@globalent.com",
      status: "active",
      created_at: "2023-06-20"
    },
    {
      id: 3,
      name: "Innovate Labs",
      email: "hello@innovatelabs.io",
      status: "inactive",
      created_at: "2023-07-10"
    },
    {
      id: 4,
      name: "Digital Horizons",
      email: "support@digitalhorizons.net",
      status: "active",
      created_at: "2023-08-05"
    },
    {
      id: 5,
      name: "Future Systems",
      email: "admin@futuresystems.org",
      status: "inactive",
      created_at: "2023-09-12"
    }
  ];

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
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
              Created At
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
          {organizations.map((org) => (
            <tr
              key={org.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {org.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{org.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${
                    org.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {org.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {org.created_at}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    Edit
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="text-red-600 hover:text-red-800 hover:underline">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrganizationTable;
