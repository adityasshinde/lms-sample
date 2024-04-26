import { Card, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import DonutChart from '../atoms/DonutChart';
import { Atom } from '@phosphor-icons/react';
import { IconPlayerPlay } from '@tabler/icons';

const CourseLearning = ({progress}) => {
    const item = {
        Course: 'Science and Technology',
        Subject: 'Physics',
        totalLectures: 24,
        completedLectures: 12,
        icon: Atom,
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
                    Your Progress
                </Typography>
                <Card sx={{ display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center',border:'1px solid #E3E3E3', borderRadius: '16px', padding: '1.5rem 0', my: '1.5rem' }}>
                    <DonutChart fontSize='1.5rem' thickness={5} size={120} progress={progress} number={`${progress}%`} />
                    <Typography color='#4B4B4D' fontWeight='bold' textAlign='center' my={2}>
                    Course Completed
                </Typography>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
                    Continue Learning
                </Typography>
                <Card  sx={{display:'flex',cursor:'pointer',alignItems:'center',justifyContent:'space-between',borderRadius:'8px',padding:'0.5rem 1rem',marginBottom:'1rem',my:'1.5rem'}}>
                  <Box sx={{display:'flex',alignItems:'center'}}>
                      <div style={{padding:'10px',borderRadius:'8px',backgroundColor:'#EAF7FF'}}>{<item.icon size={32} stroke={2}/>}</div>
                      <Box sx={{marginLeft:'1rem'}}>
                      <Typography variant='h6' sx={{color:'#4B4B4D',fontWeight:'bold'}}>Lecture name to continue</Typography>
                      </Box>
                  </Box>
                  <div style={{padding:'5px',borderRadius:'50%',backgroundColor:'#F2F2F2'}}>
                    <IconPlayerPlay size={24} fill='#207EB8' color='#207EB8' />
                  </div>
              </Card>
                <Card  sx={{display:'flex',cursor:'pointer',alignItems:'center',justifyContent:'space-between',borderRadius:'8px',padding:'0.5rem 1rem',marginBottom:'1rem',my:'1.5rem'}}>
                  <Box sx={{display:'flex',alignItems:'center'}}>
                      <div style={{padding:'10px',borderRadius:'8px',backgroundColor:'#EAF7FF'}}>{<item.icon size={32} stroke={2}/>}</div>
                      <Box sx={{marginLeft:'1rem'}}>
                      <Typography variant='h6' sx={{color:'#4B4B4D',fontWeight:'bold'}}>Lecture name to continue</Typography>
                      </Box>
                  </Box>
                  <div style={{padding:'5px',borderRadius:'50%',backgroundColor:'#F2F2F2'}}>
                    <IconPlayerPlay size={24} fill='#207EB8' color='#207EB8' />
                  </div>
              </Card>
                <Card  sx={{display:'flex',cursor:'pointer',alignItems:'center',justifyContent:'space-between',borderRadius:'8px',padding:'0.5rem 1rem',marginBottom:'1rem',my:'1.5rem'}}>
                  <Box sx={{display:'flex',alignItems:'center'}}>
                      <div style={{padding:'10px',borderRadius:'8px',backgroundColor:'#EAF7FF'}}>{<item.icon size={32} stroke={2}/>}</div>
                      <Box sx={{marginLeft:'1rem'}}>
                      <Typography variant='h6' sx={{color:'#4B4B4D',fontWeight:'bold'}}>Lecture name to continue</Typography>
                      </Box>
                  </Box>
                  <div style={{padding:'5px',borderRadius:'50%',backgroundColor:'#F2F2F2'}}>
                    <IconPlayerPlay size={24} fill='#207EB8' color='#207EB8' />
                  </div>
              </Card>
            </Grid>
        </Grid>
    )
}

export default CourseLearning;