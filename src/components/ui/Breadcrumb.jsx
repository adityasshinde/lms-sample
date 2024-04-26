// components/Breadcrumb.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../../assets/course-slider.jpg';

const Breadcrumb = ({ title, subTitle }) => {
  return (
    <>
        <div className="bg-cover bg-center h-96" style={{ backgroundImage: `url(${bgImage})`, opacity: '0.9' }}>
        <div className="container mx-auto p-4">
          <div className="text-white">
            <h2 className="text-4xl font-bold">{title}</h2>
            <div className="mt-2">
              <nav className="text-sm">
                <ol className="flex items-center space-x-2">
                  <li><Link to="/" className="text-white">Home &gt; </Link></li>
                  <li><span className="text-white">{subTitle}</span></li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
