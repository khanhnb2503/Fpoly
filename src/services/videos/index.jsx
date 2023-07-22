import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { baseQueryVideo } from '../base/baseQuery';

export const videosApi = createApi({
  reducerPath: 'videosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_VIDEO_URL,
    prepareHeaders: (headers) => {
      // headers.set('SproutVideo-Api-Key', '699701dc7639206852db31e119899bdf')
      headers.set('khanhnb', 'oke')
      // headers.set('Access-Control-Allow-Origin', '*')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: (video_id) => ({
        url: `${video_id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        mode: 'no-cors'
      }),
    }),
  })
});

export const { useGetVideoQuery } = videosApi;