import * as Yup from "yup";

const OrganizationValidation = Yup.object().shape({
  name: Yup.string()
    .required("Company name is required")
    .required("Module name is required")
    .max(100, "Name must be less than 100 characters"),

  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must be less than 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    ),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  address: Yup.string()
    .required("Address is required")
    .max(200, "Address must be less than 200 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  url: Yup.string()
    .required("URL is required")
    .url("Invalid URL format")
    .max(100, "URL must be less than 100 characters"),
  state: Yup.string(),
  status: Yup.number()
    .required("Status is required")
    .oneOf([0, 1], "Status must be either 0 or 1")
});

export default OrganizationValidation;
