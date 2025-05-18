import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APP_VERSION = import.meta.env.VITE_APP_VERSION;
const API_BASE_URL = `${VITE_API_BASE_URL}/${APP_VERSION}`;

export const organizationApiSlice = createApi({
  reducerPath: "organizationApi",
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
  tagTypes: ['Organization'],
  endpoints: (builder) => ({
    createOrganization: builder.mutation({
      query: (organizationData) => ({
        url: "/organizations",
        method: "POST",
        body: organizationData,
      }),
      invalidatesTags: ['Organization'],
    }),
    getOrganizations: builder.query({
      query: () => "/organizations",
      providesTags: ['Organization'],
    }),
  }),
});

export const {
  useCreateOrganizationMutation,
  useGetOrganizationsQuery,
} = organizationApiSlice;
