import { Box, Divider, Grid, Typography, useMediaQuery, } from "@mui/material";
import GradientLink from "../form/GradientLink";
import hero from '../../asset/images/hero.png';
import grp from '../../asset/images/grp.png';
import f1 from '../../asset/images/01.png';
import f2 from '../../asset/images/02.png';
import f3 from '../../asset/images/03.png';
import l1 from '../../asset/images/l1.png';
import l2 from '../../asset/images/l2.png';

const HeroSection = () => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  // const dotsContainerStyle = {
  //   position: 'absolute',
  //   width: '100vw',
  //   height: '100vh',
  //   pointerEvents: 'none', // So that the dots don't interfere with mouse events on underlying elements
  // };

  // const dotStyle = {
  //   width: '4px',
  //   height: '4px',
  //   backgroundColor: '#12304c', // Color of the dots
  //   borderRadius: '50%',
  //   position: 'absolute',
  // };

  // const generateDots = () => {
  //   const dots = [];
  //   const gridSize = 70; // Adjust the grid size as needed
  //   const dotSpacing = 20; // Adjust the spacing between dots as needed

  //   for (let x = 0; x <= gridSize; x++) {
  //     for (let y = 0; y <= gridSize; y++) {
  //       const left = x * dotSpacing;
  //       const top = y * dotSpacing;

  //       dots.push(
  //         <div key={`dot-${x}-${y}`} style={{ ...dotStyle, left, top }}></div>
  //       );
  //     }
  //   }

  //   return dots;
  // };
  return (
    <Box
      sx={{
        minHeight: "85vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: lgUp ? "center" : "start",
        justifyContent: "start",
      }}
    >
       {/* <div style={dotsContainerStyle}>{generateDots()}</div> */}
      <Grid container spacing={1} alignItems="center" position='relative'>
        <Grid item xs={7}>
          <Box sx={{ mx: "auto", my: "3rem" }}>
            <Typography
              variant="body1"
              color="white"
              sx={{
                mt: 2,
                fontSize: "28px",
                textAlign: "left",
                fontWeight: "400",
                lineHeight: '35.28px',
              }}
            >
              live cohort course 2.0
            </Typography>
            <Typography
              fontWeight='1000'
              fontSize="90px"
              color="white"
              lineHeight='109.71px'
              textAlign={"left"}
            >
              VIDEO EDITING
            </Typography>
            <Typography
              variant="body1"
              color="white"
              sx={{
                mt: 2,
                fontSize: "28px",
                textAlign: "left",
                fontWeight: "400",
                lineHeight: '35.28px',
                display:'flex',
                alignItems:'center',
                justifyContent:'start',
                gap:'10px'
              }}
            >
              from basics to mastery <Divider sx={{ width: "300px",mt:'0.5rem', height: "2px", backgroundColor: "white" }} />
            </Typography>
            <Typography
              variant="body1"
              color="white"
              sx={{
                mt: 2,
                fontSize: "1rem",
                textAlign: "left",
                fontWeight: "400",
              }}
            >
              An interesting platform that will teach you in more<br /> an interactive way
            </Typography>
            <Box sx={{ mt: 4, width: "200px" }}>
              <GradientLink
                text="Enroll Now"
                to="/courses"
              />
            </Box>
            <Typography
              variant="body1"
              color="white"
              sx={{
                mt: 2,
                fontSize: "18px",
                textAlign: "left",
                fontWeight: "300",
                display:'flex',
                alignItems:'center',
                justifyContent:'start',
                lineHeight:'30px',
                gap:'10px'
              }}
            > <img src={grp} />
              10k+ students enrolled
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5} >
          <img src={hero} />
          <img src={f1} style={{position:'absolute',width:'150px',top:'70%',right:'35%'}} />
          <img src={f2} style={{position:'absolute',top:'40%',right:'0%',width:'140px'}} />
          <img src={f3} style={{position:'absolute',width:'180px',right:'25%'}} />
        </Grid>
      </Grid>
      <img src={l1} style={{position:'absolute',top:'5%',left:'5%'}} />
      <img src={l1} style={{position:'absolute',top:'10%',right:'3%'}} />
      <img src={l1} style={{position:'absolute',bottom:'3%',left:'40%'}} />
      <img src={l2} style={{position:'absolute',bottom:'5%',right:'0%'}} />
      <img src={l2} style={{position:'absolute',bottom:'0%',left:'0%'}} />

    </Box>
  );
};

export default HeroSection;
