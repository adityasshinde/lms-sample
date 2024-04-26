import PaymentConfirmationPage from "../components/checkout/PaymentConfirmationPage";
import SubmitTest from "../components/test/SubmitTest";
import MainLayout from "../layouts/MainLayout";
import AboutusPage from "../pages/AboutusPage";
import Checkout from "../pages/Checkout";
import CloudMessaging from "../pages/CloudMessaging";
import CourseDetails from "../pages/CourseDetails";
import CoursesPage from "../pages/CoursesPage";
import FunnelPage from "../pages/FunnelPage";
import FunnelPage2 from "../pages/FunnelPage2";
import HomePage from "../pages/HomePage";
import LmsBookmarksPage from "../pages/LmsBookmarksPage";
import LmsCoursePage from "../pages/LmsCoursePage";
import LmsDashboard from "../pages/LmsDashboard";
import LmsHome from "../pages/LmsHome";
import LmsLibrary from "../pages/LmsLibrary";
import LmsMyCoursesPage from "../pages/LmsMyCoursesPage";
import LmsSubjectPage from "../pages/LmsSubjectPage";
import LmsTest from "../pages/LmsTest";
import LmsTestl from "../pages/LmsTest";
import LmsTestReview from "../pages/LmsTestReview";
import LmsTestSeries from "../pages/LmsTestSeries";
import LmsTestSeriesListPage from "../pages/LmsTestSeriesListPage";
import MyTimeTable from "../pages/MyTimeTable";
import PaymentStatus from "../pages/PaymentStatus";
import StudentProfile from "../pages/StudentProfile";
import StudyMaterialPage from "../pages/StudyMaterialPage";
import Test from "../pages/Test";
import LMSProtectedRoutes from "./LMSProtectedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const Router = [
  {
    path: "bsc-colleges",
    element: <FunnelPage />,
  },
  {
    path: "maths-important-questions",
    element: <FunnelPage2 />,
  },
  {
    path: "/test",
    element: <CloudMessaging />,
  },

  {
    path: "/test/:id/submit",
    element: <SubmitTest />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "courses/:courseId",
        element: <CourseDetails />,
      },
      {
        path: "about-us",
        element: <AboutusPage />,
      },
      {
        path: "study",
        element: <StudyMaterialPage />,
      },
    ],
  },
  {
    path: "/student",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "profile",
        element: <StudentProfile />,
      },
      {
        path: "my_timetable",
        element: <MyTimeTable />,
      },
      {
        path: "checkout/:courseId",
        element: <Checkout />,
      },
      {
        path: "checkout/verify",
        element: <PaymentConfirmationPage />,
      },
      {
        path: "order_status",
        element: <PaymentStatus />,
      },
    ],
  },
  {
    path: "/test/:testId",
    element: <Test />,
  },
  {
    path: "/lms",
    element: <LMSProtectedRoutes />,
    children: [
      {
        index: true,
        element: <LmsHome />,
      },
      {
        path: "dashboard",
        element: <LmsDashboard />,
      },
      {
        path: "explore",
        children: [
          {
            index: true,
            element: <CoursesPage />,
          },
          {
            path: ":courseId",
            element: <CourseDetails />,
          },
        ],
      },
      {
        path: "checkout/:productId",
        children: [
          {
            index: true,
            element: <Checkout />,
          },
          {
            path: "verify",
            element: <PaymentConfirmationPage />,
          },
        ],
      },
      {
        path: "my_courses",
        children: [
          {
            index: true,
            element: <LmsMyCoursesPage />,
          },
          {
            path: ":courseId",
            children: [
              {
                index: true,
                element: <LmsCoursePage />,
              },
              {
                path: ":subjectId",
                element: <LmsSubjectPage />,
              },
            ],
          },
        ],
      },
      {
        path: "my_test_series",
        children: [
          {
            index: true,
            element: <LmsTestSeriesListPage />,
          },
          {
            path: ":testSeriesId",
            children: [
              {
                index: true,
                element: <LmsTestSeries />,
              },
              {
                path: ":testId",
                element: <LmsTestReview />,
              },
            ],
          },
        ],
      },
      // {
      //   path: "timetable",
      //   element: <MyTimeTable />,
      // },
      // {
      //   path: "library",
      //   element: <LmsLibrary />,
      // },
      {
        path: "wishlist",
        element: <LmsBookmarksPage />,
      },
    ],
  },
];

export default Router;
