import { createApi } from '@reduxjs/toolkit/query/react';
// import { baseQuery } from '../base/baseQuery';
import { baseQueryWithReauth } from '../base/baseQuery';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Courses', "Category", "Comments"],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => 'course/category-course',
      providesTags: ['Courses']
    }),

    getCategory: builder.query({
      query: () => `course/category-course`,
      providesTags: ['Category']
    }),

    getTrialLesson: builder.query({
      query: () => `lesson/trial-lesson`,
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
      }),
      invalidatesTags: ['Courses']
    })),

    getListComment: builder.query({
      query: () => `comments/list`,
      providesTags: ['Courses']
    }),

    commentsCourse: builder.mutation(({
      query: (data) => ({
        url: 'comments/addcomment',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: ['Courses']
    })),

    getQuiz: builder.query({
      query: (id) => `course/quiz/${id}`,
      providesTags: ['Courses']
    }),

    sendQuiz: builder.mutation(({
      query: (data) => ({
        url: `course/quiz/questions/answer-check`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: ['Courses']
    })),
  })
});

export const {
  useGetCoursesQuery,
  useGetCategoryQuery,
  useGetCourseQuery,
  useGetLessonsQuery,
  useSubcribeCourseMutation,
  useSaveHistoryCourseMutation,
  useGetHistoryCourseQuery,
  useCommentsCourseMutation,
  useGetListCommentQuery,
  useGetQuizQuery,
  useSendQuizMutation,
  useGetTrialLessonQuery
} = courseApi;
