"use client";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import MainSlider from "@/components/MainSlider/MainSlider";
import ProductsList from "@/components/ProductsList/ProductsList";

import { server } from "@/config";

import styles from "./page.module.css";

const Home = async () => {
  const reqBestSeller = await fetch(`${server}/static/best-seller.json`);
  const bestSeller = await reqBestSeller.json();

  const reqNewArrivals = await fetch(`${server}/static/new-arrivals.json`);
  const newArrivals = await reqNewArrivals.json();

  return (
    <div className={["page-content", styles.Home].join(" ")}>
      <MainSlider />
      <div className={styles.FeaturedCategories}>
        <div className="container">
          <h2>Featured Categories</h2>
          <div className={styles.Categories}>
            <div className={styles.Category}>
              <div className={styles.Image}>
                <img src="/assets/imgs/categories/q.png" />
              </div>
              <div className={styles.Desc}>
                <div>
                  <h3>
                    <Link href="/products/amino-acids">Amino Acids</Link>
                  </h3>
                  <p>
                    Amino acids are the building blocks of protein, and there is
                    a wide range that can be used.
                  </p>
                  <Link href="/products/amino-acids">
                    Shop Now <MdKeyboardDoubleArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.Category}>
              <div className={styles.Image}>
                <img src="/assets/imgs/categories/e.png" />
              </div>
              <div className={styles.Desc}>
                <div>
                  <h3>
                    <Link href="/products/amino-acids">Amino Acids</Link>
                  </h3>
                  <p>
                    Amino acids are the building blocks of protein, and there is
                    a wide range that can be used.
                  </p>
                  <Link href="/products/amino-acids">
                    Shop Now <MdKeyboardDoubleArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.Category}>
              <div className={styles.Image}>
                <img src="/assets/imgs/categories/r.png" />
              </div>
              <div className={styles.Desc}>
                <div>
                  <h3>
                    <Link href="/products/amino-acids">Amino Acids</Link>
                  </h3>
                  <p>
                    Amino acids are the building blocks of protein, and there is
                    a wide range that can be used.
                  </p>
                  <Link href="/products/amino-acids">
                    Shop Now <MdKeyboardDoubleArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.Category}>
              <div className={styles.Image}>
                <img src="/assets/imgs/categories/t.png" />
              </div>
              <div className={styles.Desc}>
                <div>
                  <h3>
                    <Link href="/products/amino-acids">Amino Acids</Link>
                  </h3>
                  <p>
                    Amino acids are the building blocks of protein, and there is
                    a wide range that can be used.
                  </p>
                  <Link href="/products/amino-acids">
                    Shop Now <MdKeyboardDoubleArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.Category}>
              <div className={styles.Image}>
                <img src="/assets/imgs/categories/w.png" />
              </div>
              <div className={styles.Desc}>
                <div>
                  <h3>
                    <Link href="/products/amino-acids">Amino Acids</Link>
                  </h3>
                  <p>
                    Amino acids are the building blocks of protein, and there is
                    a wide range that can be used.
                  </p>
                  <Link href="/products/amino-acids">
                    Shop Now <MdKeyboardDoubleArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.Category}>
              <div className={styles.Image}>
                <img src="/assets/imgs/categories/y.png" />
              </div>
              <div className={styles.Desc}>
                <div>
                  <h3>
                    <Link href="/products/amino-acids">Amino Acids</Link>
                  </h3>
                  <p>
                    Amino acids are the building blocks of protein, and there is
                    a wide range that can be used.
                  </p>
                  <Link href="/products/amino-acids">
                    Shop Now <MdKeyboardDoubleArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.BestSellers}>
        <div className="container">
          <h2>Best Selling Products</h2>
          <ProductsList products={bestSeller} />
        </div>
      </div>
      <div className={styles.NewProducts}>
        <div className="container">
          <h2>New Arrivals</h2>
          <ProductsList products={newArrivals} />
        </div>
      </div>
      <div className={styles.WhyUs}>
        <div className={["container", styles.Container].join(" ")}>
          <h2>Why Novel Ingredients?</h2>
          <p>
            Ingredients Online is the premier e-commerce marketplace for bulk
            and wholesale ingredients. With B2B transactions increasingly moving
            online, we are at the forefront of the digital revolution thanks to
            our cutting-edge technology and a fearless focus on innovation. As
            we help build a new kind of supply chain, we firmly believe that our
            continued ability to lead depends on the growth of the businesses
            who buy and sell on Ingredients Online. That&#39;s why our main priority
            at all times is to create maximum value for them. It is our
            conviction that when all of us are at our best, today&#39;s challenges
            in ingredient sourcing can serve as powerful launch pads toward a
            brighter future.
          </p>
          <Link href="/">Read More</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
