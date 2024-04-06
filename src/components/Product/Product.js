import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

import { openSignInModal } from "@/redux/features/SignIn/SignInSlice";

import styles from "./Product.module.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.Product}>
      <div className={styles.Image}>
        <Link href={product.url}>
          <img src={product.img} />
        </Link>
      </div>
      <div className={styles.Desc}>
        <div className={styles.Name}>
          <h3>
            <Link href={product.url}>{product.name}</Link>
          </h3>
          <h4>{product.alternate_name}</h4>
        </div>
        <div className={styles.Login}>
          <span onClick={() => dispatch(openSignInModal(true))}>
            Login to See Price
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
