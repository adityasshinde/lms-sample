import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import courses_data from "../courses/course-data";
import { useDispatch } from "react-redux";
import "../../assets/css/flaticon.css";
import "../../assets/css/fontAwesome5Pro.css";
import "../../assets/scss/component/_common.scss";
import "../../assets/scss/component/_course.scss";
import "../../assets/scss/component/_hero.scss";
import "../../assets/scss/component/_modal.scss";
import { useAuth, useCourse, useHome } from "../../hooks/hooks";
import {
  setAuthState,
  setRedirectLocation,
} from "../../store/slices/authSlice";
import { setCheckoutCourseId } from "../../store/slices/paymentSlice";
import CourseCard from "../courses/CourseCard";
import { Grid, Typography, useMediaQuery,Skeleton,Box } from "@mui/material";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import Slider from "react-slick";
import Loader from "../ui/Loader";
import WithScrollAnimation from "./WithScrollAnimation";


const CourseTab = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const { allCourses } = useCourse();
  const { isAuth } = useAuth();
  const { categories } = useHome();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const courseToRender = allCourses?.filter((course) => course.discountedPrice > 0);
  const paidCourses = allCourses?.filter((course) => course.type === 'paid');
  const demoCourses = allCourses?.filter((course) => course.type === 'demo');
  const freeCourses = allCourses?.filter((course) => course.type === 'free');
  const sliderRefPaid = useRef(null);
  const sliderRefDemo = useRef(null);
  const sliderRefFree = useRef(null);
  const settings1 = {
    dots: false,
    infinite: (paidCourses?.length >= 3 && lgUp),
    autoplay: paidCourses?.length >= 3 && lgUp,
    autoplaySpeed: (paidCourses?.length >= 3 && lgUp)? 0 : 3000,
    slidesToShow: (paidCourses?.length >= 3 && lgUp)? 3 : paidCourses?.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settings2 = {
    dots: false,
    infinite: (demoCourses?.length >= 3 && lgUp),
    autoplay: demoCourses?.length >= 3 && lgUp,
    autoplaySpeed: (demoCourses?.length >= 3 && lgUp)? 0 : 3000,
    slidesToShow: (demoCourses?.length >= 3 && lgUp)? 3 : demoCourses?.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settings3 = {
    dots: false,
    infinite: freeCourses?.length >= 3 && lgUp,
    autoplay: freeCourses?.length >= 3 && lgUp,
    autoplaySpeed: freeCourses?.length >= 3 && lgUp ? 0 : 3000,
    slidesToShow: freeCourses?.length >= 3 && lgUp ? 3 : freeCourses?.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const nextSlide = (type) => {
    if (type === 'paid') {
      sliderRefPaid.current.slickNext();
    } else if (type === 'demo') {
      sliderRefDemo.current.slickNext();
    } else if (type === 'free') {
      sliderRefFree.current.slickNext();
    }
  };

  const previousSlide = (type) => {
    if (type === 'paid') {
      sliderRefPaid.current.slickPrev();
    } else if (type === 'demo') {
      sliderRefDemo.current.slickPrev();
    } else if (type === 'free') {
      sliderRefFree.current.slickPrev();
    }
  };
  // let courseToRender =
  //   allCourses?.length > 4 ? allCourses?.slice(0, 4) : allCourses;
  const filterData = courseToRender?.filter((obj) => {
    return obj.category === activeCategory;
  });
  let courses_data = activeCategory === "" ? courseToRender : filterData;

  //for rating handle
  const getRating = (ratingsNum) => {
    let empty_rating_count = 5 - ratingsNum;
    let ratings = [];
    for (let i = 0; i < ratingsNum; i++) {
      ratings.push(<i className="fas fa-star" key={`l-${i}`}></i>);
    }
    for (let i = 0; i < empty_rating_count; i++) {
      ratings.push(<i className="fal fa-star" key={`p-${i}`}></i>);
    }
    return ratings;
  };
  //for rating handle
  const handleBuyNow = (product) => {
    // add logic for Buy now
    dispatch(setCheckoutCourseId(product._id));
    if (!isAuth) {
      dispatch(setAuthState(1));
      dispatch(setRedirectLocation("/student/checkout"));
      return;
    }
    navigate("/student/checkout");
  };
  const getSliderWidth = (length) => {
    if(!length) return '0%';
    if (length === 1 && lgUp) {
      return '37.5%';
    }
    if (length === 2 && lgUp) {
      return '75%';
    }
    return '100%';
  }

  return (
    <WithScrollAnimation>
      <div id="coursetab" className="pt-12 pb-8">
      <div className="px-8 lg:px-16 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <Typography
            fontWeight={900}
              sx={{
                color: "#2B527A",
                letterSpacing: "2px",
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              COURSES
            </Typography>
            <Typography variant="h2" component="h2" fontWeight={800} sx={{ textAlign: { xs: 'center', md: 'left' } }} color="#4B4B4D">
              Explore <span style={{ color: "#207EB8" }}>diverse</span><br /> educational courses<span className="text-[#207EB8]">.</span>
            </Typography>
          </div>
          <div className="hidden">
            <div className="portfolio-button mt-12">
              <nav>
                <div
                  className="nav portfolio-button-tabs"
                  id="nav-tab"
                  role="tablist"
                >
                  <button
                    onClick={() => setActiveCategory("")}
                    className={activeCategory === "" ? "active" : ""}
                    type="button"
                  >
                    View All{" "}
                    {courses_data && (
                      <span className="port-red">
                        {courses_data?.length < 10
                          ? `[0${courses_data.length}]`
                          : `[${courses_data?.length}]`}
                      </span>
                    )}
                  </button>

                  {categories?.length &&
                    categories?.slice(0, 4).map((item) => (
                      <button
                        onClick={() => setActiveCategory(item._id)}
                        className={activeCategory === item._id ? "active" : ""}
                        key={item._id}
                        type="button"
                      >
                        {item.name}{" "}
                        <span className="port-red">
                          {courses_data?.length < 10
                            ? `[0${courses_data?.length}]`
                            : `[${courses_data?.length}]`}
                        </span>
                      </button>
                    ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {/* <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1rem' }} color="#207EB8">
            Paid
          </Typography> */}
          <Grid width={getSliderWidth(paidCourses?.length)}>
            <Slider ref={sliderRefPaid} {...settings1}>
              {paidCourses?.length > 0 &&
                paidCourses.map((item) => (
                  <div key={item._id} className="pt-6 pb-2 px-2">
                    <CourseCard
                      key={item._id}
                      course={item}
                      handleBuyNow={handleBuyNow}
                    />
                  </div>
                ))}
            </Slider>
            {!courses_data && 
            <Box
            sx={{
              mx: "auto",
              overflow: "hidden",
              display: "flex",
              alignItems:'start',
              justifyContent: "start",
              width:'70vw',
              gap:4
            }}
          >
            {lgUp?[1,2,3].map(item=>
            <Skeleton key={item} animation="wave" height="600px" width="500px" />
            )
            :<Skeleton animation="wave" height="600px" width="500px" />}
            
          </Box>}
            {courses_data?.length === 0 && (
              <span className="mt-16 text-lg">No such courses</span>
            )}
          </Grid>
          {courses_data && <div className="flex flex-wrap items-center justify-between mt-8 mb-20 px-2">
            <div className="flex space-x-4">
              <div onClick={() => previousSlide('paid')} style={{ padding: '4px', cursor: 'pointer', borderRadius: '50%' }} className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"><IconChevronLeft /></div>
              <div onClick={() => nextSlide('paid')} style={{ padding: '4px', cursor: 'pointer', borderRadius: '50%' }} className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"><IconChevronRight /></div>
            </div>
            <div>
              <Link to="/courses" >
                <Typography sx={{ fontSize: '1rem', fontWeight: '500', display: 'flex', color: '#207EB8' }}>{`View All Courses `} <IconChevronRight size={24} /></Typography>
              </Link>
            </div>
          </div>}
        </div>
        {/* <div className="mt-4">
          <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1rem' }} color="#207EB8">
            Demo
          </Typography>
          <Grid width={getSliderWidth(demoCourses?.length)}>
            <Slider ref={sliderRefDemo} {...settings2}>
              {demoCourses?.length > 0 &&
                demoCourses.map((item) => (
                  <div key={item._id} className="pt-6 pb-2 px-2">
                    <CourseCard
                      key={item._id}
                      course={item}
                      handleBuyNow={handleBuyNow}
                    />
                  </div>
                ))}
            </Slider>
            {!courses_data && <Loader />}
            {courses_data?.length === 0 && (
              <span className="mt-16 text-lg">No such courses</span>
            )}
          </Grid>
          {courses_data && <div className="flex flex-wrap items-center justify-between mt-8 mb-20 px-2">
            <div className="flex space-x-4">
              <div onClick={() => previousSlide('demo')} style={{ padding: '4px', cursor: 'pointer', borderRadius: '50%' }} className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"><IconChevronLeft /></div>
              <div onClick={() => nextSlide('demo')} style={{ padding: '4px', cursor: 'pointer', borderRadius: '50%' }} className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"><IconChevronRight /></div>
            </div>
            <div>
              <Link to="/courses" >
                <Typography sx={{ fontSize: '1rem', fontWeight: '500', display: 'flex', color: '#207EB8' }}>{`View All Courses `} <IconChevronRight size={24} /></Typography>
              </Link>
            </div>
          </div>}
        </div> */}
        {/* <div className="mt-4">
          <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1rem' }} color="#207EB8">
            Free
          </Typography>
          <Grid width={getSliderWidth(freeCourses?.length)}>
            <Slider ref={sliderRefFree} {...settings3}>
              {freeCourses?.length > 0 &&
                freeCourses.map((item) => (
                  <div key={item._id} className="pt-6 pb-2 px-2">
                    <CourseCard
                      key={item._id}
                      course={item}
                      handleBuyNow={handleBuyNow}
                    />
                  </div>
                ))}
            </Slider>
            {!courses_data && <Loader />}
            {courses_data?.length === 0 && (
              <span className="mt-16 text-lg">No such courses</span>
            )}
          </Grid>
          {courses_data && <div className="flex flex-wrap items-center justify-between mt-8 mb-20 px-2">
            <div className="flex space-x-4">
              <div onClick={() => previousSlide('free')} style={{ padding: '4px', cursor: 'pointer', borderRadius: '50%' }} className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"><IconChevronLeft /></div>
              <div onClick={() => nextSlide('free')} style={{ padding: '4px', cursor: 'pointer', borderRadius: '50%' }} className="bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white"><IconChevronRight /></div>
            </div>
            <div>
              <Link to="/courses" >
                <Typography sx={{ fontSize: '1rem', fontWeight: '500', display: 'flex', color: '#207EB8' }}>{`View All Courses `} <IconChevronRight size={24} /></Typography>
              </Link>
            </div>
          </div>}
        </div> */}
      </div>
    </div>
    </WithScrollAnimation>
  );
};

export default CourseTab;
