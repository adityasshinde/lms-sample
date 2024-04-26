import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import courses_data from './course-data';
// import { cart_product } from "@/redux/slices/cartSlice";
// import { wishlist_product } from "@/redux/slices/wishlist-slice";

import "../../assets/css/flaticon.css";
import "../../assets/css/fontAwesome5Pro.css";
import "../../assets/scss/component/_common.scss";
import "../../assets/scss/component/_course.scss";
import { useAuth, useCourse, useHome } from "../../hooks/hooks";
import {
  setAuthState,
  setRedirectLocation,
} from "../../store/slices/authSlice";
import { setFilteredCourses } from "../../store/slices/courseSlice";
import { setCheckoutCourseId } from "../../store/slices/paymentSlice";
import CourseCard from "./CourseCard";
import PaginationData from "./Pagination-data";
import TestSeriesCard from "../lms/TestSeriesCard";

const CourseContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCourses, searchedCourses,allTestSeries,searchedTestSeries } = useCourse();
  const { isAuth } = useAuth();
  let courses_data = allCourses;
  if (searchedCourses) {
    courses_data = searchedCourses;
  }
  let test_series_data=allTestSeries;
  if(searchedTestSeries){
    test_series_data=searchedTestSeries;
  }

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
  const handleAddToCart = (product) => {
    // dispatch(cart_product(product));
  };
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

  return (
    <section className="pb-4">
      <div className="container mx-auto">
        <div className="flex mb-10">
          <div className="w-full">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
              {courses_data?.length > 0 &&
                courses_data.map((item) => (
                  <CourseCard
                    key={item._id}
                    course={item}
                    handleBuyNow={handleBuyNow}
                  />
                ))}
                {test_series_data?.length > 0 &&
                test_series_data.map((item,index) => (
                  <TestSeriesCard series={item} key={index} />
                ))
              }
              {courses_data?.length === 0 && test_series_data?.length==0 && (
                <span className="mt-16 text-lg text-center">No Content to show</span>
              )}
            </div>
            {courses_data?.length + allTestSeries?.length > 15 && (
              <div className="flex">
                <div className="w-full p-4">
                  <PaginationData />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseContent;
