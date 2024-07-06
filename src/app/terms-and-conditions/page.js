import styles from "./page.module.css";

export const metadata = {
  title: `Terms and Conditions - ${process.env.APP_NAME}`,
};

const termsAndConditions = async () => {
  return (
    <div className={["page-wrapper", styles.TermsAndConditions].join(" ")}>
      <div className="container">
        <h2>Terms and Conditions</h2>
        <h3>1. Introduction</h3>
        <p>
          Welcome to www.ingredientsbank.com. These terms and conditions outline
          the rules and regulations for the use of our website, located at
          www.ingredientsbank.com.
        </p>
        <p>
          By accessing this website, we assume you accept these terms and
          conditions. Do not continue to use www.ingredientsbank.com if you do
          not agree to all of the terms and conditions stated on this page.
        </p>
        <h3>2. Definitions</h3>
        <ul>
          <li>
            <strong>Company</strong>: Refers to Ingredients Bank, the provider
            of the services.
          </li>
          <li>
            <strong>User</strong>: Refers to any individual or entity accessing
            our website.
          </li>
          <li>
            <strong>Products</strong>: Refers to the items available for sale on
            our website.
          </li>
          <li>
            <strong>Services</strong>: Refers to the e-commerce services
            provided by Ingredients Bank.
          </li>
        </ul>
        <h3>3. Use of Website</h3>
        <ul>
          <li>
            Users must be at least 18 years old or accessing the website under
            the supervision of a parent or legal guardian.
          </li>
          <li>
            Users are granted a non-transferable, revocable license to use the
            website for shopping for personal items sold on the site.
          </li>
          <li>
            Commercial use or use on behalf of any third party is prohibited,
            except as explicitly permitted by Ingredients Bank.
          </li>
        </ul>
        <h3>4. Account and Registration</h3>
        <ul>
          <li>
            Users must create an account to use certain features of the website.
          </li>
          <li>
            Users agree to provide accurate and complete information and to
            update it as necessary.
          </li>
          <li>
            Users are responsible for maintaining the confidentiality of their
            account information and for all activities that occur under their
            account.
          </li>
        </ul>
        <h3>5. Orders and Payment</h3>
        <ul>
          <li>All orders are subject to acceptance and availability.</li>
          <li>
            Ingredients Bank reserves the right to refuse or cancel any order
            for any reason.
          </li>
          <li>Payment must be made in full before products are shipped.</li>
        </ul>
        <h3>6. Pricing and Availability</h3>
        <ul>
          <li>Prices for products are subject to change without notice.</li>
          <li>
            Ingredients Bank strives to ensure the accuracy of all information
            but does not warrant that product descriptions or other content is
            accurate, complete, or error-free.
          </li>
        </ul>
        <h3>7. Shipping and Delivery</h3>
        <ul>
          <li>Shipping and delivery times are estimates and not guaranteed.</li>
          <li>
            Ingredients Bank is not responsible for delays caused by carriers or
            customs clearance processes.
          </li>
          <li>
            Shipping costs are non-refundable unless the product is damaged or
            defective.
          </li>
        </ul>
        <h3>8. Returns and Refunds</h3>
        <ul>
          <li>
            Users may return products within [X] days of receipt for a refund or
            exchange.
          </li>
          <li>
            Products must be returned in their original condition and packaging.
          </li>
          <li>
            Refunds will be processed within [X] days of receiving the returned
            item.
          </li>
        </ul>
        <h3>9. Intellectual Property</h3>
        <ul>
          <li>
            All content on the website, including text, graphics, logos, images,
            and software, is the property of Ingredients Bank and protected by
            applicable copyright and trademark laws.
          </li>
          <li>
            Users may not reproduce, distribute, or otherwise use any content
            without explicit permission from Ingredients Bank.
          </li>
        </ul>
        <h3>10. Limitation of Liability</h3>
        <ul>
          <li>
            Ingredients Bank is not liable for any direct, indirect, incidental,
            or consequential damages arising from the use or inability to use
            the website.
          </li>
          <li>
            This includes, but is not limited to, damages for loss of profits,
            data, or other intangibles.
          </li>
        </ul>
        <h3>11. Indemnification</h3>
        <ul>
          <li>
            Users agree to indemnify and hold Ingredients Bank, its affiliates,
            and employees harmless from any claim or demand, including
            reasonable attorney fees, arising out of their use of the website or
            violation of these terms.
          </li>
        </ul>
        <h3>12. Governing Law</h3>
        <ul>
          <li>
            These terms and conditions are governed by and construed in
            accordance with the laws of [Your Country/State], without regard to
            its conflict of law principles.
          </li>
          <li>
            Any disputes arising from these terms will be resolved in the courts
            of [Your Country/State].
          </li>
        </ul>
        <h3>13. Changes to Terms</h3>
        <ul>
          <li>
            Ingredients Bank reserves the right to modify these terms and
            conditions at any time.
          </li>
          <li>
            Users will be notified of any changes by posting the new terms on
            the website. Continued use of the website after such changes
            constitutes acceptance of the new terms.
          </li>
        </ul>
        <h3>14. Contact Information</h3>
        <ul>
          <li>
            For any questions or concerns about these terms and conditions,
            please contact us at [Your Contact Information].
          </li>
        </ul>
        <hr />
        <p>
          By using our website, you acknowledge that you have read, understood,
          and agree to be bound by these terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default termsAndConditions;
