"use client";
import { useDispatch } from "react-redux";

import styles from "./ProductEnquiryBtn.module.css";

import { openProductEnquiryModal } from "@/redux/features/ProductEnquiry/ProductEnquirySlice";

const ProductEnquiryBtn = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.ProductEnquiryBtn}>
      <p>Are You Looking for New Ingredients?</p>
      <p>
        <span onClick={() => dispatch(openProductEnquiryModal(true))}>
          Click here{" "}
        </span>
        tell us about your requirement!
      </p>
    </div>
  );
};

export default ProductEnquiryBtn;
