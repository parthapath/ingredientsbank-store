import Link from "next/link";
import { cookies } from "next/headers";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import MainSlider from "@/components/MainSlider/MainSlider";
import ProductsList from "@/components/ProductsList/ProductsList";

import customFetch from "@/utils/fetch.util";

import styles from "./page.module.css";

const Home = async () => {
  const reqNewArrivals = await customFetch(`/products/new-arrivals?region=5`);
  console.log("reqNewArrivals", reqNewArrivals);
  const newArrivals = await reqNewArrivals.json();

  const reqCategories = await customFetch("/categories/featured");
  const categories = await reqCategories.json();

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
                    <img src={item.photo} />
                  </div>
                  <div className={styles.Desc}>
                    <div>
                      <h3>
                        <Link href={`/products?categories=${item.name}`}>
                          {item.name}
                        </Link>
                      </h3>
                      <p>{item.description}</p>
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
          <ProductsList products={newArrivals} />
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
            who buy and sell on Ingredients Online. That&#39;s why our main
            priority at all times is to create maximum value for them. It is our
            conviction that when all of us are at our best, today&#39;s
            challenges in ingredient sourcing can serve as powerful launch pads
            toward a brighter future.
          </p>
          <Link href="/">Read More</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
