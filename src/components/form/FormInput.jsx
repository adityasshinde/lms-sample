import { FormControl, Input } from "@mui/material";
import React from "react";

const FormInput = ({
  prependComponent,
  appendComponent,
  placeholder,
  onchange,
  type,
  maxLength,
  underLine,
  value,
  backgroundColor,
}) => {
  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingX: 2,
        paddingY: 1,
        fontSize: "1rem",
        borderRadius: "10px",
        backgroundColor: "#F1F1F1",
        outline: "none",
        "&:focus": {
          outline: "none",
        },
        "::placeholder": {
          color: "#4B4B4D", // Replace with the actual color or class for placeholder text
          fontSize: "1rem", // Adjust the font size of the placeholder text
        },
      }}
    >
      {prependComponent}
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onchange}
        value={value}
        inputProps={{
          maxLength: maxLength,
          type: type,
        }}
        sx={{
          fontFamily: "inherit !important",
          fontWeight: "bold",
          fontSize: "1rem",
          width:`${prependComponent || appendComponent ? '75%':'100%'}`,
        }}
        disableUnderline={!underLine}
      />
      {appendComponent}
    </FormControl>
  );
};

export default FormInput;
