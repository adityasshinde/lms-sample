import React, { useState } from "react";
import '../../assets/scss/component/_course.scss';
import '../../assets/scss/component/_common.scss';
import '../../assets/css/fontAwesome5Pro.css';
import { useCourse, useHome } from "../../hooks/hooks";
import {addCategoryId,removeCategoryId} from '../../store/slices/courseSlice';
import { useDispatch } from "react-redux";



const CourseSidebarArea = () => {
    const {categoryIds}=useCourse();
    const dispatch=useDispatch();
  const {categories}=useHome();
    const handleFilter=(cat)=>{
         if(categoryIds?.includes(cat)){
            dispatch(removeCategoryId(cat));
         }else{
            dispatch(addCategoryId(cat));
         }
    }
    const [filterStates, setFilterStates] = useState({
        Categories: true,
        Ratings: true,
        Price: true,
        Level: true,
        Language: true,
        Duration: true,
    });

    const handleToggle = (stateName) => {
        setFilterStates((prevState) => ({
            ...prevState,
            [stateName]: !prevState[stateName],
        }));
    };



    return (
        <div>
            <div className="course-sidebar-widget mb-6">
                <div className={`course-sidebar-info ${filterStates.Categories ? "danger" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => handleToggle("Categories")}>Categories</h3>
                    <ul>
                       {categories?.map((category)=>(
                         <li key={category._id}>
                         <div className="course-sidebar-list">
                             <input className="" type="checkbox" onChange={()=>handleFilter(category._id)} id={category._id} checked={categoryIds?.includes(category._id)} />
                             <label className="" htmlFor={category._id}>{category.name}</label>
                         </div>
                     </li>
                       ))}
                        {/* <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" onChange={()=>handleFilter("6596f15ca5f9d9e07a75ea34")} type="checkbox" id="e-dev" checked={categoryIds.includes("6596f15ca5f9d9e07a75ea34")}/>
                                <label className="edu-check-label" htmlFor="e-dev">Business</label>
                            </div>
                        </li> */}
                        {/* <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" onChange={()=>handleFilter("658d6a4df0be2a65ff116715")} type="checkbox" id="e-data" checked={categoryIds.includes("658d6a4df0be2a65ff116715")} />
                                <label className="edu-check-label" htmlFor="e-data">NEET</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" onChange={()=>handleFilter("658d6a55f0be2a65ff116717")} type="checkbox" id="e-art" checked={categoryIds.includes("658d6a55f0be2a65ff116717")} />
                                <label className="edu-check-label" htmlFor="e-art">GATE</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" onChange={()=>handleFilter("658d6a7ef0be2a65ff116719")} type="checkbox" id="e-fin" checked={categoryIds.includes("658d6a7ef0be2a65ff116719")} />
                                <label className="edu-check-label" htmlFor="e-fin">CUET</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" onChange={()=>handleFilter("658d7466f92007ec3815da95")} type="checkbox" id="e-mark" checked={categoryIds.includes("658d7466f92007ec3815da95")}/>
                                <label className="edu-check-label" htmlFor="e-mark">CAT</label>
                            </div>
                        </li>                       */}
                    </ul>
                </div>
            </div>
            {/* <div className="course-sidebar-widget mb-6">
                <div className={`course-sidebar-info ${filterStates.Ratings ? "danger" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => handleToggle("Ratings")}>Ratings</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-25" name="rating" />
                                <label className="edu-check-star" htmlFor="e-25">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    (25)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-24" name="rating" />
                                <label className="edu-check-star" htmlFor="e-24">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    (25)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-12" name="rating" />
                                <label className="edu-check-star" htmlFor="e-12">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    (12)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-28" name="rating" />
                                <label className="edu-check-star" htmlFor="e-28">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    (28)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-14" name="rating" />
                                <label className="edu-check-star" htmlFor="e-14">
                                    <i className="fas fa-star">
                                    </i> <i className="fal fa-star">
                                    </i> <i className="fal fa-star">
                                    </i><i className="fal fa-star">
                                    </i><i className="fal fa-star"></i>
                                    (14)</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div> */}
            <div className="course-sidebar-widget mb-6">
                <div className={`course-sidebar-info ${filterStates.Price ? "danger" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => handleToggle("Price")}>Price</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-85" name="price" defaultChecked={true}/>
                                <label className="edu-check-label" htmlFor="e-85">All</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-all" name="price" />
                                <label className="edu-check-label" htmlFor="e-all">Free</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="f-all" name="price" />
                                <label className="edu-check-label" htmlFor="f-all">Paid</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="course-sidebar-widget mb-6">
                <div className={`course-sidebar-info ${filterStates.Level ? "danger" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => handleToggle("Level")}>Level</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-lave" />
                                <label className="edu-check-label" htmlFor="e-lave">All levels</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-beg" />
                                <label className="edu-check-label" htmlFor="e-beg">Beginner</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-inter" />
                                <label className="edu-check-label" htmlFor="e-inter">Intermediate</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-exp" />
                                <label className="edu-check-label" htmlFor="e-exp">Expert</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="course-sidebar-widget mb-6">
                <div className={`course-sidebar-info ${filterStates.Language ? "danger" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => handleToggle("Language")}>Language</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-eng" />
                                <label className="edu-check-label" htmlFor="e-eng">English</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-hin" />
                                <label className="edu-check-label" htmlFor="e-hin">Hindi</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="course-sidebar-widget mb-6">
                <div className={`course-sidebar-info ${filterStates.Duration ? "danger" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => handleToggle("Duration")}>Duration</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-less" />
                                <label className="edu-check-label" htmlFor="e-less">Less than 1 Hours</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-36" />
                                <label className="edu-check-label" htmlFor="e-36">1-2 Hours</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="m-25" />
                                <label className="edu-check-label" htmlFor="m-25">2-5 Hours</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="m-32" />
                                <label className="edu-check-label" htmlFor="m-32">6-7 Hours</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="m-11" />
                                <label className="edu-check-label" htmlFor="m-11">7-10 Hours</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CourseSidebarArea;
