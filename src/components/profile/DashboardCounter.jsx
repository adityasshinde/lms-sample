import CounterIconOne from "../../svg/counter-icon-one";
import CounterIconTwo from "../../svg/counter-icon-two";
import CounterIconThere from "../../svg/counter-icon-there";
import React from 'react';
import CountUpContent from '../home/CountUpContent';
import { useAuth, useCourse } from '../../hooks/hooks';

const DashboardCounter = () => {
    const {user}=useAuth();
  const {allCourses}=useCourse();
  const EnrolledCourses=allCourses?.filter((item)=>user?.coursesPurchased?.includes(item?._id));
  const ActiveCourses=EnrolledCourses?.filter((item)=>item?.isActive);
  const CompletedCourse=[]
    const counter_data=[
        {
            id:13,
            icon:CounterIconOne,
            countNum:EnrolledCourses?.length,
            description:"Online Courses"
        },
        {
            id:14,
            icon:CounterIconTwo,
            countNum:ActiveCourses?.length,
            description:"Active Courses"
        },
        {
            id:15,
            icon:CounterIconThere,
            countNum:CompletedCourse?.length,
            description:"Completed Courses"
        },
    ]
    return (
        <div className="grid grid-cols-1 md:flex">
            {
                counter_data.map((item) => (
                    <div key={item.id} className="xl:w-1/3 lg:w-1/2 md:w-1/3 mx-2">
                        <div className="counter-wrapper text-center mb-8">
                            <div className="counter-icon flex flex-col justify-center items-center">
                                <div className="counter-icon-wrap">
                                    {item.icon && <item.icon />}
                                </div>
                                <div className="count-number">
                                    <span className="counters"><CountUpContent number={item.countNum}></CountUpContent></span>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default DashboardCounter;