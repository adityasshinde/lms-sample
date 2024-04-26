import React from 'react';
import { Container, Link, Grid } from '@mui/material';
import { Box } from '@mui/system';

const HeaderLine = () => {
    return (
        <div className="header-top-area hiEnrodden text-white bg-gray-700 px-8 relative">
            <Container >
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <div className="flex justify-center items-start flex-wrap">
                            <div className="header-top-icon">
                                <Link href="tel:(555)674890556" underline="none">
                                    <i className="fas fa-phone-alt"></i>(555) 674 890 556
                                </Link>
                                <Link href="mailto:info@example.com" underline="none">
                                    <i className="fal fa-envelope"></i>info@example.com
                                </Link>
                                <i className="fal fa-map-marker-alt"></i>
                                <span>3rd Avenue, San Francisco</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="flex justify-center items-start flex-wrap">
                            <div className="header-top-login flex justify-end">
                                <div className="header-social">
                                    <Link href="https://www.Linkedin.com" target="_blank" underline="none">
                                        <i className="fab fa-linkedin-in"></i>
                                    </Link>
                                    <Link href="https://twitter.com/" target="_blank" underline="none">
                                        <i className="fab fa-twitter"></i>
                                    </Link>
                                    <Link href="https://instagram.com/" target="_blank" underline="none">
                                        <i className="fab fa-instagram"></i>
                                    </Link>
                                    <Link href="https://www.facebook.com/" target="_blank" underline="none">
                                        <i className="fab fa-facebook-f"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default HeaderLine;
