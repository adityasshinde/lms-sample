import { Card, Typography } from '@mui/material';
import React from 'react';

import DonutChart from '../atoms/DonutChart';


const TestPerformance = ({attemptedCount,totalQuestion,maxMarks, unattemptedCount, correctCount, wrongCount, totalMarks}) => {
    //round off the values to integer
    const accuracy = Math.round((correctCount / (attemptedCount)) * 100);
   const totalQuestions = attemptedCount + unattemptedCount;
   const score = (totalMarks / maxMarks) * 100;
   const correct = (correctCount / totalQuestions) * 100;
   const Incorrect = (wrongCount / totalQuestions) * 100;
   const unattempted = (unattemptedCount / totalQuestions) * 100;
  return (
    <div className='my-8 w-[90%]'>
      <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
        Test Result
      </Typography>
      <div style={{ display: 'flex', width: '100%' }}>
        <Card>
          <div className='m-4 mt-8 flex flex-wrap items-center justify-start gap-8'>
            <DonutChart color={score<0?'#cf0000':'#46BD84'} number={`${totalMarks}/${maxMarks}`} text='score' size={150} thickness={5} progress={score} fontSize='1.5rem' />
            <DonutChart color='#1294F2' number={`${accuracy}%`} text='Accuracy' size={120} thickness={5} progress={accuracy} fontSize='1.5rem' />
            <DonutChart color='#FBA63C' number={unattemptedCount} text='Unattempted' size={120} thickness={5} progress={unattempted} fontSize='1.5rem' />
            <DonutChart color='#BB86FC' number={correctCount} text='Correct' size={120} thickness={5} progress={correct} fontSize='1.5rem' />
            <DonutChart color='#7455F7' number={wrongCount} text='Incorrect' size={120} thickness={5} progress={Incorrect} fontSize='1.5rem' />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TestPerformance;