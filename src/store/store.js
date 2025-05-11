import { configureStore } from '@reduxjs/toolkit';
// import { authSlice } from '../apis/auth/authSlice';
import { AuthSlice } from '../apis/auth/AuthSlice';
// import { managementSlice } from '../admin/apis/management/managementSlice';
// import { expertSlice } from '../apis/Expert/expertSlice';
export const store = configureStore({
  reducer: {
    // Add reducers from different APIs
    [AuthSlice.reducerPath]: AuthSlice.reducer,
    // [managementSlice.reducerPath]: managementSlice.reducer,
    // [expertSlice.reducerPath]: expertSlice.reducer,
    // [otherApisSlice.reducerPath]: otherApisSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthSlice.middleware)
    //   .concat(managementSlice.middleware)
    //   .concat(expertSlice.middleware)
    //   .concat(otherApisSlice.middleware)
});

export default store;
