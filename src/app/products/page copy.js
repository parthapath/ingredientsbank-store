"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { api_server } from "@/config";

import styles from "./page.module.css";

import ProductsList from "@/components/ProductsList/ProductsList";
import Applications from "../../components/Applications/Applications";

const products = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const queryCategories = searchParams.get("categories");
  let searchCategories = [];
  if (queryCategories) {
    searchCategories = queryCategories.split(",");
  }

  const queryApplications = searchParams.get("applications");
  let searchApplications = [];
  if (queryApplications) {
    searchApplications = queryApplications.split(",");
  }

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState(searchApplications);

  const updateSearchParam = ({ key, value }) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);
    return `${pathname}?${params.toString()}`;
  };

  const handleCategoryFilter = (val) => {
    if (selectedCategories.includes(val)) {
      setSelectedCategories(
        selectedCategories.filter((value) => value !== val)
      );
    } else {
      setSelectedCategories([...selectedCategories, val]);
    }
  };

  const clearSelectedCategories = () => {
    setSelectedCategories([]);
  };

  const handleApplicationFilter = (val) => {
    if (selectedApplications.includes(val)) {
      setSelectedApplications(
        selectedApplications.filter((value) => value !== val)
      );
    } else {
      setSelectedApplications([...selectedApplications, val]);
    }
  };

  useEffect(() => {
    setSelectedCategories(searchCategories);
  }, [queryCategories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${api_server}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    router.push(
      updateSearchParam({ key: "categories", value: selectedCategories })
    );
  }, [selectedCategories]);

  useEffect(() => {
    router.push(
      updateSearchParam({ key: "applications", value: selectedApplications })
    );
  }, [selectedApplications]);

  useEffect(() => {
    console.log("loadProucts");
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${api_server}/products?page=1&per-page=10&keywords=?&categories=${selectedCategories}&applications=${selectedApplications}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, [selectedCategories, selectedApplications]);

  return (
    <div className={["page-wrapper", styles.ProductsPage].join(" ")}>
      <div className="container">
        <div className={styles.PageContent}>
          <div className={styles.Filters}>
            <div className={styles.Filter}>
              <h4>Categories</h4>
              <ul>
                <li
                  className={!selectedCategories.length ? styles.Active : null}
                  onClick={() => clearSelectedCategories()}
                >
                  All
                </li>
                {categories.map((item, i) => {
                  return (
                    <li
                      className={
                        selectedCategories.includes(item.name)
                          ? styles.Active
                          : null
                      }
                      onClick={() => handleCategoryFilter(item.name)}
                      key={i}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.Filter}>
              <h4>Applications</h4>
              <Applications
                handleApplicationFilter={handleApplicationFilter}
                selectedApplications={selectedApplications}
              />
            </div>
          </div>
          <div className={styles.ProductsWrapper}>
            {/* <div className={styles.Overview}>
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
            </div> */}
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
