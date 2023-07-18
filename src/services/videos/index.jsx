import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base/baseQuery';

export const videosApi = createApi({
  reducerPath: 'videosApi',
  baseQuery: baseQuery,
  tagTypes: ['Videos'],
  endpoints: (builder) => ({
    getAllVideos: builder.query({
      query: () => 'lesson/trial-lesson',
      providesTags: ['Videos']
    }),
  })
});

export const { useGetAllVideosQuery } = videosApi;