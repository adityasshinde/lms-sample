import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    purchaseCourse: builder.mutation({
      query: ({courseId,couponCodeName}) => ({
        url: `payment/${courseId}`,
        method: "POST",
        body: { couponCodeName },
      }),
    }),
    purchaseTestSeries: builder.mutation({
      query: ({testId,couponCodeName}) => ({
        url: `payment/test/${testId}`,
        method: "POST",
        body: { couponCodeName },
      }),
    }),
    verifyPayment: builder.mutation({
      query: (verifyPaymentCredentials) => ({
        url: "payment/verify",
        method: "POST",
        body: verifyPaymentCredentials,
      }),
    }),
    fetchOrderStatus: builder.query({
      query: (orderId) => `payment/status/${orderId}` 
    }),
    enrollFreeCourse: builder.mutation({
      query: (courseId) => ({
        url: `payment/freeCourse/${courseId}`,
        method: "POST",
      }),
    }),
    applyCouponCode: builder.mutation({
      query: ({courseId,couponCodeName}) => ({
        url: 'couponCode/applyCouponCode',
        method: "POST",
        body:{courseId,couponCodeName}
      }),
    }),
  })
});

export const {
  usePurchaseCourseMutation,
  useVerifyPaymentMutation,
  useFetchOrderStatusQuery,
  useEnrollFreeCourseMutation,
  useApplyCouponCodeMutation,
  usePurchaseTestSeriesMutation,
} = paymentApi;
