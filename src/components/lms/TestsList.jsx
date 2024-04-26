import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import { Typography,Skeleton,useMediaQuery } from '@mui/material';
import TestCard from './TestCard';
import { useGetTestsBySubjectIdQuery } from '../../store/api/lmsApi';

const TestsList = ({subject}) => {
    const {data,isLoading,isError,refetch}=useGetTestsBySubjectIdQuery(subject);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    useEffect(() => {
        if(subject){
            refetch();
        }
    },[subject]);
    return (
        <Box width='90%' my={4}>
            {/* <Typography variant="h4" gutterBottom textAlign='left'>
            Available Test Series ({list?.length})
            </Typography>
            <Typography variant="span" gutterBottom textAlign='left' mb={2}>
                Explore our comprehensive range of CUET Exam test series designed to simulate the real exam experience. Track your progress with detailed analytics and insightful feedback to optimize your preparation journey.
            </Typography> */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 '>
                {data?.map((item, index) => (
                    <TestCard key={index} test={item} />
                ))}
            </div>
            {isLoading && <Box
                  sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                gap: "2rem",
                margin: "0 auto",
                justifyContent: "center",}}
                >
                  {lgUp ? [1, 2, 3, 4].map(item =>
                    <Skeleton key={item} animation="wave" height="300px" width="300px" />
                  )
                    : <Skeleton animation="wave" height="300px" width="300px" />}
                </Box>}
        </Box>
    )
}

export default TestsList;