import React, { useState } from "react";
import '../../assets/scss/component/_course.scss';
import '../../assets/css/flaticon.css';
import '../../assets/css/fontAwesome5Pro.css';
import '../../assets/scss/component/_common.scss';
import '../../assets/scss/component/_student-choose.scss';
import { useCourse, useHome } from "../../hooks/hooks";
import { useDispatch } from "react-redux";
import { setSearchedCourses } from "../../store/slices/courseSlice";
import { Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { IconAdjustments, IconSearch } from "@tabler/icons";
import Select from "../form/Select";
import FormInput from "../form/FormInput";
import GradientButton from "../form/GradientButton";
import SelectOutlined from "../form/SelectOutlined";





const SearchBar = ({handleSearch}) => {
  const [input, setInput] = useState("");

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));


  const searchInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      handleSearch("");
    }
  }

  return (
    <div>
      <Grid container columns={12} sx={{ marginBottom: '2rem', padding: lgUp?'0 3rem':'0 1rem', justifyContent: 'center', }}>
        <Grid item xs={12} sx={{ fontSize: '1rem', padding: '5px 16px', border: '1px solid #4B4B4D4D', borderRadius: '8px', display: 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'start' }}>
          <IconSearch size={20} />
          <input type="text" onChange={searchInputChange} value={input} style={{ fontSize: '1rem', width: '80%', padding: '5px', outline: 'none', textDecoration: 'none' }} placeholder="Find your course...." />
          <div style={{ position: 'absolute', right:lgUp? '3.6rem':'2rem' }}>
            <GradientButton onClick={() => handleSearch(input)} text='Search' type='submit' />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchBar;
