import { createApi } from '@reduxjs/toolkit/query/react';
import {baseQuery, baseQueryWithReauth} from '../base/baseQuery';

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery,
  tagTypes: ['Posts', 'Feedbacks', 'Comments'],
  endpoints: (builder) => ({
    // Posts
    getPosts: builder.query({
      query: (page) => {
        return {
          url: `postforum/list?page=${page}`,
          params: {page}
        }
      },
      providesTags: ['Posts']
    }),
    getPostsLatest: builder.query({
      query: () => {
        return {
          url: `postforum/latest-posts`,
          // params: {page}
        }
      },
      providesTags: ['Posts']
    }),
    getPostsTrending: builder.query({
      query: () => {
        return {
          url: `postforum/top-rated-posts`,
          // params: {page}
        }
      },
      providesTags: ['Posts']
    }),
    getPostsCate: builder.query({
      query: () => {
        return {
          url: `postforum/postsCate`,
          // params: {page}
        }
      },
      providesTags: ['Posts']
    }),

    getPost: builder.query({
      query: (id) => `postforum/detail/${id}`,
      providesTags: ['Posts']
    }),

    addPost: builder.mutation({
      query: (data) => ({
        url: 'postforum/addpost',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `postforum/updatepost/${data.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    removePost: builder.mutation({
      query: (id) => ({
        url: `postforum/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    addStarPost: builder.mutation({
      query: (id) => ({
        url: `postforum/clickstar`,
        method: 'POST',
        body: id
      }),
    }),

    // Comments
    addComment: builder.mutation({
      query: (data) => ({
        url: 'forum/forum-cmt/add',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    replyComment: builder.mutation({
      query: (data) => ({
        url: 'forum/forum-cmt/reply',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `forum/forum-cmt/update/${data.id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    removeComment: builder.mutation({
      query: (id) => ({
        url: `forum/forum-cmt/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts']
    }),

    // feedback
    getFeedbacks: builder.query({
      query: (page) => {
        return {
          url: `feedback/list`,
          params: {page}
        }
      },
      providesTags: ['Feedbacks']
    }),
    getFeedback: builder.query({
      query: (id) => `feedback/detail/${id}`,
      providesTags: ['Feedbacks']
    }),
    addFeedback: builder.mutation({
      query: (data) => ({
        url: 'feedback/addfeedback',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    updateFeedback: builder.mutation({
      query: (id,data) => ({
        url: `feedback/edit/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    removeFeedback: builder.mutation({
      query: (id) => ({
        url: `feedback/delete/${id}`,
        method: 'DELETE',
      }),
    }),
  })
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostsLatestQuery,
  useGetPostsTrendingQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useRemovePostMutation,
  useAddStarPostMutation,
  useGetPostsCateQuery,

  useAddCommentMutation,
  useReplyCommentMutation,
  useUpdateCommentMutation,
  useRemoveCommentMutation,

  useGetFeedbacksQuery,
  useGetFeedbackQuery,
  useAddFeedbackMutation,
  useUpdateFeedbackMutation,
  useRemoveFeedbackMutation
} = forumApi;
