import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { loginApi } from "../services/authentication/auth";
import { bannerApi } from "../services/banners";
import { courseApi } from "../services/courses";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      bannerApi.middleware,
      courseApi.middleware
    )
});
setupListeners(store.dispatch);