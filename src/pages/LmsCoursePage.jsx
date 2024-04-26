import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { SubjectIcon } from './SubjectIcon'; // import your subject icons from wherever you have them
import { useDispatch } from "react-redux";
import { useHome, useLMS } from "../hooks/hooks";
import Dashboard from "../components/lms/Dashboard";
import SubjectList from "../components/lms/SubjectsList";
import LectureList from "../components/lms/LectureList";
import { useGetCourseByIdQuery, useGetLecturesByCourseIdQuery } from "../store/api/courseApi";
import { useGetCompletedLecturesQuery } from "../store/api/lmsApi";
import { useLocation } from "react-router-dom";
import Loader from "../components/ui/Loader";
import ErrorComponent from "../components/ui/ErrorComponent";
import Performance from "../components/lms/Performance";
import CourseLearning from "../components/lms/CourseLearning";

const LmsCoursePage = () => {
  // const { lmscourse } = useLMS();
  const { subjects } = useHome();
  const dispatch = useDispatch();
  const [ongoingLecturesList, setOngoingLecturesList] = useState([]);
  const [courseSubjects, setCourseSubjects] = useState([]);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const lmscourseId = location.pathname.split('/')[3];
  const { data: lmscourse, isLoading: lmscourseLoading, refetch: lmsCourseRefetch } = useGetCourseByIdQuery(lmscourseId);
  const {
    data: lectures,
    isLoading,
    isError,
    refetch,
  } = useGetLecturesByCourseIdQuery(lmscourseId);
  const { data: completedLectures, lecturesLoading: getCompletedLecturesLoading, refetch: refetchCompleted } =
    useGetCompletedLecturesQuery(lmscourseId);

  useEffect(() => {
    //first uncompleted lecture of every subject
    if (lmscourse) {
      const courseSubjects = subjects?.filter((sub) =>
        lmscourse?.subjects?.includes(sub._id)
      );
      setCourseSubjects(courseSubjects);
      if (lectures && lectures.length > 0) {
        if (completedLectures) {
          const courseProgress = (completedLectures.length / lectures.length) * 100;
          setProgress(courseProgress);
          //iterate through each subject and get the first uncompleted lecture
          const ongoingLectures = courseSubjects.map((subject) => {
            const subjectLectures = lectures.filter(
              (lec) => lec.subjectId === subject._id
            );
            const subjectCompletedLectures = subjectLectures.filter((lec) =>
              completedLectures?.includes(lec._id)
            );
            const index = subjectLectures.findIndex(
              (lec) => !completedLectures?.includes(lec._id)
            );
            //if there is an uncompleted lecture, return it, else don't return anything
            if (index !== -1) {
              return subjectLectures[index];
            }
          });
          //filter out the undefined values
          setOngoingLecturesList(ongoingLectures.filter((lec) => lec !== undefined));
        }
      }
    }
  }, [lectures, getCompletedLecturesLoading, lmscourse, lmscourseLoading, completedLectures, isLoading, isError, refetch, refetchCompleted, lmsCourseRefetch])

  return (
    <>
      {/* {(isError && !isLoading) &&<ErrorComponent onRetry={() => { refetch() }} />} */}
      {(isLoading || lmscourseLoading || getCompletedLecturesLoading) ? <Loader /> :
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            px: '3rem',
            // background: "rgba(0,0,0, 0.045)",
            boxShadow: "0 0 100px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Dashboard
            data={[
              {
                title: "Total",
                value: lectures?.length,
                subtitle: 'Lectures',
              },
              {
                title: "Completed",
                value: completedLectures?.length,
                subtitle: 'Lectures',
              },
              {
                title: "Time Spent",
                value: 46,
                subtitle: 'Hours',
              },
              {
                title: "Available Tests",
                value: 11,
                subtitle: 'Tests',
              }
            ]} />
          <CourseLearning progress={progress} />
          <SubjectList subjects={courseSubjects} lectures={lectures} completedLectures={completedLectures} />
        </Box>
      }
    </>
  );
};

export default LmsCoursePage;
