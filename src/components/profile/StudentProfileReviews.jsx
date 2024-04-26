import {studentReview_data} from "./in-progress-course-data";
import React from "react";

const StudentProfileReviews = () => {
  //for rating handle
  const getRating = (ratingsNum) => {
    let empty_rating_count = 5 - ratingsNum;
    let ratings = [];
    for (let i = 0; i < ratingsNum; i++) {
      ratings.push(<i className="fas fa-star" key={`l-${i}`}></i>)
    }
    for (let i = 0; i < empty_rating_count; i++) {
      ratings.push(<i className="fal fa-star" key={`p-${i}`}></i>)
    }
    return ratings;
  }
  //for rating handle
  return (
    <>
      <div className="student-profile-reviews">
        {
          studentReview_data.map((item) => (
            <div key={item.id} className="student-profile-reviews-item mb-30">
              <div className="student-profile-reviews-course-title">
                <h5>{item.title}</h5>
              </div>
              <div className="student-profile-reviews-text">
                <div className="student-profile-reviews-text-wrap mb-20">
                  <div className="student-profile-review-icon">
                    {getRating(item?.ratings)}
                  </div>
                  <div className="student-profile-review-update">
                    <button
                      type="button"
                      className="student-profile-review-update-btn"
                    >
                      <i className="far fa-edit"></i> Edit
                    </button>
                    <button
                      type="button"
                      className="student-profile-review-update-btn"
                    >
                      <i className="far fa-trash-alt"></i> Delete
                    </button>
                  </div>
                </div>
                <div className="student-profile-review-content">
                  <p>{item.comment}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default StudentProfileReviews;
