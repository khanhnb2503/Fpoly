import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const voucherApi = createApi({
  reducerPath: 'voucherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    tagTypes: ['Voucher'],
    getVouchers: builder.query({
      query: () => 'voucher/list-system',
      providesTags: ['Vouchers']
    }),
  })
});

export const { useGetVoucherQuery } = voucherApi;
