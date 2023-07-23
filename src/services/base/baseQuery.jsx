import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import axios from 'axios';
import { getLocalStorage } from './useLocalStorage';

const token = getLocalStorage('access_token');
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_VIDEO_URL
});
instance.defaults.headers.common['SproutVideo-Api-Key'] = import.meta.env.VITE_API_KEY_VIDEO;

export const queryVideo = (video_id) => {
  return instance.get(video_id)
}


export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
});