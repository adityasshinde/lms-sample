import React, { useEffect, useState } from 'react'
import Dashboard from '../components/lms/Dashboard';
import { Box } from '@mui/system';
import MyCourseTable from '../components/lms/MyCourseTable';
import SavedCourses from '../components/lms/SavedCourses';
import ContinueLearningList from '../components/lms/ContinueLearningList';
import { Grid } from '@mui/material';
import BarChart from '../components/lms/BarChart';
import { useCourse } from '../hooks/hooks';

const LmsDashboard = () => {
const {allCourses,wishList}=useCourse();
const [savedCourses,setSavedCourses]=useState([]);
const courses = [
  {
    name: 'CUET+BOARDS Humanities Batch',
    lectures: '12/15',
    status: 'Ongoing',
    category: 'Humanities',
    avatar: 'url_to_avatar_image',
  },
  {
    name: 'CUET+BOARDS Humanities Batch',
    lectures: '15/15',
    status: 'Completed',
    category: 'Humanities',
    avatar: 'url_to_avatar_image',
  },
  {
    name: 'CUET+BOARDS Humanities Batch',
    lectures: '0/15',
    status: 'Pending',
    category: 'Humanities',
    avatar: 'url_to_avatar_image',
  },
  // Add more courses here if needed
];
useEffect(() => {
  if(wishList && allCourses){
    const savedCourses = allCourses.filter((course) => wishList.includes(course._id));
  setSavedCourses(savedCourses);
  }
},[allCourses,wishList]);
  return (
    <Grid
      container
      spacing={1}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          minHeight: "100vh",
          px:'2rem',
        }}
      >
        <Grid item xs={8}>
        <Dashboard
          data={[
            {
              title:"Ongoing",
              value:20,
              subtitle:'Courses',
            },
            {
              title:"Completed",
              value:20,
              subtitle:'Courses',
            },
            {
              title:"Time Spent",
              value:46,
              subtitle:'Hours',
            },
            {
              title:"Available Tests",
              value:11,
              subtitle:'Tests',
            }
          ]}
        />
        <MyCourseTable courses={courses}/>
        <SavedCourses savedCourses={savedCourses}/>
        </Grid>
        <Grid item xs={4}>
          <BarChart/>
          <ContinueLearningList/>
        </Grid>
      </Grid>
  )
}

export default LmsDashboard;