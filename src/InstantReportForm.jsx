// src/InstantReportForm.jsx
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const PRICE = 100; // paise (₹799)

export default function InstantReportForm({ 
  initialIsd = '+91', 
  initialMobile = '',
  ctaLabel = 'Pay & Get Report',
  onSubmit: onSubmitProp 
}) {
  // form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isd, setIsd] = useState(initialIsd);
  const [phone, setPhone] = useState(initialMobile);
  const [coupon, setCoupon] = useState('');
  const [accountChoice, setAccountChoice] = useState('guest'); // 'guest' | 'create'
  const [password, setPassword] = useState('');

  const [applying, setApplying] = useState(false);
  const [paying, setPaying] = useState(false);
  const [errors, setErrors] = useState({});
  const [couponInfo, setCouponInfo] = useState(null);

  // Update phone when initialMobile changes
  useEffect(() => {
    setPhone(initialMobile);
  }, [initialMobile]);

  // Update ISD when initialIsd changes
  useEffect(() => {
    setIsd(initialIsd);
  }, [initialIsd]);

  const finalAmount = useMemo(
    () => (!couponInfo ? PRICE : Math.max(0, couponInfo.finalAmount)),
    [couponInfo]
  );

  useEffect(() => {
    // load Razorpay checkout script once
    const src = 'https://checkout.razorpay.com/v1/checkout.js';
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email';
    if (!/^\d{10}$/.test(phone)) e.phone = 'Enter 10-digit mobile';
    if (accountChoice === 'create' && password.length < 6) e.password = 'Min 6 chars';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // const applyCoupon = async (ev) => {
  //   ev.preventDefault();
  //   if (!coupon) return;
  //   setApplying(true);

  //   try {
  //     const { data } = await axios.post(
  //       "http://13.61.5.172:8000/score",
  //       {
  //         coupon: coupon,
  //         mobile_number: "8860968260",
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-API-Key": "CK_Score_55bJ9rPp!2025", // ✅ include this header
  //         },
  //       }
  //     );

  //     if (!data.valid) throw new Error(data.message || "Invalid coupon");
  //     setCouponInfo(data);
  //     console.log("✅ SCORE API Response (Coupon Applied):", data);
  //   } catch (err) {
  //     setCouponInfo(null);
  //     alert(err?.response?.data?.message || err.message || "Coupon error");
  //   } finally {
  //     setApplying(false);
  //   }
  // };

    const applyCoupon = async (ev) => {
    ev.preventDefault();
    if (!coupon) return;
    setApplying(true);
    try {
      const { data } = await axios.post('http://localhost:4000/api/coupon/validate', {
        code: coupon,
        price: PRICE,
      });
      if (!data.valid) throw new Error(data.message || 'Invalid coupon');
      setCouponInfo(data);
    } catch (err) {
      setCouponInfo(null);
      alert(err?.response?.data?.message || err.message || 'Coupon error');
    } finally {
      setApplying(false);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    // Free flow (after coupon)
    if (finalAmount === 0) {
      setPaying(true);
      try {
        const { data } = await axios.post('http://localhost:4000/api/pay/create-order', {
          name,
          email,
          phone,
          coupon,
          accountChoice,
          password,
          price: PRICE,
        });
        if (!data.ok) throw new Error(data.message || 'Failed to create free order');
        await startReport(data.orderId);
      } catch (err) {
        alert(err?.response?.data?.message || err.message || 'Something went wrong');
      } finally {
        setPaying(false);
      }
      return;
    }

    // Paid flow
    setPaying(true);
    try {
      const { data } = await axios.post('http://localhost:4000/api/pay/create-order', {
        name,
        email,
        phone,
        coupon,
        accountChoice,
        password,
        price: PRICE,
      });
      const { ok, message, order, keyId, orderId } = data;

      console.log('Create order response:', data);
      if (!ok) throw new Error(message || 'Order creation failed');

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Conscious Karma',
        description: 'Instant Report',
        order_id: order.id,
        prefill: { name, email, contact: phone },
        theme: { color: '#ff8a3d' },
        handler: async (response) => {
          try {
            const { data: vj } = await axios.post('http://localhost:4000/api/pay/verify', {
              ...response,
              orderId,
            });
            if (!vj.ok) {
              alert('Payment verification failed');
              return;
            }
            try {
              const { data: scoreData } = await axios.post(
                "http://13.61.5.172:8000/score",
                {
                  mobile_number: phone, // ya jis number se user login hai
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": "CK_Score_55bJ9rPp!2025",
                  },
                }
              );

              console.log("✅ SCORE API Response:", scoreData);

              // ✅ 2️⃣ Send score mail to user
              try {
                const mailResp = await axios.post("http://localhost:4000/api/mail/score", {
                  email,      // user ke form se liya gaya email
                  scoreData,  // SCORE API ka response object
                });
                console.log("📩 Mail sent:", mailResp.data);
              } catch (mailErr) {
                console.error("❌ Mail error:", mailErr?.response?.data || mailErr.message);
              }

            } catch (apiErr) {
              console.error("❌ SCORE API Error:", apiErr?.response?.data || apiErr.message);
            }



            await startReport(orderId);
          } catch (err) {
            alert(err?.response?.data?.message || err.message || 'Verification error');
          }
        },
        modal: { ondismiss: () => setPaying(false) },
      };

      const rz = new window.Razorpay(options);
      rz.open();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || 'Checkout failed');
      setPaying(false);
    }
  };

  const startReport = async (orderId) => {
    const { data } = await axios.post('http://localhost:4000/api/report/start', { orderId });
    if (data.ok) {
      alert('Report is being generated and will be emailed shortly.');
    } else {
      alert(data.message || 'Could not start report');
    }
  };

  return (
    <section className="section" id="instant-report">
      <div className="container">
        <h2 className="h2">Get Your Instant Report</h2>
        <p className="lead">Enter details below. Apply a coupon or pay securely via Razorpay.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Name</label>
              <input
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
              {errors.name && <span style={styles.err}>{errors.name}</span>}
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
              {errors.email && <span style={styles.err}>{errors.email}</span>}
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Mobile Number</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <select
                  value={isd}
                  onChange={(e) => setIsd(e.target.value)}
                  style={{ ...styles.input, width: 100 }}
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+971">🇦🇪 +971</option>
                </select>
                <input
                  style={{ ...styles.input, flex: 1 }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit mobile"
                  maxLength={10}
                />
              </div>
              {errors.phone && <span style={styles.err}>{errors.phone}</span>}
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Coupon (optional)</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  style={{ ...styles.input, flex: 1 }}
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.trim())}
                  placeholder="e.g. CKFREE100"
                />
                <button
                  onClick={applyCoupon}
                  disabled={!coupon || applying}
                  type="button"
                  className="pillBtn"
                >
                  {applying ? 'Applying…' : 'Apply'}
                </button>
              </div>
              {couponInfo && (
                <div style={{ marginTop: 8, color: '#b9f6ca' }}>
                  Coupon applied. New total: ₹{(finalAmount / 100).toFixed(2)}
                </div>
              )}
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Checkout as</label>
              <div style={{ display: 'flex', gap: 14 }}>
                <label style={styles.radio}>
                  <input
                    type="radio"
                    checked={accountChoice === 'guest'}
                    onChange={() => setAccountChoice('guest')}
                  />{' '}
                  Guest
                </label>
                <label style={styles.radio}>
                  <input
                    type="radio"
                    checked={accountChoice === 'create'}
                    onChange={() => setAccountChoice('create')}
                  />{' '}
                  Create account
                </label>
              </div>
            </div>
            {accountChoice === 'create' && (
              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <input
                  style={styles.input}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                />
                {errors.password && <span style={styles.err}>{errors.password}</span>}
              </div>
            )}
          </div>

          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}
          >
            <div style={{ fontWeight: 800, fontSize: 22 }}>
              Total: ₹{(finalAmount / 100).toFixed(2)}
            </div>
            <button type="submit" className="pillBtn" disabled={paying}>
              {paying ? 'Processing…' : finalAmount === 0 ? 'Get Free Report' : 'Pay & Get Report'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const styles = {
  form: {
    marginTop: 18,
    background: 'rgba(255,255,255,.02)',
    border: '1px solid #333',
    borderRadius: 12,
    padding: 22,
    boxShadow: 'var(--shadow)',
  },
  row: { display: 'grid', gridTemplateColumns: '1fr', gap: 18, marginBottom: 14 },
  field: { display: 'grid', gap: 8 },
  label: { fontWeight: 700, color: '#e6e6e6' },
  input: {
    background: '#0f0f0f',
    color: '#f2f2f2',
    border: '1px solid #3a3a3a',
    borderRadius: 10,
    padding: '12px 14px',
  },
  radio: { display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600 },
  err: { color: '#ffb4ab', fontSize: 13 },
};
