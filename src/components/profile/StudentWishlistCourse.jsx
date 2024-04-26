import React from "react";
import { useAuth, useCourse } from "../../hooks/hooks";
import CourseCard from "../courses/CourseCard";

const StudentWishlistCourse = () => {
  const { allCourses, wishList } = useCourse();
  const wishlistCourses = allCourses?.filter(
    (item) => item.isActive && wishList?.includes(item._id)
  );
  //handle ratings
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
  const handleBuyNow = () => {};

  return (
    <div className="student-profile-enrolled-course">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {wishlistCourses?.length > 0 &&
          wishlistCourses.map((item) => (
            <CourseCard
              key={item._id}
              course={item}
              handleBuyNow={handleBuyNow}
            />
          ))}
        {wishlistCourses?.length === 0 && (
          <span className="text-center">No courses added to wishlist</span>
        )}
      </div>
    </div>
  );
};

export default StudentWishlistCourse;
