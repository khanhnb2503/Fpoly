import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ['Courses'],
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => 'categories',
      providesTags: ['Courses']
    }),
  })
});

export const { useGetAllCoursesQuery } = courseApi;