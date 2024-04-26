import { Link } from "react-router-dom";
import React, { useState } from "react";

const CourseReview = () => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      <div className="course-review-btn">
        <span id="show-review-box" className="edu-btn" onClick={handleToggle}>
          Write a Review
        </span>
        <div
          // id="review-box"
          className={`review-comment mt-12`}
        >
          <div className="comment-title mb-8">
            <p>
              Your email address will not be published. Required fields are
              marked *
            </p>
          </div>
          <div className="comment-rating mb-8">
            <span>Overall ratings</span>
            <ul>
              <li>
                <Link href="#">
                  <i className="fas fa-star"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fas fa-star"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fas fa-star"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fas fa-star"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fal fa-star"></i>
                </Link>
              </li>
            </ul>
          </div>
          <div className="comment-input-box mb-8">
            <form action="#">
              <div className="flex flex-wrap">
                <div className="lg:w-full">
                  <textarea
                    placeholder="Your review"
                    className="comment-input comment-textarea mb-20"
                  ></textarea>
                </div>
                <div className="lg:w-1/2">
                  <div className="comment-input mb-20">
                    <input type="text" placeholder="Your Name" />
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="comment-input mb-20">
                    <input type="email" placeholder="Your Email" />
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="comment-submit">
                    <button className="edu-btn">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseReview;
