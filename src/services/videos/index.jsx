import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const videosApi = createApi({
  reducerPath: 'videosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ['Videos'],
  endpoints: (builder) => ({
    getAllVideos: builder.query({
      query: () => 'lesson/trial-lesson',
      providesTags: ['Videos']
    }),
  })
});

export const { useGetAllVideosQuery } = videosApi;