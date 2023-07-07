import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi=createApi({
    reducerPath:'blogApi',
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_BASE_URL,

    }),
    tagTypes:['Blogs'],
    endpoints:(builder)=>({
        getBlogs: builder.query({
            query: () => 'blogs',
            providesTags: ['Blogs']
        }),
    })
})
export const {useGetBlogsQuery}= blogApi;