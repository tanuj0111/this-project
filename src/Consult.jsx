import React, { useState } from 'react';
import ConsultationSection from './components/ConsultationSection.js';
import ConsultationPlans from './components/ConsultationPlans.js';
import ConsultationBookingForm from './components/ConsultationBookingForm.js';
import Home from './components/Home.js';
import FaqAccordion from './components/FaqAccordion.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Consult() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-black min-vh-100">
      <style>{`
        .consult-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: black;
          border-bottom: 2px solid #333;
        }
        
        .brand-logo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
        }
        
        .brand-top {
          font-family: 'Arsenal', system-ui, sans-serif;
          font-size: clamp(24px, 2.2vw, 32px);
          letter-spacing: 0.2px;
          color: #fff;
        }
        
        .brand-bottom {
          font-family: 'Balgin', 'Arsenal', system-ui, sans-serif;
          font-size: clamp(28px, 2.4vw, 36px);
          letter-spacing: 2px;
          color: #ff6b35;
          margin-top: 2px;
        }
        
        .hamburger {
          display: grid;
          place-items: center;
          gap: 6px;
          width: 46px;
          height: 42px;
          padding: 8px;
          border-radius: 12px;
          background: transparent;
          cursor: pointer;
          border: none;
        }
        
        .hamburger span {
          display: block;
          width: 24px;
          height: 3px;
          background: #ff6b35;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        
        .hamburger.is-open span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }
        
        .hamburger.is-open span:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger.is-open span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }
        
        .nav-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
          z-index: 1000;
        }
        
        .nav-drawer {
          position: fixed;
          top: 0;
          right: -340px;
          height: 100vh;
          width: min(340px, 92vw);
          background: #0f0f0f;
          border-left: 1px solid #333;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          z-index: 1001;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: right 0.28s ease;
        }
        
        .nav-drawer.open {
          right: 0;
        }
        
        .nav-title {
          font-family: 'Balgin', system-ui, sans-serif;
          font-weight: 800;
          font-size: 18px;
          margin-bottom: 8px;
          color: #fff;
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 14px;
          border: 1px solid #3a3a3a;
          border-radius: 12px;
          background: #141414;
          color: #f2f2f2;
          text-decoration: none;
          font-weight: 700;
          font-family: 'Balgin', system-ui, sans-serif;
        }
        
        .nav-link:hover {
          background: #191919;
          border-color: #555;
          color: #f2f2f2;
        }
        
        .nav-hint {
          font-size: 12px;
          color: #cfcfcf;
          font-family: 'Arsenal', system-ui, sans-serif;
        }
      `}</style>

      {/* Header */}
      <header className="consult-header">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-3">
            {/* Brand */}
            <a href="/" className="brand-logo text-decoration-none">
              <span className="brand-top">conscious</span>
              <span className="brand-bottom">KARMA</span>
            </a>

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? 'is-open' : ''}`}
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu Drawer */}
      {menuOpen && (
        <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />
      )}
      <nav className={`nav-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="nav-title">Menu</div>
        <a className="nav-link" href="/" onClick={() => setMenuOpen(false)}>
          Home <span className="nav-hint">/</span>
        </a>
        <a className="nav-link" href="/personalised-report" onClick={() => setMenuOpen(false)}>
          Personalised Report <span className="nav-hint">/personalised-report</span>
        </a>
        <a className="nav-link" href="/consult" onClick={() => setMenuOpen(false)}>
          Consult <span className="nav-hint">/consult</span>
        </a>
      </nav>

      {/* Main Content */}
      <Home />
      <ConsultationSection />
      <ConsultationPlans />
      <ConsultationBookingForm />
      <FaqAccordion />

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(180deg, #ff6b35, #f07a2e)',
        padding: '18px 0',
        marginTop: 0
      }}>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-12 col-md-auto mb-3 mb-md-0">
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                <a 
                  href="/termsandconditions" 
                  style={{
                    color: '#1d1209',
                    textDecoration: 'underline',
                    fontWeight: 700
                  }}
                >
                  Terms & Conditions
                </a>
                <a 
                  href="/privacy-policy"
                  style={{
                    color: '#1d1209',
                    textDecoration: 'underline',
                    fontWeight: 700
                  }}
                >
                  Privacy Policy
                </a>
                <a 
                  href="/refund-policy"
                  style={{
                    color: '#1d1209',
                    textDecoration: 'underline',
                    fontWeight: 700
                  }}
                >
                  Refund Policy
                </a>
                <a 
                  href="/shipping-policy"
                  style={{
                    color: '#1d1209',
                    textDecoration: 'underline',
                    fontWeight: 700
                  }}
                >
                  Shipping & Delivery
                </a>
              </div>
            </div>
            <div className="col-12 col-md-auto text-center text-md-end">
              <div style={{ color: '#1d1209', fontWeight: 700 }}>
                Contact Us – suma@consciouskarma.co
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
