import React, { useRef } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import Slider from 'react-slick';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useGetBannersQuery } from '../../store/api/homeApi';
import { height } from '@mui/system';

const HomeHeader = () => {
  const sliderRef = useRef(null);
  const { data: banners } = useGetBannersQuery();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <Box
        sx={{
          position: 'absolute',
          bottom: '-3rem',  // Adjust this value to position the dots
          left: '98%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      >
        <ul style={{ margin: '0', padding: '0', display: 'flex', listStyle: 'none' }}> {dots} </ul>
      </Box>
    ),
    customPaging: () => (
      <Box
        sx={{
          width: '10px',
          height: '10px',
          backgroundColor: '#c6e0f7',
          borderRadius: '50%',
          margin: '0 5px',
          
        }}
      ></Box>
    ),
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Grid 
    container
    sx={{ 
    position: 'relative',
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    maxWidth:'94vw !important',
    px:'2rem',}}>
      {banners ? (
        <Grid
          item
          xs={12}
          position="relative"
          padding='0 !important'
          width='100%'
          display='flex'
          justifyContent='start'
          alignItems='start'
        >
          <Grid item width="95%" mx="1rem"  padding='0 !important' position="relative">
            <Slider ref={sliderRef} {...settings}>
              {banners?.map((item) => (
                <div key={item._id} className="slick-slide">
                  <img
                    src={item.imageUrl}
                    alt={`Slide ${item._id}`}
                    style={{
                      width: '90%',
                      margin: 'auto',
                      borderRadius:'32px',
                      height: '400px',
                      objectFit:'cover',
                    }}
                  />
                </div>
              ))}
            </Slider>
            <div
              onClick={previousSlide}
              aria-label="Previous"
              className="nav-icon"
              style={{
                cursor: 'pointer',
                position: 'absolute',
                top: '50%',
                left: '-0.5rem',
                zIndex: 2,
                padding: '4px',
                borderRadius: '50%',
                backgroundColor: '#c6e0f7',
              }}
            >
              <IconChevronLeft />
            </div>
            <div
              onClick={nextSlide}
              aria-label="Next"
              className="nav-icon"
              style={{
                cursor: 'pointer',
                position: 'absolute',
                top: '50%',
                right: '-0.5rem',
                zIndex: 2,
                padding: '4px',
                borderRadius: '50%',
                backgroundColor: '#c6e0f7',
              }}
            >
              <IconChevronRight />
            </div>
          </Grid>
        </Grid>
      ) : (
        // Skeleton Loading
        <Box
          sx={{
            margin: 'auto',
            overflow: 'hidden',
            width: '80%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
        </Box>
      )}
    </Grid>
  );
};

export default HomeHeader;
