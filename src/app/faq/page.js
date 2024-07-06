import styles from "./page.module.css";

const Faq = () => {
  return (
    <div className={["page-wrapper", styles.Faq].join(" ")}>
      <div className="container">
        <h2>Frequently Asked Questions (FAQ)</h2>
        <p>
          Welcome to the Ingredients Bank FAQ page! Here, you&apos;ll find answers to
          some of the most commonly asked questions about our products,
          services, and policies. If you have any additional questions, please
          feel free to contact us.
        </p>
        <h3>General Questions</h3>
        <p>
          <strong>Q: What is Ingredients Bank?</strong> A: Ingredients Bank is
          an online store offering a wide range of high-quality ingredients for
          culinary enthusiasts and professional chefs. We specialize in sourcing
          unique and hard-to-find ingredients to enhance your culinary
          creations.
        </p>
        <p>
          <strong>Q: How can I contact Ingredients Bank?</strong> A: You can
          contact us via email at{" "}
          <a rel="noreferrer">support@ingredientsbank.com</a> or by phone at
          [Your Customer Service Phone Number]. Our customer service team is
          available [Your Customer Service Hours].
        </p>
        <h3>Ordering and Payment</h3>
        <p>
          <strong>Q: How do I place an order?</strong> A: To place an order,
          simply browse our website, add items to your cart, and proceed to
          checkout. You will need to create an account or log in to complete
          your purchase.
        </p>
        <p>
          <strong>Q: What payment methods do you accept?</strong> A: We accept
          major credit cards (Visa, MasterCard, American Express, Discover) and
          other payment methods as indicated at checkout.
        </p>
        <p>
          <strong>Q: Can I change or cancel my order?</strong> A: If you need to
          change or cancel your order, please contact us immediately at
          <a rel="noreferrer">support@ingredientsbank.com</a>. We will do our
          best to accommodate your request, but please note that we cannot make
          changes once the order has been processed and shipped.
        </p>
        <h3>Shipping</h3>
        <p>
          <strong>Q: What are your shipping options and costs?</strong> A: We
          offer standard, expedited, and international shipping options.
          Shipping costs are calculated at checkout based on the weight and
          destination of your order. For more details, please visit our 
          <a rel="noreferrer">Shipping &amp; Returns</a> page.
        </p>
        <p>
          <strong>Q: How long does shipping take?</strong> A: Standard shipping
          typically takes 5-7 business days, while expedited shipping takes 2-3
          business days. International shipping times vary by destination.
          Please note that these are estimated delivery times and may vary based
          on carrier and location.
        </p>
        <p>
          <strong>Q: How can I track my order?</strong> A: Once your order is
          shipped, you will receive an email with a tracking number. You can use
          this number to track your order on the carrier&apos;s website.
        </p>
        <h3>Returns and Refunds</h3>
        <p>
          <strong>Q: What is your return policy?</strong> A: We accept returns
          within 30 days of receipt for a refund or exchange. Items must be
          unused, in their original packaging, and in the same condition as when
          you received them. For more information, please visit our
          <a rel="noreferrer">Shipping &amp; Returns</a> page.
        </p>
        <p>
          <strong>Q: How do I return an item?</strong> A: To return an item,
          contact our customer service at
          <a rel="noreferrer">support@ingredientsbank.com</a> to request a
          return authorization. Include the original receipt or proof of
          purchase with your return package and send it to the address provided
          by our customer service team.
        </p>
        <p>
          <strong>Q: When will I receive my refund?</strong> A: Refunds are
          processed within 5-7 business days of receiving the returned item. You
          will be notified via email once your refund has been processed.
        </p>
        <h3>Products</h3>
        <p>
          <strong>Q: Are your products organic or non-GMO?</strong> A: We offer
          a variety of products, including organic and non-GMO options. Each
          product page includes detailed information about its specifications.
          If you have specific dietary preferences or requirements, please check
          the product description before purchasing.
        </p>
        <p>
          <strong>
            Q: How can I find out more information about a product?
          </strong>{" "}
          A: Each product page includes a detailed description, ingredients
          list, and usage information. If you have additional questions, please
          contact us at
          <a rel="noreferrer">support@ingredientsbank.com</a>.
        </p>
        <p>
          <strong>Q: Do you offer bulk or wholesale purchasing options?</strong>{" "}
          A: Yes, we offer bulk and wholesale purchasing options for certain
          products. Please contact our sales team at
          <a rel="noreferrer">sales@ingredientsbank.com</a> for more information
          and pricing.
        </p>
        <h3>Account and Website</h3>
        <p>
          <strong>Q: How do I create an account?</strong> A: To create an
          account, click on the &quot;Sign Up&quot; or &quot;Create Account&quot; link at the top of
          our website and fill in the required information. You will receive a
          confirmation email once your account is created.
        </p>
        <p>
          <strong>Q: What should I do if I forget my password?</strong> A: If
          you forget your password, click on the &quot;Forgot Password&quot; link on the
          login page and follow the instructions to reset your password. You
          will receive an email with a link to create a new password.
        </p>
        <p>
          <strong>Q: How do I update my account information?</strong> A: To
          update your account information, log in to your account and navigate
          to the &quot;Account Settings&quot; or &quot;Profile&quot; section. Here, you can update
          your contact details, shipping address, and other preferences.
        </p>
        <h3>Privacy and Security</h3>
        <p>
          <strong>Q: How do you protect my personal information?</strong> A: We
          implement various security measures to protect your personal
          information, including encryption, secure servers, and regular
          security assessments. For more details, please visit our{" "}
          <a rel="noreferrer">Privacy Policy</a> page.
        </p>
        <p>
          <strong>Q: Will my information be shared with third parties?</strong>{" "}
          A: We do not sell or rent your personal information to third parties.
          However, we may share your data with service providers who assist us
          in operating our website and conducting our business. For more
          information, please visit our
          <a rel="noreferrer">Privacy Policy</a> page.
        </p>
        <hr />
        <p>
          If you have any further questions, please do not hesitate to contact
          us at
          <a rel="noreferrer">support@ingredientsbank.com</a>. Thank you for
          choosing Ingredients Bank!
        </p>
      </div>
    </div>
  );
};

export default Faq;
