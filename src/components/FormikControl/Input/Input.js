"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";

import styles from "./Input.module.css";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";

const Input = (props) => {
  let { name, ...rest } = props;

  const label = props.label ? (
    <label htmlFor={name} className="control-label">
      {props.label}
    </label>
  ) : null;
  return (
    <div className="form-group">
      {label}
      <Field
        className={styles.FormControl}
        id={name}
        name={name}
        {...rest}
        autoComplete="off"
      />
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default Input;
