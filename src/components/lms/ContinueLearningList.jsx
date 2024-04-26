import { Card, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Atom } from '@phosphor-icons/react';
import React from 'react'
import DonutChart from '../atoms/DonutChart';

const ContinueLearningList = () => {
    const list=[{
        Course:'Science and Technology',
        Subject:'Physics',
        totalLectures:24,
        completedLectures:12,
        icon:Atom,
    },
    {
        Course:'Science and Technology',
        Subject:'Physics',
        totalLectures:24,
        completedLectures:15,
        icon:Atom,
    },
    {
        Course:'Science and Technology',
        Subject:'Physics',
        totalLectures:24,
        completedLectures:10,
        icon:Atom,
    },
]
  return (
    <Box sx={{bgcolor:'white',px:'2rem',my:'2rem',cursor:'pointer'}}>
          <Typography variant='h4' sx={{color:'#4B4B4D',fontWeight:'bold',marginBottom:'1rem'}}>Continue Learning</Typography>
          {list.map((item,index)=>(
              <Card key={index} sx={{display:'flex',alignItems:'center',justifyContent:'space-between',borderRadius:'8px',padding:'0 1rem',marginBottom:'1rem',my:'1.5rem'}}>
                  <Box sx={{display:'flex',alignItems:'center'}}>
                      <div style={{padding:'10px',borderRadius:'8px',backgroundColor:'#EAF7FF'}}>{<item.icon size={32} stroke={2}/>}</div>
                      <Box sx={{marginLeft:'1rem'}}>
                      <Typography variant='body2' sx={{color:'#207EB8'}}>{item.Course}</Typography>
                      <Typography variant='h5' sx={{color:'#4B4B4D',fontWeight:'bold'}}>{item.Subject}</Typography>
                      <Typography variant='body2' sx={{color:'#4B4B4D'}}>{item.completedLectures}/{item.totalLectures}</Typography>
                      </Box>
                  </Box>
                  <Box sx={{display:'flex',alignItems:'center'}}>
                    <DonutChart thickness={5} size={60} progress={item.completedLectures/item.totalLectures*100}/>
                  </Box>
              </Card>
          ))}
    </Box>
  )
}

export default ContinueLearningList;