import React from "react";

import styles from "./Radio.module.css";

const Radio = (props) => {
  const { name, label, change, value, ...rest } = props;

  return (
    <label className={styles.Radio}>
      <input
        type="radio"
        id={name}
        name={name}
        checked={name === value}
        onClick={() => change(name)}
        {...rest}
      />
      <span className={styles.Checkmark}></span>
      <label htmlFor={name} className={styles.ControlLabel}>
        {label}
      </label>
    </label>
  );
};

export default Radio;
