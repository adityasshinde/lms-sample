import React from "react";

const FeatureSection = () => {
  return (
    <div
      className="features-area pt-12 mb-20"
      style={{ background: "url(assets/fact.png)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 p-4">
            <div className="features-wrapper flex items-center mb-30">
              <div className="features-icon">
                <i className="flaticon-online-course"></i>
              </div>
              <div className="features-content">
                <h3>Learn with skills over 2,420 courses</h3>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 p-4">
            <div className="features-wrapper flex items-center mb-30">
              <div className="features-icon">
                <i className="flaticon-certificate"></i>
              </div>
              <div className="features-content">
                <h3>Earn certificates and degrees</h3>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 p-4">
            <div className="features-wrapper flex items-center mb-30">
              <div className="features-icon">
                <i className="flaticon-laptop"></i>
              </div>
              <div className="features-content">
                <h3>Learn from anywhere, any time</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
