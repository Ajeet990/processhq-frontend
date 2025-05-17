// export const APP_NAME = 'Project Co-pilot';
// export const APP_VERSION = 'v1';

import { GoOrganization } from "react-icons/go";

// export const VITE_API_BASE_URL = 'http://127.0.0.1:8000/api/' + APP_VERSION;
export const LOGIN_CONSTANTS = {
  MIN_PASSWORD_COUNT: 8
};

export const TOAST_MESSAGE_TYPE = {
  LOGIN_SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning"
};

export const LOGIN_PAGE_TEXT = {
  SIGN_IN: "Sign In",
  SIGNING_IN: "Signing In...",
  SUB_TITLE: "Please login to your account",
  FORGOT_PASSWORD: "Forgot Password?",
  SIGN_UP: "Sign Up",
  LOGIN: "Login",
  EMAIL: "Email",
  PASSWORD: "Password",
  REMEMBER_ME: "Remember Me",
  SHOW_PASSWORD: "Show Password",
  HIDE_PASSWORD: "Hide Password"
};

export const MANAGEMENTS = [
  {
    slug: "organizations",
    name: "Organizations",
	icon:GoOrganization
  }
];
