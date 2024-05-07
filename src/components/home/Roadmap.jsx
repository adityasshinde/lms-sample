import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import WithScrollAnimation from './WithScrollAnimation';
import { Box } from '@mui/system';

const Roadmap = () => {
    return (
        <WithScrollAnimation>
            <Box sx={{ my: '3rem' }}>
                <Typography fontWeight={900} sx={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'start', letterSpacing: '2px', fontSize: '36px', textAlign: 'left', lineHeight: '35px',my:'5rem' }}>
                    <Divider sx={{ width: "300px", ml: '1rem', height: "2px", mr: '1rem', backgroundColor: "white" }} /> Roadmap of your Success <Divider sx={{ width: "300px", ml: '1rem', height: "2px", backgroundColor: "white" }} />
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    {/* Spot 1 */}
                    <Grid item xs={2} align="center">
                        <div style={{ backgroundColor: '#6874BB', color: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                            1
                        </div>
                        <Typography>Introduction</Typography>
                    </Grid>
                    {/* Arrow 1 */}
                    <Grid item xs={1} align="center">
                        <Typography>→</Typography>
                    </Grid>
                    {/* Spot 2 */}
                    <Grid item xs={2} align="center">
                        <div style={{ backgroundColor: '#6874BB', color: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                            2
                        </div>
                        <Typography>Core Concepts</Typography>
                    </Grid>
                    {/* Arrow 2 */}
                    <Grid item xs={1} align="center">
                        <Typography>→</Typography>
                    </Grid>
                    {/* Spot 3 */}
                    <Grid item xs={2} align="center">
                        <div style={{ backgroundColor: '#6874BB', color: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                            3
                        </div>
                        <Typography>Hands-on Projects</Typography>
                    </Grid>
                    {/* Arrow 3 */}
                    <Grid item xs={1} align="center">
                        <Typography>→</Typography>
                    </Grid>
                    {/* Spot 4 */}
                    <Grid item xs={2} align="center">
                        <div style={{ backgroundColor: '#6874BB', color: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                            4
                        </div>
                        <Typography>Assessments</Typography>
                    </Grid>
                    {/* Arrow 4 */}
                    <Grid item xs={1} align="center">
                        <Typography>→</Typography>
                    </Grid>
                    {/* Spot 5 */}
                    <Grid item xs={2} align="center">
                        <div style={{ backgroundColor: '#6874BB', color: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                            5
                        </div>
                        <Typography>Completion</Typography>
                    </Grid>
                </Grid>
            </Box>
        </WithScrollAnimation>
    );
};

export default Roadmap;
