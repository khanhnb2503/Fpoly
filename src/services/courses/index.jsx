import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ['Courses'],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => 'course/category-course',
      providesTags: ['Courses']
    }),

    getCourse: builder.query({
      query: (id) => `course/${id}`,
      providesTags: ['Courses']
    }),
    getLessons: builder.query({
      query: (id) => `lesson/${id}`,
      // providesTags: ['Courses']
    }),
  })
});

export const { useGetCoursesQuery, useGetCourseQuery, useGetLessonsQuery } = courseApi;