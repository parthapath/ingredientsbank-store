"use client";
import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";
import axios from "../../axios";

import { useAuth } from "@/hooks/useAuth";

import { api_server } from "@/config";

import styles from "./page.module.css";

import ProductsList from "@/components/ProductsList/ProductsList";
import Applications from "../../components/Applications/Applications";

const Products = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuth();

  const selectedPage = searchParams.get("page");
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
  const [page, setPage] = useState(selectedPage ? parseInt(selectedPage) : 1);
  const [pageCount, setPageCount] = useState(0);
  const [recordCount, setRecordCount] = useState(0);
  const [startRecord, setStartRecord] = useState(0);
  const [endRecord, setEndRecord] = useState(0);

  const updateSearchParam = useCallback(
    ({ key, value }) => {
      const params = new URLSearchParams(searchParams);

      params.set(key, value);
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname]
  );

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

  useEffect(() => {
    setSelectedCategories(queryCategories);
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
  }, [router, selectedCategories, updateSearchParam]);

  useEffect(() => {
    router.push(
      updateSearchParam({ key: "applications", value: selectedApplications })
    );
  }, [router, selectedApplications, updateSearchParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      const regionObj = Cookies.get("region");
      let regionId = 5;
      if (regionObj) {
        const region = JSON.parse(regionObj);
        regionId = region.id;
      }
      axios
        .get(
          `/products?page=${page}&per-page=20&region=${regionId}&categories=${selectedCategories}&applications=${selectedApplications}`
        )
        .then((response) => {
          setProducts(response.data);
          setPageCount(parseInt(response.headers["x-pagination-page-count"]));
          setRecordCount(
            parseInt(response.headers["x-pagination-total-count"])
          );
          setStartRecord(
            parseInt(response.headers["x-pagination-start-record"])
          );
          setEndRecord(parseInt(response.headers["x-pagination-end-record"]));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    if (selectedCategories !== false) {
      fetchProducts();
    }
  }, [selectedCategories, selectedApplications, page]);

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
    router.push(updateSearchParam({ key: "page", value: e.selected + 1 }));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <title>Products - Ingredients Bank</title>
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
                          selectedCategories === item.name
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
                  {recordCount > 0 ? (
                    <span>
                      Showing {startRecord} - {endRecord} of {recordCount}
                    </span>
                  ) : (
                    <span>No Products found</span>
                  )}
                </div>

                <div className={styles.ProductsList}>
                  <ProductsList
                    products={products}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
                {recordCount > 20 ? (
                  <div className={styles.Pagination}>
                    <ReactPaginate
                      nextLabel="NEXT"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      forcePage={page - 1}
                      pageCount={pageCount}
                      previousLabel="PREVIOUS"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductsWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    </Suspense>
  );
};

export default ProductsWithSuspense;
