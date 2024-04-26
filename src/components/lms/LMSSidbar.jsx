import { LinearProgress, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import {
  IconChevronLeft,
  IconCircleCheck,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate,useParams} from "react-router-dom";
import { useHome, useLMS } from "../../hooks/hooks";
import {
  useGetLecturesByCourseIdQuery,
} from "../../store/api/courseApi";
import {
  setLmsLectures,
  setSidebar,
} from "../../store/slices/lmsSlice";

const LMSSidebar = ({handleLmsActiveLecture,lmsActiveLecture,lectures,completedLectures,lecturesLoading}) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [progress, setProgress] = useState(0);
  const { lmsSidebarOpen } = useLMS();
  const {subjects}=useHome();
  const params=useParams();
  const lmsSubjectId=params?.subjectId;
  const lmsSubject=subjects?.find(sub=>sub?._id===lmsSubjectId);
  const dispatch = useDispatch();
  const subjectLectures = lectures?.filter(
    (lec) => lec.subjectId === lmsSubject?._id
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (lectures && lectures.length > 0) {
      dispatch(setLmsLectures(lectures));
    }
    if (completedLectures && subjectLectures) {

      const subjectCompletedLectures = subjectLectures.filter((lec) =>
        completedLectures?.includes(lec?._id)
      );
      if (subjectLectures.length > 0) {
        const progress = parseInt(
          (subjectCompletedLectures.length / subjectLectures.length) * 100
        );
        setProgress(progress);
      }
      const index = subjectLectures.findIndex(
        (lec) => !completedLectures?.includes(lec?._id)
      );
      if (index !== -1){
        handleLmsActiveLecture(subjectLectures[index]);
      }else{
          handleLmsActiveLecture(subjectLectures[subjectLectures?.length-1]);
      }
    }
  }, [lectures, lecturesLoading,completedLectures]);
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        zIndex: 50,
        "& .MuiDrawer-paper": {
          width: lgUp ? "25vw" : "70vw", // Adjust width as needed
          boxSizing: "border-box",
          position: lgUp ? "relative" : "absolute",
          borderLeft: "1px solid #4B4B4D21",
          mr:'1rem'
        },
      }}
      variant="persistent"
      anchor="left"
      onClose={() => dispatch(setSidebar(false))}
      open={lgUp ? true : lmsSidebarOpen}
    >
      <Box
        sx={{
          padding: "1rem 2rem",
          overflowY: "scroll", // Enable vertical scrolling
          "&::-webkit-scrollbar": {
            // Hide the scrollbar for webkit browsers
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {/* <Link to={joinedBackPath} style={{textDecoration:'underline',color:'green',display:'flex',alignItems:'center',justifyContent:'start',fontWeight:'bold'}} ></Link> */}
        {/* <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'black', margin: '1rem 0', height: 'auto' ,display:'flex',alignItems:'center',justifyContent:'start',}}><Link to={joinedBackPath}><IconChevronLeft style={{cursor:'pointer'}} size={24}/></Link> Geography Maps Course</Typography> */}
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.3rem",
            color: "#4B4B4D",
            margin: "0.5rem 0",
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Link
            onClick={() => {
                navigate(-1); // Navigate back in the history stack
                handleLmsActiveLecture(undefined);
            }}
          >
            <IconChevronLeft
              style={{ cursor: "pointer", marginRight: "8px" }}
              stroke={3}
              size={22}
            />
          </Link>{" "}
          {lmsSubject?.title}
        </Typography>
        <div className="mb-4">
          <Typography
            sx={{
              fontWeight: "500",
              textAlign: "right",
              fontSize: "0.7rem",
              color: "#207EB8",
            }}
          >
            {progress}% Complete
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </div>
        {/* <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: 'green', height: '50px', marginBottom: '10px' }}>0% complete</Typography> */}
        <Box
          sx={{
            height: "70vh", // Adjust to accommodate header and progress
            width: "auto",
            overflowY: "scroll", // Enable vertical scrolling
            "&::-webkit-scrollbar": {
              // Hide the scrollbar for webkit browsers
              display: "none",
            },
            scrollbarWidth: "none", // Hide the scrollbar for Firefox
          }}
        >
          {subjectLectures && completedLectures ? (
            subjectLectures?.map((lecture, index) => (
              <div
                key={index}
                className="flex items-center justify-start cursor-pointer"
                onClick={() => {
                  handleLmsActiveLecture(lecture);
                }}
                style={{ margin: "1rem 0" }}
              >
                {completedLectures?.includes(lecture?._id) ? (
                  <IconCircleCheck
                    size={28}
                    style={{ marginRight: "10px" }}
                    fill="#00b341"
                    color="white"
                    stroke={1}
                  />
                ) : (
                  <>
                    {lecture?._id === lmsActiveLecture?._id ? (
                      <IconPlayerPause
                        size={28}
                        style={{
                          marginRight: "10px",
                          padding: "5px",
                          backgroundColor: "#207EB821",
                          borderRadius: "50%",
                        }}
                        fill="#207EB8"
                        color="#207EB8"
                        stroke={1}
                      />
                    ) : (
                      <IconPlayerPlay
                        size={28}
                        style={{
                          marginRight: "10px",
                          padding: "5px",
                          backgroundColor: "#207EB821",
                          borderRadius: "50%",
                        }}
                        fill="#207EB8"
                        color="#207EB8"
                        stroke={1}
                      />
                    )}
                  </>
                )}

                <Typography
                  sx={{
                    padding: "8px 0",
                    width: "80%",
                    cursor: "pointer",
                    color:
                      lecture?._id === lmsActiveLecture?._id
                        ? "#207EB8"
                        : "inherit",
                    fontWeight: "700",
                  }}
                >
                  {lecture.title}
                </Typography>
                <Typography
                  sx={{
                    padding: "8px 0",
                    cursor: "pointer",
                    color:
                      lecture?._id === lmsActiveLecture?._id
                        ? "#207EB8"
                        : "inherit",
                    fontWeight: "700",
                  }}
                >
                  10:32hr
                </Typography>
              </div>
            ))
          ) : (
            <div>Loading Lectures...</div>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default LMSSidebar;
