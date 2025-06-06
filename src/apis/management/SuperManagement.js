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
  tagTypes: ['Module'],
  endpoints: (builder) => ({
    createModule: builder.mutation({
      query: (credentials) => ({
        url: "/module/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ['Module']
    }),
    getModules: builder.query({
      query: ({page = 1, search = '', status = ''}) => ({
        url: "/module/list",
        method: "GET",
        params: {
          page: page,
          search: search,
          status: status,
        },
      }),
      providesTags: ['Module']
    }),
    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/module/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Module'],
    }),
    toggleModuleStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/module/toggle-status/${id}`,
        method: "PUT",
        // body: { status },
      }),
      invalidatesTags: ['Module'],
    }),
    getModuleById: builder.query({
      query: (id) => ({
        url: `/module/get-module-by-id/${id}`,
        method: "GET",
      }),
      refetchOnMountOrArgChange: false,
    }),
    updateModule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/module/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Module'],
    }),
    dashboardData: builder.query({
      query: () => ({
        url: "/dashboard/data",
        method: "GET",
      }),
      // providesTags: ['Module'],
    }),
  }),
});

// Export hooks for usage in components
export const { 
    useCreateModuleMutation,
    useGetModulesQuery,
    useLazyGetModulesQuery,
    useDeleteModuleMutation,
    useToggleModuleStatusMutation,
    useLazyGetModuleByIdQuery,
    useUpdateModuleMutation,
    useDashboardDataQuery,
} = SuperManagement;
