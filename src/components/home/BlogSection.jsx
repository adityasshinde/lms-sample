import React from "react";
import { Link } from "react-router-dom";
import blogs_data from "./blog-data";

const BlogSection = () => {
  return (
    <div className="blog-area pt-24 pb-16">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full text-center">
            <div className="section-title mb-16 font-bold">
              <h2>
                Read Our <span className="down-mark-line-2">Latest</span> Tech
                News
              </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          {blogs_data.slice(0, 3).map((item) => (
            <div key={item.id} className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 p-4">
              <div className="blog-wrapper relative mb-12">
                <div className="blog-thumb">
                  <Link to={`/blog-details/${item.id}`}>
                    {item.img && <img src={item.img} style={{ width: "100%", height: "auto" }} alt="blog-img"/>}
                  </Link>
                </div>
                <Link to="/blog" className="blog-tag">
                  <i className="fal fa-folder-open"></i>
                  {item.blogTag}
                </Link>
                <div className="blog-content-wrapper">
                  <div className="blog-meta">
                    <div className="blog-date">
                      <i className="flaticon-calendar"></i>
                      <span>{item.date}</span>
                    </div>
                    <div className="blog-user">
                      <i className="flaticon-avatar"></i>
                      <span>{item.user}</span>
                    </div>
                  </div>
                  <div className="blog-content">
                    <Link to={`/blog-details/${item.id}`}>
                      <h3 className="font-bold">{item.title}</h3>
                    </Link>
                    <Link to={`/blog-details/${item.id}`} className="blog-btn">
                      {item.btn}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
