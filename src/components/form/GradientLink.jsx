import { Button, useMediaQuery } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const GradientLink = ({
  text,
  to,
  prependComponent,
  appendComponent,
  onClick,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="w-full flex items-center justify-between"
    >
      <Button
        sx={{
          // backgroundImage: "linear-gradient(to right, #2B527A, #207EB8)",
          backgroundColor:'#6874BB',
          color: "white",
          padding:"8px 2px",
          cursor: "pointer",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
          fontWeight: "bold",
          fontFamily: "inherit",
        }}
      >
        {prependComponent}
        <span
          className={`${
            prependComponent || appendComponent ? "w-3/4" : "w-full"
          }  text-center`}
        >
          {text}
        </span>
        {appendComponent}
      </Button>
    </Link>
  );
};

export default GradientLink;
