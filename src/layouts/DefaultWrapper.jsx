import React, { useEffect } from "react";
import { animationCreate } from "@/utils/utils";
import Footer from "./footer/Footer";
import HeaderOne from "./header/HeaderOne";
import BacktoTop from "@/components/common/backToTop/BacktoTop";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
import { usePathname } from "next/navigation";
import HeaderTwo from "./header/HeaderTwo";
import HeaderThree from "./header/HeaderThere";
import FooterTwo from "./footer/footerTwo";
import HeaderFour from "./header/HeaderFour";

const Wrapper = ({ children }) => {
  const pathName = usePathname();
  useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 2500);
  }, []);

  return (
    <>
      <BacktoTop />
      {(() => {
        switch (pathName) {
          case "/":
            return <HeaderOne />;
          case "/homeTwo":
            return <HeaderTwo />;
          case "/homeThree":
            return <HeaderThree />;
          default:
            return <HeaderFour />;
        }
      })()}
      {children}
      {(() => {
        switch (pathName) {
          default:
            return <Footer />;
          case "/homeThree":
            return <FooterTwo />;
        }
      })()}
    </>
  );
};

export default Wrapper;
