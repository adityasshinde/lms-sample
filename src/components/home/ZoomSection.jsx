import React from 'react';
import { Link } from 'react-router-dom';
import ZoomShapeImg from '../../assets/img/teacher/zoom-shape-1.png';
import ZoomShapeImgTwo from '../../assets/img/teacher/zoom-shape-2.png';
import ZoomShapeImgThere from '../../assets/img/teacher/Zoom.png';

const ZoomSection = () => {
    return (
        <section className="zoom-area w-full pt-20 pb-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center">
                    <div className="w-full lg:w-1/2 xl:w-4/12 2xl:w-5/12 py-4 pr-8">
                        <div className="zoom-class-wrapper mb-16">
                            <div className="section-title mb-8 font-bold">
                                <h2>Live Class From
                                    Anywhere Via <span className="down-mark-line-2"><Link href="#">Zoom</Link></span></h2>
                            </div>
                            <div className="zoon-class-text">
                                <p>Helping employees gain skills and providing career development often take a back seat
                                    to business priorities but workplace.</p>
                            </div>
                            <Link to="/zoom-class" className="edu-btn btn-transparent mt-12">Try free now</Link>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 xl:w-4/12 2xl:w-5/12 py-4 pl-8">
                        <div className="zoom-thumb position-relative">
                        {/* <img className="zoom-shape-01" src={ZoomShapeImg} style={{width:'auto', height:'auto'}} alt="img not found"/> */}
                        <img className="zoom-shape-02" src={ZoomShapeImgTwo} style={{width:'auto', height:'auto'}} alt="img not found"/>
                        <img className="zoom-thumb-main-img" src={ZoomShapeImgThere} style={{width:'auto', height:'auto'}} alt="img not found"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ZoomSection;