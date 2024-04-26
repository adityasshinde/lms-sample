import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories/", 
    }),
    getSubjects: builder.query({
      query: () => "subject/", 
    }),
    getInstructors: builder.query({
      query: () => "instructors/", 
    }),
    getBanners: builder.query({
      query: () => "banners/", 
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        url: `contact/sendQuery`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetSubjectsQuery,
  useGetInstructorsQuery,
  useGetBannersQuery,
  useSendMessageMutation
} = homeApi;