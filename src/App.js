import { CssBaseline, ThemeProvider } from "@mui/material";
import { onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { fetchDataFromIndexedDB, getPermission, messaging } from "./firebase";
import { useAuth } from "./hooks/hooks";
import Router from "./routes/Router";
import ScrollToTop from "./routes/ScrollToTop";
import {
  useFetchUserDetailsQuery,
  useSetFcmTokenMutation,
} from "./store/api/authApi";
import { useGetCoursesQuery } from "./store/api/courseApi";
import {
  useGetCategoriesQuery,
  useGetInstructorsQuery,
  useGetSubjectsQuery,
} from "./store/api/homeApi";
import { setUser } from "./store/slices/authSlice";
import { setCourses, setTestSeries, setWishlist } from "./store/slices/courseSlice";
import {
  setCategories,
  setInstructors,
  setSubjects,
} from "./store/slices/homeSlice";
import { ThemeSettings } from "./theme/Theme";
import { useGetAllTestSeriesQuery } from "./store/api/lmsApi";

function App() {
  const theme = ThemeSettings();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const { data: categories } = useGetCategoriesQuery();
  const { data: subjects } = useGetSubjectsQuery();
  const { data: instructors } = useGetInstructorsQuery();
  const { data: courses } = useGetCoursesQuery();
  const { data: testSeries } = useGetAllTestSeriesQuery();
  const { user, isAuth } = useAuth();
  const {
    data: userDetails,
    isLoading,
    isError,
    refetch,
  } = useFetchUserDetailsQuery();
  const { data: subjectsData } = useGetSubjectsQuery();
  const [setFcmTokenMutation] = useSetFcmTokenMutation();
  useEffect(() => {
    if (isAuth && !isError) {
      refetch();
    }
    //updating categories on reload
    if (categories) {
      dispatch(setCategories(categories));
    }

    //updating subjects
    if (subjects) {
      dispatch(setSubjects(subjects));
    }
    //updating instructors
    if (instructors) {
      dispatch(setInstructors(instructors));
    }

    if(testSeries){
      dispatch(setTestSeries(testSeries));
    }

    //updating wishlist based on auth status
    if (user) {
      dispatch(setWishlist(user.wishlist));
    } else {
      dispatch(setWishlist());
    }

    if (userDetails && isAuth) {
      dispatch(setUser(userDetails));
    }

    //updating courses on reload
    if (courses) {
      dispatch(setCourses(courses));
    }
  }, [
    categories,
    courses,
    user,
    userDetails,
    isLoading,
    isError,
    subjects,
    instructors,
    testSeries,
  ]);
  useEffect(() => {
    const getNotificationPermission = async () => {
      const token = await getPermission();
      if (token) {
        const result = await setFcmTokenMutation(token);
        if (result.data) {
          dispatch(setUser(result.data?.student));
        }
      }
    };
    if (isAuth && !user?.fcmToken) {
      console.log("getting permission");
      getNotificationPermission();
    }
  }, [isAuth, user]);
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      const data = {
        title: payload.notification.title,
        body: payload.notification.body,
      };
      const newNotifications = [...notifications, data];
      setNotifications(newNotifications);
    });
  }, []);
  //console.log(notifications);
  useEffect(() => {
    // Function to fetch data from IndexedDB
    const fetchDataFromIndexedDBHandler = async () => {
      const notifications = await fetchDataFromIndexedDB();
      setNotifications(notifications);
    };
    const notification = {
      title: "Firebase Notification of Taksh",
      body: "Taksh is sending this message from server ff",
    };
    fetchDataFromIndexedDBHandler();
  }, []);
  const routing = useRoutes(Router);
  return (
    <ThemeProvider theme={theme}>
      <div className="font-global">
        <CssBaseline />
        <ScrollToTop />
        {routing}
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
