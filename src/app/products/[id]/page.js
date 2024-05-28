import styles from "./page.module.css";

import { checkAuth } from "@/utils/checkAuth";
import customFetch from "@/utils/fetch.util";

import HtmlContent from "../../../components/HtmlContent/HtmlContent";
import LoginBtn from "@/components/LoginBtn/LoginBtn";
import Purchase from "@/components/Purchase/Purchase";

const ProductDetails = async ({ params, searchParams }) => {
  const isAuthenticated = checkAuth();
  const reqProduct = await customFetch(
    `/products/${params.id}?region=${searchParams.region}`
  );
  const product = await reqProduct.json();

  const categories = product.categories.map((item) => item.category);

  const reqDocuments = await customFetch(`/products/${params.id}/documents`);
  const documents = await reqDocuments.json();

  return (
    <div className={["page-wrapper", styles.ProductDetailsPage].join(" ")}>
      <div className="container">
        <div className={styles.PageContent}>
          <div className={styles.ProductImage}>
            <img src={product.images[0].url} alt={product.name} />
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
            <div className={[styles.Description, styles.HtmlContent].join(" ")}>
              <h3>Overview</h3>
              <HtmlContent html={product.description} />
            </div>
            <div className={[styles.Highlights, styles.HtmlContent].join(" ")}>
              <h3>Highlights</h3>
              <HtmlContent html={product.highlights} />
            </div>
          </div>
          <div className={styles.Documents}>
            {documents.documents.length ? (
              <div className={styles.ProductDocuments}>
                <h3>Product Documents</h3>
                <ul>
                  {documents.documents.map((item, i) => {
                    return (
                      <li key={i}>
                        {isAuthenticated ? (
                          <a href={item.document} target="_blank">
                            {item.name}
                          </a>
                        ) : (
                          <span>{item.name}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            {documents.certificates.length ? (
              <div className={styles.ProductCertifications}>
                <h3>Product Certifications</h3>
                <ul>
                  {documents.certificates.map((item, i) => {
                    return (
                      <li key={i}>
                        {isAuthenticated ? (
                          <a href={item.document} target="_blank">
                            {item.name}
                          </a>
                        ) : (
                          <span>{item.name}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;