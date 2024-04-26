import { Grid, Typography, useMediaQuery } from "@mui/material";
import { IconCalendar, IconClock, IconList, IconPlayerPlay, IconStar, IconX } from "@tabler/icons";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useAuth, useHome } from "../../hooks/hooks";
import BackdropOverlay from "../atoms/Backdrop";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../store/slices/authSlice";
import { Box } from "@mui/system";

const CourseHeader = ({ course,lectures}) => {
  const { categories } = useHome();
  const {isAuth}=useAuth();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const category = categories?.find((cat) => cat._id === course.category);
  const [playVid, setPlayVid] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const dispatch = useDispatch();
  const dateObject = new Date(course.createdAt);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('en-US', options);
  const handlePlayerReady = () => {
    setVideoLoaded(true);
  };
  const handleVideoPlay = () => { 
    if(isAuth){
      setPlayVid(true);
    }else{
      dispatch(setAuthState(1));
    }
  }
  const ratings=[1,2,3,4,5];
  let courseRating=0;
  course?.courseRating?.map((item)=>{
    courseRating+=item.ratings;
  });
  courseRating=courseRating/course?.courseRating?.length;


  return (
    <Grid
      container
      sx={{
        width: "100%",
        backgroundColor: "#4B4B4D",
        color: "white",
        padding:lgUp? "0 6%":"0 4%",
      }}
    >
      <Grid item xs={12} md={7} padding={lgUp?"1.5rem 0":"1rem 0"}>
        <Typography sx={{ color: "white", fontSize: "1rem" }}>
          {category?.name}
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: lgUp?"2rem":"1.5rem",
            margin:lgUp? "1.2rem 0":'0.5rem 0',
            lineHeight: "1",
          }}
        >
          {course?.title}
        </Typography>
        <Typography
          component="div"
          sx={{
            display: "flex",
            fontSize:lgUp? "1.1rem":'1rem',
            margin: "1rem 0",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          {ratings?.map((index)=>{
            return <IconStar
            size={lgUp?20:16}
            key={index}
            fill={index<=courseRating ?"#FFE353":'none'}
            color="#FFE353"
            style={{ marginRight: "0.5rem" }}/>
          })}
          ({courseRating})
        </Typography>
        <Box display='flex'>
           <Typography display='flex' marginRight={lgUp?'1.5rem':'1rem'} alignItems='center' fontWeight='400' color='#FAFAFA' ><IconCalendar color="white" style={{marginRight:'5px'}} stroke={1.5} size={24} />{formattedDate}</Typography>
           <Typography display='flex' marginRight={lgUp?'1.5rem':'1rem'} alignItems='center' fontWeight='400' color='#FAFAFA' ><IconList color="white" style={{marginRight:'5px'}} stroke={1.5} size={24} />{lectures?.length} Lessons</Typography>
           <Typography display='flex' marginRight={lgUp?'1rem':'0.5rem'} alignItems='center' fontWeight='400' color='white' ><IconClock color="white" style={{marginRight:'5px'}} stroke={1.5} size={24} />2h 30m</Typography>
        </Box>
        <Typography
          marginY={2}
          color="white"
          className="line-clamp-3"
        >
          {course?.description}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        sx={{ display: "flex", justifyContent: "end", alignItems: "flex-end" }}
      >
        {course.imageURI && !playVid && (
          <div
            style={{
              display: "flex",
              position: "relative",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <img
              src={course.imageURI}
              className="aspect-[16/9]"
              style={{
                width: lgUp?"80%":"100%",
                height: "90%",
                borderRadius: "11px 11px 0px 0px",
              }}
              alt="img not found"
            />
            {course?.demoVideoUrl && <IconPlayerPlay
              color="#207EB8"
              fill="#207EB8"
              size={48}
              onClick={handleVideoPlay}
              style={{
                zIndex: 10,
                padding: "6px 10px",
                borderRadius: "50%",
                backgroundColor: "white",
                cursor: "pointer",
                position: "absolute",
                top: "44%",
                left: "55%",
              }}
            />}
          </div>
        )}
        {course.imageURI && playVid && (
          <BackdropOverlay open={playVid}>
            <IconX
              size="1.5rem"
              color="black"
              onClick={() => {
                setPlayVid(false);
              }}
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "5px",
                cursor: "pointer",
                position: "absolute",
                top: "14%",
                right: "14%",
              }}
            />
            <ReactPlayer
              url={course?.demoVideoUrl?course?.demoVideoUrl:"https://youtu.be/o8QronyytY0?si=ssDMXB6onVNPHDxN"}
              width={videoLoaded ? "70%" : 0}
              height={videoLoaded ? "70%" : 0}
              controls={true}
              onReady={handlePlayerReady}
              playing={playVid}
              style={{
                borderRadius: "11px 11px 0px 0px",
              }}
            />
          </BackdropOverlay>
        )}
      </Grid>
    </Grid>
  );
};

export default CourseHeader;
