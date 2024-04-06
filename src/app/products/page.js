"use client";
import Link from "next/link";

import styles from "./page.module.css";

import Checkbox from "@/components/FormElements/Checkbox/Checkbox";
import ProductsList from "@/components/ProductsList/ProductsList";

import { server } from "@/config";

const products = async () => {
  const handleApplicationFilter = (val) => {
    console.log("val", val);
  };

  const request = await fetch(`${server}/static/products.json`);
  const products = await request.json();

  return (
    <div className={["page-wrapper", styles.ProductsPage].join(" ")}>
      <div className="container">
        <div className={styles.PageContent}>
          <div className={styles.Filters}>
            <div className={styles.Filter}>
              <h4>Categories</h4>
              <ul>
                <li>
                  <Link href="/products">Standardized Herbal Extracts</Link>
                </li>
                <li>
                  <Link href="/products" className={styles.Active}>
                    Curcuma (Curcumin) Range
                  </Link>
                </li>
                <li>
                  <Link href="/products">
                    CO2 Extracts (Super Critical Fluid Extracts)
                  </Link>
                </li>
                <li>
                  <Link href="/products">Organic Herbs</Link>
                </li>
                <li>
                  <Link href="/products">
                    Vegetable / Fruits Spray Dried Powder
                  </Link>
                </li>
                <li>
                  <Link href="/products">Essential Oils</Link>
                </li>
                <li>
                  <Link href="/products">Cold Pressed Oils</Link>
                </li>
                <li>
                  <Link href="/products">Nutritional Fine Chemicals</Link>
                </li>
                <li>
                  <Link href="/products">Dietary Fibre</Link>
                </li>
                <li>
                  <Link href="/products">Oleoresin</Link>
                </li>
                <li>
                  <Link href="/products">Food Enzyme</Link>
                </li>
                <li>
                  <Link href="/products">Coconut Products</Link>
                </li>
                <li>
                  <Link href="/products">Herbs Powders</Link>
                </li>
                <li>
                  <Link href="/products">Specialised Nutraceuticals</Link>
                </li>
              </ul>
            </div>
            <div className={styles.Filter}>
              <h4>Applications</h4>
              <ul>
                <li>
                  <Checkbox
                    name="1"
                    change={handleApplicationFilter}
                    label="Animal Nutrition"
                  />
                </li>
                <li>
                  <Checkbox
                    name="2"
                    change={handleApplicationFilter}
                    label="Cognitive Support"
                  />
                </li>
                <li>
                  <Checkbox
                    name="3"
                    change={handleApplicationFilter}
                    lable=" Digestive Support"
                  />
                </li>
                <li>
                  <Checkbox
                    name="4"
                    change={handleApplicationFilter}
                    label="Food and Beverage"
                  />
                </li>
                <li>
                  <Checkbox
                    name="5"
                    change={handleApplicationFilter}
                    label="Hair, Skin, and Nails"
                  />
                </li>
                <li>
                  <Checkbox
                    name="6"
                    change={handleApplicationFilter}
                    label="Immune Support"
                  />
                </li>
                <li>
                  <Checkbox
                    name="7"
                    change={handleApplicationFilter}
                    label="Joint Support"
                  />
                </li>
                <li>
                  <Checkbox
                    name="8"
                    change={handleApplicationFilter}
                    label="Nootropics"
                  />
                </li>
                <li>
                  <Checkbox
                    name="9"
                    change={handleApplicationFilter}
                    label="Sports Nutrition"
                  />
                </li>
                <li>
                  <Checkbox
                    name="10"
                    change={handleApplicationFilter}
                    label="Weight Management"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.ProductsWrapper}>
            <div className={styles.Overview}>
              <h1>Vegetable / Fruits Spray Dried Powder</h1>
              <div className={styles.CategoryDesc}>
                <p>
                  Vegetable and fruit spray-dried powder is produced through
                  spray drying, preserving nutrients while extending shelf life
                  by removing moisture and inhibiting microbial growth. These
                  powders are versatile, used in soups, sauces, baked goods,
                  beverages, supplements, and pharmaceuticals. Though flavor and
                  aroma may slightly diminish, this is often compensated for
                  with natural flavorings. Convenient and lightweight, they
                  don&#39;t require refrigeration, simplifying storage and
                  transportation. They offer a practical, nutritious option for
                  food manufacturers and consumers seeking longer-lasting,
                  easy-to-use ingredients with the benefits of fresh produce.
                </p>
              </div>
            </div>
            <div className={styles.Products}>
              <div className={styles.NoOfProducts}>
                Showing 30 of 654 products
              </div>
              <div className={styles.ProductsList}>
                <ProductsList products={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default products;
