import { Card, Typography } from '@mui/material';
import React from 'react';
import { useHome } from '../../hooks/hooks';



const TestInfo = ({test}) => {
   const {subjects}=useHome();
   const TestSubject=subjects.find((subject)=>subject._id===test?.subject);
  return (
    <div className='my-8 w-[90%]'>
        <Card>
        <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
          {test?.title}
      </Typography>
        <Typography variant="h6" gutterBottom textAlign='left' mb={2}>
         Subject: {TestSubject?.title}
      </Typography>
        <Typography variant="h6" gutterBottom textAlign='left' mb={2}>
             Total Marks: {test?.totalMarks} 
        </Typography>
        <Typography variant="h6" gutterBottom textAlign='left' mb={2}>
             Total Questions: {test?.totalQuestions}
        </Typography>
        <Typography variant="h6" gutterBottom textAlign='left' mb={2}>
             Duration: {test?.duration}
        </Typography>
        </Card>
    </div>
  );
};

export default TestInfo;