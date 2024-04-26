import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/fontAwesome5Pro.css';
import '../../assets/scss/component/_header.scss';
import '../../assets/scss/component/_shop.scss';

// import MenuTwo from './MenuTwo';
import LogoBlack from '../../asset/images/Logo.png';
// import Image from 'next/image';


const MobileMenu = (props) => {


  return (
    <div className="fix">
      <div className="side-info info-open">
        <div className="flex items-center mb-12">
          <div className="w-3/4">
            <Link href="/"><img src={LogoBlack} style={{ width: "150px", height: "50px" }} alt="Logo" /></Link>
          </div>
          <div className="w-1/4 text-end"><button className="side-info-close"onClick={props.toggleSideMenu} ><i className="fal fa-times"></i></button>
          </div>
        </div>
        <div className="side-info-content">
          <div className="mm-menu mb-12 lg:hidden">
            <ul>
              {/* <MenuTwo />/ */}
            </ul>
          </div>
          <div className="offset-widget offset_searchbar mb-12">
            <div className="menu-search relative ">
              <form action="#" className="filter-search-input">
                <input type="text" placeholder="Search keyword" />
                <button><i className="fal fa-search"></i></button>
              </form>
            </div>
          </div>
          <div className="offset-widget offset_menu-top mb-8">
            <div className="header-menu-top-icon mb-8">
              <Link href="tel:(555)674890556"><i className="fas fa-phone-alt"></i>(555) 674 890 556</Link>
              <Link href="mailto:info@example.com"><i className="fal fa-envelope"></i>info@example.com</Link>
              <i className="fal fa-map-marker-alt"></i><span>3rd Avenue, San Francisco</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu;