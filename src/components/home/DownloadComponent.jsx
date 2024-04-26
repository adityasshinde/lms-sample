import { Box, Button, Grid, Typography } from "@mui/material";
import {
  IconBrandAndroid,
  IconBrandApple,
  IconCalendar,
  IconChartBar,
  IconClockHour3,
  IconCreditCard,
} from "@tabler/icons";
import React from "react";
import AppScreenshots from "../../asset/images/AppScreenshots.svg";
import WithScrollAnimation from "./WithScrollAnimation";

const DownloadComponent = () => {
  return (
   <WithScrollAnimation>
    <div id="download" className="lg:px-12">
     <div style={{ width: "100%", marginBottom: "15vh",backgroundColor:'#EEF3F8',borderRadius:'16px'}}>
      <Grid container justifyContent="center" alignItems="center" spacing={2} py={2}>
        {/* First Child */}
        <Grid item xs={12} textAlign="center" mb={4}>
          <Typography
            variant="body1"
            fontWeight={900}
            sx={{
              color: "#2B527A",
              letterSpacing: "2px",
            }}
          >
            DOWNLOAD
          </Typography>
          <Typography
             fontWeight={800}
            variant="h2"
            sx={{ color: "#4B4B4D", textAlign: "center", mb: 2 }}
          >
            Get our app for{" "}
            <Typography
              variant="h2"
              fontWeight={800}
              component="span"
              sx={{ color: "primary.main" }}
            >
              seamless
            </Typography>{" "}
            experience
          </Typography>
        </Grid>

        {/* Second Child */}
        <Grid item container mb="5vh" justifyContent="center" spacing={2}>
          <Grid
            item
            md={4}
            className=" flex flex-col items-center justify-between"
            style={{ flexDirection: "column" }}
          >
            <Box
              sx={{
                display: "flex",
                marginY: "1rem",
                width: { xs: "50vw", md: "20vw" },
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconChartBar size={56} color="white" fill="#2B527A" />
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  fontSize: "1.3rem",
                  color: "#4B4B4D",
                }}
              >
                Stay Updated
              </Typography>
              <Typography textAlign="center">
                m ad minima veniam, quis nostrum exercitationem ullam
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: { xs: "50vw", md: "20vw" },
                paddingLeft: { xs: "0", md: "4rem" },
                marginY: "2rem",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconCreditCard size={56} color="white" fill="#2B527A" />
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  fontSize: "1.3rem",
                  color: "#4B4B4D",
                }}
              >
                Payment gateway
              </Typography>
              <Typography textAlign="center">
                m ad minima veniam, quis nostrum exercitationem ullam
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4} textAlign="center" position="relative">
            <img
              src={AppScreenshots}
              style={{ width: "100%", height: "auto" }}
              alt="AppScreenshots"
            />
            {/* <img src={MobileImg} style={{ position: 'absolute', top: '5%', height: '90%', left: 0, right: 0, margin: 'auto', zIndex: 1 }} alt="mobile" /> */}
          </Grid>
          <Grid
            item
            md={4}
            className=" flex flex-col items-center justify-between"
            style={{ flexDirection: "column" }}
          >
            <Box
              sx={{
                display: "flex",
                marginY: "1rem",
                width: { xs: "50vw", md: "20vw" },
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconClockHour3 size={56} color="white" fill="#2B527A" />
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  fontSize: "1.3rem",
                  color: "#4B4B4D",
                }}
              >
                Anytime accessible
              </Typography>
              <Typography textAlign="center">
                m ad minima veniam, quis nostrum exercitationem ullam
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: { xs: "50vw", md: "20vw" },
                paddingRight: { xs: "0", md: "4rem" },
                marginY: "2rem",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconCalendar size={56} color="white" fill="#2B527A" />
              <Typography
                textAlign="center"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  fontSize: "1.3rem",
                  color: "#4B4B4D",
                }}
              >
                Personalized timetable{" "}
              </Typography>
              <Typography textAlign="center">
                m ad minima veniam, quis nostrum exercitationem ullam
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Third Child */}
        <Grid item container justifyContent="center">
          <Grid
            item
            textAlign="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="https://www.taksheducation.com/" target="_blank">
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "#4B4B4D",
                  border: "2px solid #4B4B4D",
                  borderRadius: "8px",
                  padding: "10px 25px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  width: "240px",
                  margin: "1rem",
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#4B4B4D",
                    border: "2px solid #4B4B4D",
                  },
                  "&:focus": {
                    backgroundColor: "white",
                    color: "#4B4B4D",
                    border: "2px solid #4B4B4D",
                    outline: "none",
                  },
                }}
                startIcon={
                  <IconBrandAndroid size={32} fill="#4B4B4D" color="#4B4B4D" />
                }
              >
                Get Android App
              </Button>
            </a>
            <a href="https://www.taksheducation.com/" target="_blank">
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "#4B4B4D",
                  border: "2px solid #4B4B4D",
                  borderRadius: "8px",
                  padding: "10px 30px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  margin: "1rem",
                  width: "240px",
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#4B4B4D",
                    outlineColor: "#4B4B4D",
                    border: "2px solid #4B4B4D",
                  },
                  "&:focus": {
                    backgroundColor: "white",
                    color: "#4B4B4D",
                    border: "2px solid #4B4B4D",
                    outline: "none",
                  },
                }}
                startIcon={
                  <IconBrandApple size={32} fill="#4B4B4D" color="#4B4B4D" />
                }
              >
                Get iOS App
              </Button>
            </a>
          </Grid>
        </Grid>
      </Grid>
    </div>
   </div>
   </WithScrollAnimation>
  );
};

export default DownloadComponent;
