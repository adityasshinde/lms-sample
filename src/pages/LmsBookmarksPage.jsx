import React, { useEffect, useState } from 'react'
import CourseBar from '../components/courses/CourseBar';
import CourseContent from '../components/courses/CourseContent';
import { useGetCoursesByCategoryIdQuery, useGetCoursesQuery } from '../store/api/courseApi';
import { useDispatch } from 'react-redux';
import { setCourses } from '../store/slices/courseSlice';
import Loader from '../components/ui/Loader';
import ErrorComponent from '../components/ui/ErrorComponent';
import { useAuth, useCourse } from '../hooks/hooks';
import SearchBar from '../components/mylearning/SearchBar';
import MyLearningContent from '../components/mylearning/MyLearningContent';


const LmsBookmarksPage= () => {
  const {user}=useAuth();
  const {allCourses,wishList,allTestSeries}=useCourse();
  const dispatch=useDispatch();
  const [searchedCourses, setSearchedCourses] = useState(undefined);
  const [searchedTestSeries, setSearchedTestSeries] = useState(undefined);

  let wishListedCourses=allCourses?.filter(course=>wishList?.includes(course._id) && !user?.coursesPurchased?.includes(course._id));
  if(!wishListedCourses){
    wishListedCourses=[];
  }
  let wishListedTestSeries=allTestSeries?.filter(testseries=>wishList?.includes(testseries._id) && !user?.testSeriesPurchased?.includes(testseries._id));
  if(!wishListedTestSeries){
    wishListedTestSeries=[];
  }
  let searched=undefined,searchedTest=undefined;
  const handleSearch=(input)=>{
    searched=wishListedCourses.filter(course=>course.title.toLowerCase().includes(input.toLowerCase()));
    searchedTest=wishListedTestSeries.filter(testseries=>testseries.title.toLowerCase().includes(input.toLowerCase()));
    setSearchedCourses(searched);
    setSearchedTestSeries(searchedTest);
  }

  return (
    <div className='mt-16 px-4 flex flex-col min-h-screen'>
        <SearchBar handleSearch={handleSearch} />
        <MyLearningContent testseries={searchedTestSeries ? searchedTestSeries:wishListedTestSeries} courses={searchedCourses? searchedCourses:wishListedCourses} />
    </div>
  )
}

export default LmsBookmarksPage;