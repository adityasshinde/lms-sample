import React from 'react';
import { Link } from 'react-router-dom';
import TeacherImage from '../../assets/img/teacher/teacher.png';
import ShapeImage from '../../assets/img/teacher/teacher-shape-01.png';
import ShapeImageTwo from '../../assets/img/teacher/teacher-shape-02.png';
import ShapeImageThere from '../../assets/img/teacher/teacher-shape-03.png';
import ShapeImageFour from '../../assets/img/teacher/teacher-shape-03.png';


const TeacherSection = () => {
    return (
        <section className="teacher-area relative fix">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center">
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-4/12 2xl:w-5/12 py-4 pr-8">
                        <div className="teacher-img relative">
                        <img className="teacher-main-img" src={TeacherImage} style={{width:'auto', height:'auto'}} alt="img not found"/>
                        <img className="teacher-shape" src={ShapeImage} style={{width:'auto', height:'auto'}} alt="img not found"/>
                        <img className="teacher-shape-02" src={ShapeImageTwo} style={{width:'auto', height:'auto'}} alt="img not found"/>
                        <img className="teacher-shape-03" src={ShapeImageThere} style={{width:'auto', height:'auto'}} alt="img not found"/>
                        <img className="teacher-shape-04" src={ShapeImageFour} style={{width:'auto', height:'auto'}} alt="img not found"/>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 xl:w-4/12 2xl:w-5/12 py-4 pl-8">
                        <div className="teacher-content mr-4">
                            <div className="section-title mb-8 font-bold">
                                <h2>Become an Instructor
                                    And <span className="down-mark-line-2">Teach</span> Online</h2>
                            </div>
                            <p>Helping employees gain skills and providing career development often take a back seat to
                                business priorities but workplace.</p>
                            <Link to="/instructor" className="edu-btn btn-transparent mt-12">Join us now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeacherSection;