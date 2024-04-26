import { Box } from '@mui/system';
import React, { useState } from 'react'
import LMSSidebar from '../components/lms/LMSSidbar';
import LectureVideo from '../components/lms/LectureVideo';
import { useDispatch } from 'react-redux';
import { setSidebar } from '../store/slices/lmsSlice';
import {  useGetLecturesByCourseIdQuery } from '../store/api/courseApi';
import { useLocation,useParams} from 'react-router-dom';
import { useGetCompletedLecturesQuery } from '../store/api/lmsApi';

const LmsSubjectPage = () => {
  const dispatch=useDispatch();
  const [lmsActiveLecture,setLmsActiveLecture]=useState(null);
  const params=useParams();
  const lmscourseId=params?.courseId;
  const handleLmsActiveLecture=(lecture)=>{
    setLmsActiveLecture(lecture);
  }
  const {
    data: lectures,
    isLoading,
    refetch,
  } = useGetLecturesByCourseIdQuery(lmscourseId);
  const { data: completedLectures, lecturesLoading: getCompletedLecturesLoading ,refetch:refetchCompleted} =
    useGetCompletedLecturesQuery(lmscourseId);
  return (
    <Box sx={{display:'flex',position:'relative'}}>
        <div onClick={()=>{dispatch(setSidebar(false))}} style={{width:'100%'}}><LectureVideo lmsActiveLecture={lmsActiveLecture} refetch={()=>{refetchCompleted();}} completedLectures={completedLectures} lmsLectures={lectures} handleLmsActiveLecture={handleLmsActiveLecture} /></div>
        <LMSSidebar open={false} handleLmsActiveLecture={handleLmsActiveLecture} lecturesLoading={isLoading} completedLectures={completedLectures} lectures={lectures} lmsActiveLecture={lmsActiveLecture} />
    </Box>
  )
}

export default LmsSubjectPage;