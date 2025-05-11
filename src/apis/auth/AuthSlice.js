import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Fixed import
import { VITE_API_BASE_URL } from "../../utils/constants/Constants";
// import { APP_VERSION } from "../../utils/constants/Constants";

export const AuthSlice = createApi({
  reducerPath: "authSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      // You can add auth headers here later if needed
      // headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { useLoginMutation, useLogoutMutation } = AuthSlice;
