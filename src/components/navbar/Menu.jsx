import menu_data from "./navbar-data";
import { Link } from "react-router-dom";
import React from "react";
import '../../assets/scss/component/_header.scss';
import '../../assets/scss/component/_shop.scss';
import '../../assets/css/fontAwesome5Pro.css';

const Menu = () => {

  return (
    <>
      {menu_data?.length &&
        menu_data?.map((item) => (
          <li key={item.id} className="menu-item-has-children">
            <Link to={item.link}> {item.title} </Link>
            {item.hasDropdown === true && (
              <ul className="sub-menu">
                {item?.submenus?.length &&
                  item?.submenus.map((data, index) => (
                    <li key={index}>
                      <Link to={data.link}> {data.title} </Link>
                    </li>
                  ))}
              </ul>
            )}

            {item.megaMenu === true && (
              <ul className="sub-menu">
                {item.mega_menus?.length &&
                  item.mega_menus.map((data, index) => (
                    <li key={index} className={data.hasDropdown === true ? "menu-item-has-children" : ""}>
                      <Link to={data.link}>{data.title}</Link>
                      {data.hasDropdown === true &&
                        <ul className="sub-menu">
                          {data?.submenus.length &&
                            data.submenus.map((obj, indx) => (
                              <li key={indx}>
                                <Link to={obj.link}> {obj.title} </Link>
                              </li>
                            ))
                          }
                        </ul>
                      }
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
    </>
  );
};

export default Menu;
