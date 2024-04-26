import React from "react";

const CourseProgressbar = () => {
  return (
    <div className="student-reating-bar">
      <div className="reating-bar-wrapper">
        <div className="rating-row mb-4">
          <div className="rating-star">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
          <div className="w-[70%] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '98%' }}></div>
          </div>

          <div className="progress-tittle">
            <span>98%</span>
          </div>
        </div>
        <div className="rating-row mb-4">
          <div className="rating-star">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fal fa-star"></i>
          </div>
          <div className="w-[70%] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
          </div>
          <div className="progress-tittle">
            <span>78%</span>
          </div>
        </div>
        <div className="rating-row mb-4">
          <div className="rating-star">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fal fa-star"></i>
            <i className="fal fa-star"></i>
          </div>
          <div className="w-[70%] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
          </div>
          <div className="progress-tittle">
            <span>55%</span>
          </div>
        </div>
        <div className="rating-row mb-4">
          <div className="rating-star">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fal fa-star"></i>
            <i className="fal fa-star"></i>
            <i className="fal fa-star"></i>
          </div>
          <div className="w-[70%] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <div className="progress-tittle">
            <span>60%</span>
          </div>
        </div>
        <div className="rating-row mb-4">
          <div className="rating-star">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fal fa-star"></i>
            <i className="fal fa-star"></i>
            <i className="fal fa-star"></i>
          </div>
          <div className="w-[70%] bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
          </div>
          <div className="progress-tittle">
            <span>10%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressbar;
