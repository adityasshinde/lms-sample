import { Popover, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useHome, useLMS } from "../../hooks/hooks";
import EducatorsCard from "../molecules/EducatorsCard";
import Loader from "../ui/Loader";
import NotesList from "./Notes";
import Overview from "./Overview";
import { useLocation } from "react-router-dom";
import ConfirmationPopup from "../molecules/ConfirmationPopup";
import { useUpdateLectureProgressMutation } from "../../store/api/lmsApi";
import LoadingOverlay from "../molecules/LoadingOverlay";

const LectureVideo = ({ handleLmsActiveLecture,refetch, lmsActiveLecture,completedLectures, lmsLectures }) => {
  const { lmscourse } = useLMS();
  const { instructors, subjects } = useHome();
  const location = useLocation();
  const [popup,setPopup] = useState(false);
  const [updateLectureProgress,{isLoading}]=useUpdateLectureProgressMutation();
  const lmsSubjectId = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const lmsSubject = subjects?.find(sub => sub?._id === lmsSubjectId);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const courseInstrutors = instructors?.filter((ins) =>
    lmscourse?.instructors?.includes(ins?._id)
  );
  const [currentTab, setCurrentTab] = useState("overview");
  const subjectLectures = lmsLectures?.filter(
    (lec) => lec.subjectId === lmsSubject?._id
  );
  const handleMarkAsCompleted = async() => {
    const data = {
      lectureId: lmsActiveLecture?._id,
      courseId: lmscourse?._id,
      isCompleted: true,
    };
    const result=await updateLectureProgress(data);
    console.log(result);
    if(result.data){
      refetch();
      nextLecture();
    }
  };
  const nextLecture = () => {
    const activeLectureIndex = subjectLectures.findIndex(
      (lec) => lec?._id === lmsActiveLecture?._id
    );
    if (activeLectureIndex < subjectLectures.length - 1) {
      const nextLecture = subjectLectures[activeLectureIndex + 1];
      handleLmsActiveLecture(nextLecture);
    }else{
      handleLmsActiveLecture(subjectLectures[subjectLectures?.length-1]);
    }
  };
  const handleNextLecture = () => {
    //check whether active lecture is present in completed lectures.
    console.log(completedLectures);
    const isAleadyWatched=completedLectures?.includes(lmsActiveLecture?._id);
    if(!isAleadyWatched){
      setPopup(true);
      return;
    }else{
      nextLecture();
    }
    
  };
  const handlePreviousLecture = () => {
    const activeLectureIndex = subjectLectures.findIndex(
      (lec) => lec?._id === lmsActiveLecture?._id
    );
    if (activeLectureIndex > 0) {
      const previousLecture = subjectLectures[activeLectureIndex - 1];
      handleLmsActiveLecture(previousLecture);
    }
  };
  useEffect(() => {
    console.log(lmsActiveLecture?.title);
  }, [lmsActiveLecture, lmsLectures,completedLectures]);
  return (
    <>
      {isLoading && (
                <LoadingOverlay
                    open={isLoading}
                    message="Marking as completed, please wait..."
                />
            )}
    {popup &&  <ConfirmationPopup
            heading="Mark as Complete"
            message="Do you want to mark this lecture as completed?"
            acceptButton="Mark as Completed"
            onAccept={()=>{handleMarkAsCompleted();setPopup(false);}}
            onCancel={() => setPopup(false)}
          />}
      {lmsActiveLecture ? (
        <Box
          sx={{
            width: "100%", // Set width to 80% of the container
            minHeight: "90vh",
            padding: lgUp ? "2rem 5rem" : "2rem 1.5rem", // Add padding to adjust
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  color: "#4B4B4D",
                  my: "1rem",
                  height: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                {lmscourse ? lmscourse?.title : "Course Title"}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#4B4B4DCC",
                  mb: "1rem",
                  height: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                {lmsActiveLecture ? lmsActiveLecture?.title : "Lecture Title"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div onClick={handleNextLecture} className="hidden lg:block">
                <Typography
                  sx={{
                    fontWeight: "bold",
                    mr: "5px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    color: "#207EB8",
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  Next Lecture
                </Typography>
              </div>
              <div
                onClick={handlePreviousLecture}
                style={{
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "50%",
                  marginRight: "4px",
                }}
                className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"
              >
                <IconChevronLeft size={20} />
              </div>
              <div
                onClick={handleNextLecture}
                className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"
                style={{
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "50%",
                  marginLeft: "4px",
                }}
              >
                <IconChevronRight size={20} />
              </div>

            </Box>
          </Box>

          {/* Video Player */}
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {true ? (
              <>
                <ReactPlayer
                  url={lmsActiveLecture?.videoUrl}
                  width="100%"
                  height={lgUp ? "65vh" : "30vh"}
                  controls={true}
                  //   onReady={handlePlayerReady}
                  //   playing={playVid}
                  onEnded={handleMarkAsCompleted}
                  playing={false}
                />{" "}
              </>
            ) : (
              <Loader message="Loading lecture video..." />
            )}
          </div>

          <Box
            display="flex"
            justifyContent="space-between"
            width="70%"
            height="0px"
            mt="1.6rem"
          >
            <a
              onClick={() => {
                setCurrentTab("overview");
              }}
            >
              <Typography
                sx={{
                  paddingBottom: currentTab === "overview" ? "0.3rem" : "0",
                  color: currentTab === "overview" ? "#207EB8" : "#4B4B4D",
                  borderBottom:
                    currentTab === "overview" ? "3px solid #207EB8" : "0",
                  fontSize: "1rem",
                  fontWeight: "600",
                  mb: "1rem",
                  cursor: "pointer",
                }}
              >
                Overview
              </Typography>
            </a>
            <a
              onClick={() => {
                setCurrentTab("tutors");
              }}
            >
              <Typography
                sx={{
                  paddingBottom: currentTab === "tutors" ? "0.3rem" : "0",
                  color: currentTab === "tutors" ? "#207EB8" : "#4B4B4D",
                  borderBottom:
                    currentTab === "tutors" ? "3px solid #207EB8" : "0",
                  fontSize: "1rem",
                  fontWeight: "600",
                  mb: "1rem",
                  cursor: "pointer",
                }}
              >
                Tutors
              </Typography>
            </a>
            <a
              onClick={() => {
                setCurrentTab("notes");
              }}
            >
              <Typography
                sx={{
                  paddingBottom: currentTab === "notes" ? "0.3rem" : "0",
                  color: currentTab === "notes" ? "#207EB8" : "#4B4B4D",
                  borderBottom:
                    currentTab === "notes" ? "3px solid #207EB8" : "0",
                  fontSize: "1rem",
                  fontWeight: "600",
                  mb: "1rem",
                  cursor: "pointer",
                }}
              >
                Notes
              </Typography>
            </a>
            <a
              onClick={() => {
                setCurrentTab("ebooks");
              }}
            >
              <Typography
                sx={{
                  paddingBottom: currentTab === "ebooks" ? "0.3rem" : "0",
                  color: currentTab === "ebooks" ? "#207EB8" : "#4B4B4D",
                  borderBottom:
                    currentTab === "ebooks" ? "3px solid #207EB8" : "0",
                  fontSize: "1rem",
                  fontWeight: "600",
                  mb: "1rem",
                  cursor: "pointer",
                }}
              >
                E-books
              </Typography>
            </a>
            {/* <a
              onClick={() => {
                setCurrentTab("timetable");
              }}
            >
              <Typography
                sx={{
                  paddingBottom: currentTab === "timetable" ? "0.3rem" : "0",
                  color: currentTab === "timetable" ? "#207EB8" : "#4B4B4D",
                  borderBottom:
                    currentTab === "timetable" ? "3px solid #207EB8" : "0",
                  fontSize: "1rem",
                  fontWeight: "600",
                  mb: "1rem",
                  cursor: "pointer",
                }}
              >
                TimeTable
              </Typography>
            </a> */}
            <a
              onClick={() => {
                setCurrentTab("test");
              }}
            >
              <Typography
                sx={{
                  paddingBottom: currentTab === "test" ? "0.3rem" : "0",
                  color: currentTab === "test" ? "#207EB8" : "#4B4B4D",
                  borderBottom:
                    currentTab === "test" ? "3px solid #207EB8" : "0",
                  fontSize: "1rem",
                  fontWeight: "600",
                  mb: "1rem",
                  cursor: "pointer",
                }}
              >
                Test
              </Typography>
            </a>
          </Box>
          <Divider sx={{ color: "black", mt: "1.8rem" }} variant="fullWidth" />
          {/* Video Information */}
          <div style={{ minHeight: "50vh" }}>
            {currentTab === "overview" && <Overview />}
            {courseInstrutors && currentTab === "tutors" && (
              <div className="flex flex-wrap">
                {courseInstrutors?.map((educator, index) => (
                  <EducatorsCard
                    key={index}
                    maxWidth={230}
                    name={educator?.personalInformation?.fullName}
                    // deg={educator?.biographicalInformation?.briefBiography}
                    image={educator?.profileImage}
                  />
                ))}
              </div>
            )}
            {currentTab === "notes" && <NotesList />}
          </div>
        </Box>
      ) : (
        <div>
          <Loader message="Loading lecture video..." />
        </div>
      )}
    </>
  );
};

export default LectureVideo;
