import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

import styles from "./page.module.css";

import { checkAuth } from "@/utils/checkAuth";
import customFetch from "@/utils/fetch.util";

import HtmlContent from "../../../components/HtmlContent/HtmlContent";
import LoginBtn from "@/components/LoginBtn/LoginBtn";
import Purchase from "@/components/Purchase/Purchase";
import ProductEnquiryBtn from "@/components/ProductEnquiryBtn/ProductEnquiryBtn";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

// Metadata function to dynamically set the title
export async function generateMetadata({ params, searchParams }) {
  const reqProduct = await customFetch(
    `/products/${params.id}?region=${searchParams.region}`
  );
  const product = await reqProduct.json();

  if (!product.name) {
    return notFound();
  }

  const formatDescription = (str) => {
    return str
      .replace(/<\/?ul>/g, "")
      .replace(/<li>/g, "")
      .replace(/<\/li>/g, ", ")
      .replace(/^, |, $/g, "")
      .trim();
  };

  return {
    title: product.name,
    description: formatDescription(product.description),
    keywords: product.keywords,
    openGraph: {
      title: product.name,
      description: formatDescription(product.description),
      images: [
        {
          url: product.images[0].url,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: formatDescription(product.description),
      image: product.images[0].url,
    },
  };
}

const fetchProductDetails = async (id, region) => {
  const response = await customFetch(`/products/${id}?region=${region}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return response.json();
};

const fetchDocuments = async (id) => {
  const response = await customFetch(`/products/${id}/documents`);
  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }
  return response.json();
};

const fetchCertificates = async (id) => {
  const response = await customFetch(`/products/${id}/certificates`);
  if (!response.ok) {
    throw new Error("Failed to fetch certificates");
  }
  return response.json();
};

const DocumentsSection = async ({ id, isAuthenticated }) => {
  const documents = await fetchDocuments(id);
  return documents.length ? (
    <div className={styles.ProductDocuments}>
      <h3>Product Documents</h3>
      <ul>
        {documents.map((item, i) => (
          <li key={i}>
            {isAuthenticated ? (
              <a href={item.document} target="_blank">
                {item.name}
              </a>
            ) : (
              <span>{item.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

const CertificatesSection = async ({ id, isAuthenticated }) => {
  const certificates = await fetchCertificates(id);
  return certificates.length ? (
    <div className={styles.ProductCertifications}>
      <h3>Product Certifications</h3>
      <ul>
        {certificates.map((item, i) => (
          <li key={i}>
            {isAuthenticated ? (
              <a href={item.document} target="_blank">
                {item.name}
              </a>
            ) : (
              <span>{item.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

const ProductDetails = async ({ params, searchParams }) => {
  const isAuthenticated = checkAuth();

  const product = await fetchProductDetails(params.id, searchParams.region);
  const categories = product.categories.map((item) => item.category);

  return (
    <div className={["page-wrapper", styles.ProductDetailsPage].join(" ")}>
      <div className="container">
        <div className={styles.PageContent}>
          <div className={styles.Product}>
            <div className={styles.ProductImage}>
              <Image
                src={product.images[0].url}
                width={400}
                height={500}
                alt={product.name}
                loading="lazy"
              />
            </div>
            <div className={styles.ProductDetails}>
              <div className={styles.Overview}>
                <h1>{product.name}</h1>
                <h2>{product.alternate_name}</h2>
                <div className={styles.Sku}>
                  <div>
                    <span>Category:</span> {categories.join(", ")}
                  </div>
                  <div>
                    <span>SKU:</span> {product.sku}
                  </div>
                  <div>
                    <span>Code:</span> {product.code}
                  </div>
                </div>
              </div>
              {!isAuthenticated ? (
                <div className={styles.LoginRegister}>
                  <LoginBtn />
                </div>
              ) : (
                <div className={styles.PurchaseWrapper}>
                  <Purchase
                    id={product.id}
                    name={product.name}
                    alternateName={product.alternate_name}
                  />
                </div>
              )}
              <div
                className={[styles.Applications, styles.HtmlContent].join(" ")}
              >
                <h3>Applications</h3>
                <ul>
                  {product.applications.map((item, i) => {
                    return <li key={i}>{item.application}</li>;
                  })}
                </ul>
              </div>
              <div
                className={[styles.Description, styles.HtmlContent].join(" ")}
              >
                <h3>Overview</h3>
                <HtmlContent html={product.description} />
              </div>
              <div
                className={[styles.Highlights, styles.HtmlContent].join(" ")}
              >
                <h3>Highlights</h3>
                <HtmlContent html={product.highlights} />
              </div>
              {isAuthenticated ? (
                <div className={styles.ProductEnquiry}>
                  <ProductEnquiryBtn />
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.Documents}>
            <ErrorBoundary>
              <Suspense>
                <DocumentsSection
                  id={params.id}
                  isAuthenticated={isAuthenticated}
                />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
              <Suspense>
                <CertificatesSection
                  id={params.id}
                  isAuthenticated={isAuthenticated}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
