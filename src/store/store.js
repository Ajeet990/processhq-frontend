import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from '../apis/auth/AuthSlice';
import { SuperManagement } from '../apis/management/SuperManagement';
import { OrganizationApiSlice } from '../apis/management/OrganizationApiSlice';
export const store = configureStore({
  reducer: {
    // Add reducers from different APIs
    [AuthSlice.reducerPath]: AuthSlice.reducer,
    [SuperManagement.reducerPath]: SuperManagement.reducer,
    [OrganizationApiSlice.reducerPath]: OrganizationApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthSlice.middleware)
      .concat(SuperManagement.middleware)
	    .concat(OrganizationApiSlice.middleware)
});

export default store;
