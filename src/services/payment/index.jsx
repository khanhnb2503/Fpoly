import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {baseQuery, baseQueryWithReauth} from "../base/baseQuery.jsx";
export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Payment'],
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
    voucherCourse: builder.mutation({
      query: (data) => ({
        url: "voucher/checkVoucher",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data
      }),
    }),
  })
});

export const { usePaymentCourseMutation, useVoucherCourseMutation, useGetStatusPaymentQuery } = paymentApi;
