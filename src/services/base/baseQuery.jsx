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
    headers.set('SproutVideo-Api-Key', `699701dc7639206852db31e119899bdf`),
      headers.set('Access-Control-Allow-Origin', '*')
    return headers
  },
});