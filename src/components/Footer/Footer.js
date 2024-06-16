import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className="container">
        <div className={styles.ContentWrapper}>
          <div className={styles.About}>
            <div className={styles.Logo}>
              <Image
                src="/assets/imgs/logo.png"
                width={175}
                height={70}
                alt="Ingredients Bank"
                loading="lazy"
              />
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
                <Link href="/products?categories=">Shop</Link>
              </li>
              <li>
                <Link href="/">About Us</Link>
              </li>
              <li>
                <Link href="/">FAQs</Link>
              </li>
              <li>
                <Link href="/">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className={styles.Contact}>
            <h4>Contact</h4>
            <div>
              <span>India</span> #9E/17, Peenya Industrial Area, 2nd Phase,
              Chokkasandra, Bengaluru - 560058
            </div>
            <div>
              <span>United Kingdom</span> 5 Churchill Court, Ground Floor, 58
              Station Road, North Harrow, Middlesex, HA2 7SA
            </div>
            <div>
              <span>United States of America</span> #15910, Euclid Ave, Chino,
              CA 91708
            </div>
            <div>
              <span>United Arab Emirates</span> Warehouse CB-02, Street 418 Near
              Roundabout 8, Jafza Dubai United Arab Emirates.
            </div>
            <div>
              <span>Phone</span> +91-9876543210
            </div>
            <div>
              <span>Email</span> support@novelingredients.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
