import React from 'react';
import { Box, Card, CardContent, CardMedia, Fab, Grid, LinearProgress, Skeleton, Tooltip, Typography } from "@mui/material";
import GradientLink from "../form/GradientLink";
import { useDispatch } from 'react-redux';
import { setLmsSubject } from "../../store/slices/lmsSlice";
import { Stack } from '@mui/system';
import NormalLink from "../form/NormalLink";
import { IconChevronRight, IconCircleChevronRight } from '@tabler/icons';
import { Link } from 'react-router-dom';

const SubjectList = ({ subjects, lectures, completedLectures }) => {
    const colors = ['#207EB8', '#FFC620', '#FF6C5F', '#4CAF50', '#FF5722', '#9C27B0', '#00BCD4', '#FFEB3B', '#795548', '#607D8B'];
    const dispatch = useDispatch();
    const getSubjectProgress = (subjectId) => {
        const subjectLectures = getSubjectLectures(subjectId);
        const subjectCompletedLectures = getSubjectCompletedLectures(subjectId);
        if (subjectCompletedLectures === 0) {
            return 0;
        }
        const progress=parseInt(subjectCompletedLectures / subjectLectures * 100);
        return progress;
    }
    const getSubjectLectures = (subjectId) => {
        const subjectLectures = lectures?.filter(
            (lec) => lec?.subjectId === subjectId
        );
        return subjectLectures?.length;
    }
    const getSubjectCompletedLectures = (subjectId) => {
        const subjectLectures = lectures?.filter(
            (lec) => lec?.subjectId === subjectId
        );
        const subjectCompletedLectures = subjectLectures?.filter((lec) =>
            completedLectures?.includes(lec?._id)
        );
        return subjectCompletedLectures?.length;
    }
    return (
        <>{subjects && subjects.length > 0 &&
            <Box width='100%' my={4}>
                <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
                    Your Subjects
                </Typography>
                <Grid container spacing={2}>
                    {subjects && subjects.map((subject, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index} sx={{ cursor: 'pointer', borderRadius: '16px' }}>
                            <Link to={`${subject._id}`}>
                                <Card sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    border: '1px solid #E7EAE9',
                                    borderRadius: '16px',
                                }}>
                                    <Box display='flex' flexWrap='wrap' alignItems='center' justifyContent='space-between' width='100%'>
                                        <div className='flex items-center'>
                                            <img src={subject.imageUrl} width='35px' alt='subject image' />
                                            <div className='px-4 flex flex-col items-start justify-center'>
                                                <Typography variant='h4' fontWeight='bold' textAlign='left'>{subject.title}</Typography>
                                                <Typography variant='body1' sx={{ fontSize: '16px' }} textAlign='left'>{subject.description}</Typography>
                                            </div>
                                        </div>
                                        <IconChevronRight size={24} />
                                    </Box>
                                    <div className="mt-4 mb-4 w-full">
                                        <div className='flex items-center justify-between'>
                                            <Typography
                                                sx={{
                                                    fontWeight: "300",
                                                    textAlign: "right",
                                                    fontSize: "0.7rem",
                                                    color: "#4B4B4D",
                                                    my: '0.5rem'
                                                }}
                                            >
                                                Completed: {getSubjectCompletedLectures(subject?._id)}/{getSubjectLectures(subject?._id)}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontWeight: "800",
                                                    textAlign: "right",
                                                    fontSize: "0.7rem",
                                                    color: "#08A0F7",
                                                }}
                                            >
                                                {getSubjectProgress(subject?._id)}%
                                            </Typography>
                                        </div>
                                        <LinearProgress variant="determinate" value={getSubjectProgress(subject?._id)} />
                                    </div>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>}</>
    )
}

export default SubjectList;
