"use client";
import { useState, useEffect, Suspense, useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import axios from "../../axios";

import { useAuth } from "@/hooks/useAuth";

import styles from "./page.module.css";

import ProductsList from "@/components/ProductsList/ProductsList";
import Checkbox from "@/components/FormElements/Checkbox/Checkbox";

const ReactPaginate = dynamic(() => import("react-paginate"), { ssr: false });

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      axios
        .get("/categories")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };
    fetchCategories();
  }, []);

  return categories;
};

const useApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      axios
        .get("/applications")
        .then((response) => {
          setApplications(response.data);
        })
        .catch((error) => {
          console.error("Error fetching applications:", error);
        });
    };
    fetchApplications();
  }, []);

  return applications;
};

const useProducts = (page, selectedCategories, selectedApplications) => {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    pageCount: 0,
    recordCount: 0,
    recordRange: { start: 0, end: 0 },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const regionObj = Cookies.get("region");
      let regionId = 5;
      if (regionObj) {
        const region = JSON.parse(regionObj);
        regionId = region.id;
      }
      try {
        const response = await axios.get(
          `/products?page=${page}&per-page=20&region=${regionId}&categories=${selectedCategories}&applications=${selectedApplications.join(
            ","
          )}`
        );
        setProducts(response.data);
        setPageInfo({
          pageCount: parseInt(response.headers["x-pagination-page-count"]),
          recordCount: parseInt(response.headers["x-pagination-total-count"]),
          recordRange: {
            start: parseInt(response.headers["x-pagination-start-record"]),
            end: parseInt(response.headers["x-pagination-end-record"]),
          },
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (selectedCategories !== false) {
      fetchProducts();
    }
  }, [selectedCategories, selectedApplications, page]);

  return { products, pageInfo };
};

const Products = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuth();

  const selectedPage = searchParams.get("page");
  const queryCategories = searchParams.get("categories");
  const queryApplications = searchParams.get("applications");

  const [selectedCategories, setSelectedCategories] = useState(
    queryCategories || ""
  );
  const [selectedApplications, setSelectedApplications] = useState(() =>
    queryApplications ? queryApplications.split(",") : []
  );
  const [page, setPage] = useState(selectedPage ? parseInt(selectedPage) : 1);

  const categories = useCategories();
  const applications = useApplications();
  const { products, pageInfo } = useProducts(
    page,
    selectedCategories,
    selectedApplications
  );

  const updateSearchParam = useCallback(
    ({ key, value }) => {
      const params = new URLSearchParams(searchParams);
      params.set(key, value);
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname]
  );

  const handleCategoryFilter = useCallback((val) => {
    setSelectedCategories(val);
  }, []);

  const clearSelectedCategories = useCallback(() => {
    setSelectedCategories("");
  }, []);

  const handleApplicationFilter = useCallback((val) => {
    setSelectedApplications((prev) =>
      prev.includes(val)
        ? prev.filter((value) => value !== val)
        : [...prev, val]
    );
  }, []);

  useEffect(() => {
    router.push(
      updateSearchParam({ key: "categories", value: selectedCategories })
    );
  }, [router, selectedCategories, updateSearchParam]);

  useEffect(() => {
    router.push(
      updateSearchParam({
        key: "applications",
        value: selectedApplications.join(","),
      })
    );
  }, [router, selectedApplications, updateSearchParam]);

  useEffect(() => {
    const handlePopState = () => {
      const newParams = new URLSearchParams(window.location.search);
      const newPage = newParams.get("page");
      const newCategories = newParams.get("categories");
      const newApplications = newParams.get("applications");

      setPage(newPage ? parseInt(newPage) : 1);
      setSelectedCategories(newCategories || "");
      setSelectedApplications(
        newApplications ? newApplications.split(",") : []
      );
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handlePageClick = useCallback(
    (e) => {
      const newPage = e.selected + 1;
      setPage(newPage);
      router.push(updateSearchParam({ key: "page", value: newPage }));
      window.scrollTo(0, 0);
    },
    [router, updateSearchParam]
  );

  const memoizedProductsList = useMemo(
    () => (
      <ProductsList products={products} isAuthenticated={isAuthenticated} />
    ),
    [products, isAuthenticated]
  );

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
                  {categories.length
                    ? categories.map((item, i) => {
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
                      })
                    : null}
                </ul>
              </div>
              <div className={styles.Filter}>
                <h4>Applications</h4>
                <ul>
                  {applications.length
                    ? applications.map((item, i) => {
                        return (
                          <li key={i}>
                            <Checkbox
                              checked={
                                selectedApplications.includes(item.name)
                                  ? true
                                  : false
                              }
                              name={item.id}
                              change={() => handleApplicationFilter(item.name)}
                              label={item.name}
                            />
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
            </div>
            <div className={styles.ProductsWrapper}>
              <div className={styles.Products}>
                <div className={styles.NoOfProducts}>
                  {pageInfo.recordCount > 0 ? (
                    <span>
                      Showing {pageInfo.recordRange.start} -{" "}
                      {pageInfo.recordRange.end} of {pageInfo.recordCount}
                    </span>
                  ) : (
                    <span>No Products found</span>
                  )}
                </div>
                <div className={styles.ProductsList}>
                  {memoizedProductsList}
                </div>
                {pageInfo.recordCount > 20 && (
                  <div className={styles.Pagination}>
                    <ReactPaginate
                      nextLabel="NEXT"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      forcePage={page - 1}
                      pageCount={pageInfo.pageCount}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductsWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Products />
  </Suspense>
);

export default ProductsWithSuspense;
