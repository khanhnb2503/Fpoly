import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { loginApi } from "../services/authentication/auth";
import { bannerApi } from "../services/banners";
import { blogApi } from "../services/blogs";
import { courseApi } from "../services/courses";
import { userApi } from "../services/users";
import { videosApi } from "../services/videos";

import commentReducer from '../redux/features/comment/commentSlice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [videosApi.reducerPath]: videosApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    commentState: commentReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      loginApi.middleware,
      bannerApi.middleware,
      courseApi.middleware,
      videosApi.middleware,
      blogApi.middleware
    )
});
setupListeners(store.dispatch);