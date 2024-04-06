"use client";
import React, { useState } from "react";
import { ErrorMessage } from "formik";
import AsyncSelect from "react-select/async";

import styles from "./SelectAsync.module.css";
import "./SelectAsync.css";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";

const SelectAsync = (props) => {
  const {
    label,
    name,
    value,
    setFieldValue,
    fieldValue,
    loadOptions,
    defaultValue,
    ...rest
  } = props;

  const [inputValue, setValue] = useState(value);
  const [selectValue, setSelectValue] = useState(value);

  // handle input change event
  const handleInputChange = (value) => {
    setValue(value);
  };

  const handleChange = (selectedOption) => {
    setSelectValue(selectedOption.value);
    const value =
      fieldValue && fieldValue === "name"
        ? selectedOption.name
        : selectedOption.id;
    setFieldValue(name, value);

    if (props.getSelectedValue) {
      props.getSelectedValue(value);
    }
  };

  return (
    <div className="FormGroup">
      <label htmlFor={name} className="ControlLabel">
        {label}
      </label>
      <AsyncSelect
        className={styles.FormControl}
        classNamePrefix="ReactSelect"
        cacheOptions
        defaultOptions
        value={selectValue}
        defaultInputValue={defaultValue}
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        {...rest}
      />
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default SelectAsync;
