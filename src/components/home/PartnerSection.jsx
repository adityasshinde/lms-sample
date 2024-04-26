import React from 'react';
import pertnerImage from '../../assets/img/bg/partner.png';
import pertnerImageTwo from '../../assets/img/brand/partner-01.png';
import pertnerImageThere from '../../assets/img/brand/partner-02.png';
import pertnerImageFour from '../../assets/img/brand/partner-03.png';
import pertnerImageFive from '../../assets/img/brand/partner-04.png';
import pertnerImageSix from '../../assets/img/brand/partner-05.png';
import pertnerImageSeven from '../../assets/img/brand/partner-06.png';
import pertnerImageEight from '../../assets/img/brand/partner-07.png';
import pertnerImageNine from '../../assets/img/brand/partner-08.png';
import pertnerImageTen from '../../assets/img/brand/partner-09.png';
import pertnerImageEleven from '../../assets/img/brand/partner-10.png';
import '../../assets/scss/component/_partner.scss';


const PartnerSection = () => {
    return (
        <div className="patner-area pt-20 pb-12 flex justify-center">
            <div className="container w-full max-auto">
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-5/12 p-4">
                        <div className="partner-box mb-12">
                            <div className="partner-thumb hidden sm:block">
                                <img src={pertnerImage} style={{width:'auto', height:'auto'}} alt="partner-png"/>
                            </div>
                            <div className="section-title mb-12 font-bold">
                                <h2>Our
                                    <span className="down-mark-line-2"> Global </span>Honorable Partners
                                </h2>
                            </div>
                            <div className="Partner-content">
                                <p>Global partners has been Publish the course you want, in the way you want always have
                                    of control.</p>
                                <div className="partner-text">
                                    <p> <span>9,500</span>+businesses and students
                                        around the world</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-2/3 xl:w-7/12">
                        <div className="partner-wrapper">
                            <div className="singel-partner">
                            <img src={pertnerImageTwo} style={{width:'100%', height:'auto'}} alt="img not found"/>
                            </div>
                            <div className="singel-partner">
                            <img src={pertnerImageThere} style={{width:'100%', height:'auto'}} alt="img not found"/>
                            </div>
                            <div className="singel-partner">
                            <img src={pertnerImageFour} style={{width:'100%', height:'auto'}} alt="img not found"/>
                            </div>
                            <div className="singel-partner">
                            <img src={pertnerImageFive} style={{width:'100%', height:'auto'}} alt="img not found"/>
                            </div>
                            <div className="singel-partner">
                            <img src={pertnerImageSix} style={{width:'100%', height:'auto'}} alt="img not found"/>
                            </div>
                            <div className="singel-partner">
                            <img src={pertnerImageSeven} style={{width:'100%', height:'auto'}} alt="img not found"/>
                            </div>
                            <div className="singel-partner">
                            <img src={pertnerImageEight} style={{width:'100%', height:'auto'}} alt="img not found"/>
                            </div>
                            <div className="singel-partner">
                            <img src={pertnerImageNine} style={{width:'100%', height:'auto'}} alt="img not found"/>
                            </div>
                            <div className="singel-partner">
                            <img src={pertnerImageTen} style={{width:'100%', height:'auto'}} alt="img not found"/>
                            </div>
                            <div className="singel-partner">
                            <img src={pertnerImageEleven} style={{width:'100%', height:'auto'}} alt="img not found"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerSection;