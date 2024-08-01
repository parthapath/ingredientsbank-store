import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

import styles from "./Footer.module.css";

import NewsLetterForm from "../NewsletterForm/NewsletterForm";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className="container">
        <div className={styles.ContentWrapper}>
          <div className={styles.About}>
            <div className={styles.Logo}>
              <Link href="/">
                <Image
                  src="/assets/imgs/logo.png"
                  width={234}
                  height={70}
                  alt="Ingredients Bank"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
          <div className={styles.Menu}>
            <h4>About</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
            </ul>
          </div>
          <div className={styles.Menu}>
            <h4>Help</h4>
            <ul>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/shipping-and-returns">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/faq">FAQs</Link>
              </li>
            </ul>
          </div>
          <div className={styles.Contact}>
            <h4>Contact</h4>
            <div>
              <span>Phone</span>
              <div className={styles.ContactNo}>
                <span>+971-553599144</span>
                <span>+1-862 367-5128</span>
              </div>
            </div>
            <div>
              <span>Email</span> <div>support@ingredientsbank.com</div>
            </div>
          </div>
          <div className={styles.NewsLetter}>
            <h4>Subscribe to our Newsletter</h4>
            <p>For product announcements and offers</p>
            <div className={styles.FormWrapper}>
              <NewsLetterForm />
            </div>
          </div>
        </div>

        <div className={styles.Terms}>
          <ul>
            <li>Ingredients Bank. © 2024 All Rights Reserved</li>
            <li>
              <Link href="/terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
