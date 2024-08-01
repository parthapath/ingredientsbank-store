import Category from "../Category/Category";

import styles from "./CategoryList.module.css";

const CategoryList = ({ categories }) => {
  return (
    <div className={styles.Categories}>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
