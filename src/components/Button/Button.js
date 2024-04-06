import React from "react";
import Link from "next/link";

import styles from "./Button.module.css";

const Button = (props) => {
  const loadingStyle = props.isLoading ? "Loading" : "";
  const className = [
    styles.Btn,
    styles[props.btnType],
    styles[props.width],
    styles[loadingStyle],
  ].join(" ");

  let button = (
    <button
      type={!props.isLoading ? props.type : "button"}
      className={className}
      onClick={!props.isLoading ? props.clicked : null}
      style={{ ...props.style }}
    >
      {!props.isLoading ? (
        props.children
      ) : (
        <div className={styles.LdsRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </button>
  );

  if (props.elementType === "link") {
    button = (
      <Link href={props.link} className={className} style={{ ...props.style }}>
        {props.children}
      </Link>
    );
  }

  return button;
};

export default Button;
