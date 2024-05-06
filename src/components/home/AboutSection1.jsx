import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { IconCheck, IconDiscountCheck, IconRosette } from '@tabler/icons';
import AboutImage from '../../asset/images/aboutUs.svg';
import GradientLink from '../form/GradientLink';
import check from '../../asset/images/check.png';
import WithScrollAnimation from './WithScrollAnimation';

const AboutSection1= () => {
    return (
        <WithScrollAnimation>
            <section id='about' className="relative py-20">
            <Container maxWidth="lg">
                <Grid container spacing={8}>
                    <Grid item xs={12} md={6}>
                        <Box mb={6}>
                            <img src={AboutImage} style={{ width: '100%'}} alt="about" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <div className="about-content mb-12 px-4">
                                <div className="section-title mb-4 font-semibold">
                                    <Typography fontWeight={900} sx={{ color: '#2B527A', letterSpacing: '2px',textAlign:{xs:'center',md:'left'} }}>
                                        ABOUT US
                                    </Typography>
                                    <Typography variant="h2" component="h2" fontWeight={800} color='#4B4B4D' sx={{textAlign:{xs:'center',md:'left'}}}>
                                        Increase Your High Education Level with <span style={{ color: '#207EB8' }}>Taksh</span>
                                    </Typography>
                                </div>
                                <div className="mb-8 ">
                                    <Typography variant="body1" sx={{textAlign:{xs:'center',md:'left'}}} component="p" gutterBottom>
                                        Helping employees gain skills and providing career development often take a back seat to business priorities but workplace. We offer fresh courses on emerging topics that keep your level.
                                    </Typography>
                                    <ul className='mt-4'>
                                        <li className='flex items-center font-bold mb-4'><img width='40px' style={{marginRight:'10px'}} src={check} alt='check' /> Course curriculum </li>
                                        <li className='flex items-center font-bold mb-4'><img width='40px' style={{marginRight:'10px'}} src={check} alt='check' /> Easy to enroll courses</li>
                                        <li className='flex items-center font-bold mb-4'><img width='40px' style={{marginRight:'10px'}} src={check} alt='check' /> Know the latest technology</li>
                                    </ul>
                                </div>
                                <Box width={{ xs: '60%', sm: '50%', md: '30%' }} mx={{xs:'auto',md:'0'}}>
                                    <GradientLink text='Apply Now!' to='/' />
                                </Box>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </section>
        </WithScrollAnimation>
    );
};

export default AboutSection1;
