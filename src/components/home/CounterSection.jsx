import React from "react";
import "../../assets/scss/component/_counter.scss";
import CountUpContent from "./CountUpContent";
import counter_data from "./counter-data";
import styled, { keyframes } from 'styled-components';
import { bounceIn } from "react-animations";

const CounterSection = () => {
  const bounceAnimation = keyframes`${bounceIn}`;
 
const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;
  return (
    <div className="counter-area my-12 pt-12 px-12">
      <div className="mx-auto">
        <div className="flex flex-wrap">
          {counter_data &&
            counter_data.slice(0, 4).map((item,index) => (
              <BouncyDiv key={item.id} className="px-4 w-full md:w-1/2 lg:w-1/2 xl:w-1/4">
                <div className="counter-wrapper text-center mb-16">
                  <div className="counter-icon flex flex-col justify-center items-center">
                    <img src={item.icon} className="h-24 w-24 mb-[1.5rem]" />

                    <div className="count-number">
                      <span className="counters">
                        <CountUpContent
                          number={item.countNum}
                          text={item.countPlus}
                        ></CountUpContent>
                      </span>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              </BouncyDiv>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
