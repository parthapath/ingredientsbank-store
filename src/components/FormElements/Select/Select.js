import React, { useState } from "react";
import ReactSelect from "react-select";

import styles from "./Select.module.css";
import "./Select.css";

const Select = (props) => {
  const { label, name, options, value, ...rest } = props;

  const [selectValue, setSelectValue] = useState(value);

  const handleChange = (selectedOption) => {
    setSelectValue(selectedOption.value);
    if (props.getSelectedValue) {
      props.getSelectedValue(selectedOption.value);
    }
  };

  const inputLabel = label ? (
    <label htmlFor={name} className="ControlLabel">
      {label}
    </label>
  ) : null;

  return (
    <div className={["FormGroup", styles[props.align]].join(" ")}>
      {inputLabel}
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
    </div>
  );
};

export default Select;
