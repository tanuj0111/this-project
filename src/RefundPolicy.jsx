import React from "react";
import "./RefundPolicy.css";

const RefundPolicy = () => {
  return (
    <div className="rp-page">
      {/* HEADER */}
      <header className="rp-header">
        <div className="rp-logo">
          <div className="rp-logo-conscious">conscious</div>
          <div className="rp-logo-karma">KARMA</div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="rp-content">
        <h1 className="rp-title">Refund & Cancellation Policy</h1>

        <section className="rp-section">
          <h2 className="rp-heading">Digital Products & Services</h2>
          <p className="rp-text">
            All our products and services are digitally delivered. Once payment
            is received, your order is confirmed and processed automatically, and
            we're therefore unable to offer cancellations or refunds.
          </p>
        </section>

        <div className="rp-divider"></div>

        <section className="rp-section">
          <h2 className="rp-heading">Video Consultations</h2>
          <p className="rp-text">
            For video consultations, rescheduling is possible up to 7 days before
            the scheduled slot and is subject to availability.
          </p>
        </section>

        <div className="rp-divider"></div>

        <section className="rp-section">
          <h2 className="rp-heading">Exceptional Circumstances</h2>
          <p className="rp-text">
            In rare situations such as a duplicate payment, technical issue, or
            non-delivery due to a system error, we will review the case and
            ensure a fair resolution — either by reissuing the report or
            correcting the payment.
          </p>
        </section>

        <div className="rp-divider"></div>

        <section className="rp-section">
          <h2 className="rp-heading">Important Note</h2>
          <p className="rp-text">
            Please make sure that your email address is entered correctly at
            checkout, as delivery depends on this information.
          </p>
        </section>

        <div className="rp-divider"></div>

        <section className="rp-section">
          <h2 className="rp-heading">Contact</h2>
          <p className="rp-text">
            For any queries or assistance, please contact us at:
          </p>
          <p className="rp-contact">hello@consciouskarma.co</p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="rp-footer">
        <p>© 2025 Conscious Karma. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RefundPolicy;
