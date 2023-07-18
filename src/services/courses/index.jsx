import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base/baseQuery';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: baseQuery,
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