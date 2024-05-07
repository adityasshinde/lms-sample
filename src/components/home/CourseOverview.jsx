import React from 'react';
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Icon, Divider, Card, CardContent } from '@mui/material';
import { Box, display } from '@mui/system';
import { IconChevronDown, IconCircleCheck, IconStar, IconVideo } from '@tabler/icons';
import GradientLink from '../form/GradientLink';
import WithScrollAnimation from './WithScrollAnimation';

const CourseOverview = () => {
    return (
       <WithScrollAnimation>
         <Box>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Typography fontWeight={900} sx={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'start', letterSpacing: '2px', fontSize: '36px', textAlign: 'left', lineHeight: '35px' }}>
                        Course Overview <Divider sx={{ width: "250px", ml: '1rem', height: "2px", backgroundColor: "white" }} />
                    </Typography>
                    <Typography sx={{ color: 'white', my: '1.5rem', textAlign: 'left', fontWeight: '400', fontSize: '22px' }}>
                        10 Modules <span className='mx-2'>|</span> 34+ Lessons <span className='mx-2'>|</span> 16 hours of recorded lectures
                    </Typography>
                    <Box sx={{ pr: '3rem', my: '2rem' }}>
                        {[...Array(10)].map((_, index) => (
                            <Accordion key={index} sx={{ padding: 0, margin: 0, borderRadius: '8px' }}>
                                <AccordionSummary sx={{
                                    bgcolor: '#6874BB', py: '5px', px: '1rem', '&.Mui-expanded': {
                                        bgcolor: 'white',
                                    },
                                }} expandIcon={<IconChevronDown />}>
                                    <Typography sx={{ color: '#1B1A55', fontWeight: '600', fontSize: '20px' }}>Module {index + 1}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="subtitle1" sx={{ color: '#1B1A55', fontWeight: '800', fontSize: '20px', my: '8px' }}>Subheading</Typography>
                                    <ul>
                                        <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '8px 0' }}><IconVideo className='mr-4' fill='#1B1A55' />  Video lecture 1 </li>
                                        <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '8px 0' }}><IconVideo className='mr-4' fill="#1B1A55" />  Video lecture 2 </li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                    <Box width={{ xs: '60%', sm: '50%', md: '30%' }} mx={{ xs: 'auto', md: '0' }}>
                        <GradientLink text='Learn More' to='/' />
                    </Box>
                </Grid>
                {/* Right side with course card */}
                <Grid item xs={5}>
                    <Card sx={{ backgroundColor: '#1B1A55', p: '2rem', borderRadius: '8px', maxWidth: 600 }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP8ZCXaHTT6ZuanVrHq61VzBQWTgETphR6xw&s" alt="Thumbnail" style={{ width: '100%', borderRadius: '8px' }} />
                        <CardContent style={{ textAlign: 'center', padding: '1rem 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                <div style={{ display: 'flex' }}>
                                    {[...Array(5)].map((_, index) => (
                                        <IconStar key={index} className='mr-1' color={index < 4 ? '#DFC800' : 'white'} fill={index < 4 ? '#DFC800' : 'transparent'} />
                                    ))}
                                </div>
                                <Typography sx={{ fontWeight: '400', fontSize: '18px', color: 'white' }}>4.0 (150+ reviews)</Typography>
                            </div>
                            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '32px', lineHeight: '40px', textAlign: 'left', my: '1rem' }}>Course Name</Typography>
                            <div>
                                <Typography variant="subtitle1" sx={{ color: 'white', width: '200px', padding: '5px', borderRadius: '32px', backgroundColor: '#4B4B4B' }}>Level: Beginner</Typography>
                            </div>
                            <ul style={{ color: 'white', margin: '2rem 0' }}>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '8px 0', fontWeight: '400', fontSize: '16px' }}><IconCircleCheck fill='#9290C3' color='#1B1A55' className='mr-4' /> Premium Footage Access</li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '8px 0', fontWeight: '400', fontSize: '16px' }}><IconCircleCheck fill='#9290C3' color='#1B1A55' className='mr-4' /> Course lecture notes</li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '8px 0', fontWeight: '400', fontSize: '16px' }}><IconCircleCheck fill='#9290C3' color='#1B1A55' className='mr-4' /> Easy Payment Method</li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '8px 0', fontWeight: '400', fontSize: '16px' }}><IconCircleCheck fill='#9290C3' color='#1B1A55' className='mr-4' /> Live Community sessions</li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '8px 0', fontWeight: '400', fontSize: '16px' }}><IconCircleCheck fill='#9290C3' color='#1B1A55' className='mr-4' /> Learn Anytime, Anywhere</li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '8px 0', fontWeight: '400', fontSize: '16px' }}><IconCircleCheck fill='#9290C3' color='#1B1A55' className='mr-4' /> 24/7 Instant Email Support</li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '8px 0', fontWeight: '400', fontSize: '16px' }}><IconCircleCheck fill='#9290C3' color='#1B1A55' className='mr-4' /> Year Long Access of the Course</li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '8px 0', fontWeight: '400', fontSize: '16px' }}><IconCircleCheck fill='#9290C3' color='#1B1A55' className='mr-4' /> Guaranteed Best Pricing from the Market</li>
                                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: '8px 0', fontWeight: '400', fontSize: '16px' }}><IconCircleCheck fill='#9290C3' color='#1B1A55' className='mr-4' /> 14+ hours recorded content</li>
                            </ul>
                            <Box width={{ xs: '60%', sm: '50%', md: '30%' }} mx={{ xs: 'auto', md: '0' }}>
                                <GradientLink text='Enroll Now' to='/' />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
       </WithScrollAnimation>
    );
};

export default CourseOverview;
