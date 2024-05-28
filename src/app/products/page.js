"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

import { api_server } from "@/config";

import styles from "./page.module.css";

import ProductsList from "@/components/ProductsList/ProductsList";
import Applications from "../../components/Applications/Applications";

const products = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const queryCategories = searchParams.get("categories");

  const queryApplications = searchParams.get("applications");
  let searchApplications = [];
  if (queryApplications) {
    searchApplications = queryApplications.split(",");
  }

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(false);
  const [selectedApplications, setSelectedApplications] =
    useState(searchApplications);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(null);
  const [totalRecordCount, setTotalRecordCount] = useState(null);

  const updateSearchParam = ({ key, value }) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);
    return `${pathname}?${params.toString()}`;
  };

  const handleCategoryFilter = (val) => {
    setSelectedCategories(val);
  };

  const clearSelectedCategories = () => {
    setSelectedCategories("");
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

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setSelectedCategories(queryCategories);
  }, []);

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
    const fetchProducts = async () => {
      //const regionObj = localStorage.getItem("region");
      const regionObj = Cookies.get("region")
      const region = JSON.parse(regionObj);
      try {
        const response = await fetch(
          `${api_server}/products?page=${page}&per-page=10&region=${region.id}&keywords=&categories=${selectedCategories}&applications=${selectedApplications}`
        );
        const data = await response.json();
        setProducts(data);
        setTotalPageCount(response.headers.get("x-pagination-page-count"));
        setTotalRecordCount(response.headers.get("x-pagination-total-count"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (selectedCategories !== false) {
      fetchProducts();
    }
  }, [selectedCategories, selectedApplications, page]);

  return (
    <div className={["page-wrapper", styles.ProductsPage].join(" ")}>
      <div className="container">
        <div className={styles.PageContent}>
          <div className={styles.Filters}>
            <div className={styles.Filter}>
              <h4>Categories</h4>
              <ul>
                <li
                  className={selectedCategories === "" ? styles.Active : null}
                  onClick={() => clearSelectedCategories()}
                >
                  All
                </li>
                {categories.map((item, i) => {
                  return (
                    <li
                      className={
                        selectedCategories === item.name ? styles.Active : null
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
              {/* <div className={styles.NoOfProducts}>
                Showing 30 of 654 products
              </div> */}
              <div className={styles.ProductsList}>
                <ProductsList products={products} />
                {totalPageCount > 0 && totalPageCount != page ? (
                  <div
                    className={styles.LoadMore}
                    onClick={() => handleLoadMore()}
                  >
                    Load More
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default products;
