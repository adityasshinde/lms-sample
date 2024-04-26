import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { IconAlignBoxLeftMiddle, IconCircleCheck, IconClipboard, IconClockHour4, IconGridDots } from "@tabler/icons";
import { useTheme } from '@emotion/react';
import Chart from 'react-apexcharts';
import { Presentation } from '@phosphor-icons/react/dist/ssr';
import { Checks, Exam, Timer } from '@phosphor-icons/react';
import DonutChart from '../atoms/DonutChart';
import ContinueLearningList from './ContinueLearningList';


const Dashboard = ({data}) => {
  const theme = useTheme();

  return (
    <Box width='100%' my={4}>
      {/* <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
        Dashboard
      </Typography> */}
      <Grid container justifyContent="start" gap={3}>
        {/* Card for Ongoing */}
        <Grid item xs={12} sm={6} md={2.5}>
          <Card variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '16px',boxShadow: "0 0 100px rgba(0, 0, 0, 0.1)", }}>
          <Typography fontWeight='bold' mb={2} display='flex' alignItems='center' justifyContent='left'>
              <Presentation size={20} style={{marginRight:'10px'}} color='#0761E9' fill='#0761E9'/> {data?.length>0 && data[0]?.title} 
              </Typography>
              <Typography mb={2} mt={6} fontSize='3rem' fontWeight='bold' color='#0761E9' >
                {data?.length>0 && data[0]?.value} {/* Number of ongoing */}<span style={{fontSize:'1rem',color:'black'}}>{data?.length>0 && data[0]?.subtitle}</span>
              </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.5}>
          <Card variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '16px',boxShadow: "0 0 100px rgba(0, 0, 0, 0.1)", }}>
          <Typography fontWeight='bold' mb={2} display='flex' alignItems='center' justifyContent='left'>
          <Checks size={20} color='#2C9743' style={{marginRight:'10px'}} fill='#2C9743'/> {data?.length>1 && data[1]?.title}
              </Typography>
              <Typography mb={2} mt={6} fontSize='3rem' fontWeight='bold' color='#2C9743' >
              {data?.length>1 && data[1]?.value} <span style={{fontSize:'1rem',color:'black'}}>{data?.length>1 && data[1]?.subtitle}</span>
              </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.5}>
          <Card variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '16px',boxShadow: "0 0 100px rgba(0, 0, 0, 0.1)", }}>
          <Typography fontWeight='bold' mb={2} display='flex' alignItems='center' justifyContent='left'>
          <Timer size={20} color='#F59158' fill='#F59158' style={{marginRight:'10px'}}/> {data?.length>2 && data[2]?.title}
              </Typography>
              <Typography mb={2} mt={6} fontSize='3rem' fontWeight='bold' color='#F59158' >
              {data?.length>2 && data[2]?.value} {/* Number of ongoing */}<span style={{fontSize:'1rem',color:'black'}}>{data?.length>2 && data[2]?.subtitle}</span>
              </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.5}>
          <Card variant="outlined" sx={{ backgroundColor: 'white', borderRadius: '16px',boxShadow: "0 0 100px rgba(0, 0, 0, 0.1)", }}>
          <Typography fontWeight='bold' mb={2} display='flex' alignItems='center' justifyContent='left'>
          <Exam size={20} color='#7455F7' fill='#7455F7' style={{marginRight:'10px'}} /> {data?.length>3 && data[3]?.title} 
              </Typography>
              <Typography mb={2} mt={6} fontSize='3rem' fontWeight='bold' color='#7455F7' >
              {data?.length>3 && data[3]?.value} {/* Number of ongoing */} <span style={{fontSize:'1rem',color:'black'}}>{data?.length>3 && data[3]?.subtitle}</span>
              </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard