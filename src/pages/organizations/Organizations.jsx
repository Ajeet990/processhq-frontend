import { IoAdd, IoCreate, IoPulse } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import ModuleData from "../../components/module/ModuleData";
import Pagination from "../../components/pagination/Pagination";
import Breadcrumb from "../../components/breadcrumb/BreadCrumb";

const Organizations = () => {
  return (
    <div>


	  <div className="p-6">
            {/* Breadcrumb with spacing */}
            <div className='mb-8'>
                <Breadcrumb
                    customPaths={[
                        { name: 'Management' },
                        { name: 'organizations', path: null }
                    ]}
                />
            </div>

            {/* Module Table */}
            <ModuleData />
            {/* Pagination */}
            <div className='mt-6'>
                <Pagination />
            </div>
        </div>
    </div>
  );
};

export default Organizations;
