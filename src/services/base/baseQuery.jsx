import { fetchBaseQuery } from '@reduxjs/toolkit/query';
// import type { RootState } from './store'
const token = localStorage.getItem('access_token');


export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})