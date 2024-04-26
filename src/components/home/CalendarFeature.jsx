import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CalendarImage from "../../asset/images/Calendar.png";
import GradientLink from "../form/GradientLink";
import WithScrollAnimation from "./WithScrollAnimation";

const CalendarFeature = () => {
  return (
    <WithScrollAnimation>
      <section className="relative py-20 mb-12">
      <Container maxWidth="lg">
        <Grid container spacing={10}
        sx={{
          display: "flex",
          flexWrap: 'wrap-reverse',
        }}>
          <Grid
            item
            xs={12}
            md={6}
            className="flex flex-col items-center justify-center"
          >
            <Box>
              <div className="about-content px-4">
                <div className="section-title mb-4 font-semibold">
                  <Typography
                  fontWeight={900}
                    sx={{
                      color: "#2B527A",
                      letterSpacing: "2px",
                      textAlign:{xs:'center',md:'left'}
                    }}
                  >
                    Timetable
                  </Typography>
                  <Typography fontWeight={800} variant="h2" component="h2" sx={{textAlign:{xs:'center',md:'left'}}} color="#4B4B4D">
                    <span style={{ color: "#207EB8" }}>Craft</span> your
                    moments, shape your day
                  </Typography>
                </div>
                <div className="mb-8">
                  <Typography
                    variant="h6"
                    color={"#4B4B4D"}
                    sx={{ color: "#4B4B4D", fontWeight: "300",textAlign:{xs:'center',md:'left'} }}
                    gutterBottom
                  >
                    Customize your calendar with events tailored to your
                    preferences, ensuring seamless updates to stay informed and
                    boost productivity effortlessly.
                  </Typography>
                </div>
                <Box width={{ xs: "60%", sm: "50%", md: "30%" }} mx={{xs:'auto',md:'0'}}>
                  <GradientLink text="Enroll Now" to="/" />
                </Box>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <img src={CalendarImage} style={{ width: "100%" }} alt="about" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
    </WithScrollAnimation>
  );
};

export default CalendarFeature;
