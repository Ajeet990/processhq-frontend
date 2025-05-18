import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APP_VERSION = import.meta.env.VITE_APP_VERSION;
const API_BASE_URL = `${VITE_API_BASE_URL}/${APP_VERSION}`;

export const SuperManagement = createApi({
  reducerPath: "supermanageSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('user_token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createModule: builder.mutation({
      query: (credentials) => ({
        url: "/module/create",
        method: "POST",
        body: credentials,
      }),
    }),
    getModules: builder.query({
      query: ({page = 1, search = ''}) => ({
        url: "/module/list",
        method: "GET",
        params: {
          page: page,
          search: search,
        },
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { 
    useCreateModuleMutation,
    useGetModulesQuery,
    useLazyGetModulesQuery
} = SuperManagement;
