import React, { useRef, useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';


// Define the fade-in animation
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Apply the fade-in animation using the css helper function
const fadeInAnimationCss = css`
  animation: ${fadeInAnimation} 0.5s ease-in-out forwards;
`;
const StyledSection = styled.section`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  ${({ isVisible }) => (isVisible ? fadeInAnimationCss : '')};
`;

const WithScrollAnimation = (props) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(sectionRef.current);

      // Cleanup function
      return () => {
        observer.disconnect();
      };
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        if (!sectionRef.current || !isVisible) return;
        const sectionRect = sectionRef.current.getBoundingClientRect();
        if (
          sectionRect.bottom < 0 ||
          sectionRect.top > window.innerHeight
        ) {
          setIsVisible(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [isVisible]);

    return (
      <StyledSection ref={sectionRef} isVisible={isVisible}>
       {props.children} 
       </StyledSection>
    );;
};

export default WithScrollAnimation;
