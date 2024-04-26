import React, { useEffect } from 'react';

const Overlay = (props) => {
  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = 'visible';
  };

  useEffect(() => {
    // Disable scrolling when the component mounts
    disableScroll();

    // Enable scrolling when the component is unmounted
    return () => enableScroll();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div id="overlay" className="fixed p-8 inset-0 z-[1010] flex flex-col items-center justify-center bg-gray-900 bg-opacity-70 bg-blend-darken-900"> 
      {props.children}
    </div>
  );
};

export default Overlay;
