"use client";
import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { IoEyeOff, IoEye } from "react-icons/io5";

import styles from "./Password.module.css";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";

const Password = (props) => {
  const { label, name, type, ...rest } = props;

  const [showHidePassword, togglePasswordHandler] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={name} className="control-label">
        {label}
      </label>
      <Field
        className={styles.FormControl}
        type={showHidePassword ? "text" : "password"}
        id={name}
        name={name}
        autoComplete="off"
        {...rest}
      />
      {showHidePassword ? (
        <span
          className={styles.PasswordToggleBtn}
          onClick={() => togglePasswordHandler(!showHidePassword)}
        >
          <IoEye />
        </span>
      ) : (
        <span
          className={styles.PasswordToggleBtn}
          onClick={() => togglePasswordHandler(!showHidePassword)}
        >
          <IoEyeOff />
        </span>
      )}
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default Password;
