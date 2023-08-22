import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {baseQuery} from "../base/baseQuery.jsx";
export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQuery,
  tagTypes: ['Payment', "Voucher"],
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
      providesTags: ['Payment']
    }),

    paymentCourseTransfer: builder.mutation({
      query: (data) => ({
        url: "course/register-course",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data
      }),
      invalidatesTags: ['Voucher']
    }),

    listVoucher: builder.query({
      query: (id) => {`voucher/list-system/${id}`},
      providesTags: ['Voucher']
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
      invalidatesTags: ['Voucher']
    }),
    convertVoucher: builder.mutation({
      query: (data) => ({
        url: "voucher/redeem-voucher",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data
      }),
      invalidatesTags: ['Voucher']
    }),
  })
});

export const { usePaymentCourseMutation, useVoucherCourseMutation, useListVoucherQuery ,useConvertVoucherMutation, usePaymentCourseTransferMutation } = paymentApi;
