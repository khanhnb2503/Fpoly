import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryVideo } from '../base/baseQuery';

export const videosApi = createApi({
  reducerPath: 'videosApi',
  baseQuery: baseQueryVideo,
  tagTypes: ['Videos'],
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: (video_id) => {
        return {
          url: `${video_id}`,
          params: { video_id }
        }
      },
      providesTags: ['Videos']
    }),
  })
});

export const { useGetVideoQuery } = videosApi;