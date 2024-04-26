import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth, useCourse, useHome } from "../../hooks/hooks";
import {
  setAuthState,
  setRedirectLocation,
} from "../../store/slices/authSlice";
import { setCheckoutCourseId } from "../../store/slices/paymentSlice";
import CourseCard from "../courses/CourseCard";
import TestSeriesCard from "../lms/TestSeriesCard";

const MyLearningContent = ({courses,testseries}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCourses, searchedCourses } = useCourse();
  const { isAuth } = useAuth();
  let courses_data = allCourses;
  if (searchedCourses) {
    courses_data = searchedCourses;
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
    <section className="course-content-area pb-4">
      <div className="container mx-auto">
        <div className="flex mb-10">
          {/* <div className="flex pr-4">
            <CourseSidebarArea />
          </div> */}
          <div className="w-full w-3/4 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
              {courses?.length > 0 &&
                courses.map((item) => (
                  <CourseCard
                    key={item._id}
                    course={item}
                    handleBuyNow={handleBuyNow}
                  />
                ))}
                {testseries?.length > 0 &&
                testseries.map((item) => (
                  <TestSeriesCard
                    key={item._id}
                    series={item}
                  />
                ))}
              {courses_data?.length === 0 && (
                <span className="mt-16 text-lg text-center">No such courses</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyLearningContent;
