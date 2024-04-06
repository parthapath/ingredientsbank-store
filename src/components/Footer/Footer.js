import React from "react";
import Link from "next/link";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className="container">
        <div className={styles.ContentWrapper}>
          <div className={styles.About}>
            <div className={styles.Logo}>
              <img src="/assets/imgs/logo.png" />
            </div>
            <div className={styles.Terms}>
              <ul>
                <li>
                  <Link href="/">Terms and Conditions</Link>
                </li>
                <li>
                  <Link href="/">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <p>
              Novel Ingredients private limited. © 2024 All Rights Reserved.
            </p>
          </div>
          <div className={styles.Menu}>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/">Shop</Link>
              </li>
              <li>
                <Link href="/">About Us</Link>
              </li>
              <li>
                <Link href="/">Blog</Link>
              </li>
              <li>
                <Link href="/">FAQs</Link>
              </li>
              <li>
                <Link href="/">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className={styles.Contact}>
            <h4>Contact</h4>
            <div>
              <span>Headquarter:</span> 9E/17, Peenya Industrial Area, 2nd
              Phase, Chokkasandra, Bengaluru - 560058, Karnataka, India
            </div>
            <div>
              <span>Phone:</span> +91-9876543210
            </div>
            <div>
              <span>Email:</span> support@novelingredients.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
