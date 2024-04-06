import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  const { label, type, name, value, handleInput, ...rest } = props;

  const style = {
    width: props.width ? props.width : "auto",
  };

  const inputLabel = label ? (
    <label htmlFor={name} className="ControlLabel">
      {label}
    </label>
  ) : null;

  return (
    <>
      <div className="FormGroup" style={style}>
        {inputLabel}
        <input
          className={styles.FormControl}
          type={type}
          name={name}
          value={value}
          autoComplete="off"
          onChange={(e) => handleInput(e.target.value)}
          {...rest}
        />
      </div>
    </>
  );
};

export default Input;
