"use client";
import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import zxcvbn from "zxcvbn";
import { IoEyeOff, IoEye } from "react-icons/io5";

import styles from "./PasswordStrength.module.css";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";

const PasswordStrength = (props) => {
  const { label, name, type, change, password, ...rest } = props;

  const [showHidePassword, togglePasswordHandler] = useState(false);

  const testScore = zxcvbn(password);
  const strength = (testScore.score * 100) / 4;

  const passwordStrengthLabel = () => {
    switch (testScore.score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Good";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "none";
    }
  };

  const passwordStrengthColor = () => {
    switch (testScore.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const updatePasswordStrength = () => ({
    width: `${strength}%`,
    background: passwordStrengthColor(),
  });

  const toggleStrengthIndicator = () =>
    password.length > 0 ? "block" : "none";

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
        onKeyUp={(event) => props.setPassword(event.target.value)}
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
      <div
        className={styles.PasswordStrength}
        style={{ display: toggleStrengthIndicator() }}
      >
        <div className={styles.Indicator}>
          <div
            className={styles.Level}
            style={{ color: passwordStrengthColor() }}
          >
            {passwordStrengthLabel()}
          </div>
          <div className={styles.ProgressBar}>
            <div
              className={styles.Progress}
              style={updatePasswordStrength()}
            ></div>
          </div>
        </div>
        <div className={styles.Notes}>
          <ul>
            <li>* Use 8 to 14 characters</li>
            <li>
              * Besides letters, include at least a number or symbol
              (!@#$%^&*()_+=)
            </li>
            <li>* Password is case sensitive</li>
            <li>* Avoid using the same password for multiple sites</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
