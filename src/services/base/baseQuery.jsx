import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getLocalStorage } from './useLocalStorage';

const token = getLocalStorage('access_token');

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
});

export const baseQueryVideo = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_VIDEO_URL,
  prepareHeaders: (headers) => {
    headers.set('SproutVideo-Api-Key', `${import.meta.env.VITE_API_KEY_VIDEO}`)
    return headers
  },
});