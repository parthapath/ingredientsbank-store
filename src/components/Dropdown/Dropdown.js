import React from "react";

import styles from "./Dropdown.module.css";

const Dropdown = (props) => {
  const style = {
    opacity: props.show ? "1" : "0",
    visibility: props.show ? "visible" : "hidden",
    top: props.show ? "9px" : "0",
  };

  return (
    <>
      <div className={styles.Dropdown} style={style}>
        {props.children}
      </div>
    </>
  );
};

export default Dropdown;
