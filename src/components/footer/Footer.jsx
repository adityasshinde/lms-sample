import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  IconBrandApple,
  IconBrandFacebook,
  IconBrandGooglePlay,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons";
import * as React from "react";
import logo from "../../asset/images/takshLogoF.png";

// Your social media icons components or imports

const Footer = () => {
  return (
    <Grid
      container
      sx={{ backgroundColor: "white", py: 4, px: {xs:4,md:16} }}
      className="shadow"
    >
      <Grid
        item
        container
        xs={12}
        gap={1}
        mx="auto"
        display="flex"
        justifyContent="space-between"
      >
        {/* First child with logo and buttons */}
        <Grid
          item
          xs={12}
          md={3}
          display="flex"
          mt={2}
          flexDirection="column"
          sx={{ alignItems: { xs: "center", md: "start" } }}
        >
          <img src={logo} alt="Logo" width="200" height="50" />
          <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
            <a href="https://www.taksheducation.com/" target="_blank">
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "#4B4B4D",
                  border: "1px solid #4B4B4D",
                  borderRadius: "8px",
                  padding: "10px 8px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  width: "150px",
                  marginRight: "0.5rem",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#4B4B4D",
                  },
                  "&:focus": {
                    backgroundColor: "white",
                    color: "#4B4B4D",
                    outline: "none",
                  },
                }}
                startIcon={<IconBrandGooglePlay size={20} color="#4B4B4D" />}
              >
                Google Play
              </Button>
            </a>
            <a href="https://www.taksheducation.com/" target="_blank">
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "#4B4B4D",
                  border: "1px solid #4B4B4D",
                  borderRadius: "8px",
                  padding: "10px 8px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  marginLeft: "0.5rem",
                  width: "150px",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#4B4B4D",
                    outlineColor: "#4B4B4D",
                  },
                  "&:focus": {
                    backgroundColor: "white",
                    color: "#4B4B4D",
                    outline: "none",
                  },
                }}
                startIcon={
                  <IconBrandApple size={20} fill="#4B4B4D" color="#4B4B4D" />
                }
              >
                App Store
              </Button>
            </a>
          </Box>
        </Grid>

        {/* Vertical links */}
        <Grid item xs={5} md={2} mt={2} display="flex" justifyContent="center">
          <Stack spacing={1}>
            <Typography fontSize="1rem" fontWeight="bold" mb={1}>
              About
            </Typography>
            <Link href="#" fontSize="1rem" color="#4B4B4D" underline="none">
              Company
            </Link>
            <Link href="#" fontSize="1rem" color="#4B4B4D" underline="none">
              Community
            </Link>
            <Link href="#" fontSize="1rem" color="#4B4B4D" underline="none">
              Career
            </Link>
          </Stack>
        </Grid>

        {/* Vertical links */}
        <Grid item xs={5} md={2} mt={2} display="flex" justifyContent="center">
          <Stack spacing={1}>
            <Typography fontSize="1rem" fontWeight="bold" mb={1}>
              Courses
            </Typography>
            <Link href="#" fontSize="1rem" color="#4B4B4D" underline="none">
              GATE
            </Link>
            <Link href="#" fontSize="1rem" color="#4B4B4D" underline="none">
              CUET
            </Link>
            <Link href="#" fontSize="1rem" color="#4B4B4D" underline="none">
              JEE
            </Link>
            <Link href="#" fontSize="1rem" color="#4B4B4D" underline="none">
              NDA
            </Link>
          </Stack>
        </Grid>

        {/* Contact information */}
        <Grid item xs={10} md={4} px={3} mt={2}>
          <Typography fontSize="1rem" fontWeight="bold" mb={1}>
            Contact
          </Typography>
          <Typography fontSize="1rem">
            <span style={{ fontWeight: "500" }}>Address: </span>4517 Washington
            Ave. Manchester, Kentucky 39495 Manchester, Kentucky 39495
          </Typography>
          <Typography fontSize="1rem" sx={{ margin: "8px 0" }}>
            <span style={{ fontWeight: "500" }}>Mail: </span>{" "}
            support@taksheducation.com
          </Typography>
          <Typography fontSize="1rem">
            <span style={{ fontWeight: "500" }}>Phone: </span>+91 9999999999
          </Typography>
        </Grid>
      </Grid>

      {/* Divider and copyright */}
      <Grid item xs={12}>
        <Divider sx={{ mt: 2, stroke: 2, fontWeight: "bold", width: "100%" }} />
        <Box
          sx={{
            width: "100%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            pt: 2,
          }}
        >
          <Typography variant="body1">
            Copyright © 2024 TakshEducation | All rights reserved.
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconBrandLinkedin
              stroke={1.5}
              color="white"
              fill="#4B4B4D"
              size={24}
              style={{ margin: "0 0.5rem", cursor: "pointer" }}
            />
            <IconBrandInstagram
              stroke={1.5}
              color="white"
              fill="#4B4B4D"
              size={24}
              style={{ margin: "0 0.5rem", cursor: "pointer" }}
            />
            <IconBrandFacebook
              stroke={1}
              color="#4B4B4D"
              fill="#4B4B4D"
              size={20}
              style={{ margin: "0 0.5rem", cursor: "pointer" }}
            />
            <IconBrandTwitter
              stroke={1.5}
              color="white"
              fill="#4B4B4D"
              size={24}
              style={{ margin: "0 0.5rem", cursor: "pointer" }}
            />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
