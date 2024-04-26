import { Card, Typography } from '@mui/material';
import React from 'react';
// import { Chart, Doughnut } from 'react-chartjs-2';
import Chart from 'react-apexcharts';
import TestCard from './TestSeriesCard';
import DonutChart from '../atoms/DonutChart';


const Performance = () => {


  return (
    <div className='my-8 w-[90%]'>
      <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
        Your Performance
      </Typography>
      <div style={{ display: 'flex', width: '100%' }}>
        <Card>
          <Typography variant="span" gutterBottom textAlign='left' mb={2}>
            Unlock your potential with our test series –<br/>
            the pathway to success starts with every attempt
          </Typography>
          <div className='m-4 mt-8 flex flex-wrap items-center justify-start gap-8'>
            <DonutChart color='#FBA63C' number={15} text='test attempted' size={120} thickness={5} progress={50} fontSize='1.5rem' />
            <DonutChart color='#1294F2' number={'75%'} text='Accuracy' size={120} thickness={5} progress={75} fontSize='1.5rem' />
            <DonutChart color='#46BD84' number={10} text='Times Cutoff Cleared' size={120} thickness={5} progress={60} fontSize='1.5rem' />
            <DonutChart color='#BB86FC' number={375} text='Questions Solved' size={120} thickness={5} progress={80} fontSize='1.5rem' />
            <DonutChart color='#7455F7' number={'5%'} text='Top 5% club' size={120} thickness={5} progress={5} fontSize='1.5rem' />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Performance;