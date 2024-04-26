import { ChevronRight } from "@mui/icons-material";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import back from "../../asset/images/Rectangle 116.png";
import hm from '../../asset/images/hm.png';
import img1 from "../../asset/images/banner1.jpeg";
import img2 from "../../asset/images/banner2.jpeg";
import GradientLink from "../form/GradientLink";

const heroImgs = [
  {
    id: 1,
    img: img1,
  },
  {
    id: 2,
    img: img2,
  },
  {
    id: 3,
    img: img1,
  },
  {
    id: 4,
    img: img2,
  },
];

const HeroSection = () => {
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <Box
      sx={{
        minHeight: "85vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: lgUp?"center":"start",
        justifyContent: "center",
      }}
    >
      <img
        src={back}
        className="hidden lg:block"
        style={{
          position: "absolute",
          height: "100%",
          width: "50%",
          top: 0,
          right: 0,
        }}
      />
      <Grid container spacing={1} alignItems="center">
      <Grid
          item
          xs={12}
          sx={{ display: { xs: "block", md: "none" },my:'2rem' }}
        >
          <img
            src={hm}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </Grid>
        <Grid item padding="0 !important" xs={12} md={5}>
          <Box sx={{ px: { xs: "1rem", md: "3rem" } }}>
            <Typography variant="h1" fontSize='2.2rem' color="#4B4B4D" textAlign={!lgUp ? 'center' : 'left'}>
              Unlock Your Potential
              <br /> with{" "}
              <Typography
                variant="h1"
                fontSize='2.2rem'
                component="span"
                sx={{ color: "primary.main" }}
              >
                Interactive
                <br />
                Learning!
              </Typography>
            </Typography>
            <Typography variant="body1" color="#4B4B4D" sx={{ mt: 2,textAlign:!lgUp ? 'center' : 'left' }}>
              Unlock a world of knowledge with top-notch instructors guiding
              your way.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit,Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur.
              <br></br>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </Typography>
            <Box mx={{xs:'auto',md:'0'}} sx={{ mt: 4, width: { xs: "60%", sm: "50%", lg: "43%" } }}>
              <GradientLink
                text="Get Started"
                to="/courses"
                appendComponent={
                  <ChevronRight
                    sx={{
                      color: "black",
                      borderRadius: "4px",
                      fontSize: "1rem",
                      position: "absolute",
                      right: "4px",
                      height: "85%",
                      width: "30px",
                      backgroundColor: "white",
                    }}
                  />
                }
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{ display: { xs: "none", md: "block" } }}
          justifyContent="center"
          position="relative"
        >
          <Grid item width="120%">
            <Slider ref={sliderRef} {...settings}>
              {heroImgs.map((item) => (
                <div key={item.id} className="slick-slide">
                  {/* <div className="bg-[#ffffff] w-[90%] h-[50vh] rounded border border-gray-200"></div> */}
                  <img
                    src={item.img}
                    alt={`Slide ${item.id}`}
                    style={{ width: "90%", height: "50vh", margin: "0 1rem" }}
                  />
                </div>
              ))}
            </Slider>
          </Grid>
          <Grid
            item
            sx={{
              position: "absolute",
              bottom: "-4.5rem",
              right: "20%",
              display: "flex",
            }}
          >
            <div
              onClick={previousSlide}
              aria-label="Previous"
              style={{
                cursor: "pointer",
                padding: "4px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
              className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"
            >
              <IconChevronLeft />
            </div>
            <div
              onClick={nextSlide}
              aria-label="Next"
              className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"
              style={{
                cursor: "pointer",
                padding: "4px",
                borderRadius: "50%",
                marginLeft: "8px",
              }}
            >
              <IconChevronRight />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
