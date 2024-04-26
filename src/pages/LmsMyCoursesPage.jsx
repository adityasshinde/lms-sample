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


const LmsMyCoursesPage = () => {
  const {user}=useAuth();
  const {allCourses}=useCourse();
  const dispatch=useDispatch();
  const [searchedCourses, setSearchedCourses] = useState(undefined);
  let purchasedCourses=allCourses?.filter(course=>user?.coursesPurchased?.includes(course._id));
  if(!purchasedCourses){
    purchasedCourses=[];
  }
  let searched=undefined;
  const handleSearch=(input)=>{
    searched=purchasedCourses.filter(course=>course.title.toLowerCase().includes(input.toLowerCase()));
    setSearchedCourses(searched);
  }
  return (
    <div className='mt-16 px-4 flex flex-col min-h-screen'>
        <SearchBar handleSearch={handleSearch} />
        <MyLearningContent courses={searchedCourses? searchedCourses:purchasedCourses} />
    </div>
  )
}

export default LmsMyCoursesPage;