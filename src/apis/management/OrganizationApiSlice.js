import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APP_VERSION = import.meta.env.VITE_APP_VERSION;
const API_BASE_URL = `${VITE_API_BASE_URL}/${APP_VERSION}`;

export const OrganizationApiSlice = createApi({
  reducerPath: "organizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("user_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["Organization"],
  endpoints: (builder) => ({
    createOrganization: builder.mutation({
      query: (organizationData) => ({
        url: "/organization/create",
        method: "POST",
        body: organizationData
      }),
      invalidatesTags: ["Organization"]
    }),
    
    getOrganization: builder.query({
      query: ({ page = 1, search = '', status = '' }) => ({
        url: "/organization/get",
        method: "GET",
        params: {
          page,
          search,
          status
        }
      }),
      providesTags: ["Organization"]
    }),
    
    getOrganizationById: builder.query({
      query: (id) => ({
        url: `/organization/get/${id}`,
        method: "GET"
      }),
      providesTags: ["Organization"]
    }),
    
    deleteOrganization: builder.mutation({
      query: (id) => ({
        url: `/organization/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Organization"]
    }),
    
    updateOrganization: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/organization/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Organization"]
    }),
    
    toggleOrganizationStatus: builder.mutation({
      query: (id) => ({
        url: `/organization/toggle-status/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Organization"]
    })
  })
});

export const {
  useCreateOrganizationMutation,
  useGetOrganizationQuery,
  useLazyGetOrganizationQuery,
  useGetOrganizationByIdQuery,
  useLazyGetOrganizationByIdQuery,
  useDeleteOrganizationMutation,
  useUpdateOrganizationMutation,
  useToggleOrganizationStatusMutation
} = OrganizationApiSlice;