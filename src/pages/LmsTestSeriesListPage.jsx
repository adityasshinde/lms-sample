import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import Performance from '../components/lms/Performance';
import TestSeriesList from '../components/lms/TestSeriesList';
import { useGetMyTestSeriesAllQuery } from '../store/api/lmsApi';

const LmsTestSeriesListPage = () => {
  const [List,setList]=useState([]);
  const {data,isLoading,isError}=useGetMyTestSeriesAllQuery();
  useEffect(()=>{
    if(data){
      setList(data);
    }
  },[data,isLoading,isError]);
  return (
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          // minHeight: "100vh",
          px:'3rem',
          // background: "rgba(0,0,0, 0.045)",
          boxShadow: "0 0 100px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* <Performance/> */}
        <TestSeriesList isLoading={isLoading} list={List}/>
      </Box>
  )
}

export default LmsTestSeriesListPage;