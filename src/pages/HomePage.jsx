import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AboutSection from "../components/home/AboutSection";
import CalendarFeature from "../components/home/CalendarFeature";
import CategorySlider from "../components/home/CategorySlider";
import Contact from "../components/home/Contact";
import CounterSection from "../components/home/CounterSection";
import CourseTab from "../components/home/CourseTab";
import DownloadComponent from "../components/home/DownloadComponent";
import Educators from "../components/home/Educators";
import HeroSection from "../components/home/HeroSection";
import { useGetCoursesQuery } from "../store/api/courseApi";
import { flushFilters, setCourses } from "../store/slices/courseSlice";

const HomePage = () => {
  //We have course tab in home itself
  const { data, error, isLoading, refetch } = useGetCoursesQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(flushFilters());
    if (data) {
      dispatch(setCourses(data));
    }
  }, [data, isLoading, error]);
  return (
    <div className="mx-4 md:mx-8 lg:mx-20">
      <HeroSection />
      <CounterSection />
      <CourseTab />
      <AboutSection />
      <CategorySlider />
      <CalendarFeature />
      <DownloadComponent />
      <Educators />
      <Contact />
      {/* <PartnerSection/>
      <FeatureSection/>
      <TeacherSection/>
      <ZoomSection/>
      <SkillSection/>
      <BlogSection/> */}
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
