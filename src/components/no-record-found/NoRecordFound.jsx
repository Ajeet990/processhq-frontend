import React from 'react';
import { FiDatabase } from 'react-icons/fi';

const NoRecordFound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
      <div className="max-w-md w-full text-center px-4">
        <FiDatabase className="text-4xl text-gray-400 mb-4 mx-auto" />
        <h3 className="text-lg font-medium text-gray-500">No records found</h3>
        <p className="text-gray-400 mt-1">Try adjusting your search or filter</p>
      </div>
    </div>
  );
};

export default NoRecordFound;