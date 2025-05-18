import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AddEditModuleValidation from '../../utils/validations/module/AddEditModuleValidation';
import { useCreateModuleMutation } from '../../apis/management/SuperManagement';
import { ToastContainer } from 'react-toastify';
import { ModuleMessage } from '../../messages/Messages';
import { TOAST_MESSAGE_TYPE } from '../../utils/constants/Constants';

const AddModule = ({ onSuccess, onCancel }) => {
  const [createModule] = useCreateModuleMutation();
  
  const handleSubmit = async (values, { setSubmitting }) => {
    toast.dismiss();
    let toastMessage = ModuleMessage.MODULE_CREATE_FAILED;
    let toastType = TOAST_MESSAGE_TYPE.ERROR;
    // console.log('Form values:', values);
    setSubmitting(true);
    try {
      const response = await createModule(values);
      console.log('Response:', response);
      if (response.data?.success) {
        toastType = TOAST_MESSAGE_TYPE.SUCCESS;
        toastMessage = response.data.message;
        // toast.success(response.data.message);
        onSuccess();
      } else {
        // console.log('Error response:', response.error?.data.message);
        toastMessage = response.error?.data.message || ModuleMessage.MODULE_CREATE_FAILED;
        // onCancel()
        // toast.error(response.data?.message || 'Failed to create module');
      }
    } catch (error) {
      if (error.data?.message) {
        toastMessage = error.data.message;
      }

      // toast.error('An error occurred while creating the module');
    } finally {
      setSubmitting(false);
      toast[toastType](toastMessage);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      slug: '',
      description: '',
      status: 1
    },
    validationSchema: AddEditModuleValidation,
    onSubmit: handleSubmit
  });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center pb-4 mb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Create New Module</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Module Name*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={`mt-1 block w-full px-3 py-2 border ${formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Slug Field */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug*
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.slug}
                className={`mt-1 block w-full px-3 py-2 border ${formik.errors.slug && formik.touched.slug ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {formik.errors.slug && formik.touched.slug && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.slug}</p>
              )}
            </div>
          </div>
        </div>

        {/* Full-width Description Field */}
        <div className="col-span-full">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={`mt-1 block w-full px-3 py-2 border ${formik.errors.description && formik.touched.description ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {formik.errors.description && formik.touched.description && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
          )}
        </div>

        {/* Status Checkbox */}
        <div className="flex items-center">
          <input
            id="status"
            name="status"
            type="checkbox"
            checked={formik.values.status === 1}
            onChange={(e) => formik.setFieldValue('status', e.target.checked ? 1 : 0)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="status" className="ml-2 block text-sm text-gray-700">
            Active
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${formik.isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {formik.isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              'Create Module'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddModule;