import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { IconCheck, IconDiscountCheck, IconRosette } from '@tabler/icons';
import AboutImage from '../../asset/images/abt1.png';
import GradientLink from '../form/GradientLink';
import v1 from '../../asset/images/abtv1.png';
import check from '../../asset/images/check.png';
import WithScrollAnimation from './WithScrollAnimation';

const AboutSection = () => {
    return (
        <WithScrollAnimation>
            <section id='about' className="relative py-20">
            <Container maxWidth="lg">
                <Grid container spacing={8}>
                    <Grid item xs={12} md={6} position='relative'>
                        <Box mb={6}>
                            <img src={AboutImage} style={{ width: '80%'}} alt="about" />
                            <img src={v1} style={{position:'absolute',bottom:'5%',right:'5%'}} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <div className="about-content mb-12 px-4">
                                <div className="section-title mb-4 font-semibold">
                                    <Typography fontWeight={900} sx={{ color: 'white',display:'flex',alignItems:'center',justifyContent:'start', letterSpacing: '2px',fontWeight:'600',fontSize:'28px',textAlign:'left',lineHeight:'35px'}}>
                                        ABOUT US <Divider sx={{ width: "300px",ml:'1rem', height: "2px", backgroundColor: "white" }} />
                                    </Typography>
                                    <Typography variant="h2" component="h2" fontWeight={800} color='white' sx={{textAlign:{xs:'center',md:'left'},my:'1rem',fontSize:'35px',lineHeight:'45px'}}>
                                    We Are Maximize Your Learning Growth
                                    </Typography>
                                </div>
                                <div className="mb-8 ">
                                    <Typography variant="body1" sx={{textAlign:{xs:'center',md:'left'},fontWeight:'400',fontSize:'20px',color:'white',lineHeight:'30px'}} component="p" gutterBottom>
                                    lat nisl. Accumsan sed odio convallis massa. Platea porttitor sed sit nibh sodales posuere suscipit massa feugiat. Arcu aliquam cursus nisl libero. Penatibus ultrices consectetur nunc massa vel vel morbi sit sapien. nunc hendrerit est fusce.s nisl libero. Penatibus ultrices consectetur nunc massa vel vel morbi sit sapien. nunc hendrerit est fusce.
                                    </Typography>
                                </div>
                                <Box width={{ xs: '60%', sm: '50%', md: '30%' }} mx={{xs:'auto',md:'0'}}>
                                    <GradientLink text='Learn More' to='/' />
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

export default AboutSection;
