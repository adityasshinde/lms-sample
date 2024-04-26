import { Button, Drawer, Typography } from '@mui/material';
import { Box, positions } from '@mui/system';
import { IconCircle } from '@tabler/icons';
import React, { useEffect } from 'react'
import { useTest } from '../../hooks/hooks';
import { useDispatch } from 'react-redux';


const TestSidebar = ({ open, activeSection,setActiveQuestion,submitTest }) => {
    const { questions, sections,responses } = useTest();

    const sectionQuestions = questions?.filter(question => question?.sectionId === activeSection);
    const dispatch = useDispatch();

    const getQuestionStatus = (questionId) => {
        const response = responses?.find(response => response._id === questionId);
        return {status:response?.status,markedForReview:response?.markedForReview};
    }
    const getQuestionColor = (questionId) => {
        const {status,markedForReview} = getQuestionStatus(questionId);
        if(markedForReview){
            return '#634C90';
        }
        switch (status) {
            case 'ANSWERED':
                return '#8BC34B';
            case 'VISITED':
                return '#D94214';
            default:
                return '#EEEEEE';
        }
    }


    return (
        <Box className='min-h-[90vh] w-full relative' display={open ? 'block' : 'none'} sx={{ borderLeft: '2px solid #4b4b4d18', zIndex: 0,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
            <div className='grid grid-cols-5 gap-2 p-6 mb-4'>
                {sectionQuestions?.map((question, index) => (
                    <div className='relative cursor-pointer' onClick={()=>{setActiveQuestion(question)}}>
                        <button key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: getQuestionColor(question?._id), padding: '5px 10px', fontWeight: 'bold', color: getQuestionColor(question?._id)==='#EEEEEE'?'#4B4B4D':'white', borderRadius: '50%', margin: '5px', width: '35px', height: '35px' }}>{index + 1}</button>
                        {(getQuestionStatus(question?._id).markedForReview && getQuestionStatus(question?._id).status==="ANSWERED") && <IconCircle fill='#8BC34B' style={{position:'absolute',bottom:'8px',right:'16px'}} color='#634C90' size={16} />}
                    </div>
                ))}
            </div>
            <div className='pb-4' >
                <div className='px-6'>
                    <Typography sx={{ color: '#4B4B4D', margin: '1rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyItems: 'start' }}><IconCircle fill='#8BC34B' style={{ marginRight: '10px' }} color='#8BC34B' size={20} /> ANSWERED</Typography>
                    <Typography sx={{ color: '#4B4B4D', margin: '1rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyItems: 'start' }}><IconCircle fill='#D94214' style={{ marginRight: '10px' }} color='#D94214' size={20} /> NOT ANSWERED</Typography>
                    <Typography sx={{ color: '#4B4B4D', margin: '1rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyItems: 'start' }}><IconCircle fill='#EEEEEE' style={{ marginRight: '10px' }} color='#EEEEEE' size={20} /> NOT VISITED</Typography>
                    <Typography sx={{ color: '#4B4B4D', margin: '1rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyItems: 'start' }}><IconCircle fill='#634C90' style={{ marginRight: '10px' }} color='#634C90' size={20} /> MARKED FOR REVIEW</Typography>
                    <Typography sx={{ color: '#4B4B4D', margin: '1rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyItems: 'start',position:'relative' }}><IconCircle fill='#634C90' style={{ marginRight: '10px' }} color='#634C90' size={20} /><IconCircle fill='#8BC34B' style={{position:'absolute',bottom:'3px',left:'10px'}} color='#634C90' size={10} /> ANSWERED & MARKED FOR REVIEW</Typography>
                </div>
                <div className='px-6 py-2 flex items-center justify-between'>
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: '10px 16px', border: '2px solid #207EB8', fontWeight: 'bold', color: '#207EB8', borderRadius: '8px' }}> ALL QUESTIONS</button>
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: '10px 16px', border: '2px solid #207EB8', fontWeight: 'bold', color: '#207EB8', borderRadius: '8px' }}> INSTRUCTIONS</button>
                </div>
                <div className='px-6 pt-4'>
                    <Button variant='contained' onClick={()=>submitTest()} style={{ backgroundColor: '#50BA57', color: 'white', padding: '10px 0', fontWeight: 'bold', borderRadius: '8px', width: '100%' }}>SUBMIT</Button>
                </div>
            </div>
        </Box>
    )
}

export default TestSidebar;