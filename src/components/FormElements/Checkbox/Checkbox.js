import React from "react";

import styles from "./Checkbox.module.css";

const Checkbox = (props) => {
  const { name, label, change, ...rest } = props;

  return (
    <label className={styles.Checkbox}>
      <input
        type="checkbox"
        id={name}
        name={name}
        onChange={() => change(name)}
        {...rest}
      />
      <span className={styles.Checkmark}></span>
      <label htmlFor={name} className={styles.ControlLabel}>
        {label}
      </label>
    </label>
  );
};

export default Checkbox;
