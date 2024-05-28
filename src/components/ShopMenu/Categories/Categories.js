import React from "react";
import Link from "next/link";

import { api_server } from "@/config";

import styles from "./Categories.module.css";

const Categories = async () => {
  const reqCategories = await fetch(`${api_server}/categories`);
  const categories = await reqCategories.json();

  return (
    <div className={styles.Categories}>
      <ul>
        {categories.map((item, i) => {
          return (
            <li key={i}>
              <Link href="/products" key={item.id}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
