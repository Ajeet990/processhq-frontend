import * as Yup from 'yup';
import { LOGIN_CONSTANTS } from '../constants/Constants';


export const LoginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(LOGIN_CONSTANTS.MIN_PASSWORD_COUNT, 'Password must be at least 8 characters')
        .required('Password is required'),
});