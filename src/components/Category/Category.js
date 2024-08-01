import Link from "next/link";
import Image from "next/image";

import styles from "./Category.module.css";

const Category = ({ category }) => {
  return (
    <div className={styles.Category} key={category.id}>
      <div className={styles.Image}>
        <Link href={`/products?categories=${category.name}`}>
          <Image
            src={category.photo}
            width={236}
            height={238}
            alt={category.name}
            loading="lazy"
          />
        </Link>
      </div>
      <div className={styles.Desc}>
        <h3>
          <Link href={`/products?categories=${category.name}`}>
            {category.name}
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Category;
