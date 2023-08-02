import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {baseQuery} from "../base/baseQuery.jsx";
export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    paymentCourse: builder.mutation({
      query: (data) => ({
        url: "course/vnpay/redirect-url",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data
      }),
    }),
  })
});

export const { usePaymentCourseMutation } = paymentApi;
