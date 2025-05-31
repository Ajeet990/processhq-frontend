import * as Yup from 'yup';

const AddEditModuleValidation = Yup.object().shape({
  name: Yup.string()
    .required('Module name is required')
    .max(100, 'Name must be less than 100 characters'),

  slug: Yup.string()
    .required('Slug is required')
    .min(3, 'Slug must be at least 3 characters')
    .max(30, 'Slug must not exceed 30 characters')
    .matches(
      /^[a-z-]+$/,  // Only lowercase letters, numbers, and hyphens
      'Slug can only contain lowercase letters and hyphens (-)'
    )
    .lowercase() // Automatically convert to lowercase
    .trim(), // Remove whitespace

  description: Yup.string()
    .required('Description is required')
    .max(100, 'Description must be less than 100 characters'),

  status: Yup.string()
    .required('Status is required')
    .oneOf(['0', '1'], 'Status must be either 0 or 1')
});

export default AddEditModuleValidation;