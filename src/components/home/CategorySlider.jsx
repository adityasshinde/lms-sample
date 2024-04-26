import React, { useEffect } from "react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../assets/scss/component/_category.scss";

// Import Swiper styles
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "swiper/css";
import Icon2 from "../../asset/images/biology.png";
import Icon3 from "../../asset/images/government.png";
import Icon1 from "../../asset/images/physics.png";
import Icon4 from "../../asset/images/shield.png";
import { useHome } from "../../hooks/hooks";
import { useGetCategoriesQuery } from "../../store/api/homeApi";
import { addCategoryId } from "../../store/slices/courseSlice";
import { setCategories } from "../../store/slices/homeSlice";
import ErrorComponent from "../ui/ErrorComponent";
import WithScrollAnimation from "./WithScrollAnimation";

const CategorySlider = () => {
  const { categories } = useHome();
  const dispatch = useDispatch();
  const ICONS = [Icon1, Icon2, Icon3, Icon4];
  const ICONS_BG = ["#3772FF30", "#DF293530", "#FDCA4030", "#606C3830"];
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const {
    data: categoriesData,
    isLoading,
    error,
    refetch,
  } = useGetCategoriesQuery();
  useEffect(() => {
    if (categoriesData) {
      dispatch(setCategories(categoriesData));
    }
  }, [categoriesData, isLoading, error]);
  return (
    <WithScrollAnimation>
      <section id="categories" className="categories-area grey-2 pt-20 pb-16 relative">
        <div className="mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1">
            <div className="w-full text-center mb-4">
              <div className="section-title mb-8 font-bold">
                <h4 style={{ color: "#2B527A", letterSpacing: "2px" }}>
                  CATEGORIES
                </h4>
                <h2 style={{ color: "#4B4B4D" }}>
                  Explore <span className="text-[#207EB8]">diverse</span> content
                  categories
                </h2>
              </div>
            </div>
            <div className="w-full mx-auto">
              {error && !isLoading && (
                <ErrorComponent
                  onRetry={() => {
                    refetch();
                  }}
                />
              )}
              {!isLoading ? (
                <div className="category-main-wrapper relative mx-auto">
                  <Box
                    className="px-12"
                    sx={{
                      margin: "auto",
                      width: { xs: "100%", md: "90%", lg: "80%" },
                      position: "relative",
                      background: "rgba(0,0,0, 0.045)",
                      boxShadow: "0 0 100px rgba(0, 0, 0, 0.1)",
                      borderRadius: "50px", // Adjust border-radius for smoother transition
                    }}
                  >
                    <div className="swiper-container p-2 mx-auto ">
                      {/* Render the Swiper component when not loading */}
                      <Swiper
                        modules={[
                          Navigation,
                          Pagination,
                          Scrollbar,
                          A11y,
                          Autoplay,
                        ]}
                        spaceBetween={10}
                        loop={true}
                        breakpoints={{
                          320: { slidesPerView: 1 },
                          480: { slidesPerView: 1 },
                          640: { slidesPerView: 2 },
                          991: { slidesPerView: 3 },
                          1200: { slidesPerView: 3 },
                          1400: { slidesPerView: 4 },
                        }}
                        autoplay={{ delay: 3000 }}
                        navigation={{
                          nextEl: ".category-button-next",
                          prevEl: ".category-button-prev",
                        }}
                      >
                        {categoriesData?.map((item, index) => (
                          <SwiperSlide
                            key={item._id}
                            style={{ borderRadius: "8px", padding: "4px 8px" }}
                          >
                            <Link
                              to="/courses"
                              onClick={() => {
                                dispatch(addCategoryId(item._id));
                              }}
                            >
                              <Box
                                sx={{
                                  py: "2rem",

                                  backgroundColor: "white",
                                  borderRadius: "18px",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    borderRadius: "50%",
                                    width: "40%",
                                    height: "60%",
                                  }}
                                  src={item.imageUrl}
                                />
                                <Box px="0.5rem">
                                  <Typography
                                    textAlign="center"
                                    variant="h3"
                                    sx={{
                                      my: "0.5rem",
                                      // height: "65px",
                                      color: "#4B4B4D",
                                    }}
                                    fontWeight="bold"
                                    gutterBottom
                                  >
                                    {item.name}
                                  </Typography>
                                  <Typography
                                    textAlign="center"
                                    sx={{
                                      fontSize: "1rem",
                                      fontWeight: "bold",
                                      marginBottom: "0.5rem",
                                    }}
                                    color="#828287"
                                  >
                                    {item.courses?.length} Courses
                                  </Typography>
                                </Box>
                              </Box>
                            </Link>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className="category-nav">
                      <div className="category-button-prev bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white">
                        <ChevronLeft />
                      </div>
                      <div className="category-button-next bg-[#c6e0f7] hover:bg-[#207EB8] hover:text-white">
                        <ChevronRight />
                      </div>
                    </div>
                  </Box>
                </div>
              ) : (
                <Box
                  sx={{
                    margin: "auto",
                    overflow: "hidden",
                    width: "80%",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {lgUp ? [1, 2, 3, 4].map(item =>
                    <Skeleton key={item} animation="wave" height="600px" width="500px" />
                  )
                    : <Skeleton animation="wave" height="600px" width="500px" />}
                </Box>
              )
              }
            </div>
          </div>
        </div>
      </section>
    </WithScrollAnimation>
  );
};

export default CategorySlider;
