import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Modal from "../../../components/modal/Modal";
import OrganizationForm from "./OrganizationForm";

const AddNew = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-green-400 text-white rounded-lg shadow-md hover:bg-green-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
      >
        <IoAdd size={20} className="text-white" />
        <span className="font-medium">Add Organization</span>
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Organization"
      >
        <OrganizationForm
          onSuccess={() => {
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </>
  );
};

export default AddNew;
