import { createApi } from '@reduxjs/toolkit/query/react';
import {baseQuery, baseQueryWithReauth} from '../base/baseQuery';

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery,
  tagTypes: ['Posts', 'Feedbacks', 'Comments', 'Notifications'],
  endpoints: (builder) => ({
    // Posts
    getPosts: builder.query({
      query: (page) => {
        return {
          url: `postforum/list`,
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
      invalidatesTags: ['Posts']
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
      invalidatesTags: ['Posts']
    }),
    removePost: builder.mutation({
      query: (id) => ({
        url: `postforum/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts']
    }),
    addStarPost: builder.mutation({
      query: (id) => ({
        url: `postforum/clickstar`,
        method: 'POST',
        body: id
      }),
    }),

    searchPost: builder.query({
      query: (keyword) => (`postforum/search-posts?keyword=${keyword}`),
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
      invalidatesTags: ['Posts']
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
      invalidatesTags: ['Posts']
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
      invalidatesTags: ['Posts']
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
          url: `feedbacks/list`,
          params: {page}
        }
      },
      providesTags: ['Feedbacks']
    }),
    getFeedback: builder.query({
      query: (id) => `feedbacks/detail/${id}`,
      providesTags: ['Feedbacks']
    }),
    addFeedback: builder.mutation({
      query: (data) => ({
        url: 'feedbacks/addfeedback',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: ['Feedbacks']
    }),
    updateFeedback: builder.mutation({
      query: (data) => ({
        url: `feedbacks/edit/${data.id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: ['Feedbacks']
    }),
    removeFeedback: builder.mutation({
      query: (id) => ({
        url: `feedbacks/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedbacks']
    }),

    getNotifications: builder.query({
      query: (page) => {
        return {
          url: `notify/list?page=${page}`,
        }
      },
      providesTags: ['Notifications']
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
  useSearchPostQuery,
  useGetNotificationsQuery,

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
