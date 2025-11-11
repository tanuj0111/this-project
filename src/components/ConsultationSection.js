import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ConsultationSection() {
  return (
    <section className="d-flex align-items-center justify-content-center bg-black text-white">
      <div className="container py-5">
        <div
          className="text-center mx-auto"
          style={{ maxWidth: '800px' }}
        >
          {/* Main Description */}
          <div className="text-start mx-auto" style={{ display: 'inline-block', textAlign: 'left' }}>
            <p className="fs-4 fs-md-4 fw-light mb-4">
              At Conscious Karma, we understand what an<br className="d-none d-md-block" />
              aligned number can bring to a person's life.<br className="d-none d-md-block" />
              Our consultation is designed to help you find<br className="d-none d-md-block" />
              that alignment –
            </p>

            {/* Process Description */}
            <p className="fs-4 fs-md-4 fw-light mb-4">
              beginning with a discovery form,<br className="d-none d-md-block" />
              moving to a focused 25-minute video call,<br className="d-none d-md-block" />
              followed continued guidance on chat<br className="d-none d-md-block" />
              until the right number is chosen.
            </p>
          </div>

          {/* CTA Text */}
          <div className="mt-4">
            <h2 className="fw-semibold mb-1" style={{ color: '#ff6b35' }}>
              Change your number
            </h2>
            <h2 className="fw-semibold" style={{ color: '#ff6b35' }}>
              Change your destiny
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
