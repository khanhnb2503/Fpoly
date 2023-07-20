import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base/baseQuery';

export const blogApi = createApi({
	reducerPath: 'blogApi',
	baseQuery: baseQuery,
	tagTypes: ['Blogs'],
	endpoints: (builder) => ({
		getBlogs: builder.query({
			query: (page) => {
				return {
					url: `blog?page=${page}`,
					params: { page }
				}
			},
			providesTags: ['Blogs']
		}),
	})
})
export const { useGetBlogsQuery } = blogApi;
