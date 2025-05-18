import React from 'react';
import Breadcrumb from '../../components/breadcrumb/BreadCrumb';
import ModuleData from '../../components/module/ModuleData';
import Pagination from '../../components/pagination/Pagination';

const Modules = () => {
    return (
        <div className="p-6">
            {/* Breadcrumb with spacing */}
            <div className='mb-8'>
                <Breadcrumb
                    customPaths={[
                        { name: 'Management' },
                        { name: 'Modules', path: null }
                    ]}
                />
            </div>

            {/* Module Table */}
            <ModuleData />
            {/* Pagination */}
            
        </div>
    );
};

export default Modules;