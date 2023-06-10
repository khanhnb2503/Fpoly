import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { loginApi } from "../services/authentication/auth";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware)
});
setupListeners(store.dispatch);