import React, { useState, useRef, useEffect } from "react";

import { FiSearch } from "react-icons/fi";

import outsideClick from "@/utils/OutsideClick.util";

import styles from "./SearchBox.module.css";

import Input from "../FormElements/Input/Input";
import Link from "next/link";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [showResults, setShowResults] = useState("");
  const ref = useRef(null);

  const style = {
    opacity: showResults ? "1" : "0",
    visibility: showResults ? "visible" : "hidden",
    top: showResults ? "9px" : "0",
  };

  const hideSearchResults = () => {
    setShowResults(false);
  };

  outsideClick(ref, hideSearchResults);

  useEffect(() => {
    if (keyword.length > 2) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [keyword]);

  const handleInputClick = () => {
    if (keyword.length > 2) {
      setShowResults(true);
    }
  };

  return (
    <>
      <div className={styles.SearchBox} ref={ref}>
        <div className={styles.SearchForm}>
          <div className={styles.SearchInput}>
            <Input
              type="text"
              name="keyword"
              value={keyword}
              handleInput={setKeyword}
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
            <ul>
              <li>
                <Link href="/">Andrographis Paniculata Extract</Link>
              </li>
              <li>
                <Link href="/">Adhatoda Vasica Extract</Link>
              </li>
              <li>
                <Link href="/">Ashwagandha Extract</Link>
              </li>
              <li>
                <Link href="/">Aloevera Extract 200:1</Link>
              </li>
              <li>
                <Link href="/">Amla Extract</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showResults ? <div className={styles.Overlay}></div> : null}
    </>
  );
};

export default SearchBox;
