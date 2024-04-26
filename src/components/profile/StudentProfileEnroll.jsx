import React, { useState } from "react";
import { useAuth, useCourse } from "../../hooks/hooks";
import CourseCard from "../courses/CourseCard";

const StudentProfileEnroll = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { user } = useAuth();
  const { allCourses } = useCourse();
  const EnrolledCourses = allCourses?.filter((item) =>
    user?.coursesPurchased?.includes(item._id)
  );
  const ActiveCourses = EnrolledCourses?.filter((item) => item.isActive);
  const CompletedCourse = [];
  const handleBuyNow = () => {};
  return (
    <>
      <div className="student-profile-enroll">
        <ul className="nav flex mb-12" id="myTab" role="tablist">
          <li className="nav-item mr-8" role="presentation">
            <button
              className={`nav-link ${activeTab === 1 && `active`} `}
              id="enrolled-tab"
              data-bs-toggle="tab"
              data-bs-target="#enrolled"
              type="button"
              role="tab"
              aria-controls="enrolled"
              aria-selected="true"
              onClick={() => setActiveTab(1)}
            >
              Enrolled Courses {`(${EnrolledCourses?.length})`}
            </button>
          </li>
          <li className="nav-item mr-8" role="presentation">
            <button
              className={`nav-link ${activeTab === 2 && `active`} `}
              id="active-tab"
              data-bs-toggle="tab"
              data-bs-target="#active"
              type="button"
              role="tab"
              aria-controls="active"
              aria-selected="false"
              onClick={() => setActiveTab(2)}
            >
              Active Courses {`(${ActiveCourses?.length})`}
            </button>
          </li>
          <li className="nav-item mr-8" role="presentation">
            <button
              className={`nav-link ${activeTab === 3 && `active`} `}
              id="completed-tab"
              data-bs-toggle="tab"
              data-bs-target="#completed"
              type="button"
              role="tab"
              aria-controls="completed"
              aria-selected="false"
              onClick={() => setActiveTab(3)}
            >
              Completed Courses {`(${CompletedCourse?.length})`}
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          {activeTab === 1 && (
            <div
              className="tab-pane fade show active"
              id="enrolled"
              role="tabpanel"
              aria-labelledby="enrolled-tab"
            >
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {EnrolledCourses?.length > 0 &&
                  EnrolledCourses.map((item) => (
                    <CourseCard
                      key={item._id}
                      course={item}
                      handleBuyNow={handleBuyNow}
                    />
                  ))}
                {EnrolledCourses?.length === 0 && (
                  <span className="text-center">No Enrolled courses</span>
                )}
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div
              className="tab-pane fade"
              id="active"
              role="tabpanel"
              aria-labelledby="active-tab"
            >
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {ActiveCourses?.length > 0 &&
                  ActiveCourses.map((item) => (
                    <CourseCard
                      key={item._id}
                      course={item}
                      handleBuyNow={handleBuyNow}
                    />
                  ))}
                {ActiveCourses?.length === 0 && (
                  <span className="text-center">No Active courses</span>
                )}
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div
              className="tab-pane fade"
              id="completed"
              role="tabpanel"
              aria-labelledby="completed-tab"
            >
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {CompletedCourse?.length > 0 &&
                  ActiveCourses.map((item) => (
                    <CourseCard
                      key={item._id}
                      course={item}
                      handleBuyNow={handleBuyNow}
                    />
                  ))}
                {CompletedCourse?.length === 0 && (
                  <span className="text-center">No Completed courses</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentProfileEnroll;
