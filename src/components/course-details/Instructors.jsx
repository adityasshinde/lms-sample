import { Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef } from "react";
import Slider from "react-slick";
import userImg from "../../asset/images/user-1.jpg";
import GradientButton from "../form/GradientButton";
import image from '../../asset/images/edu.png';

import EducatorsCard from "../molecules/EducatorsCard";
import { useHome } from "../../hooks/hooks";
import InstructorCard from "../molecules/InstructorCard";

const Instructors = ({courseInstructors}) => {
  const sliderRef = useRef(null);
  const {instructors}=useHome();
  const Educators = instructors?.filter((instructor) => {
    return courseInstructors?.includes(instructor._id);
  }
);
const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
let sliderwidth='100%';
if(Educators?.length===1 && lgUp){
  sliderwidth='50%';
}
if(Educators?.length===2 && lgUp){
  sliderwidth='75%';
}

  const settings = {
    dots: false,
    infinite: (Educators?.length < 4 && lgUp) ? false : true,
    autoplay: (Educators?.lengthsliderwidth < 4 && lgUp) ? false : true,
    autoplaySpeed: (Educators?.length < 4 && lgUp) ? 0 : 3000,
    slidesToShow: (Educators?.length < 4 && lgUp) ? Educators?.length : 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const nextSlide = () => {
    sliderRef.current.slickNext(); // Go to the next slide
  };

  const previousSlide = () => {
    sliderRef.current.slickPrev(); // Go to the previous slide
  };

  return (
    <Box id='tutors' sx={{ width: "100%", padding: "0 6%",mb:'3rem'}}>
      <Typography variant="h4" sx={{ margin: "2rem 0", color: "#4B4B4D" }}>
        Taught by the best
      </Typography>
      <Grid item width={sliderwidth} position="relative">
        <Slider ref={sliderRef} {...settings}>
             {Educators?.map((educator, index) => (
                <InstructorCard
                  margin={Educators?.length > 4 ? "auto" : "0"}
                  key={index}
                  maxWidth={400}
                  name={educator?.personalInformation?.fullName}
                  // deg={educator?.biographicalInformation?.briefBiography}
                  image={educator?.profileImage}
                />
              ))}
        </Slider>
        {/* <div onClick={previousSlide} aria-label='Previous' style={{ cursor:'pointer',padding: '4px', borderRadius: '50%', backgroundColor: '#c6e0f7',marginRight:'8px',position:'absolute',top:'50%',left:'1rem'}}><IconChevronLeft/></div>
            <div onClick={nextSlide} aria-label='Next' style={{ cursor:'pointer',padding: '4px', borderRadius: '50%', backgroundColor: '#207EB8',marginLeft:'8px',position:'absolute',top:'50%',right:'1rem' }}><IconChevronRight color="white" /></div> */}
      </Grid>
    </Box>
  );
};

export default Instructors;
