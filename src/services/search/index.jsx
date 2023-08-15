import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base/baseQuery';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: baseQuery,
  tagTypes: ['Search'],
  endpoints: (builder) => ({
    search: builder.query({
      query: (keyword) => `search?search=${keyword}`,
      providesTags: ['Search']
    }),
  })
});

export const { useSearchQuery } = searchApi;