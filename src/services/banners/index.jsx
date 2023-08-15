import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ['Banners'],
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: () => 'slider',
      providesTags: ['Banner']
    }),
  })
});

export const { useGetAllBannerQuery } = bannerApi;