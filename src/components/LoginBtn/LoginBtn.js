"use client";
import { useDispatch } from "react-redux";
import Link from "next/link";

import styles from "./LoginBtn.module.css";

import { openSignInModal } from "@/redux/features/SignIn/SignInSlice";

const LoginBtn = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.LoginBtn}>
      <p>
        Please{" "}
        <span onClick={() => dispatch(openSignInModal(true))}>Login </span>
        or <Link href="/sign-up">Register</Link> to place Order, See Pricings
        and Documents
      </p>
    </div>
  );
};

export default LoginBtn;
