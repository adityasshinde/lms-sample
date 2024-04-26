import React from 'react';
import { Card, CardMedia, Typography, CardContent, CardHeader, Grid,Skeleton,useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { IconBookmark } from '@tabler/icons';

const SavedCourses = ({ savedCourses }) => {
  console.log(savedCourses);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <Box width='100%' my={4}>
            <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
                Saved Courses
            </Typography>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {savedCourses ? savedCourses?.map((course, index) => (
        <Card key={index} sx={{
            borderRadius: "8px",
            p:'0 !important',
            border: '1px solid #4B4B4D18',
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",}}>
           <CardMedia
                component="img"
                height="auto"
                image="https://via.placeholder.com/160x90" // Replace with your actual thumbnail image URL
                alt="Physics Test"
            />
            <CardHeader
                sx={{ width: '100%', padding: '0.5rem' }}
                title={
                    <Typography sx={{ fontWeight: 'bold',color:'black', fontSize: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '30px' }}>
                        {course?.title}
                        <IconBookmark color='#207EB8' fill='#207EB8' size={32} style={{ cursor: 'pointer' }} />
                    </Typography>
                }
            />
          <CardContent sx={{padding:'0 0.5rem'}}>
            <Typography variant="body2" color="textSecondary">
              {`25 lectures | 48 hours`}
            </Typography>
          </CardContent>
        </Card>
      ))
    :<Box
    sx={{
      margin: "auto",
      overflow: "hidden",
      width: "80%",
      display: "flex",
      justifyContent: "space-around",
    }}
  >
    {lgUp ? [1, 2, 3, 4].map(item =>
      <Skeleton key={item} animation="wave" height="300px" width="250px" />
    )
      : <Skeleton animation="wave" height="300px" width="250px" />}
  </Box>}
        </div>
    </Box>
  );
};

export default SavedCourses;
