import { Box } from '@mui/system';
import React from 'react'
import { Typography,useMediaQuery,Skeleton } from '@mui/material';
import TestSeriesCard from './TestSeriesCard';

const TestSeriesList = ({list,isLoading}) => {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    return (
        <Box width='90%' my={4}>
            <Typography variant="h4" gutterBottom textAlign='left'>
             My Test Series ({list?.length})
            </Typography>
            <Typography variant="span" gutterBottom textAlign='left' mb={2}>
                Explore our comprehensive range of CUET Exam test series designed to simulate the real exam experience. Track your progress with detailed analytics and insightful feedback to optimize your preparation journey.
            </Typography>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8'>
                {list?.map((item, index) => (
                    <TestSeriesCard key={index} series={item} />
                ))}
                {isLoading && 
            <Box
            sx={{
              mx: "auto",
              overflow: "hidden",
              display: "flex",
              padding:'0 !important',
              alignItems:'start',
              justifyContent: "start",
              gap:4
            }}
          >
            {lgUp?[1,2,3].map(item=>
            <Skeleton key={item} animation="wave" height="600px" width="300px" />
            )
            :<Skeleton animation="wave" height="600px" width="300px" />}
            
          </Box>}
            </div>
        </Box>
    )
}

export default TestSeriesList;