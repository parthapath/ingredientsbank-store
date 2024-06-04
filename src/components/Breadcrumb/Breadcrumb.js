import React from "react";

import styles from "./Breadcrumb.module.css";

const Breadcrumb = (props) => {
  return (
    <div className={styles.Breadcrumb}>
      <ul>
       {props.children}
      </ul>
    </div>
  );
};

export default Breadcrumb;