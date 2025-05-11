import { useFormik } from 'formik';
import { useState, useContext } from 'react';
import { LoginValidationSchema } from '../../utils/validations/LoginValidation';
import { useLoginMutation } from '../../apis/auth/AuthSlice';
import { APP_NAME } from '../../utils/constants/Constants';
import { toast } from 'react-toastify';
import { Messages } from '../../messages/auth/Message';
import { TOAST_MESSAGE_TYPE } from '../../utils/constants/Constants';
import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { LOGIN_PAGE_TEXT } from '../../utils/constants/Constants';

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [makeLogin] = useLoginMutation();
  const navigate = useNavigate();
  const { login, setToken } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  // Mock login API call
  const handleLogin = async (values) => {
    setIsSubmitting(true);
    toast.dismiss();
    // setIsSubmitting(true);
    let toastMessage = Messages.LOGIN_FAILED;
    let toastType = TOAST_MESSAGE_TYPE.ERROR;
    try {
      const response = await makeLogin(values).unwrap();
      if (response.success) {
        toastType = TOAST_MESSAGE_TYPE.LOGIN_SUCCESS;
        toastMessage = response.message;
        setToken(response.data.token);
        login(response.data.user);
        navigate('/dashboard')
        return response.data;
      } else {
        toastMessage = response.message;
      }

    } catch (error) {
      // Determine error message based on error type
      if (error.data?.message) {
        toastMessage = error.data.message;
      }

    } finally {
      setIsSubmitting(false);
      toast[toastType](toastMessage);
    }
  };

  // Formik setup with Yup validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: LoginValidationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in {APP_NAME}</h2>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`mt-1 block w-full px-3 py-2 border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`block w-full px-3 py-2 border ${
                    formik.errors.password && formik.touched.password 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? LOGIN_PAGE_TEXT.HIDE_PASSWORD :  LOGIN_PAGE_TEXT.SHOW_PASSWORD}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>


            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  onChange={formik.handleChange}
                  checked={formik.values.rememberMe}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  {LOGIN_PAGE_TEXT.REMEMBER_ME}
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  {LOGIN_PAGE_TEXT.FORGOT_PASSWORD}
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {LOGIN_PAGE_TEXT.SIGNING_IN}
                </>
              ) : LOGIN_PAGE_TEXT.SIGN_IN }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;