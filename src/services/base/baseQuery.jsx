import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from './useLocalStorage';

const token = getLocalStorage('access_token');
const refresh_token = getLocalStorage('refresh_token')
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_VIDEO_URL
});

const config = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

instance.defaults.headers.common['SproutVideo-Api-Key'] = import.meta.env.VITE_API_KEY_VIDEO;
config.defaults.headers.common['Authorization'] = `Bearer ${token} `;
config.defaults.headers.common['Accept'] = `application/json`;

export const queryVideo = (video_id) => {
  return instance.get(video_id)
};

export const subcribeCourseConfig = (data, token) => {
  config.defaults.headers.common['Authorization'] = `Bearer ${token} `;
  return config.post('course/register-course', data)
}

export const getHistoryCourse = (course_id) => {
  return config.get(`course/historyCourse?course_id=${course_id}`)
}

export const getVideoByTime = (lesson_id) => {
  return config.get(`lesson/${lesson_id}`)
};

export const profile = () => {
  return config.get(`user`)
};


export const getVoucher = (id) => {
  return config.get(`voucher/list-system/${id}`)
}
export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.originalStatus === 401 || result?.data.error?.originalStatus === 403) {
    const navigate = useNavigate()
    navigate("/login")
  }

  const refreshResult = await baseQuery({
    url: 'refresh-token',
    method: 'POST',
  }, api, extraOptions);

  if (refreshResult?.data) {
    const { access_token, refresh_token } = refreshResult?.data;
    setLocalStorage("access_token", access_token)
    setLocalStorage("refresh_token", refresh_token)
  }
  result = await baseQuery(args, api, extraOptions)
  return result
}
