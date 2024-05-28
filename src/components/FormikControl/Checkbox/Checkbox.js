import React from "react";
import { Field, ErrorMessage } from "formik";

import styles from "./Checkbox.module.css";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";

const Checkbox = (props) => {
  let { name, label, key, onSelect, ...rest } = props;

  return (
    <div className={["FormGroup", styles[props.minHeight]].join(" ")}>
      <label className={styles.Checkbox}>
        <Field
          key={key}
          className="Checkbox"
          type="checkbox"
          id={name}
          name={name}
          onClick={onSelect ? (e) => onSelect(e.target.checked) : null}
          {...rest}
        />
        <span className={styles.Checkmark}></span>
        <label htmlFor={name} className={styles.ControlLabel}>
          {label}
        </label>
      </label>
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default Checkbox;
