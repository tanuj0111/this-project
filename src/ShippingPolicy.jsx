import React from 'react';
import './ShippingPolicy.css';

const ShippingPolicy = () => {
  return (
    <div className="sp-container">
      <div className="sp-content">
        <h1 className="sp-title">Shipping & Delivery Policy</h1>
        
        <div className="sp-intro">
          <p>All our products are digital and delivered electronically—no physical shipping.</p>
        </div>

        <div className="sp-section">
          <h2 className="sp-heading">Delivery Method</h2>
          <p>After successful payment, you'll receive an order confirmation email and the PDF report sent to the email address provided at checkout.</p>
        </div>

        <div className="sp-divider"></div>

        <div className="sp-section">
          <h2 className="sp-heading">Delivery Time</h2>
          <ul className="sp-list">
            <li>
              <strong>Instant Report:</strong> Usually immediate; in rare cases, up to 1 hour.
            </li>
            <li>
              <strong>Personalised Report:</strong> 5–7 days. Any delays will be notified to the checkout email.
            </li>
          </ul>
        </div>

        <div className="sp-divider"></div>

        <div className="sp-section">
          <h2 className="sp-heading">If You Don't Receive Your Instant Report</h2>
          <p>Check your Spam/Junk folder. If it's not there within 1 hour, email <a href="mailto:hello@consciouskarma.co" className="sp-email">hello@consciouskarma.co</a> with your order email and the mobile number the report is for.</p>
        </div>

        <div className="sp-divider"></div>

        <div className="sp-section">
          <h2 className="sp-heading">Incorrect Email Entered</h2>
          <p>Email <a href="mailto:hello@consciouskarma.co" className="sp-email">hello@consciouskarma.co</a> with your name, order details, the correct email, and the mobile number; we'll resend access after verification.</p>
        </div>

        <div className="sp-divider"></div>

        <div className="sp-section">
          <h2 className="sp-heading">Non-Delivery</h2>
          <p>A digital order is considered delivered once the file is sent. If you report non-delivery, we'll reissue the file after verifying your order.</p>
        </div>

        <div className="sp-divider"></div>

        <div className="sp-section">
          <h2 className="sp-heading">Refunds</h2>
          <p>Because access is digital, all sales are generally final. Exceptions may apply for duplicate purchases, technical file issues, or failed delivery.</p>
        </div>

        <div className="sp-divider"></div>

        <div className="sp-footer">
          <p>For any questions, contact <a href="mailto:hello@consciouskarma.co" className="sp-email">hello@consciouskarma.co</a></p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
