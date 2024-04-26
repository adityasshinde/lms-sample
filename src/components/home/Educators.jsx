import { Box, Grid, Typography ,Skeleton,useMediaQuery} from "@mui/material";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import React, { useRef } from "react";
import checkImg from "../../asset/images/check.png";
import image from "../../asset/images/edu.png";
import EducatorsCard from "../molecules/EducatorsCard";
import bgImg from '../../asset/images/eduB.png';
import Slider from "react-slick";
import { useHome } from "../../hooks/hooks";
import Loader from "../ui/Loader";
import WithScrollAnimation from "./WithScrollAnimation";

const Educators = () => {
  const { instructors } = useHome();
  const sliderRef = useRef(null);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
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
  const Educators = [
    { name: "Miles, Esther", deg: "Nursing Assistant", image: image },
    { name: "Cooper, Kristin", deg: "Web Designer", image: image },
    { name: "Black, Marvin", deg: "Medical Assistant", image: image },
    { name: "white, Marvin", deg: "Medical Assistant", image: image },
    { name: "Nguyen, Shane", deg: "Marketing Coordinator", image: image },
  ];
  return (
    <WithScrollAnimation>
      <div id="educators" style={{ width: "100%", marginBottom: "15vh", position: "relative" }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          {/* First Child */}
          <Grid item xs={12} textAlign="center">
            <Typography
              variant="body1"
              fontWeight={900}
              sx={{
                color: "#2B527A",
                letterSpacing: "2px",
              }}
            >
              EDUCATORS
            </Typography>
            <Typography
              variant="h2"
              fontWeight={800}
              sx={{ color: "#4B4B4D", textAlign: "center", mb: 2 }}
            >
              <Typography
                variant="h2"
                component="span"
                fontWeight={800}
                sx={{ color: "primary.main" }}
              >
                Elevating{" "}
              </Typography>
              Education with Unparalleled Mentors
            </Typography>
          </Grid>

          {/* Second Child */}
          <Grid
            item
            mb="5vh"
            padding="0 !important"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "start", md: "space-evenly" },
              alignItems: "start",
              width: { xs: "60%", md: "70%" },
            }}
          >
            <Box display="flex" alignItems="center" my="0.5rem" mx="auto">
              <img
                src={checkImg}
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <Typography
                sx={{ fontWeight: "600", display: "flex", color: "#4B4B4D" }}
              >
                Lorem ipsum dolor sit amet
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" my="0.5rem" mx="auto">
              <img
                src={checkImg}
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <Typography
                sx={{ fontWeight: "600", display: "flex", color: "#4B4B4D" }}
              >
                Lorem ipsum dolor sit amet
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" my="0.5rem" mx="auto">
              <img
                src={checkImg}
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <Typography
                sx={{ fontWeight: "600", display: "flex", color: "#4B4B4D" }}
              >
                Lorem ipsum dolor sit amet
              </Typography>
            </Box>
          </Grid>

          {/* Third Child */}
          <Grid item container padding="0 !important" display='flex' alignItems='center' justifyContent="center">
            {instructors ? <>
              {instructors.lenght == 0
                ? <Typography variant="h3" sx={{ color: '#4B4B4D' }}>No Educators Found</Typography>
                : <Grid item paddingBottom='2rem' height='auto' width="90%" mx='auto' position="relative">
                  <Slider ref={sliderRef} {...settings}>
                    {instructors.map((educator, index) => (
                      <EducatorsCard
                        key={index}
                        margin={Educators?.length > 4 ? "auto" : "0"}
                        maxWidth={230}
                        name={educator?.personalInformation?.fullName}
                        // deg={educator?.biographicalInformation?.briefBiography}
                        image={educator?.profileImage}
                      />
                    ))}
                  </Slider>
                  <img
                    src={bgImg}
                    style={{
                      position: "absolute",
                      bottom: '0',
                      zIndex: -1,
                      height: "70%",
                    }}
                  />
                </Grid>}
            </>
              :
              <Box
                sx={{
                  margin: "auto",
                  overflow: "hidden",
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {lgUp ? [1, 2, 3, 4].map(item =>
                  <Skeleton key={item} animation="wave" height="600px" width="500px" />
                )
                  : <Skeleton animation="wave" height="600px" width="500px" />}
              </Box>
            }
            <Grid
              item
              sx={{
                position: "absolute",
                bottom: { xs: "-8%", md: "-12%" },
                right: { xs: "14%", md: "10%" },
                display: "flex",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
                onClick={previousSlide}
                className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"
              >
                <IconChevronLeft />
              </div>
              <div
                className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"
                style={{
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "50%",
                  marginLeft: "8px",
                }}
                onClick={nextSlide}
              >
                <IconChevronRight />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </WithScrollAnimation>
  );
};

export default Educators;
