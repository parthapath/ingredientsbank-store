"use client";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";

import styles from "./ScrollToTop.module.css";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.ScrollToTop} onClick={scrollToTop}>
      <IoIosArrowUp />
      Go to top
    </div>
  );
};

export default ScrollToTop;
