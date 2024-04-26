import React from 'react';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Badge from '../atoms/Badge';

const MyCourseTable = ({ courses }) => {
    return (
        <Box width='100%' my={4}>
            <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
                My Courses
            </Typography>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight:'bold',fontSize:'1rem'}}>Course Name</TableCell>
                        <TableCell sx={{fontWeight:'bold',fontSize:'1rem'}}>Lectures</TableCell>
                        <TableCell sx={{fontWeight:'bold',fontSize:'1rem'}}>Status</TableCell>
                        <TableCell sx={{fontWeight:'bold',fontSize:'1rem'}}>Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.map((course, index) => (
                        <TableRow key={index} sx={{cursor:'pointer',':hover':{bgcolor:'#005AE921'}}}>
                            <TableCell sx={{fontSize:'0.9rem'}}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar src={course.avatar} alt={course.name} />
                                    <span style={{ marginLeft: '10px' }}>{course.name}</span>
                                </div>
                            </TableCell>
                            <TableCell sx={{fontSize:'0.9rem'}}>{course.lectures}</TableCell>
                            <TableCell sx={{fontSize:'0.9rem'}}><Badge type={course.status} /></TableCell>
                            <TableCell sx={{fontSize:'0.9rem'}}>{course.category}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
};

export default MyCourseTable;
