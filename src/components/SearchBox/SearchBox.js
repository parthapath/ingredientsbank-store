"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { FiSearch } from "react-icons/fi";

import useOutsideClick from "@/utils/OutsideClick.util";

import { api_server } from "@/config";

import styles from "./SearchBox.module.css";

import Input from "../FormElements/Input/Input";

const SearchBox = (props) => {
  const [keyword, setKeyword] = useState("");
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
        try {
          const response = await fetch(
            `${api_server}/products/search?region=${props.regionId}&keyword=${keyword}`
          );
          const data = await response.json();
          setSearchResults(data);
          setShowResults(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      search();
    } else {
      setShowResults(false);
    }
  }, [keyword]);

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
    router.push(`/products/${val.id}?region=${props.regionId}&search=true`);
  };

  useEffect(() => {
    if (!search) {
      setKeyword("");
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

export default SearchBox;
