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
      providesTags: ['Courses']
    }),

    getHistoryCourse: builder.query({
      query: (id) => `course/historyCourse?course_id=${id}`,
      providesTags: ['Courses']
    }),

    subcribeCourse: builder.mutation({
      query: (data) => ({
        url: 'course/register-course',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),

    saveHistoryCourse: builder.mutation(({
      query: (data) => ({
        url: 'course/historyCourseUpdate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      })
    }))

  })
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetLessonsQuery,
  useSubcribeCourseMutation,
  useSaveHistoryCourseMutation,
  useGetHistoryCourseQuery
} = courseApi;