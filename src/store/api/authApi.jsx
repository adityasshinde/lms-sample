import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    }, }),
  endpoints: (builder) => ({
    sendOtpToPhone: builder.mutation({
      query: (sendOtpToPhoneCredentials) => ({
        url: "students/sendOtpPhone",
        method: "POST",
        body: sendOtpToPhoneCredentials,
      }),
    }),
    verifyOtpPhone: builder.mutation({
      query: (verifyOtpCredentials) => ({
        url: "students/verifyOtpPhone",
        method: "POST",
        body: verifyOtpCredentials,
      }),
    }),
    sendOtpToEmail: builder.mutation({
      query: (sendOtpToEmailCredentials) => ({
        url: "students/sendOtpEmail",
        method: "POST",
        body: sendOtpToEmailCredentials,
      }),
    }),
    verifyOtpEmail: builder.mutation({
      query: (verifyOtpCredentials) => ({
        url: "students/verifyEmailOtp",
        method: "POST",
        body: verifyOtpCredentials,
      }),
    }),
    verifyToken: builder.query({
      query: () => "api/verify", 
    }),
    verifyLmsAccess: builder.query({
      query: (courseId) => `lms/course/${courseId}/verify`, 
    }),
    fetchUserDetails: builder.query({
      query: () => "students/", 
    }),
    getStudentProfile: builder.mutation({
      query: () => ({
        url: `students/`,
        method: "GET",
      }),
    }),
    updateStudentProfile: builder.mutation({
      query: (updateProfileCredentials) => ({
        url: `students/`,
        method: "PUT",
        body: updateProfileCredentials,
      }),
    }),
    completeStudentProfile: builder.mutation({
      query: (completeProfileCredentials) => ({
        url: `students/completeProfile`,
        method: "PUT",
        body: completeProfileCredentials,
      }),
    }),
    setFcmToken: builder.mutation({
      query: (token) => ({
        url: `sendNotification/setFcmToken`,
        method: "POST",
        body: {token},
      }),
    }),
    addToWishlist: builder.mutation({
      query: (id) => ({
        url: `students/addInWishlist/${id}`,
        method: "POST",
      }),
    }),
    removeFromWishlist: builder.mutation({
      query: (id) => ({
        url: `students/removeFromWishlist/${id}`,
        method: "DELETE",
      }),
    }),
    getStudentOrders: builder.query({
      query: (id) => `students/myorders`, 
    }),
    getStudentTimeTableEvents: builder.query({
      query: () => `myEvents/`, 
    }),
    createStudentTimeTableEvents: builder.mutation({
      query: (createEvent) => ({
        url: `myEvents/`,
        method: "POST",
        body: createEvent,
      }),
    }),
  }),
});

export const {
  useSendOtpToPhoneMutation,
  useVerifyOtpPhoneMutation,
  useSendOtpToEmailMutation,
  useVerifyOtpEmailMutation,
  useGetStudentProfileMutation,
  useUpdateStudentProfileMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useVerifyTokenQuery,
  useFetchUserDetailsQuery,
  useGetStudentTimeTableEventsQuery,
  useCreateStudentTimeTableEventsMutation,
  useGetStudentOrdersQuery,
  useVerifyLmsAccessQuery,
  useCompleteStudentProfileMutation,
  useSetFcmTokenMutation
} = authApi;
