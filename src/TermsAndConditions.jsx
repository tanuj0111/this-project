import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="tc-page">
      {/* HEADER */}
      <header className="tc-header">
        <div className="tc-logo">
          <div className="tc-logo-conscious">conscious</div>
          <div className="tc-logo-karma">KARMA</div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="tc-content">
        <h1 className="tc-title">Terms and Conditions</h1>

        <section className="tc-section">
          <h2 className="tc-heading">1. Introduction</h2>
          <p className="tc-text">Welcome to Conscious Karma.</p>
          <p className="tc-text">
            By accessing or using our website (www.consciouskarma.co) and its
            services, you agree to comply with and be bound by these Terms and
            Conditions.
          </p>
          <p className="tc-text">Please read them carefully before proceeding.</p>
        </section>

        <div className="tc-divider"></div>

        <section className="tc-section">
          <h2 className="tc-heading">2. Accountability</h2>
          <p className="tc-text">
            You are responsible for any actions or decisions taken based on the
            insights provided by our services.
          </p>
        </section>

        <div className="tc-divider"></div>

        <section className="tc-section">
          <h2 className="tc-heading">3. Booking and Payments</h2>
          <ul className="tc-list">
            <li className="tc-list-item">
              <strong>Service Fees:</strong> All fees for consultations and
              reports are listed on our website and may change without prior
              notice.
            </li>
            <li className="tc-list-item">
              <strong>Payment:</strong> Payments must be completed in full at
              the time of booking. All transactions are processed securely
              through trusted third-party payment gateways. Conscious Karma does
              not store your payment details.
            </li>
            <li className="tc-list-item">
              <strong>Refund Policy:</strong> All purchases are final and
              non-refundable once processing has begun. (Please refer to our
              Refund Policy for details.)
            </li>
          </ul>
        </section>

        <div className="tc-divider"></div>

        <section className="tc-section">
          <h2 className="tc-heading">4. Use of Information</h2>
          <p className="tc-text">
            We use the information you provide for the following purposes:
          </p>
          <ol className="tc-list tc-list-ordered">
            <li className="tc-list-item">
              To prepare and deliver personalised reports and consultations.
            </li>
            <li className="tc-list-item">
              To manage orders, payments, and communication.
            </li>
            <li className="tc-list-item">
              To improve website functionality and service experience.
            </li>
            <li className="tc-list-item">
              To send updates or communication only if you have opted in.
            </li>
            <li className="tc-list-item">
              To comply with legal or regulatory requirements.
            </li>
          </ol>
        </section>

        <div className="tc-divider"></div>

        <section className="tc-section">
          <h2 className="tc-heading">5. Sharing of Information</h2>
          <p className="tc-text">
            We respect your privacy and only share your information in the
            following circumstances:
          </p>
          <ul className="tc-list">
            <li className="tc-list-item">
              <strong>Service Providers:</strong> With third-party vendors who
              assist in payment processing, communication, or service delivery.
            </li>
            <li className="tc-list-item">
              <strong>Legal Obligations:</strong> When required by law or to
              protect our rights, users, or business operations.
            </li>
          </ul>
        </section>

        <div className="tc-divider"></div>

        <section className="tc-section">
          <h2 className="tc-heading">6. Third-Party Links</h2>
          <p className="tc-text">
            Our website may contain links to external websites or resources.
          </p>
          <p className="tc-text">
            Conscious Karma is not responsible for the content, accuracy, or
            privacy practices of these third-party sites. Please review their
            terms and policies before use.
          </p>
        </section>

        <div className="tc-divider"></div>

        <section className="tc-section">
          <h2 className="tc-heading">7. Prohibited Activities</h2>
          <p className="tc-text">You agree not to:</p>
          <ol className="tc-list tc-list-ordered">
            <li className="tc-list-item">
              Use the website or its services for any unlawful or unauthorised
              purpose.
            </li>
            <li className="tc-list-item">
              Interfere with or disrupt website functionality, data, or security
              systems.
            </li>
            <li className="tc-list-item">
              Misrepresent your identity or provide false information.
            </li>
          </ol>
        </section>

        <div className="tc-divider"></div>

        <section className="tc-section">
          <h2 className="tc-heading">8. Modifications</h2>
          <p className="tc-text">
            Conscious Karma reserves the right to update or modify these Terms
            and Conditions at any time without prior notice.
          </p>
          <p className="tc-text">
            Continued use of the website or services after changes are posted
            constitutes acceptance of the updated terms.
          </p>
        </section>

        <div className="tc-divider"></div>

        <section className="tc-section">
          <h2 className="tc-heading">9. Contact</h2>
          <p className="tc-text">
            For questions regarding these Terms and Conditions, please contact
            us at:
          </p>
          <p className="tc-contact">hello@consciouskarma.co</p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="tc-footer">
        <p>© 2025 Conscious Karma. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
