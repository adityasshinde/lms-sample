import React from 'react';
import { Link } from 'react-router-dom';
import skillLaptopImg from '../../assets/img/bg/skill-laptop.png';

const SkillSection = () => {
    return (
        <div className="skill-area">
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <div className="skill-background-img skill-wrapper" style={{background:"url(assets/skill.jpg)"}}>
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-full lg:w-1/2 xl:w-1/2">
                                    <div className="skill-content">
                                        <span>Keep Your Skills</span>
                                        <h3>Transform Your life <br/>
                                            Through Exclusive Education</h3>
                                        <Link href="/course" className="edu-four-btn">Browse all courses</Link>
                                    </div>
                                </div>
                                <div className="w-full md:w-full lg:w-1/2 xl:w-1/2">
                                    <div className="skill-thumb relative">
                                    <img src={skillLaptopImg} style={{width:'auto', height:'auto'}} alt="img not found"/>
                                        <div className="course-price-start">
                                            Only <span className="course-price">$5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillSection;