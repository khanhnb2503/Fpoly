
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
    })
  })
});

export const { useProfileQuery } = userApi;