import React, { useEffect } from 'react'
import CourseBar from '../components/courses/CourseBar';
import CourseContent from '../components/courses/CourseContent';
import { useGetCoursesByCategoryIdQuery, useGetCoursesQuery } from '../store/api/courseApi';
import { useDispatch } from 'react-redux';
import { setCourses, setTestSeries } from '../store/slices/courseSlice';
import Loader from '../components/ui/Loader';
import ErrorComponent from '../components/ui/ErrorComponent';
import { useCourse } from '../hooks/hooks';
import { useGetAllTestSeriesQuery } from '../store/api/lmsApi';

const CoursesPage = () => {
  const { data, isError, isLoading, refetch } = useGetCoursesQuery();
  const {data:testSeries,isLoading:testsLoading,refetch:refetchTest}=useGetAllTestSeriesQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setCourses(data));
    }
    if(testSeries){
      dispatch(setTestSeries(testSeries));
    }
  }, [data, isLoading, isError,testSeries,testsLoading])

  return (
    <div className='mt-16 px-4 flex flex-col min-h-screen'>
        {(isError && !isLoading) ?<ErrorComponent onRetry={() => { refetch() }} />
        :
        <div>
        <CourseBar />
        {isLoading ? <div className="min-h-screen"><Loader /></div>
        :<CourseContent />}
        
        </div>}
    </div>
  )
}

export default CoursesPage;