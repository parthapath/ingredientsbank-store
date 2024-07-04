"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from "../../axios";

import { FiSearch } from "react-icons/fi";

import useOutsideClick from "@/utils/OutsideClick.util";

import styles from "./SearchBox.module.css";

import Input from "../FormElements/Input/Input";

const SearchBox = (props) => {
  const [keyword, setKeyword] = useState("");
  const [region, setRegion] = useState(5);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultClicked, setSearchResultClicked] = useState(false);
  const ref = useRef(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const style = {
    opacity: showResults ? "1" : "0",
    visibility: showResults ? "visible" : "hidden",
    top: showResults ? "9px" : "0",
  };

  const hideSearchResults = () => {
    setShowResults(false);
  };

  useOutsideClick(ref, hideSearchResults);

  useEffect(() => {
    if (keyword.length > 2 && !searchResultClicked) {
      const search = async () => {
        axios
          .get(`/products/search?region=${region}&keyword=${keyword}`)
          .then((response) => {
            setSearchResults(response.data);
            setShowResults(true);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };
      search();
    } else {
      setShowResults(false);
    }
  }, [keyword, region, searchResultClicked]);

  const handleInputClick = () => {
    if (keyword.length > 2) {
      setShowResults(true);
    }
  };

  const handleSearchInput = (val) => {
    setKeyword(val);
    setSearchResultClicked(false);
  };

  const handleSearchResultClick = (val) => {
    setShowResults(false);
    setKeyword(val.name);
    setSearchResultClicked(true);
    router.push(`/products/${val.id}?region=${region}&search=true`);
  };

  useEffect(() => {
    if (!search) {
      setKeyword("");
    }

    const regionObj = Cookies.get("region");
    if (regionObj) {
      const region = JSON.parse(regionObj);
      setRegion(region.id);
    }
  }, [search]);

  return (
    <>
      <div className={styles.SearchBox} ref={ref}>
        <div className={styles.SearchForm}>
          <div className={styles.SearchInput}>
            <Input
              type="text"
              name="keyword"
              value={keyword}
              handleInput={handleSearchInput}
              placeholder="Search for products..."
              onClick={() => handleInputClick()}
            />
            <div
              className={styles.SubmitBtn}
              onClick={() => setShowResults(!showResults)}
            >
              <FiSearch />
            </div>
          </div>
        </div>
        <div className={styles.SearchResults} style={style}>
          <div className={styles.Results}>
            {searchResults.length ? (
              <ul>
                {searchResults.map((item, i) => {
                  return (
                    <li onClick={() => handleSearchResultClick(item)} key={i}>
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
      {showResults && searchResults.length ? (
        <div className={styles.Overlay}></div>
      ) : null}
    </>
  );
};

const SearchBoxWithSuspense = () => {
  return (
    <Suspense>
      <SearchBox />
    </Suspense>
  );
};

export default SearchBoxWithSuspense;
