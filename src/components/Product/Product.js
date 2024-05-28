"use client";
import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Cookies from "js-cookie";

import { openSignInModal } from "@/redux/features/SignIn/SignInSlice";
import { checkAuth } from "@/utils/checkAuth";

import styles from "./Product.module.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const isAuthenticated = checkAuth();

  const regionObj = Cookies.get("region");
  const region = JSON.parse(regionObj);

  return (
    <div className={styles.Product} key={product.id}>
      <div className={styles.Image}>
        <Link href={`/products/${product.id}?region=${region.id}`}>
          <img src={product.images[0].url} alt={product.name} />
        </Link>
      </div>
      <div className={styles.Desc}>
        <div className={styles.Name}>
          <h3>
            <Link href={`/products/${product.id}?region=${region.id}`}>
              {product.name}
            </Link>
          </h3>
          <h4>{product.alternate_name}</h4>
        </div>

        {!isAuthenticated ? (
          <div className={styles.Login}>
            <span onClick={() => dispatch(openSignInModal(true))}>
              Login to See Price
            </span>
          </div>
        ) : (
          <div>{product.price}</div>
        )}
      </div>
    </div>
  );
};

export default Product;
