import { Link } from 'react-router-dom';
import styles from './LegalPages.module.css'; // Ensure this file exists and contains the required class definitions

const TermsOfUse = () => {
  return (
    <div className={styles.legalContainer}>
      <div className={styles.legalContent}>
        <h1 className={styles.legalTitle}>Terms of Use</h1>
        <p className={styles.lastUpdated}>Last Updated: June 1, 2023</p>

        <section className={styles.legalSection}>
          <h2>1. Acceptance of Terms</h2>
          <p>Welcome to SnapStore. By accessing or using our website, mobile application, or any of our services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>2. Description of Service</h2>
          <p>SnapStore is a platform connecting photographers with clients seeking photography services. We provide a marketplace for booking, showcasing portfolios, and facilitating transactions between photographers and clients.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>3. User Accounts</h2>
          <p>To access certain features of our service, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>4. User Conduct</h2>
          <p>You agree not to use the service to:</p>
          <ul>
            <li>Violate any laws or regulations</li>
            <li>Infringe on the rights of others</li>
            <li>Distribute spam or malicious content</li>
            <li>Impersonate any person or entity</li>
            <li>Interfere with or disrupt the service</li>
          </ul>
        </section>

        <section className={styles.legalSection}>
          <h2>5. Content</h2>
          <p>Users retain all ownership rights to their content. By uploading content to SnapStore, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection with the service.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>6. Payments and Fees</h2>
          <p>SnapStore may charge fees for certain services. All fees are non-refundable unless otherwise stated. We use third-party payment processors and you agree to their terms of service when making payments through our platform.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>7. Termination</h2>
          <p>We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users, us, or third parties, or for any other reason.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>8. Disclaimers and Limitations of Liability</h2>
          <p>The service is provided &quot;as is&quot; without warranties of any kind. In no event shall SnapStore be liable for any damages arising out of or in connection with the use or inability to use the service.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>9. Changes to Terms</h2>
          <p>We may modify these Terms of Use at any time. We will notify users of any significant changes. Your continued use of the service after such modifications constitutes your acceptance of the updated terms.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>10. Contact Information</h2>
          <p>If you have any questions about these Terms of Use, please contact us at legal@snapstore.com.</p>
        </section>

        <div className={styles.legalFooter}>
          <Link to="/" className={styles.backLink}>Back to Home</Link>
          <Link to="/privacy-policy" className={styles.otherLegalLink}>Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
