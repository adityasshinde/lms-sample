import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    }, }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "courses", 
    }),
    getCourseById: builder.query({
      query: (id) => `courses/${id}`, 
    }),
    getCoursesByCategoryId: builder.query({
      query: (categoryId) => `courses/category/${categoryId}`, 
    }),
    getLecturesByCourseId: builder.query({
      query: (courseId) => `lecture/courses/${courseId}`, 
    }),
    getEventsByCourseId: builder.query({
      query: (courseId) => `events/courses/${courseId}`, 
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetCoursesByCategoryIdQuery,
  useGetLecturesByCourseIdQuery,
  useGetEventsByCourseIdQuery,
} = courseApi;