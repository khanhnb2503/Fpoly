
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base/baseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => 'user',
      providesTags: ['Users']
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "forgot-password",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data
      }),
      providesTags: ['Users']
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "reset-password",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data
      }),
      providesTags: ['Users']
    })

  })
});

export const { useProfileQuery, useForgotPasswordMutation, useResetPasswordMutation } = userApi;
