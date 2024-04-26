import {
  Backdrop,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  IconChecklist,
  IconChevronRight,
  IconLock,
  IconPlayerPlay,
  IconX,
} from "@tabler/icons";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { useAuth, useHome } from "../../hooks/hooks";
import { useGetLecturesByCourseIdQuery } from "../../store/api/courseApi";
import BackdropOverlay from "../atoms/Backdrop";
import SubjectButton from "../form/SubjectButton";
import Loader from "../ui/Loader";
import { setAuthState, setRedirectLocation } from "../../store/slices/authSlice";
import GradientButton from "../form/GradientButton";
import { setCheckoutCourseId } from "../../store/slices/paymentSlice";
import { useNavigate } from "react-router-dom";

const Syllabus = ({ course,lectures}) => {
  const { categories, subjects } = useHome();
  const { isAuth, user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const category = categories?.find((cat) => cat._id === course.category);
  const getLectures=(subjectId)=>{
    return lectures?.filter((lec) => lec.subjectId === subjectId);
  }
  const courseSubjects = subjects?.filter((sub) =>
     {
      return course.subjects?.includes(sub._id) && getLectures(sub._id)?.length>0;
     }
  );
  const [subject, setSubject] = useState(courseSubjects?.length && courseSubjects[0]?._id);
  const [activeTopic, setActiveTopic] = useState(0);
  const [playVid, setPlayVid] = useState(false);

  const topics = lectures?.filter((lec) => lec.subjectId === subject);
  const handleVideoPlay = () => {
    if (isAuth) {
      setPlayVid(true);
    } else {
      dispatch(setAuthState(1));
    }
  }
  const handleBuyNow = (product) => {
    // add logic for Buy now
    dispatch(setCheckoutCourseId(product._id));
    if (!isAuth) {
      dispatch(setAuthState(1));
      dispatch(setRedirectLocation("/student/checkout"));
      return;
    }
    if (!(user.profileComplete && user.emailVerified)) {
      dispatch(setAuthState(7));
      dispatch(setRedirectLocation("/student/checkout"));
      return;
    }
    navigate("/student/checkout");
  };
  useEffect(() => {
    if (courseSubjects?.length) {
      setSubject(courseSubjects[0]._id);
    }
  }, [courseSubjects])
  

  return (
    <>
    {lectures?.length ? <Box
      id="syllabus"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding:lgUp? "0 6%":"0 4%",
      }}
    >
      <Typography variant="h4" sx={{ margin: "1rem 0", color: "#4B4B4D" }}>
        Syllabus
      </Typography>
      <Box sx={{ display: "flex",flexWrap:'wrap' }}>
        {courseSubjects?.map((sub) => (
          <SubjectButton
            key={sub._id}
            onClick={() => {
              setSubject(sub._id);
              setPlayVid(false);
              setActiveTopic(0);
            }}
            text={sub.title}
            active={subject === sub._id}
            icon={<img src={sub.image} />}
          />
        ))}
      </Box>
      {topics ? (
        <Grid container gap={4}>
          <Grid
            item
            xs={12}
            md={6}
            margin="1rem 0"
            sx={{
              border: "2px solid #4B4B4D30",
              overflowY: "auto",
              // backgroundColor: "black",
            }}
          >
            {topics?.map((topic, index) => (
              <div
                onClick={() => {
                  setActiveTopic(index);
                  setPlayVid(false);
                }}
                key={index}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    padding: "0rem 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    borderRadius: 0,
                    background:
                      activeTopic === index
                        ? "linear-gradient(to right, #2B527A, #207EB8)"
                        : "white",
                    // backgroundColor: activeTopic === index ? "#207EB8" : "white",
                  }}
                >
                  <Box display="flex" sx={{}}>
                    <Typography
                      sx={{
                        color: activeTopic === index ? "#207EB8" : "#4B4B4D",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        marginRight: "1rem",
                        border:
                          activeTopic === index
                            ? `2px solid #fff`
                            : `2px solid #4B4B4D36`,
                        borderRadius: "50%",
                        padding: "8px 16px",
                        backgroundColor: "white",
                      }}
                    >
                      {index + 1}
                    </Typography>
                    <Box display="flex" flexDirection="column">
                      <Typography
                        sx={{
                          color: activeTopic === index ? "white" : "#4B4B4D",
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        {topic.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: activeTopic === index ? "white" : "#4B4B4D",
                          fontSize: "0.8rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconChecklist
                          size={16}
                          stroke={1.5}
                          style={{ marginRight: "3px" }}
                        />{" "}
                        6 topics
                      </Typography>
                    </Box>
                  </Box>
                  <IconChevronRight
                    color={activeTopic === index ? "white" : "#4B4B4D"}
                    size={24}
                    stroke={1.5}
                  />
                </Box>
                <Divider variant="fullWidth" />
              </div>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            md={5.5}
            margin="1rem 0"
            sx={{
              border: "2px solid #4B4B4D30",
              position: "relative",
            }}
          >
            {topics[activeTopic]?.isLocked && (
              <Box
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "37%",
                  zIndex: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <IconLock
                  size={48}
                  style={{
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "50%",
                    marginBottom: '1rem',
                    backgroundColor: "#4B4B4DCC",
                  }}
                />
                <GradientButton
                  onClick={() => { handleBuyNow(course) }}
                  text='Enroll Now'
                  type='button' />
              </Box>
            )}
            {topics[activeTopic]?.isLocked && (
              <Backdrop
                sx={{
                  zIndex: 2,
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Adjust opacity as needed
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                open={true}
              />
            )}
            <Card sx={{ boxShadow: "0 0 0" }}>
              {playVid ? (
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
                    url={topics[activeTopic]?.videoUrl}
                    controls={true}
                    playing={playVid}
                    width="70%"
                    height="70%"
                  />
                </BackdropOverlay>
              ) : (
                <CardMedia>
                  <img
                    src={topics[activeTopic]?.thumbnailUrl}
                    className="aspect-[3/2]"
                    style={{ width: "auto", borderRadius: "11px 11px 0px 0px" }}
                    alt="img not found"
                  />
                  <IconPlayerPlay
                    color="#207EB8"
                    fill="#207EB8"
                    size={48}
                    onClick={handleVideoPlay}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      cursor: "pointer",
                      position: "absolute",
                      top: "35%",
                      left: "44%",
                    }}
                  />
                </CardMedia>
              )}

              <CardContent sx={{ padding: "0 !important" }}>
                <Box display="flex" flexDirection="column" my={2}>
                  <Typography
                    sx={{
                      color: "#4B4B4D",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {topics[activeTopic]?.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#4B4B4D",
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconChecklist
                      size={16}
                      stroke={1.5}
                      style={{ marginRight: "3px" }}
                    />{" "}
                    6 topics
                  </Typography>
                  {/* <Typography
                  sx={{
                    color: "#4B4B4D",
                    fontSize: "0.8rem",
                    display: "flex",
                    alignItems: "center",
                    fontWeight:'500',
                  }}
                >
                  Step into a world of wonder with our latest video! Experience captivating landscapes, intimate moments, and compelling storytelling. Each frame ignites curiosity and stirs emotions, inviting you on an unforgettable journey. From adventure to love and celebration, our video promises to leave a lasting impression, capturing the essence of life's beauty in every scene.
                </Typography> */}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )
        : <Loader />}
    </Box>:<> </>}
    </>
  );
};

export default Syllabus;
