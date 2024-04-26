import { Link } from 'react-router-dom';
import React from 'react';
import courseMetaImg from '../../assets/img/course/course-meta.png';


const CourseDetailsMeta =({course}) => {
    return (
        <div className="course-detelis-meta">
        <div className="course-Enroll border-line-meta">
            <p>Total Enrolled</p>
            <span>5,420</span>
        </div>
        <div className="course-update border-line-meta">
            <p>Last Update</p>
            <span>01 January 2022 </span>
        </div>
        <div className="course-category">
            <p>01 January 2022 </p>
            <span><Link href="/course">Data Science</Link></span>
        </div>
    </div>
    );
};

export default CourseDetailsMeta;