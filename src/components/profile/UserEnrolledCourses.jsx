import courses_data from '../courses/course-data';
import { Link } from 'react-router-dom';
import React from 'react';

const UserEnrolledCourses = () => {
    const getRating = (ratingsNum) => {
        let empty_rating_count = 5 - ratingsNum;
        let ratings = [];
        for (let i = 0; i < ratingsNum; i++) {
            ratings.push(<i className="fas fa-star" key={`l-${i}`}></i>);
        }
        for (let i = 0; i < empty_rating_count; i++) {
            ratings.push(<i className="fal fa-star" key={`p-${i}`}></i>);
        }
        return ratings;
    };
    return (
        <>
            {
                courses_data.slice(0, 5).map((item) => (
                    <div key={item.id} className="xl:w-1/3 lg:w-1/2 md:w-1/2">
                        <div className="course-wrapper-2 mb-12">
                            <div className="student-course-img">
                                <img src={item.img} style={{ width: '100%', height: 'auto' }} alt="course-img" />
                            </div>
                            <div className="course-cart">
                                <div className="course-info-wrapper">
                                    <div className="cart-info-body">
                                        <Link to="/course" className="category-color category-color-1">Development</Link>
                                        <Link to="/course-details"><h3>{item.title}</h3></Link>
                                        <div className="cart-lavel">
                                            <h5>Level : <span>{item.level}</span></h5>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className="info-cart-text">
                                            <ul>
                                                {item.checkIcons.map((item) => (
                                                    <li key={item.id}>
                                                        <i className={item.icon}></i>
                                                        {item.checkInfo}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="course-action">
                                            <Link to="/course-details" className="view-details-btn">View Details</Link>
                                            <button className="wishlist-btn"><i className="flaticon-like"></i></button>
                                            <Link to="/course-details" className="c-share-btn"><i className="flaticon-previous"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="student-course-footer">
                                <div className="student-course-linkter">
                                    <div className="course-lessons">
                                        <i className="fal fa-tv"></i>
                                        <span className="ms-2">{item.lessons}</span>
                                    </div>
                                    <div className="portfolio-price">
                                        <span>
                                            {item.price === 0 ? "FREE" : `$${item.price}`}
                                        </span>
                                        <del>{item.oldPrice === 0 ? " " : `$${item.oldPrice}`}</del>
                                    </div>
                                </div>
                                <div className="student-course-text">
                                    <h3><Link to="/course-details">{item.title}</Link></h3>
                                </div>
                                <div className="portfolio-user">
                                    <div className="user-icon">
                                        <Link to="/instructor-profile"><i className="fas fa-user"></i>{item.authorName}</Link>
                                    </div>
                                    <div className="course-icon">
                                        {getRating(item?.ratings)}
                                        <span>({item.ratingCount})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

        </>
    );
};

export default UserEnrolledCourses;