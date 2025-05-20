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
      query: () => "/organization/get",
      providesTags: ["Organization"]
    }),
	 getOrganizationById: builder.mutation({
      query: (id) => `/organization/get/${id}`,
      providesTags: ["Organization"]
    }),
    deleteOrganization: builder.mutation({
      query: (id) => ({
        url: `/organization/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Organization"]
    })
  })
});

export const {
  useCreateOrganizationMutation,
  useGetOrganizationQuery,
  useGetOrganizationByIdMutation,
  useDeleteOrganizationMutation
} = OrganizationApiSlice;
