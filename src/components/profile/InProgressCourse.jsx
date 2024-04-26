import { progress_data } from "./in-progress-course-data";
import { Link } from "react-router-dom";
import React from "react";

const InProgressCourse = () => {
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
  return (
    <>
      {progress_data.map((item) => (
        <div key={item.id} className="inprogress-course mb-8">
          <div className="inprogress-course-img">
            <Link to="/course">
              <img
                src={item.img}
                style={{ width: "100%", height: "auto" }}
                alt="img not found"
              />
            </Link>
          </div>
          <div className="inprogress-course-text">
            <div className="inprogress-course-rating">
              {getRating(item?.ratings)}
              <span>{item.ratingAve}</span>
            </div>
            <h4 className="inprogress-course-title">
              <Link to="/course">{item.title}</Link>
            </h4>
            <div className="inprogress-course-lesson mb-4">
              <span>Completed Lessons :</span>
              <h6>
                <span>{item.lesson}</span> of <span>{item.lessonTwo}</span>{" "}
                lessons
              </h6>
            </div>
            <div className="rating-row mb-4">
              <div className="progress">
                <div
                  className="progress-bar progress-bar1 wow fadeInLeft"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <div className="progress-tittle">
                <h6>
                  <span>{item.progrssNum && `${item.progrssNum}%`}</span>{" "}
                  Complete
                </h6>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default InProgressCourse;
