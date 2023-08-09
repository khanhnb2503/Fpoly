import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base/baseQuery';

export const forumApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: baseQuery,
  tagTypes: ['Posts', 'Comments'],
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
    getPost: builder.query({
      query: (id) => `/postforum/detail//${id}`,
      providesTags: ['Posts']
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: 'forum/addPost',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    updatePost: builder.mutation({
      query: (id,data) => ({
        url: `forum/updatePost/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    removePost: builder.mutation({
      query: (id) => ({
        url: `forum/removePost/${id}`,
        method: 'DELETE',
      }),
    }),
    //
    // addStarPost: builder.mutation({
    //   query: (id) => ({
    //     url: `forum/removePost/${id}`,
    //     method: 'DELETE',
    //   }),
    // }),


    // Comments
    getComments: builder.query({
      query: () => 'forum/forum-cmt',
      providesTags: ['Comments']
    }),
    getComment: builder.query({
      query: (id) => `forum/posts/${id}`,
      providesTags: ['Comments']
    }),
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
      query: (id,data) => ({
        url: `forum/forum-cmt/update${id}`,
        method: 'PUT',
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
    }),
  })
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useRemovePostMutation,
  useGetCommentsQuery,
  useGetCommentQuery,
  useAddCommentMutation,
  useReplyCommentMutation,
  useUpdateCommentMutation,
  useRemoveCommentMutation,
} = forumApi;
