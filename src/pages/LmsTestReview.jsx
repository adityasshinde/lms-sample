import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import TestPerformance from '../components/lms/TestPerformance';
import QuestionResponse from '../components/lms/QuestionResponse';
import { useGetQuestionsByTestIdQuery, useGetTestByIdQuery, useGetTestEvaluationQuery } from '../store/api/lmsApi';
import { useParams } from 'react-router-dom';
import TestInfo from '../components/lms/TestInfo';
import Loader from '../components/ui/Loader';
import NoResultsCard from '../components/test/NoResultsCard';

const LmsTestReview = () => {
    const params = useParams();
    const testId = params?.testId;
    const { data, isLoading, isError,error } = useGetTestEvaluationQuery(testId);
    const { data: questions, isLoading: questionsLoading } = useGetQuestionsByTestIdQuery(testId);
    const { data: test, isLoading: testLoading } = useGetTestByIdQuery(testId);
    const [responses, setResponses] = useState([]);
    useEffect(() => {
        if (data && questions && test) {
            let responses = [];
            data?.evaluatedSubmission?.forEach(answer => {
                const question = questions?.find(question => question?._id === answer?.questionId);
                responses.push({
                    questionText: question?.questionText,
                    questionImage: question?.questionImage,
                    correctAnswer: answer?.correctOption,
                    userAnswer: answer?.userAnswer || '<p>Not Answered</p>',
                    status:answer?.userAnswer ? answer?.userAnswer===answer?.correctOption ? 'Correct' : 'Incorrect':"Unattempted",
                });
            }
            );

            questions?.forEach(question => {
                const response = responses?.find(response => response?.questionText === question?.questionText);
                if (!response) {
                    responses.push({
                        questionText: question?.questionText,
                        questionImage: question?.questionImage,
                        correctAnswer: question?.correctOption,
                        userAnswer: null,
                        status: 'Unattempted',
                    });
                }
            });

            setResponses(responses);
        }
    }, [data, questions, test]);
    return (
        <>{(isLoading || questionsLoading || testLoading)
            ? <Loader />
            : <>{error?<NoResultsCard/>
                :<Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    minHeight: "100vh",
                    px: '3rem',
                    boxShadow: "0 0 100px rgba(0, 0, 0, 0.1)",
                }}>
                <TestInfo test={test?.test} />
                <TestPerformance totalMarks={data?.counts?.totalMarks} totalQuestion={test?.test?.totalQuestions} maxMarks={test?.test?.totalMarks} correctCount={data?.counts?.correctCount} wrongCount={data?.counts?.wrongCount} attemptedCount={data?.counts?.attemptedCount} unattemptedCount={data?.counts?.unattemptedCount} />
                <QuestionResponse responses={responses} />
            </Box>}</>
            
            
            }</>
    )
}

export default LmsTestReview;