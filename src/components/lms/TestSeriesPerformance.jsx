import { Card, Typography } from '@mui/material';
import React from 'react';
import DonutChart from '../atoms/DonutChart';
import performanceimg from '../../asset/images/performance.png'


const TestSeriesPerformance = () => {

    return (
        <div className='my-8 w-[90%]'>
            <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
                Physics Full Length Mock Test Series
            </Typography>
            <div style={{ display: 'flex', width: '100%' }}>
                <Card sx={{ display: 'flex',flexWrap:'wrap', alignItems: 'start', justifyContent: 'space-between', width: '100%' }}>
                    <div>
                        <Typography variant="h6" gutterBottom textAlign='left' color='#4B4B4D' mb={2}>
                            Tests yourself now!
                        </Typography>
                        <div className='m-4 mt-8 flex flex-wrap items-center justify-start gap-8'>
                            <DonutChart color='#FBA63C' number={2} text='test attempted' size={110} thickness={5} progress={50} fontSize='1.5rem' />
                            <DonutChart color='#1294F2' number={'75%'} text='Accuracy' size={120} thickness={5} progress={75} fontSize='1.5rem' />
                            <DonutChart color='#46BD84' number={10} text='Correct answers' size={120} thickness={5} progress={60} fontSize='1.5rem' />
                            <DonutChart color='#FF8B7B' number={12} text='Incorrect answers' size={120} thickness={5} progress={80} fontSize='1.5rem' />
                        </div>
                    </div>
                    <img src={performanceimg} style={{ margin: '1rem', width:'200px'}} />
                </Card>
            </div>
        </div>
    );
};

export default TestSeriesPerformance;