import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      if (true) {
        headers.set('Authorization', `Bearer hahahah`);
      }
      return headers;
    }
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    authRegister: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
  }),
});


export const { useAuthLoginMutation, useAuthRegisterMutation } = loginApi;

