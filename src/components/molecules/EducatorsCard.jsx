import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons";
import React from "react";

const EducatorsCard = ({ name, deg, image, maxWidth,margin }) => {
  return (
    <Card
      sx={{
        maxWidth: maxWidth,
        padding: "0px",
        margin: margin,
        marginTop: "8rem",
        position: "relative",
        overflow: "visible",
        paddingBottom: 0,
      }}
    >
      <CardMedia
        component="img"
        image={image}
        sx={{
          position: "absolute",
          top: "-8%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          width: "70%",
          height: "auto",
          zIndex: 1, // Ensure image is above content
        }}
        alt="Educator Image"
      />
      <CardContent sx={{ padding: "0.5rem 0", zIndex: 2, paddingTop: "5rem" }}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#4B4B4D",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            marginTop: "4px",
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#4B4B4DB2",
          }}
        >
          {deg}
        </Typography>
        <div className="w-full mt-2 flex items-center justify-center">
          <IconBrandLinkedin
            stroke={1.5}
            color="white"
            fill="#4B4B4DB2"
            size={20}
            style={{ margin: "0 0.5rem", cursor: "pointer" }}
          />
          <IconBrandInstagram
            stroke={1.5}
            color="white"
            fill="#4B4B4DB2"
            size={20}
            style={{ margin: "0 0.5rem", cursor: "pointer" }}
          />
          <IconBrandFacebook
            stroke={1.5}
            color="white"
            fill="#4B4B4DB2"
            size={20}
            style={{ margin: "0 0.5rem", cursor: "pointer" }}
          />
          <IconBrandTwitter
            stroke={1.5}
            color="white"
            fill="#4B4B4DB2"
            size={20}
            style={{ margin: "0 0.5rem", cursor: "pointer" }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EducatorsCard;
