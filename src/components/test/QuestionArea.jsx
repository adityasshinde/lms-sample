import React, { useEffect, useState } from 'react';
import { Typography ,Box} from '@mui/material';
import { useTest } from '../../hooks/hooks';
import { setResponse } from '../../store/slices/testSlice';
import { useDispatch } from 'react-redux';


const QuestionArea = ({activeQuestion,activeSection,setActiveQuestion,setAnswerForActiveQuestion,answerForActiveQuestion}) => {
  const {responses,questions}=useTest();
  const [total,setTotal]=useState();
  const [index,setIndex]=useState();
  const dispatch=useDispatch();
  useEffect(() => {
    const response=responses?.find(response=>response?._id===activeQuestion?._id);
    if(response){
      setActiveQuestion(response);
      setAnswerForActiveQuestion(response?.answer);
    }else{
      dispatch(setResponse({ ...activeQuestion, status: 'VISITED', answer: null }));
    }
    if(questions){
      const sectionQuestions = questions?.filter(question => question?.sectionId === activeSection);
      setTotal(sectionQuestions?.length);
      setIndex(sectionQuestions?.findIndex(question=>question?._id===activeQuestion?._id)+1);
    }
  }, [activeQuestion]);
  const handleOptionSelect = (option) => {
    setAnswerForActiveQuestion(option);
  };

  return (
    <div style={{ padding: '1rem 2rem', minHeight: '66vh', width: '90%' }}>
      <div>
        <Typography sx={{ color: '#85878D', fontSize: '1rem', fontWeight: 'bold' }}>Question {index} of {total || '0'}</Typography>
        <Box sx={{ fontSize: '1rem', fontWeight: 'bold', my: '1rem' }}>
          <div dangerouslySetInnerHTML={{ __html: activeQuestion?.questionText }} />
         {activeQuestion?.questionImage && <img className='my-2' src={activeQuestion?.questionImage} />}
        </Box>
        <div className='w-full lg:w-1/2 grid grid-cols-1 gap-4 my-8'>
          {activeQuestion?.options?.map((option, index) => (
            <label
              key={index}
              style={{
                margin: '0',
                width: '100%',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: option === answerForActiveQuestion ? '0px solid #207EB8' : '2px solid #CECECE',
                borderLeft: option === answerForActiveQuestion ? '6px solid #207EB8' : '2px solid #CECECE',
                borderRadius: '4px',
                padding: '10px 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: option === answerForActiveQuestion ? '#207EB8' : '#85878D',
                boxShadow: option === answerForActiveQuestion ? '0 0 8px #4B4B4D99' : 'none',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: option }} />
              <input
                type='radio'
                id={`opt${index}`}
                checked={option === answerForActiveQuestion}
                onChange={() => handleOptionSelect(option)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionArea;
