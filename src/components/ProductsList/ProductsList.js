import React from "react";

import styles from "./ProductsList.module.css";

import Product from "../Product/Product";

const ProductsList = ({ products }) => {
  return (
    <div className={styles.ProductsList}>
      {products.map((product, i) => (
        <Product key={i} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
