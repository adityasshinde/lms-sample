import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lmsApi = createApi({
  reducerPath: "lmsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }, }),
  endpoints: (builder) => ({
    verifyLmsAccess: builder.query({
      query: (courseId) => `lms/course/${courseId}/verify`, 
    }),
    getCompletedLectures: builder.query({
      query: (courseId) => `lectureProgress/${courseId}`, 
    }),
    updateLectureProgress: builder.mutation({
      query: (data) => ({
        url: `lectureProgress/update`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllTestSeries: builder.query({
      query: () => `testModules/`,
    }),
    getMyTestSeriesAll: builder.query({
      query: () => `students/myTestSeriesAll`,
    }),
    getTestSeriesById: builder.query({
      query: (id) => `testModules/${id}`,
    }),
    getMyTestSeriesById: builder.query({
      query: (id) => `students/myTestSeries/${id}`,
    }),
    getAllSubjectByTestSeriesId: builder.query({
      query: (id) => `testModules/${id}/getAllSubjects`,
    }),
    getTestsBySubjectId: builder.query({
      query: (id) => `testModules/${id}/tests`,
    }),
    createTestSession: builder.mutation({
      query: (testId) => ({
        url: `session/test/${testId}/createSession`,
        method: "POST",
      }),
    }),
    getTestSessionById: builder.query({
      query: (sessionId) => `session/${sessionId}`,
    }),
    getTestById:builder.query({
      query: (testId) => `testModules/test/${testId}`,
    }),
    getQuestionsByTestId:builder.query({
      query: (testId) => `questions/byTest/${testId}`,
    }),
    getTestEvaluation:builder.query({
      query: (testId) => `submit/${testId}`,
    }),
    submitTest:builder.mutation({
      query: (data) => ({
        url: `submit/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useVerifyLmsAccessQuery,
  useGetCompletedLecturesQuery,
  useUpdateLectureProgressMutation,
  useGetAllTestSeriesQuery,
  useGetMyTestSeriesAllQuery,
  useGetTestSeriesByIdQuery,
  useGetMyTestSeriesByIdQuery,
  useGetAllSubjectByTestSeriesIdQuery,
  useGetTestsBySubjectIdQuery,
  useCreateTestSessionMutation,
  useGetTestSessionByIdQuery,
  useGetTestByIdQuery,
  useGetQuestionsByTestIdQuery,
  useSubmitTestMutation,
  useGetTestEvaluationQuery
} = lmsApi;
