import { ChevronRight } from "@mui/icons-material";
import { Box, Grid, Typography, useMediaQuery, Skeleton } from "@mui/material";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetBannersQuery } from "../../store/api/homeApi";
import GradientLink from "../form/GradientLink";
import Loader from "../ui/Loader";

const HeroSection2 = () => {
  const sliderRef = useRef(null);
  const { data: banners } = useGetBannersQuery();
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
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <Box
      sx={{
        minHeight: "85vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: lgUp ? "center" : "start",
        justifyContent: "center",
      }}
    >
      {/* <img
        src={back}
        className="hidden lg:block"
        style={{
          position: "absolute",
          height: "100%",
          width: "50%",
          top: 0,
          right: 0,
        }}
      /> */}
      <Grid container spacing={1} alignItems="center">
        {/* <Grid
                    item
                    xs={12}
                    sx={{ display: { xs: "block", md: "none" }, my: '2rem' }}
                >
                    <img
                        src={hm}
                        style={{
                            height: "100%",
                            width: "100%",
                        }}
                    />
                </Grid> */}
        <Grid item padding="0 !important" xs={12}>
          <Box sx={{ mx: "auto", my: "3rem" }}>
            <Typography
              variant="h1"
              style={{ fontWeight: "800" }}
              fontSize="3rem"
              color="#4B4B4D"
              textAlign={"center"}
            >
              Unlock Your
              <br />
              Potential with <br />
              <Typography
                variant="h1"
                fontSize="3rem"
                component="span"
                sx={{ color: "primary.main" }}
                style={{ fontWeight: "800" }}
              >
                Interactive Learning!
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              color="#4B4B4D"
              sx={{
                mt: 2,
                fontSize: "1rem",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Unlock a world of knowledge with top-notch <br /> instructors
              guiding your way for CUET Examination.
            </Typography>
            <Box mx={{ xs: "auto" }} sx={{ mt: 4, width: "200px" }}>
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
        {banners ? (
          <Grid
            item
            xs={12}
            // sx={{ display: { xs: "none", md: "block" } }}
            justifyContent="center"
            position="relative"
          >
            <Grid item width="90%" mx="auto" position="relative">
              <Slider ref={sliderRef} {...settings}>
                {banners?.map((item) => (
                  <div key={item._id} className="slick-slide" style={{ height: '70vh' }}>
                    {/* <div className="bg-[#ffffff] w-[90%] h-[50vh] rounded border border-gray-200"></div> */}
                    <img
                      src={item.imageUrl}
                      alt={`Slide ${item._id}`}
                      style={{
                        width: "90%",
                        margin: "0 1rem",
                        aspectRatio: "16/9",
                      }}
                    />
                  </div>
                ))}
              </Slider>
              <div
                onClick={previousSlide}
                aria-label="Previous"
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "45%",
                  zIndex: 2,
                  left: lgUp ? "-2.5rem" : "-1rem",
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
                  position: "absolute",
                  top: "45%",
                  zIndex: 2,
                  right: lgUp ? "-2rem" : "-1rem",
                  padding: "4px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              >
                <IconChevronRight />
              </div>
            </Grid>
          </Grid>
        ) : (
          <Box
                sx={{
                  margin: "auto",
                  overflow: "hidden",
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Skeleton animation="wave" height="300px" width="300px" />
                <Skeleton animation="wave" height="300px" width="300px" />
                <Skeleton animation="wave" height="300px" width="300px" />
              </Box>
        )}
      </Grid>
    </Box>
  );
};

export default HeroSection2;
