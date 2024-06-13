import styles from "./ProductsList.module.css";

import Product from "../Product/Product";

const ProductsList = ({ products, isAuthenticated }) => {
  return (
    <div className={styles.ProductsList}>
      {products.map((product, i) => (
        <Product key={i} product={product} isAuthenticated={isAuthenticated} />
      ))}
    </div>
  );
};

export default ProductsList;
