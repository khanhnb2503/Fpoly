import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { loginApi } from "../services/authentication/auth";
import { bannerApi } from "../services/banners";
import { courseApi } from "../services/courses";
import { videosApi } from "../services/videos";
import { blogApi } from "../services/blogs";
export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [videosApi.reducerPath]: videosApi.reducer,
    [blogApi.reducerPath]:blogApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      bannerApi.middleware,
      courseApi.middleware,
      videosApi.middleware,
      blogApi.middleware
    )
});
setupListeners(store.dispatch);