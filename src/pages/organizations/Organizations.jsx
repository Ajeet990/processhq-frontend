import Pagination from "../../components/pagination/Pagination";
import Breadcrumb from "../../components/breadcrumb/BreadCrumb";
import AddNew from "./components/AddNew";
import OrganizationTable from "./components/OrganizationTable";

const Organizations = () => {
  return (
    <div>
      <div className="p-6">
        {/* Breadcrumb with spacing */}
        <div className="mb-8">
          <Breadcrumb
            customPaths={[
              { name: "Management" },
              { name: "organizations", path: null }
            ]}
          />
        </div>
        {/* Module body */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Organizations</h1>
            <AddNew />
          </div>
          <OrganizationTable />
        </div>
        {/* Pagination */}
        {/* <div className="mt-6">
          <Pagination />
        </div> */}

      </div>
    </div>
  );
};

export default Organizations;
