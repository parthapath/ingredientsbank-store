import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { RiShieldUserLine } from "react-icons/ri";
import { PiSealCheckBold } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { LuHeartHandshake } from "react-icons/lu";
import { TbCertificate } from "react-icons/tb";

import styles from "./page.module.css";

import { checkAuth } from "@/utils/checkAuth";
import customFetch from "@/utils/fetch.util";

import MainSlider from "@/components/MainSlider/MainSlider";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import CategoryList from "@/components/CategoryList/CategoryList";
import Regions from "@/components/Regions/Regions";
import Slide from "@/components/Slide/Slide";
import FadeIn from "@/components/FadeIn/FadeIn";

export const metadata = {
  title: process.env.APP_NAME,
};

const fetchCategories = async () => {
  const response = await customFetch("/categories/featured");
  if (!response.ok) {
    throw new Error("Failed to fetch Featured Categories");
  }
  return response.json();
};

const fetchAllCategories = async () => {
  const response = await customFetch("/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch Categories");
  }
  return response.json();
};

const FeaturedCategoriesSection = async () => {
  const categories = await fetchCategories();
  return (
    <div className={styles.FeaturedCategories}>
      <div className="container">
        <div className={styles.SubTitle}>
          <h2>Promotional Products | Upto 30% off</h2>
          <Link href="/products?categories=">View All</Link>
        </div>
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

const OurCategories = async () => {
  const categories = await fetchAllCategories();
  return (
    <div className={styles.BestSellers}>
      <div className="container">
        <div className={styles.SubTitle}>
          <h2>We Supply</h2>
          <Link href="/products?categories=">View All</Link>
        </div>
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

const Home = async () => {
  const isAuthenticated = checkAuth();

  return (
    <div className={["page-content", styles.Home].join(" ")}>
      <div className={styles.SubHeader}>
        <div className="container">
          <Slide delay={0.5}>
            <h1>Nutraceutical Ingredients Supplier</h1>
          </Slide>
        </div>
      </div>

      <div className={styles.MainSlider}>
        <ErrorBoundary>
          <MainSlider />
        </ErrorBoundary>
      </div>

      <div className={styles.Intro}>
        <div className="container">
          <FadeIn delay={0.3}>
            <h2>
              Are you looking for ingredients <br />
              in the
            </h2>
          </FadeIn>

          <Slide delay={0.4}>
            <div className={styles.Countries}>
              <Regions />
            </div>
          </Slide>
          
          <FadeIn delay={0.5}>
            <h3>
              Now, Buy Ingredients <br />@<br /> www.ingredientsbank.com
            </h3>
          </FadeIn>
        </div>
      </div>

      <Slide delay={0.5}>
        <div className={styles.Message}>
          <div className="container">
            <h3>
              We Are Your Trusted Ingredients Partner. &quot;We Deliver You,
              Wherever You Are.&quot;
            </h3>
          </div>
        </div>
      </Slide>

      <ErrorBoundary>
        <Suspense>
          <Slide delay={0.7}>
            <FeaturedCategoriesSection />
          </Slide>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense>
          <Slide delay={0.7}>
            <OurCategories isAuthenticated={isAuthenticated} />
          </Slide>
        </Suspense>
      </ErrorBoundary>

      <div className={styles.WhyUs}>
        <div className="container">
          <Slide delay={0.7}>
            <div className={styles.Content}>
              <p>
                <strong>Ingredients Bank™</strong> is a digital marketing
                website where you can find Nutraceutical Ingredients for your
                supplement formulation. Our ingredients are manufactured in
                India, and distributed globally through our supply chain system.
                Our distribution centers are located in USA, UK, EU & UAE.
                Ingredients Bank trademark owner is Novel Nutrientss, certified
                for FSSC 22000, Kosher, Halal, GMP, and Organic certification
                from reputed certifying bodies. We have a strong technical team
                to manufacture Nutra- ceuticals as per Global regulatory
                standards to supply them globally. We comply with the Ethical
                Business System. You can trust quality and performance because,
                through our continual global food hygiene and safety culture
                practices, we ensure that manufactured products are tested at
                each stage of the process and assure customers a high degree of
                confidence
              </p>
              <p>
                We acquire, supply, and develop ingredients for Nutraceutical
                industries and markets. We are well-known as pioneers in
                nutritional and wellness ingredients.
              </p>
            </div>
          </Slide>

          <div className={styles.SubTitle}>
            <h2>Why us</h2>
          </div>

          <Slide delay={0.5}>
            <div className={styles.Overview}>
              <div>
                <div>
                  <FadeIn delay={0.6}>
                    <RiShieldUserLine />
                  </FadeIn>
                </div>
                <div>We prioritize our customer&apos;s needs</div>
              </div>
              <div>
                <div>
                  <FadeIn delay={.8}>
                    <LuHeartHandshake />
                  </FadeIn>
                </div>
                <div>We always work for your demand</div>
              </div>
              <div>
                <div>
                  <FadeIn delay={1}>
                    <PiSealCheckBold />
                  </FadeIn>
                </div>
                <div>We carefully monitor the global regulatory system</div>
              </div>
              <div>
                <div>
                  <FadeIn delay={1.2}>
                    <TbTruckDelivery />
                  </FadeIn>
                </div>
                <div>Your annual demand is our special project</div>
              </div>
              <div>
                <div>
                  <FadeIn delay={1.4}>
                    <TbCertificate />
                  </FadeIn>
                </div>
                <div>Our Quality is always constant</div>
              </div>
            </div>
          </Slide>
        </div>
      </div>
      <div className={styles.Cetificates}>
        <div className="container">
          <ul>
            <Slide delay={0.5}>
              <li>
                <Image
                  src="/assets/imgs/certificates/kosher.png"
                  width={86}
                  height={86}
                  alt="Kosher"
                  loading="lazy"
                />
              </li>
            </Slide>

            <Slide delay={0.8}>
              <li>
                <Image
                  src="/assets/imgs/certificates/halal.png"
                  width={70}
                  height={70}
                  alt="Halal India"
                  loading="lazy"
                />
              </li>
            </Slide>
            <Slide delay={1.1}>
              <li>
                <Image
                  src="/assets/imgs/certificates/fssc-22000.png"
                  width={208}
                  height={38}
                  alt="FSSC 22000"
                  loading="lazy"
                />
              </li>
            </Slide>

            <Slide delay={1.3}>
              <li>
                <Image
                  src="/assets/imgs/certificates/gmp-quality.png"
                  width={70}
                  height={70}
                  alt="GMP Quality"
                  loading="lazy"
                />
              </li>
            </Slide>

            <Slide delay={1.6}>
              <li>
                <Image
                  src="/assets/imgs/certificates/fda.png"
                  width={114}
                  height={56}
                  alt="FDA"
                  loading="lazy"
                />
              </li>
            </Slide>

            <Slide delay={1.9}>
              <li>
                <Image
                  src="/assets/imgs/certificates/usda-organic.png"
                  width={86}
                  height={86}
                  alt="Organic"
                  loading="lazy"
                />
              </li>
            </Slide>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
