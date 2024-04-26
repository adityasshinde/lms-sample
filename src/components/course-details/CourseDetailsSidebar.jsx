import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import ModalVideo from "react-modal-video";
import { useDispatch } from "react-redux";
import { setCheckoutCourseId } from "../../store/slices/paymentSlice";
import { setAuthState, setRedirectLocation, userLogout } from "../../store/slices/authSlice";
import { useAuth, useCourse } from "../../hooks/hooks";
import { addToWishlist, removeFromWishlist } from "../../store/slices/courseSlice";
import { toast } from "react-toastify";
import { useAddToWishlistMutation, useRemoveFromWishlistMutation } from "../../store/api/authApi";
import LoadingOverlay from "../ui/LoadingOverlay";
import ConfirmationPopup from "../ui/ConfirmationPopup";
// import { cart_product } from "@/redux/slices/cartSlice";
// import { wishlist_product } from "@/redux/slices/wishlist-slice";

const CourseDetailsSidebar = ({ course }) => {
  const cart_product = [];
  const wishlist_product = [];
  const [confirm, setConfirm] = useState(false);
  const { isAuth,user} = useAuth();
  const navigate = useNavigate();
  const { wishList } = useCourse();
  const dispatch = useDispatch();
  const [addToWishlistMutation,{isLoading:loadingAdd}] = useAddToWishlistMutation();
  const [removeFromWishlistMutation,{isLoading:loadingRemove}] = useRemoveFromWishlistMutation();
  const isWishlisted = wishList?.includes(course._id);
  let isPurchased = false;
  if (user?.coursesPurchased?.includes(course._id)) {
    isPurchased = true;
  }
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setvideoId] = useState("");
  const openVideoModal = (id) => {
    setIsOpen(!isOpen);
    setvideoId(id);
  };
  const handleRemoveFromWishlist = async () => {
    setConfirm(false);
    const result = await removeFromWishlistMutation(course._id);
    if (result.data) {
      dispatch(removeFromWishlist(course._id));
      toast.success("Course removed from wishlist",
        {
          position: "top-center",
          autoClose: 2000
        });
    }
    if (result.error?.status === 401) {
      dispatch(userLogout());
      dispatch(setAuthState(1));
    }
    console.log(result);
  };
  const wishListHandler = async () => {
    if (!isAuth) {
      dispatch(setRedirectLocation(window.location.pathname));
      dispatch(setAuthState(1));
      return;
    }
    if (isWishlisted) {
      setConfirm(true);
      return;
    } else {
      const result = await addToWishlistMutation(course._id);
      if (result.data) {
        dispatch(addToWishlist(course._id));
        toast.success("Course added to wishlist",
          {
            position: "top-center",
            autoClose: 2000
          });
      }
      if (result.error?.status === 401) {
        dispatch(userLogout());
        dispatch(setAuthState(1));

      }
    }
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
    <>
      {(loadingAdd || loadingRemove) && (
        <LoadingOverlay message="Updating your wishlist, please wait..." />
      )}
      {confirm && (
        <ConfirmationPopup
          heading="Confirm"
          message="Are you sure you want to remove course from wishlist?"
          acceptButton="Remove"
          onAccept={handleRemoveFromWishlist}
          onCancel={() => setConfirm(false)}
        />
      )}
      <div className="course-video-widget">
        <div className="course-widget-wrapper mb-12">
          <div className="course-video-thumb w-img">
            {course.imageURI && (
              <img
                src={course.imageURI}
                style={{ width: "100%", height: "auto" }}
                alt="img not found"
              />
            )}
            <div className="sidber-video-btn">
              <span
                className="popup-video"
                onClick={() => {
                  openVideoModal(course.videoUrl);
                }}
              >
                <i className="fas fa-play"></i>
              </span>
            </div>
          </div>
          <div className="course-video-price">
            <span>
              {course.discountedPrice === 0 ? "FREE" : `Rs.${course.discountedPrice}`}
            </span>
          </div>
          <div className="course-video-body">
            <ul>
              {/* <li>
                <div className="course-vide-icon">
                  <i className="flaticon-filter"></i>
                  <span>Level</span>
                </div>
                <div className="video-corse-info">
                  <span>{course.level}</span>
                </div>
              </li> */}
              <li>
                <div className="course-vide-icon">
                  <i className="flaticon-computer"></i>
                  <span>Lectures</span>
                </div>
                <div className="video-corse-info">
                  <span>{course?.lectures.length} Lectures</span>
                </div>
              </li>
              <li>
                <div className="course-vide-icon">
                  <i className="flaticon-clock"></i>
                  <span>Duration</span>
                </div>
                <div className="video-corse-info">
                  <span>{course.clock}</span>
                </div>
              </li>
              <li>
                <div className="course-vide-icon">
                  <i className="flaticon-menu-2"></i>
                  <span>Category</span>
                </div>
                <div className="video-corse-info">
                  <span>{course.category}</span>
                </div>
              </li>
              <li>
                <div className="course-vide-icon">
                  <i className="flaticon-global"></i>
                  <span>Laguage</span>
                </div>
                <div className="video-corse-info">
                  <span>English</span>
                </div>
              </li>
              <li>
                <div className="course-vide-icon">
                  <i className="flaticon-bookmark-white"></i>
                  <span>Access</span>
                </div>
                <div className="video-corse-info">
                  <span>Full Lifetime</span>
                </div>
              </li>
              <li>
                <div className="course-vide-icon">
                  <i className="flaticon-award"></i>
                  <span>Certificate</span>
                </div>
                <div className="video-corse-info">
                  <span>Yes </span>
                </div>
              </li>
              <li>
                <div className="course-vide-icon">
                  <i className="flaticon-list"></i>
                  <span>Recourse</span>
                </div>
                <div className="video-corse-info">
                  <span>5 Downloadable Files </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="video-wishlist">
          {isPurchased ? (
              <Link to={`courses/${course._id}`} className="view-details-btn">
                Continue
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleBuyNow(course);
                }}
                className="video-cart-btn"
              >
                Buy Now
              </button>
            )}
           {isWishlisted ? 
           <button className="video-wishlist-btn text-red-500 hover:text-red-500" onClick={wishListHandler}>
           <i className="fas fa-bookmark text-red-500"></i>Wishlisted
         </button>
           : <button className="video-wishlist-btn" onClick={wishListHandler}>
              <i className="fas fa-bookmark"></i>Add to Wishlist
            </button>}
          </div>
        </div>
      </div>
      {/* <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setIsOpen(false)}
      /> */}
    </>
  );
};

export default CourseDetailsSidebar;
