"use client";
import React, { useState } from "react";
import { ErrorMessage } from "formik";
import ReactSelect from "react-select";

import styles from "./Select.module.css";
import "./Select.css";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";

const Select = (props) => {
  const { label, name, options, value, setFieldValue, ...rest } = props;

  const [selectValue, setSelectValue] = useState(value);

  const handleChange = (selectedOption) => {
    setSelectValue(selectedOption.value);
    setFieldValue(name, selectedOption.value);

    if (props.getSelectedValue) {
      props.getSelectedValue(selectedOption.value);
    }
  };

  return (
    <div className="FormGroup">
      <label htmlFor={name} className="ControlLabel">
        {label}
      </label>
      <ReactSelect
        className={styles.FormControl}
        classNamePrefix="ReactSelect"
        options={options}
        onChange={handleChange}
        value={
          selectValue
            ? props.options.filter((option) => option.value === selectValue)
            : null
        }
        {...rest}
      />
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default Select;
