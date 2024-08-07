"use client";
import React from "react";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return <div onClick={scrollToTop}>Go to top</div>;
};

export default ScrollToTop;
