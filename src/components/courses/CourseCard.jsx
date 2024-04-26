import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { IconBookmark, IconList, IconStar } from "@tabler/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import discountVector from "../../asset/images/Vector.png";
import { useAuth, useCourse, useHome } from "../../hooks/hooks";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../../store/api/authApi";
import {
  setAuthState,
  setRedirectLocation,
  userLogout,
} from "../../store/slices/authSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/slices/courseSlice";
import GradientLink from "../form/GradientLink";
import ConfirmationPopup from "../molecules/ConfirmationPopup";
import LoadingOverlay from "../molecules/LoadingOverlay";
import NormalLink from "../form/NormalLink";
import { setLmsCourse } from "../../store/slices/lmsSlice";
import { Box } from "@mui/system";


const CourseCard = ({ course }) => {
  const [confirm, setConfirm] = useState(false);
  const { user, isAuth } = useAuth();
  const { wishList } = useCourse();
  const { categories } = useHome();
  const dispatch = useDispatch();
  const [addToWishlistMutation, { isLoading: loadingAdd }] =
    useAddToWishlistMutation();
  const [removeFromWishlistMutation, { isLoading: loadingRemove }] =
    useRemoveFromWishlistMutation();
  const isWishlisted = wishList?.includes(course._id);
  const isPurchased = user?.coursesPurchased?.includes(course._id);
  const category = categories?.find((cat) => cat._id === course.category);
  const percentDiscount = course.discountedPrice === 0 ? 'FREE' : `${parseInt(
    ((course.actualPrice - course.discountedPrice) / course.actualPrice) * 100
  )}%`;
  const priceText = `Rs.${parseInt(course.discountedPrice)}`;
  const actualPriceText =
    course.actualPrice === undefined
      ? `Rs.${parseInt(course.discountedPrice * 1.5)}`
      : `Rs.${parseInt(course.actualPrice)}`;
  const handleRemoveFromWishlist = async () => {
    setConfirm(false);
    const result = await removeFromWishlistMutation(course._id);
    if (result.data) {
      dispatch(removeFromWishlist(course._id));
      toast.success("Course removed from wishlist", {
        position: "top-center",
        autoClose: 2000,
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
        toast.success("Course added to wishlist", {
          position: "top-center",
          autoClose: 2000,
        });
      }
      if (result.error?.status === 401) {
        dispatch(userLogout());
        dispatch(setAuthState(1));
      }
      console.log(result);
    }
  };
  return (
    <Box className="relative mx-2"
    sx={{
      transition: "transform 0.3s ease-in-out",
    "&:hover, &:focus": {
      transform: "scale(1.03)",
    },

    }}>
      {(loadingAdd || loadingRemove) && (
        <LoadingOverlay
          open={loadingAdd || loadingRemove}
          message="Updating your wishlist, please wait..."
        />
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
      <div style={{ position: "absolute", top: "-2rem", left: "-2rem" }}>
        <img src={discountVector} alt="discount vector" />
      </div>
      <Typography
        sx={{
          zIndex: 12,
          position: "absolute",
          transform: "rotate(-20deg)",
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: percentDiscount !== "FREE" && "1",
        }}
      >
        {percentDiscount}
        {percentDiscount !== "FREE" && <br />}
        {percentDiscount !== "FREE" && "off"}
      </Typography>
      <Card
        variant="outlined"
        sx={{
          borderRadius: "8px",
          padding: 0,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button
          onClick={wishListHandler}
          className="wishlist-btn absolute m-3 rounded-full z-10 right-0"
        >
          {!isWishlisted ? (
            <IconBookmark color="#4B4B4D" className="mx-auto" size="1.8rem" />
          ) : (
            <IconBookmark
              color="red"
              fill="red"
              className="mx-auto"
              size="1.8rem"
            />
          )}
        </button>
        <CardMedia
          component="img"
          width="100%"
          className="aspect-[16/9]"
          image={course?.imageURI || course?.thumbnailUrl}
          alt="Course Thumbnail"
        />
        <CardContent>
          <Typography variant="h4" sx={{ color: "#4B4B4D", height: '60px', overflow: 'hidden', mb: "0.6rem" }}>
            {course.title}
          </Typography>
          {/* <Typography
            variant="body1"
            sx={{
              color: "#4B4B4D",
              fontSize: "1rem",
              height: "45px",
              overflow: "hidden",
              mb: "1.8rem",
            }}
          >
            {course.description}
          </Typography> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0",
            }}
          >
            <Typography

              sx={{
                fontWeight: "bold",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: { xs: "0.8rem", md: '1rem' },
                bgcolor: "#c6e0f7",
              }}
            >
              {category?.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", fontSize: { xs: "0.8rem", md: '1rem' }, }}
            >
              <IconList size={24} stroke={1} />
              <span className="ml-2">{course.lectures?.length} Lessons</span>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", fontSize: { xs: "0.8rem", md: '1rem' } }}
            >
              <IconStar
                size={24}
                stroke={1}
                style={{
                  padding: "5px",
                  backgroundColor: "#FFF0A6",
                  borderRadius: "50%",
                  color: "#EFC800",
                }}
              />
              <span className="ml-2">{course?.averageRating? course.averageRating:"4.5"}</span>
            </Typography>
          </div>
          <Divider sx={{ my: 2, backgroundColor: "#4B4B4D" }} />
          <div className="grid grid-cols-2 my-2 ">
            <div className="flex flex-col justify-between">
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ color: "#4B4B4D", fontSize: "0.9rem" }}
              >
                Price
              </Typography>
              <div className="flex flex-row items-end">
                <Typography fontWeight="bold" sx={{ fontSize: "1.5rem" }}>
                  {priceText}
                </Typography>
                <Typography
                  component="del"
                  color="textSecondary"
                  sx={{
                    color: "#4B4B4D",
                    ml: "2px",
                    fontSize: "0.8rem",

                    lineHeight: "14px",
                  }}
                >
                  {actualPriceText}
                </Typography>
              </div>
            </div>
            {isPurchased ?
              <NormalLink
                to={`/lms/my_courses/${course._id}`}
                text="Go to Learning"
                type='button'
                onClick={() => dispatch(setLmsCourse(course))}
              />
              : <GradientLink
                to={isAuth?`/lms/explore/${course._id}`:`/courses/${course._id}`}
                text="Get Started"
                type="button"
              />}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;
