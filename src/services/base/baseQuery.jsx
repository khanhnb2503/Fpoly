import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import axios from 'axios';
import {getLocalStorage, setLocalStorage} from './useLocalStorage';
import {useNavigate} from "react-router-dom";

const token = getLocalStorage('access_token');
const refresh_token = getLocalStorage('refresh_token')
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_VIDEO_URL
});

export function refreshToken() {
  return instance.post("refresh-token", {
    refreshToken: getLocalStorage("access_token"),
  });
  // return getLocalStorage("access_token")
}

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response?.status === 401 || err.response?.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await refreshToken();
          const { accessToken } = rs.data;
          setLocalStorage("access_token", accessToken)
          config.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);



const config = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

instance.defaults.headers.common['SproutVideo-Api-Key'] = import.meta.env.VITE_API_KEY_VIDEO;
config.defaults.headers.common['Authorization'] = `Bearer ${token} `;
config.defaults.headers.common['Accept'] = `application/json`;

export const queryVideo = (video_id) => {
  return instance.get(video_id)
};

export const getHistoryCourse = (course_id) => {
  return config.get(`course/historyCourse?course_id=${course_id}`)
}

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result= await baseQuery(args, api, extraOptions)
  if (result?.error?.originalStatus === 401 || result?.data.error?.originalStatus === 403) {
    const navigate = useNavigate()
    // navigate("login")
  }

  // const refreshResult = await baseQuery({
  //   url: 'refresh-token',
  //   method: 'POST'
  // }, api, extraOptions)
  // if (refreshResult){
  //   setLocalStorage("access_token", refreshResult?.accessToken)
  // }
  // retry the original query with new access token
  result = await baseQuery(args, api, extraOptions)
  return result
}
