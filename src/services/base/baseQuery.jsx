import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getLocalStorage } from './useLocalStorage';

const token = getLocalStorage('access_token');

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})