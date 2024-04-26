import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Performance from '../components/lms/Performance';
import TestSeriesList from '../components/lms/TestSeriesList';
import TestSeriesPerformance from '../components/lms/TestSeriesPerformance';
import TestsList from '../components/lms/TestsList';
import { useGetAllSubjectByTestSeriesIdQuery, useGetMyTestSeriesByIdQuery } from '../store/api/lmsApi';
import Loader from '../components/ui/Loader';
import ErrorComponent from '../components/ui/ErrorComponent';
import SubjectButton from '../components/form/SubjectButton';

const LmsTestSeries = () => {
  const param = useParams();
  const testSeriesId=param?.testSeriesId;
  const [activeSubject,setActiveSubject]=useState();
  const {data,isLoading,isError,refetch}=useGetMyTestSeriesByIdQuery(testSeriesId);
  const {data:subjects,isLoading:subjectLoading,isError:subjectsError}=useGetAllSubjectByTestSeriesIdQuery(testSeriesId);
  useEffect(()=>{
    if(subjects){
      setActiveSubject(subjects[0]?.subjectId);
    }
  },[subjects]);

  return (
    <>
    {isLoading && <Loader/>}
    {isError && <ErrorComponent onRetry={()=>refetch()}  />}
    {data && <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          minHeight: "100vh",
          px:'3rem',
          boxShadow: "0 0 100px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TestSeriesPerformance/>
        <Box sx={{ display: "flex",flexWrap:'wrap',gap:'1rem' }}>
        {subjects?.map((sub,index) => (
          <SubjectButton
            key={index}
            onClick={() => {
              setActiveSubject(sub?.subjectId);
            }}
            text={sub?.subjectTitle}
            active={activeSubject===sub?.subjectId}
            icon={<img style={{width:'40px',borderRadius:'50%'}} src={sub?.subjectImage} />}
          />
        ))}
      </Box>
       {activeSubject && <TestsList subject={activeSubject}/>}
      </Box>}
    </>
  )
}

export default LmsTestSeries;