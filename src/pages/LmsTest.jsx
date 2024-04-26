import React, { useState } from 'react';
import {  Typography } from "@mui/material";
import {  Box } from "@mui/system";
import GradientButton from '../components/form/GradientButton';
import QuestionArea from '../components/test/QuestionArea';
import DonutChart from '../components/atoms/DonutChart';


const LmsTest = () => {
    const questions=[1,2,3,4,5,6,7,8,9,10];
    const [activeQuestion, setActiveQuestion] = useState(7);
  return (
    <Box px={4}>
        <Box mx={4} display='flex' alignItems='center' justifyContent='space-between'>
          <Typography sx={{color:'#4B4B4D',fontSize:'1.1rem',fontWeight:'bold'}}>Physics Full Length Mock Test 1</Typography>
          <div style={{width:'200px'}}><GradientButton text='Submit Test' /></div>
        </Box>
        <Box width='100%' display='flex' alignItems='center' justifyContent='center' gap={8}>
            <QuestionArea/>
            <div className='mx-8'>
            <DonutChart thickness={5} color='#207EB8' number='7/10' progress={70} size={120} />

            </div>
        </Box>
        <Box mx={4} display='flex' alignItems='center' justifyContent='center' gap={2}>
        <button style={{display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'white',padding:'5px 10px',border:'2px solid #207EB8',fontWeight:'bold',color:'#207EB8',borderRadius:'8px',margin:'0 10px'}}>Prev</button>
        {questions.map((number, index) => (
                    <button key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: activeQuestion>=number?'#207EB8':'white', padding: '5px 10px',border:'1px solid #CCCCCC', fontWeight: 'bold', color: activeQuestion>=number?'white':'#207EB8', borderRadius: '8px', margin: '5px', width: '35px', height: '35px' }}>{number}</button>
                ))}
        <button style={{display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'white',padding:'5px 10px',border:'2px solid #207EB8',fontWeight:'bold',color:'#207EB8',borderRadius:'8px',margin:'0 10px'}}>Next</button>
           
        </Box>
    </Box>
  )
}

export default LmsTest;