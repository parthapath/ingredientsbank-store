import styles from "./page.module.css";

export const metadata = {
  title: `Privacy Policy - ${process.env.APP_NAME}`,
};

const privacyPolicy = async () => {
  return (
    <div className={["page-wrapper", styles.PrivacyPolicy].join(" ")}>
      <div className="container">
        <h2>Privacy Policy</h2>
        <h3>Introduction</h3>
        <p>
          Welcome to Ingredients Bank. We value your privacy and are committed
          to protecting your personal information. This Privacy Policy outlines
          how we collect, use, and safeguard your data when you visit our
          website,{" "}
          <a
            rel="noreferrer"
            target="_new"
            href="http://www.ingredientsbank.com"
          >
            www.ingredientsbank.com
          </a>
          .
        </p>
        <h3>Information We Collect</h3>
        <p>
          We collect various types of information in order to provide and
          improve our services:
        </p>
        <h4>Personal Information</h4>
        <ul>
          <li>
            <strong>Contact Information</strong>: Name, email address, phone
            number, and mailing address.
          </li>
          <li>
            <strong>Payment Information</strong>: Credit card details and
            billing information.
          </li>
          <li>
            <strong>Account Information</strong>: Username, password, and other
            account-related information.
          </li>
        </ul>
        <h4>Non-Personal Information</h4>
        <ul>
          <li>
            <strong>Browsing Information</strong>: IP address, browser type,
            operating system, and pages visited.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies</strong>: Information
            about your interaction with our website.
          </li>
        </ul>
        <h3>How We Use Your Information</h3>
        <p>We use the collected information for the following purposes:</p>
        <h4>To Provide and Improve Our Services</h4>
        <ul>
          <li>Process transactions and manage your orders.</li>
          <li>Provide customer support and respond to inquiries.</li>
          <li>
            Personalize your shopping experience and improve our website
            functionality.
          </li>
        </ul>
        <h4>For Communication</h4>
        <ul>
          <li>
            Send order confirmations, shipping notifications, and other
            transactional emails.
          </li>
          <li>
            Send promotional emails and newsletters (you can opt-out at any
            time).
          </li>
        </ul>
        <h4>For Legal and Compliance Purposes</h4>
        <ul>
          <li>
            Comply with legal obligations and enforce our terms and conditions.
          </li>
          <li>Protect against fraud and unauthorized transactions.</li>
        </ul>
        <h3>How We Share Your Information</h3>
        <p>
          We do not sell or rent your personal information to third parties.
          However, we may share your data with:
        </p>
        <h4>Service Providers</h4>
        <ul>
          <li>
            Third-party companies that assist us with order processing, payment
            processing, shipping, and marketing.
          </li>
        </ul>
        <h4>Legal Requirements</h4>
        <ul>
          <li>
            Authorities or legal entities when required by law or to protect our
            rights and safety.
          </li>
        </ul>
        <h3>Data Security</h3>
        <p>
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction. These measures include encryption, secure servers, and
          regular security assessments.
        </p>
        <h3>Cookies and Tracking Technologies</h3>
        <p>
          We use cookies and similar tracking technologies to enhance your
          browsing experience. You can choose to disable cookies through your
          browser settings, but this may affect the functionality of our
          website.
        </p>
        <h3>Your Rights</h3>
        <p>
          You have the following rights regarding your personal information:
        </p>
        <ul>
          <li>
            <strong>Access</strong>: Request a copy of the personal information
            we hold about you.
          </li>
          <li>
            <strong>Correction</strong>: Request corrections to any inaccurate
            or incomplete information.
          </li>
          <li>
            <strong>Deletion</strong>: Request the deletion of your personal
            information, subject to legal obligations.
          </li>
          <li>
            <strong>Opt-Out</strong>: Unsubscribe from marketing communications
            at any time.
          </li>
        </ul>
        <h3>Third-Party Links</h3>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these external
          sites. We encourage you to review the privacy policies of any
          third-party sites you visit.
        </p>
        <h3>Children&apos;s Privacy</h3>
        <p>
          Our website is not intended for children under the age of 13. We do
          not knowingly collect personal information from children. If we become
          aware of such data, we will take steps to delete it.
        </p>
        <h3>Changes to This Privacy Policy</h3>
        <p>
          We may update this Privacy Policy periodically. Any changes will be
          posted on this page with an updated revision date. We encourage you to
          review this policy regularly to stay informed about how we protect
          your information.
        </p>
        <h3>Contact Us</h3>
        <p>
          If you have any questions or concerns about our Privacy Policy or how
          we handle your personal information, please contact us at:
        </p>
        <p>
          <strong>Email</strong>:{" "}
          <a rel="noreferrer">privacy@ingredientsbank.com</a>
          <br />
          <strong>Phone</strong>: [Your Customer Service Phone Number]
          <br />
          <strong>Address</strong>: Ingredients Bank, [Your Business Address]
        </p>
        <hr />
        <p>
          By using our website, you consent to the terms of this Privacy Policy.
          Thank you for trusting Ingredients Bank with your personal
          information.
        </p>
      </div>
    </div>
  );
};

export default privacyPolicy;
