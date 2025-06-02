 import { useFormik } from "formik";
 import { toast } from "react-toastify";
 import {
   useCreateOrganizationMutation,
   useUpdateOrganizationMutation 
 } from "../../../apis/management/OrganizationApiSlice";
 import { ToastContainer } from "react-toastify";
 import OrganizationValidation from "./../../../utils/validations/organisation/OrganizationValidation";
 import { OrgMessage } from "../../../messages/Messages";
 
 const OrganizationForm = ({ onSuccess, organization }) => {
   const [createOrganization, { isLoading }] = useCreateOrganizationMutation();
   const [updateOrganization] = useUpdateOrganizationMutation();
 
   const handleOrganizationSubmit = async (
     values,
     { setSubmitting, resetForm }
   ) => {
     toast.dismiss();
 
     try {
       if (organization) {
         const response = await updateOrganization({
           id: organization.id,
           ...values
         }).unwrap();
         toast.success(response.message);
        //  toast.success("yes updated");
         resetForm();
         onSuccess();
       } else {
         const response = await createOrganization(values).unwrap();
         toast.success(response.data.message);
         resetForm();
         onSuccess();
       }
 
     } catch (error) {
       toast.error(
         error.data?.message || error.message || OrgMessage.ORG_CREATE_FAILED
       );
     } finally {
       setSubmitting(false);
     }
   };
 
   const formik = useFormik({
     initialValues: organization
       ? organization
       : {
         name: "",
         username: "",
         email: "",
         phone: "",
         password: "",
         address: "",
         state: "",
         url: "",
         status: "1"
       },
     validationSchema: OrganizationValidation,
     onSubmit: handleOrganizationSubmit
   });
 
   return (
     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
       <ToastContainer position="top-right" autoClose={5000} />
 
       <div className="text-center pb-4 mb-6 border-b border-gray-200">
         <h2 className="text-2xl font-semibold text-gray-800">
           {organization ? "Update Organization" : "Create Organization"}
         </h2>
       </div>
 
       <form onSubmit={formik.handleSubmit} className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Name Field */}
           <div>
             <label
               htmlFor="name"
               className="block text-sm font-medium text-gray-700"
             >
               Organization Name*
             </label>
             <input
               id="name"
               name="name"
               type="text"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.name}
               className={`mt-1 block w-full px-3 py-2 border ${formik.errors.name && formik.touched.name
                 ? "border-red-500"
                 : "border-gray-300"
                 } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
             />
             {formik.errors.name && formik.touched.name && (
               <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
             )}
           </div>
 
           {/* Username Field */}
           <div>
             <label
               htmlFor="username"
               className="block text-sm font-medium text-gray-700"
             >
               Username*
             </label>
             <input
               id="username"
               name="username"
               type="text"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.username}
               className={`mt-1 block w-full px-3 py-2 border ${formik.errors.username && formik.touched.username
                 ? "border-red-500"
                 : "border-gray-300"
                 } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
             />
             {formik.errors.username && formik.touched.username && (
               <p className="mt-1 text-sm text-red-600">
                 {formik.errors.username}
               </p>
             )}
           </div>
 
           {/* Email Field */}
           <div>
             <label
               htmlFor="email"
               className="block text-sm font-medium text-gray-700"
             >
               Email*
             </label>
             <input
               id="email"
               name="email"
               type="email"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.email}
               className={`mt-1 block w-full px-3 py-2 border ${formik.errors.email && formik.touched.email
                 ? "border-red-500"
                 : "border-gray-300"
                 } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
             />
             {formik.errors.email && formik.touched.email && (
               <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
             )}
           </div>
 
           {/* Password Field */}
           <div>
             <label
               htmlFor="password"
               className="block text-sm font-medium text-gray-700"
             >
               Password*
             </label>
             <input
               autoComplete="false"
               id="password"
               name="password"
               type="password"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.password}
               className={`mt-1 block w-full px-3 py-2 border ${formik.errors.password && formik.touched.password
                 ? "border-red-500"
                 : "border-gray-300"
                 } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
             />
             {formik.errors.password && formik.touched.password && (
               <p className="mt-1 text-sm text-red-600">
                 {formik.errors.password}
               </p>
             )}
           </div>
 
           {/* Phone Field */}
           <div>
             <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
               Phone
             </label>
             <input
               id="phone"
               name="phone"
               type="tel"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.phone}
               className={`mt-1 block w-full px-3 py-2 border ${formik.errors.phone && formik.touched.phone
                 ? "border-red-500"
                 : "border-gray-300"
                 } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
             />
             {formik.errors.phone && formik.touched.phone && (
               <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
             )}
           </div>
 
           {/* Address Field */}
           <div>
             <label htmlFor="address" className="block text-sm font-medium text-gray-700">
               Address
             </label>
             <input
               id="address"
               name="address"
               type="text"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.address}
               className={`mt-1 block w-full px-3 py-2 border ${formik.errors.address && formik.touched.address
                 ? "border-red-500"
                 : "border-gray-300"
                 } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
             />
             {formik.errors.address && formik.touched.address && (
               <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
             )}
           </div>
 
           {/* URL Field */}
           <div className="col-span-2">
             <label
               htmlFor="url"
               className="block text-sm font-medium text-gray-700"
             >
               Website URL
             </label>
             <input
               id="url"
               name="url"
               type="url"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.url}
               className={`mt-1 block w-full px-3 py-2 border ${formik.errors.url && formik.touched.url
                 ? "border-red-500"
                 : "border-gray-300"
                 } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
             />
             {formik.errors.url && formik.touched.url && (
               <p className="mt-1 text-sm text-red-600">{formik.errors.url}</p>
             )}
           </div>
 
           {/* Status Field */}
           <div className="flex items-center">
             <input
               id="status"
               name="status"
               type="checkbox"
               checked={formik.values.status === "1"}
               onChange={(e) =>
                 formik.setFieldValue("status", e.target.checked ? "1" : "0")
               }
               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
             />
             <label
               htmlFor="status"
               className="ml-2 block text-sm text-gray-700"
             >
               Active
             </label>
           </div>
         </div>
 
         {/* Submit Button */}
         <div className="pt-4">
           <button
             type="submit"
             disabled={formik.isSubmitting || isLoading}
             className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${formik.isSubmitting || isLoading
               ? "bg-blue-400 cursor-not-allowed"
               : "bg-blue-600 hover:bg-blue-700"
               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
           >
             {formik.isSubmitting || isLoading ? (
               <>
                 <svg
                   className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                 >
                   <circle
                     className="opacity-25"
                     cx="12"
                     cy="12"
                     r="10"
                     stroke="currentColor"
                     strokeWidth="4"
                   ></circle>
                   <path
                     className="opacity-75"
                     fill="currentColor"
                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                   ></path>
                 </svg>
                 Processing...
               </>
             ) : (
               <>{organization ? "Update Organization" : "Create Organization"}</>
             )}
           </button>
         </div>
       </form>
     </div>
   );
 };
 
 export default OrganizationForm;
 