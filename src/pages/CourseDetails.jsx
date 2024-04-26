import { useParams } from "react-router-dom";
import CourseHeader from "../components/course-details/CourseHeader";
import CourseInfo from "../components/course-details/CourseInfo";
import Instructors from "../components/course-details/Instructors";
import Syllabus from "../components/course-details/Syllabus";
import TimeTable from "../components/course-details/TimeTable";
import { useState } from "react";
import { useGetCourseByIdQuery, useGetEventsByCourseIdQuery, useGetLecturesByCourseIdQuery } from "../store/api/courseApi";
import ErrorComponent from "../components/ui/ErrorComponent";
import Loader from "../components/ui/Loader";


const CourseDetails = () => {
    const param = useParams();
    const courseId = param?.courseId;
    const { data: course, isLoading, isError, refetch } = useGetCourseByIdQuery(courseId);
    const { data: events, isLoading: eventsLoading } = useGetEventsByCourseIdQuery(courseId);
    const { data: lectures, isLoading: lecturesLoading } = useGetLecturesByCourseIdQuery(
        courseId
    );
    const [currentTab, setCurrentTab] = useState("overview");
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            setCurrentTab(id);
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <section>
            {(isError && !isLoading) ? <ErrorComponent onRetry={() => { refetch() }} />
                : <>
                    {isLoading ? <div className="min-h-[70vh] flex items-center justify-center"><Loader /></div>
                        :
                        <div>
                            <CourseHeader course={course} lectures={lectures} />
                            <CourseInfo course={course} scrollTo={scrollToSection} currentTab={currentTab} lectures={lectures} events={events} />
                            <Instructors courseInstructors={course?.instructors} />
                            <Syllabus course={course} lectures={lectures} isLoading={lecturesLoading} />
                            <TimeTable course={course} events={events} isLoading={eventsLoading} />
                        </div>

                    }
                </>
            }

        </section>
    );
};

export default CourseDetails;
