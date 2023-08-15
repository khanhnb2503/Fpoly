import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/dist/query";

import commentReducer from '../redux/features/comment/commentSlice';
import courseReducer from "../redux/features/course/courseSlice";
import videoReducer from '../redux/features/video/videoSlice';
import {loginApi} from "../services/authentication/auth";
import {bannerApi} from "../services/banners";
import {blogApi} from "../services/blogs";
import {courseApi} from "../services/courses";
import {searchApi} from "../services/search";
import {userApi} from "../services/users";
import {paymentApi} from "../services/payment/index.jsx";
import {forumApi} from "../services/forum/index.jsx";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [forumApi.reducerPath]: forumApi.reducer,
    commentState: commentReducer,
    courseState: courseReducer,
    videoState: videoReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      loginApi.middleware,
      bannerApi.middleware,
      courseApi.middleware,
      blogApi.middleware,
      searchApi.middleware,
      paymentApi.middleware,
      forumApi.middleware
    )
});
setupListeners(store.dispatch);
