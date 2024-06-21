import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Image from "next/image";

import { checkAuth } from "@/utils/checkAuth";

import MainSlider from "@/components/MainSlider/MainSlider";
import ProductsList from "@/components/ProductsList/ProductsList";

import customFetch from "@/utils/fetch.util";

import styles from "./page.module.css";

export const metadata = {
  title: process.env.APP_NAME,
};

const Home = async () => {
  const isAuthenticated = checkAuth();

  const reqCategories = await customFetch("/categories/featured");
  const categories = await reqCategories.json();

  const reqBestSelling = await customFetch("/products/best-selling");
  const bestSelling = await reqBestSelling.json();

  const reqNewArrivals = await customFetch("/products/new-arrivals");
  const newArrivals = await reqNewArrivals.json();

  return (
    <div className={["page-content", styles.Home].join(" ")}>
      <MainSlider />
      <div className={styles.FeaturedCategories}>
        <div className="container">
          <h2>Featured Categories</h2>
          <div className={styles.Categories}>
            {categories.map((item) => {
              return (
                <div className={styles.Category} key={item.id}>
                  <div className={styles.Image}>
                    <Image
                      src={item.photo}
                      width={236}
                      height={238}
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.Desc}>
                    <div>
                      <h3>
                        <Link href={`/products?categories=${item.name}`}>
                          {item.name}
                        </Link>
                      </h3>
                      <Link href={`/products?categories=${item.name}`}>
                        Shop Now <MdKeyboardDoubleArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.BestSellers}>
        <div className="container">
          <h2>Best Selling Products</h2>
          <ProductsList
            products={bestSelling}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
      <div className={styles.NewProducts}>
        <div className="container">
          <h2>New Arrivals</h2>
          <ProductsList
            products={newArrivals}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
      <div className={styles.WhyUs}>
        <div className={["container", styles.Container].join(" ")}>
          <h2>Why Ingredients Bank?</h2>
          <p>
            Ingredients Bank is the premier e-commerce marketplace for bulk and
            wholesale ingredients. With B2B transactions increasingly moving
            online, we are at the forefront of the digital revolution thanks to
            our cutting-edge technology and a fearless focus on innovation. As
            we help build a new kind of supply chain, we firmly believe that our
            continued ability to lead depends on the growth of the businesses
            who buy and sell on Ingredients Bank. That&#39;s why our main
            priority at all times is to create maximum value for them. It is our
            conviction that when all of us are at our best, today&#39;s
            challenges in ingredient sourcing can serve as powerful launch pads
            toward a brighter future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
