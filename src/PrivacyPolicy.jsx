import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="pp-page">
      {/* HEADER */}
      <header className="pp-header">
        <div className="pp-logo">
          <div className="pp-logo-conscious">conscious</div>
          <div className="pp-logo-karma">KARMA</div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pp-content">
        <h1 className="pp-title">Privacy Policy</h1>

        <p className="pp-intro">
          At Conscious Karma, we respect your privacy and are committed to
          protecting your personal information.
        </p>

        <section className="pp-section">
          <h2 className="pp-heading">1. Information We Collect</h2>
          <p className="pp-text">
            We collect basic personal details (such as name, email, gender, age,
            and mobile numbers) that you voluntarily share while booking a
            service or requesting a report.
          </p>
        </section>

        <div className="pp-divider"></div>

        <section className="pp-section">
          <h2 className="pp-heading">2. How We Use Your Information</h2>
          <ul className="pp-list">
            <li className="pp-list-item">
              To generate your personalised report or consultation.
            </li>
            <li className="pp-list-item">
              To contact you regarding updates or clarifications related to your
              order.
            </li>
            <li className="pp-list-item">
              To improve our services and user experience.
            </li>
          </ul>
        </section>

        <div className="pp-divider"></div>

        <section className="pp-section">
          <h2 className="pp-heading">3. Data Security</h2>
          <p className="pp-text">
            Your information is stored securely and is never shared with third
            parties, except where required by law.
          </p>
        </section>

        <div className="pp-divider"></div>

        <section className="pp-section">
          <h2 className="pp-heading">4. Payment Information</h2>
          <p className="pp-text">
            All payments are processed through secure and encrypted third-party
            gateways. We do not store your card or banking details.
          </p>
        </section>

        <div className="pp-divider"></div>

        <section className="pp-section">
          <h2 className="pp-heading">5. Communication</h2>
          <p className="pp-text">
            You may occasionally receive service-related or informational emails.
            You can opt out of non-essential communications at any time.
          </p>
        </section>

        <div className="pp-divider"></div>

        <section className="pp-section">
          <h2 className="pp-heading">6. Your Consent</h2>
          <p className="pp-text">
            By using our website and services, you consent to the collection and
            use of your information as described in this policy.
          </p>
        </section>

        <div className="pp-divider"></div>

        <section className="pp-section">
          <h2 className="pp-heading">Contact</h2>
          <p className="pp-text">
            For any privacy-related questions, contact us at:
          </p>
          <p className="pp-contact">hello@consciouskarma.co</p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="pp-footer">
        <p>© 2025 Conscious Karma. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
