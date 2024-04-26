import React, { useEffect, useState } from "react";
import '../../assets/scss/component/_course.scss';
import '../../assets/css/flaticon.css';
import '../../assets/css/fontAwesome5Pro.css';
import '../../assets/scss/component/_common.scss';
import '../../assets/scss/component/_student-choose.scss';
import { useCourse, useHome } from "../../hooks/hooks";
import { useDispatch } from "react-redux";
import { setSearchedCourses, setSearchedTestSeries } from "../../store/slices/courseSlice";
import { Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { IconAdjustments, IconSearch } from "@tabler/icons";
import Select from "../form/Select";
import FormInput from "../form/FormInput";
import GradientButton from "../form/GradientButton";
import SelectOutlined from "../form/SelectOutlined";





const CourseBar = () => {
  const [input, setInput] = useState("");
  const [drop, setDrop] = useState(false);
  const [sortBy, setSortBy] = useState('Rating:High to Low');
  const [filterCategory, setFilterCategory] = useState('Select Categories');
  const [filterPrice, setFilterPrice] = useState('Select Price');
  const [filterTutor, setFilterTutor] = useState('Select Tutor');
  const [filterRating, setFilterRating] = useState('Select Rating');
  const sortOptions = ['Rating:High to Low', 'Rating:Low to High', 'Price:Low to High', 'Price:High to Low'];
  // const Categories = ['All', 'Development', 'Business', 'Finance', 'Design', 'Marketing', 'IT & Software', 'Personal Development', 'Photography', 'Music', 'Health & Fitness', 'Lifestyle', 'Teacher Training', 'Academics', 'Language', 'Test Prep'];
  const { categoryIds, allCourses,allTestSeries, searchedCourses,searchedTestSeries, filteredCourses } = useCourse();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { categories } = useHome();
  let Categories = categories?.map((category) => category?.name);
  Categories = categories ? ['Select Categories', ...Categories] : ['Select Categories']
  const Price = ["Select Price", 'All', 'Free', 'Paid', 'Demo']
  const Tutor = ["Select Tutor", 'All', 'Udemy', 'Coursera', 'Edx', 'Skillshare', 'Linkedin Learning']
  const Rating = ["Select Rating", '4.5+', '4.0+', '3.5+', '3.0+', '2.5+', '2.0+', '1.5+', '1.0+']
  const dispatch = useDispatch();
  const searchInputChange = (e) => {
    setInput(e.target.value);
    handleSearch(e.target.value);
  }
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    const type = e.target.value;
    if (type === 'Rating:High to Low') {
      let coursesToSort = searchedCourses ? [...searchedCourses] : [...allCourses];
      let testSeriesToSort = searchedTestSeries ? [...searchedTestSeries] : [...allTestSeries];
      const result = coursesToSort?.sort((a, b) => b.ratings - a.ratings);
      const testResult = testSeriesToSort?.sort((a, b) => b.ratings - a.ratings);
      dispatch(setSearchedCourses(result));
      dispatch(setSearchedTestSeries(testResult));
    }
    if (type === 'Rating:Low to High') {
      let coursesToSort = searchedCourses ? [...searchedCourses] : [...allCourses];
      let testSeriesToSort = searchedTestSeries ? [...searchedTestSeries] : [...allTestSeries];
      const result = coursesToSort?.sort((a, b) => a.ratings - b.ratings);
      const testResult = testSeriesToSort?.sort((a, b) => a.ratings - b.ratings);
      dispatch(setSearchedCourses(result));
      dispatch(setSearchedTestSeries(testResult));
    }
    if (type === 'Price:Low to High') {
      let coursesToSort = searchedCourses ? [...searchedCourses] : [...allCourses];
      let testSeriesToSort = searchedTestSeries ? [...searchedTestSeries] : [...allTestSeries];
      const result = coursesToSort?.sort((a, b) => a.discountedPrice - b.discountedPrice);
      const testResult = testSeriesToSort?.sort((a, b) => a.discountedPrice - b.discountedPrice);
      dispatch(setSearchedCourses(result));
      dispatch(setSearchedTestSeries(testResult));
    }
    if (type === 'Price:High to Low') {
      let coursesToSort = searchedCourses ? [...searchedCourses] : [...allCourses];
      let testSeriesToSort = searchedTestSeries ? [...searchedTestSeries] : [...allTestSeries];
      const result = coursesToSort?.sort((a, b) => b.discountedPrice - a.discountedPrice);
      const testResult = testSeriesToSort?.sort((a, b) => b.discountedPrice - a.discountedPrice);
      dispatch(setSearchedCourses(result));
      dispatch(setSearchedTestSeries(testResult));
    }
  }
  const handleFilterCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    const {courses:searched,testseries:searchedTests} = searchHelper();
    const {courses:priceFiltered,testseries:priceFilteredTests} = handlePriceFilter(searched,searchedTests, filterPrice);
    const {courses:result,testseries:testResults} = handleCategoryFilter(priceFiltered,priceFilteredTests, e.target.value);
    dispatch(setSearchedCourses(result));
    dispatch(setSearchedTestSeries(testResults));
  }
  const handleFilterPriceChange = (e) => {
    setFilterPrice(e.target.value);
    const {courses:searched,testseries:searchedTests} = searchHelper();
    const {courses:categoryFiltered,testseries:categoryFilteredTests} = handleCategoryFilter(searched,searchedTests, filterCategory);
    const {courses:result,testseries:testResults} = handlePriceFilter(categoryFiltered,categoryFilteredTests, e.target.value);
    dispatch(setSearchedCourses(result));
    dispatch(setSearchedTestSeries(testResults));
  }
  // const handleFilterTutorChange = (e) => {
  //   setFilterTutor(e.target.value);
  //   if (e.target.value === 'Select Tutor') {
  //     setFilterTutor('All');
  //   } else {
  //     //add filtering logic here
  //   }
  // }
  const handleFilterRatingChange = (e) => {
    setFilterRating(e.target.value);
    if (e.target.value === 'Select Rating') {
      setFilterRating('All');
    } else {
      const {courses:searched,testseries:searchedTests} = searchHelper();
      const {courses:categoryFiltered,testseries:categoryFilteredTests} = handleCategoryFilter(searched,searchedTests, filterCategory);
      const {courses:priceFiltered,testseries:priceFilteredTests} = handlePriceFilter(categoryFiltered,categoryFilteredTests, filterPrice);
      const {courses:result,testseries:testResults} = handleRatingsFilter(priceFiltered,priceFilteredTests, e.target.value);
      dispatch(setSearchedCourses(result));
      dispatch(setSearchedTestSeries(testResults));
    }
  }
  const handleCategoryFilter = (renderedCourse,renderedTestSeries, category) => {
    if (category === 'Select Categories') {
      return {courses:renderedCourse,testseries:renderedTestSeries};
    } else {
      const results = renderedCourse?.filter(obj => {
        const cat = categories.filter((category) => category._id === obj?.category);
        if (cat && cat[0]?.name === category) {
          return obj;
        } else return null;
      });
      const testResults = renderedTestSeries?.filter(obj => {
        const cat = categories.filter((category) => category._id === obj?.category);
        if (cat && cat[0]?.name === category) {
          return obj;
        } else return null;
      });
      return {courses:results,testseries:testResults};
    }
  }
  const handlePriceFilter = (renderedCourse,renderedTestSeries, price) => {
    if (price === 'All' || price === 'Select Price') {
      return {courses:renderedCourse,testseries:renderedTestSeries};
    } else {
      const results = renderedCourse?.filter(obj => {
        if (price === 'Free') {
          return obj?.type === 'free';
        } else if (price === 'Paid') {
          return obj?.type === 'paid';
        } else if (price === 'Demo') {
          return obj?.type === 'demo';
        } else return obj;
      });
      const testResults = renderedTestSeries?.filter(obj => {
        if (price === 'Free') {
          return obj?.type === 'free';
        } else if (price === 'Paid') {
          return obj?.type === 'paid';
        } else if (price === 'Demo') {
          return obj?.type === 'demo';
        } else return obj;
      }
      );
      return {courses:results,testseries:testResults};
    }
  }
  const handleRatingsFilter = (renderedCourse,renderedTestSeries, rating) => {
    if (rating === 'All' || rating === 'Select Rating') {
      return {courses:renderedCourse,testseries:renderedTestSeries};
    } else {
      const results = renderedCourse?.filter(obj => {
        return obj?.ratings >= parseFloat(rating);
      });
      const testResults = renderedTestSeries?.filter(obj => {
        return obj?.ratings >= parseFloat(rating);
      }
      );
      return {courses:results,testseries:testResults};
    }
  }
  const searchHelper = () => {
    let results,testResults;
    if (input.trim().length === 0) {
      return {courses:allCourses,testseries:allTestSeries};
    } else {
      results = allCourses?.filter(obj => {
        const cat = categories.filter((category) => category._id === obj?.category);
        if (cat && (cat[0]?.name.toLowerCase().includes(input.toLowerCase()) || input.toLowerCase().includes(cat[0]?.name.toLowerCase()))) {
          return obj;
        } else if (obj?.title.toLowerCase().includes(input.toLowerCase()) || obj?.description.toLowerCase().includes(input.toLowerCase())) {
          return obj;
        }
        else return null;
      });
      testResults = allTestSeries?.filter(obj => {
        const cat = categories.filter((category) => category._id === obj?.category);
        if (cat && (cat[0]?.name.toLowerCase().includes(input.toLowerCase()) || input.toLowerCase().includes(cat[0]?.name.toLowerCase()))) {
          return obj;
        } else if (obj?.title.toLowerCase().includes(input.toLowerCase()) || obj?.description.toLowerCase().includes(input.toLowerCase())) {
          return obj;
        }
        else return null;
      });
    }
    return {courses:results,testseries:testResults};
  }
  const handleSearch = (input) => {
    let results,testResults;
    setFilterCategory('Select Categories');
    setFilterPrice('Select Price');
    setFilterTutor('Select Tutor');
    setFilterRating('Select Rating');
    if (input.trim().length === 0) {
      dispatch(setSearchedCourses(results));
      dispatch(setSearchedTestSeries(testResults));
      return;
    } else {
      results = allCourses?.filter(obj => {
        const cat = categories.filter((category) => category._id === obj?.category);
        if (cat && (cat[0]?.name.toLowerCase().includes(input.toLowerCase()) || input.toLowerCase().includes(cat[0]?.name.toLowerCase()))) {
          return obj;
        } else if (obj?.title.toLowerCase().includes(input.toLowerCase()) || obj?.description.toLowerCase().includes(input.toLowerCase())) {
          return obj;
        }
        else return null;
      });
      testResults = allTestSeries?.filter(obj => {
        const cat = categories.filter((category) => category._id === obj?.category);
        if (cat && (cat[0]?.name.toLowerCase().includes(input.toLowerCase()) || input.toLowerCase().includes(cat[0]?.name.toLowerCase()))) {
          return obj;
        } else if (obj?.title.toLowerCase().includes(input.toLowerCase()) || obj?.description.toLowerCase().includes(input.toLowerCase())) {
          return obj;
        }
        else return null;
      });
    }
    dispatch(setSearchedCourses(results));
    dispatch(setSearchedTestSeries(testResults));
  }


  return (
    <div className="container mx-auto">
      <Grid container columns={12} gap={2} sx={{ marginBottom: '2rem', padding: '0 0.5rem', justifyContent: 'space-between' }}>
        <Grid item xs={5} md={1} onClick={() => { setDrop(!drop) }} sx={{ cursor: 'pointer', padding: '5px 16px', border: '1px solid #4B4B4D4D', borderRadius: '8px', display: 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>
          <IconAdjustments size={24} />
          <Typography sx={{ fontWeight: 'bold', padding: '0 5px' }}>Filters</Typography>
        </Grid>
        <Grid item xs={6} md={3} sx={{ padding: '5px 16px', border: '1px solid #4B4B4D4D', borderRadius: '8px', display: 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', padding: '0 5px' }}>Sort by:</Typography>
          <Select value={sortBy} onChange={handleSortByChange} width='70%' options={sortOptions} />
        </Grid>
        <Grid item xs={12} md={6.8} sx={{ position: 'relative', fontSize: '1rem', padding: '5px 16px', border: '1px solid #4B4B4D4D', borderRadius: '8px', display: 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'start' }}>
          <IconSearch size={20} />
          <input type="text" onChange={searchInputChange} value={input} style={{ fontSize: '1rem', width: '90%', padding: '5px', outline: 'none', textDecoration: 'none' }} placeholder="Find your course...." />
          <Box style={{ position: 'absolute', right: '0rem' }}>
            <GradientButton onClick={() => handleSearch(input)} text='Search' type='submit' />
          </Box>
        </Grid>
      </Grid>
      <Collapse in={drop && lgUp}>
        <Grid container columns={12} gap={2} sx={{ marginBottom: '3rem', marginTop: '1rem', padding: '0 0.5rem', justifyContent: 'space-between' }}>
          <Grid item xs={5} md={3.5} >
            <SelectOutlined value={filterCategory} label='Categories' onChange={handleFilterCategoryChange} options={Categories} />
          </Grid>
          <Grid item xs={5} md={3.5} >
            <SelectOutlined value={filterPrice} label='Price' onChange={handleFilterPriceChange} options={Price} />
          </Grid>
          {/* <Grid item xs={5} md={2.5}>
            <SelectOutlined value={filterTutor} label='Tutor' onChange={handleFilterTutorChange} options={Tutor} />
          </Grid> */}
          <Grid item xs={5} md={3.5} >
            <SelectOutlined value={filterRating} label='Rating' onChange={handleFilterRatingChange} options={Rating} />
          </Grid>
        </Grid>
      </Collapse>
      <Dialog open={drop && !lgUp} onClose={() => { setDrop(false) }}>
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <Grid container columns={12} gap={3} sx={{ my: '1rem', justifyContent: 'center', padding: '0 1rem' }}>
            <Grid item xs={10} md={3} >
              <SelectOutlined value={filterCategory} label='Categories' onChange={handleFilterCategoryChange} options={Categories} />
            </Grid>
            <Grid item xs={10} md={3} >
              <SelectOutlined value={filterPrice} label='Price' onChange={handleFilterPriceChange} options={Price} />
            </Grid>
            {/* <Grid item xs={10} md={3}>
              <SelectOutlined value={filterTutor} label='Tutor' onChange={handleFilterTutorChange} options={Tutor} />
            </Grid> */}
            <Grid item xs={10} md={3} >
              <SelectOutlined value={filterRating} label='Rating' onChange={handleFilterRatingChange} options={Rating} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <GradientButton text='Apply' type='submit' onClick={() => { setDrop(false) }} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CourseBar;
