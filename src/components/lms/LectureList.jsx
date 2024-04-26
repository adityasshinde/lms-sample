import React from 'react';
import LectureListItem from './LectureListItem';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const LectureList = ({ongoingLecturesList}) => {
    // Sample lecture data

    return (
        <Box width='100%' my={4}>
            <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
                Continue Learning
            </Typography>
            {ongoingLecturesList.map(lecture => (
                <LectureListItem
                    key={lecture._id}
                    lectureName={lecture.title}
                    lectureImage={lecture.thumbnailUrl}
                    subjectId={lecture.subjectId}
                />
            ))}
        </Box>
    );
};

export default LectureList;
