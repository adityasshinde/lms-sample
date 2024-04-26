import { useContext, useEffect, useState } from "react";

const useScrollDirection = (element) => {
  const [scrollDirection,setScrollDirection]=useState();
  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > prevScrollY) {
        setScrollDirection?.("down");
      } else {
        setScrollDirection?.("up");
      }
      prevScrollY = scrollTop;
    };

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);
    if (element) {
      element.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [element,setScrollDirection]);

  return scrollDirection;
};

export default useScrollDirection;
