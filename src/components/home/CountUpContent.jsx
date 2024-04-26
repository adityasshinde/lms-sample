import { useState } from "react";
import CountUp from "react-countup";
import { InView } from "react-intersection-observer";
import '../../assets/scss/component/_counter.scss';



const CountUpContent= ({
  number,
  text,
  add_style = true,
}) => {
  const [focus, setFocus] = useState(false);

  const visibleChangeHandler = (isVisible) => {
    if (isVisible && !focus) {
      setFocus(true);
    }
  };

  return (
    <CountUp start={focus ? 0 : number} end={number} duration={5}>
      {({ countUpRef }) => (
        <div
          className="bd-promotion-counter-number flex items-center justify-center"
        >
          <span className="counter" ref={countUpRef} />
          <InView as="span" onChange={visibleChangeHandler}>
            {text && <span className="counter-text">{text}</span>}
          </InView>
        </div>
      )}
    </CountUp>
  );
};

export default CountUpContent;
