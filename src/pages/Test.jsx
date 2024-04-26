import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import TestHeader from '../components/test/TestHeader';
import QuestionArea from '../components/test/QuestionArea';
import TestFooter from '../components/test/TestFooter';
import { Box } from '@mui/system';
import TestSidebar from '../components/test/TestSidebar';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import TestSubjects from '../components/test/TestSubjects';
import { useParams } from 'react-router-dom';
import { useGetQuestionsByTestIdQuery, useGetTestByIdQuery, useGetTestSessionByIdQuery, useSubmitTestMutation } from '../store/api/lmsApi';
import Loader from '../components/ui/Loader';
import { setQuestions, setResponse, setSections } from '../store/slices/testSlice';
import ConfirmationPopup from '../components/molecules/ConfirmationPopup';
import { toast } from 'react-toastify';
import { useTest } from '../hooks/hooks';
import SubmitTest from '../components/test/SubmitTest';



const Test = () => {
  const [isSiderbarOpen,setIsSiderOpen]=useState(true);
  const {responses}=useTest();
  const param=useParams();
  const testId=param?.testId;
  const query=new URLSearchParams(window.location.search);
  const sessionId=query.get('session');
  const dispatch=useDispatch();
  const {data:session,isLoading:sessionLoading}=useGetTestSessionByIdQuery(sessionId);
  const {data:test,isLoading:testLoading}=useGetTestByIdQuery(testId);
  const {data:questions,isLoading:questionsLoading}=useGetQuestionsByTestIdQuery(testId);
  const [submitTestMutation,{isLoading:submitLoading,isSuccess:submitSuccess}]=useSubmitTestMutation();
  const [activeSection,setActiveSection]=useState();
  const [activeQuestion,setActiveQuestion]=useState();
  const [answerForActiveQuestion,setAnswerForActiveQuestion]=useState();
  const [exitDialogOpen,setExitDialogOpen]=useState(false);
  const [submitDialogOpen,setSubmitDialogOpen]=useState(false);
  const [submitData,setSubmitData]=useState({
    total:0,
    answered:0,
    unAnswered:0,
    markedForReview:0,
  });
  const startTime=new Date(session?.startedAt);
  const endTime=new Date(session?.expireOn);

  const submitTest=async()=>{
    const answers=responses?.map(response=>({questionId:response?._id,userAnswer:response?.answer}));
    //answers array should only contain objects with valid questionId and userAnswer, otherwise delete the object
    answers.forEach((answer,index)=>{
      if(!answer?.questionId){
        answers.splice(index,1);
      }
    });
    console.log(answers);
    
    const result=await submitTestMutation({testId,answers});
    if(result?.error){
      setSubmitDialogOpen(false);
      toast.error(result?.error?.data?.error,
      {
        position:'top-center',
        autoClose:2000,
      });

    }
  }
  const submitTestOnTimeUp=()=>{
    setSubmitDialogOpen(true);
    submitTest();
  }
  const handleTestSubmit=()=>{
    let answered=0,markedForReview=0;
    responses?.forEach(response=>{
      if(response?.answer){
        answered++;
      }
      if(response?.markedForReview){
        markedForReview++;
      }
    });
    const total=questions?.length;
    const unAnswered=total-answered;
    setSubmitData({total,answered,unAnswered,markedForReview});
    setSubmitDialogOpen(true);
  }
  const markForReview=(value)=>{
    const response=responses?.find(response=>response?._id===activeQuestion?._id);
    if(response){
      const newResponse={...response,markedForReview:value};
      dispatch(setResponse(newResponse));
      setActiveQuestion(newResponse);
    }else{
      const newResponse={...activeQuestion,status:'VISITED',markedForReview:value};
      dispatch(setResponse(newResponse));
      setActiveQuestion(newResponse);
    }
  }
  const clearResponse=()=>{
    setAnswerForActiveQuestion(null);
    const response={...activeQuestion,status:'VISITED',answer:null};
    dispatch(setResponse(response));
  }
  const saveAndNext=()=>{
    if(!answerForActiveQuestion){
      toast.error('Please select an option to save and move to next question',{
        position:'top-center',
        autoClose:2000,
      });
      return;
    }
    const response=responses?.find(response=>response?._id===activeQuestion?._id);
    if(response){
      dispatch(setResponse({...response,status:'ANSWERED',answer:answerForActiveQuestion}));
    }else{
      dispatch(setResponse({...activeQuestion,status:'ANSWERED',answer:answerForActiveQuestion}));
    }
    nextQuestion();
  }

  const nextQuestion=()=>{
    const sectionQuestions = questions?.filter(question => question?.sectionId === activeSection);
    const index=sectionQuestions?.findIndex(question=>question._id===activeQuestion._id);
    if(index<sectionQuestions.length-1){
      setActiveQuestion(sectionQuestions[index+1]);
      setAnswerForActiveQuestion(null);
    }else{
      const sectionIndex=test?.testSections.findIndex(section=>section._id===activeSection);
      if(sectionIndex<test?.testSections.length-1){
        const nextSection=test?.testSections[sectionIndex+1];
        setActiveSection(nextSection?._id);
        const sectionQuestions = questions?.filter(question => question?.sectionId === nextSection?._id);
        setActiveQuestion(sectionQuestions[0]?sectionQuestions[0]:null);
        setAnswerForActiveQuestion(null);
      }
    }
  }
  const prevQuestion=()=>{
    const sectionQuestions = questions?.filter(question => question?.sectionId === activeSection);
    const index=sectionQuestions?.findIndex(question=>question._id===activeQuestion._id);
    if(index>0){
      setActiveQuestion(sectionQuestions[index-1]);
      setAnswerForActiveQuestion(null);
    }else{
      const sectionIndex=test?.testSections?.findIndex(section=>section._id===activeSection);
      if(sectionIndex>0){
        const prevSection=test?.testSections[sectionIndex-1];
        setActiveSection(prevSection?._id);
        const sectionQuestions = questions?.filter(question => question?.sectionId === prevSection?._id);
        setActiveQuestion(sectionQuestions[sectionQuestions.length-1]?sectionQuestions[sectionQuestions.length-1]:null);
        setAnswerForActiveQuestion(null);
      }
    }
  }


  useEffect(()=>{
    if(test){
      dispatch(setSections(test?.testSections));
      setActiveSection(test?.testSections[0]?._id);
    }
    if(questions){
      dispatch(setQuestions(questions));
    }
  },[test,questions]);
  useEffect(()=>{
    if(activeSection && test && questions){
      const sectionQuestions = questions?.filter(question => question?.sectionId === activeSection);
      setActiveQuestion(sectionQuestions[0]?sectionQuestions[0]:null);
    }
  },[activeSection]);

  return (
    <>
    {exitDialogOpen && (
        <ConfirmationPopup
          heading="Confirm Exit"
          message="Are you sure you want to submit the test by exiting?"
          acceptButton="Submit Test"
          onAccept={()=>{setExitDialogOpen(false);handleTestSubmit()}}
          onCancel={() => setExitDialogOpen(false)}
        />
      )}
    {submitDialogOpen && (
        <SubmitTest
          open={submitDialogOpen}
          total={submitData.total}
          answered={submitData.answered}
          unAnswered={submitData.unAnswered}
          markedForReview={submitData.markedForReview}
          SubmitTest={submitTest}
          CancelSubmit={() => setSubmitDialogOpen(false)}
          status={submitSuccess ? 'SUCCESS' : submitLoading ? 'LOADING' : 'PENDING'}
        />
      )}
    {sessionLoading || testLoading || questionsLoading ?<Loader/>:
    <div>
      <TestHeader endTime={endTime} submitTestOnTimeUp={()=>submitTestOnTimeUp()} setExitDialogOpen={setExitDialogOpen} title={test?.test?.title} />
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box width={isSiderbarOpen?'75%':'100%'}sx={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <TestSubjects sections={test?.testSections} activeSection={activeSection} setActiveSection={setActiveSection} />
          <QuestionArea activeQuestion={activeQuestion} activeSection={activeSection} setActiveQuestion={setActiveQuestion} answerForActiveQuestion={answerForActiveQuestion} setAnswerForActiveQuestion={setAnswerForActiveQuestion} />
          <TestFooter activeQuestion={activeQuestion} markForReview={markForReview} prevQuestion={prevQuestion} nextQuestion={nextQuestion} saveAndNext={saveAndNext} clearResponse={clearResponse} />
        </Box>
        <Box width={isSiderbarOpen?'25%':'1%'} position='relative'>
          <div
            style={{
              color: "black",
              borderRadius: "4px",
              fontSize: "1rem",
              position: "absolute",
              top: "45%",
              left: "-1rem",
              height: "50px",
              width: "20px",
              backgroundColor: "#207EB8",
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              zIndex:1,
              cursor:'pointer'
            }}
          >
            {!isSiderbarOpen ? <IconChevronLeft color='white' stroke={3} onClick={()=>setIsSiderOpen(true)} />
            :<IconChevronRight color='white' stroke={3} onClick={()=>setIsSiderOpen(false)} />}
          </div>
          <TestSidebar open={isSiderbarOpen} activeSection={activeSection} setActiveQuestion={setActiveQuestion} submitTest={handleTestSubmit} />
        </Box>
      </Box>
    </div>}
    </>
  )
}

export default Test;