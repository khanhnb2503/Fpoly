import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ['Courses'],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => 'categories',
      providesTags: ['Courses']
    }),

    getCourse: builder.query({
      query: () => `course`,
      providesTags: ['Courses']
    }),
  })
});

export const { useGetCoursesQuery, useGetCourseQuery } = courseApi;