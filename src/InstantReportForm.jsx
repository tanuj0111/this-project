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
    <div className="w-full">
      <div className="text-center mb-4 sm:mb-5 md:mb-6">
        <h2 className="font-balgin text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-white">Get Your Instant Report</h2>
        <p className="text-xs sm:text-sm text-gray-400">Enter details below. Apply a coupon or pay securely via Razorpay.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-3 sm:space-y-4">
        {/* Name Field */}
        <div className="w-full">
          <label className="block font-bold text-gray-200 text-xs sm:text-sm mb-1.5 sm:mb-2">Name</label>
          <input
            className="w-full bg-[#1a1a1a] text-gray-100 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:border-orange-400 focus:outline-none transition-colors placeholder:text-gray-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          {errors.name && <span className="block mt-1 text-red-300 text-xs sm:text-sm">{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div className="w-full">
          <label className="block font-bold text-gray-200 text-xs sm:text-sm mb-1.5 sm:mb-2">Email</label>
          <input
            className="w-full bg-[#1a1a1a] text-gray-100 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:border-orange-400 focus:outline-none transition-colors placeholder:text-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
          {errors.email && <span className="block mt-1 text-red-300 text-xs sm:text-sm">{errors.email}</span>}
        </div>

        {/* Mobile Number */}
        <div className="w-full">
          <label className="block font-bold text-gray-200 text-xs sm:text-sm mb-1.5 sm:mb-2">Mobile Number</label>
          <div className="flex gap-2 sm:gap-3">
            <select
              value={isd}
              onChange={(e) => setIsd(e.target.value)}
              className="bg-[#1a1a1a] text-gray-100 border border-gray-700 rounded-lg px-2 sm:px-3 py-2.5 sm:py-3 text-xs sm:text-sm w-[85px] sm:w-[95px] focus:border-orange-400 focus:outline-none transition-colors appearance-none bg-no-repeat cursor-pointer"
              style={{
                backgroundImage:
                  'url(\'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"%3e%3cpath stroke="%239ca3af" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8 4 4 4-4"/%3e%3c/svg%3e\')',
                backgroundPosition: 'right 0.4rem center',
                backgroundSize: '1em',
                paddingRight: '1.75rem',
              }}
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+971">🇦🇪 +971</option>
            </select>
            <input
              className="flex-1 bg-[#1a1a1a] text-gray-100 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:border-orange-400 focus:outline-none transition-colors placeholder:text-gray-600"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="1234567890"
              maxLength={10}
            />
          </div>
          {errors.phone && <span className="block mt-1 text-red-300 text-xs sm:text-sm">{errors.phone}</span>}
        </div>

        {/* Coupon Field */}
        <div className="w-full">
          <label className="block font-bold text-gray-200 text-xs sm:text-sm mb-1.5 sm:mb-2">Coupon (optional)</label>
          <div className="flex gap-2 sm:gap-3">
            <input
              className="flex-1 bg-[#1a1a1a] text-gray-100 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:border-orange-400 focus:outline-none transition-colors placeholder:text-gray-600"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.trim())}
              placeholder="e.g. CKFREE100"
            />
            <button
              onClick={applyCoupon}
              disabled={!coupon || applying}
              type="button"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-orange-500 text-white font-bold text-xs sm:text-sm rounded-lg hover:bg-orange-600 active:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap"
            >
              {applying ? 'Applying…' : 'Apply'}
            </button>
          </div>
          {couponInfo && (
            <div className="mt-2 text-green-400 text-xs sm:text-sm font-medium">
              ✓ Coupon applied. New total: ₹{(finalAmount / 100).toFixed(2)}
            </div>
          )}
        </div>

        {/* Checkout Options */}
        <div className="w-full">
          <label className="block font-bold text-gray-200 text-xs sm:text-sm mb-2">Checkout as</label>
          <div className="flex gap-4 sm:gap-6">
            <label className="inline-flex items-center gap-2 font-semibold text-sm sm:text-base cursor-pointer text-gray-300 hover:text-white transition-colors">
              <input
                type="radio"
                checked={accountChoice === 'guest'}
                onChange={() => setAccountChoice('guest')}
                className="w-4 h-4 sm:w-5 sm:h-5 accent-orange-500 cursor-pointer"
              />
              Guest
            </label>
            <label className="inline-flex items-center gap-2 font-semibold text-sm sm:text-base cursor-pointer text-gray-300 hover:text-white transition-colors">
              <input
                type="radio"
                checked={accountChoice === 'create'}
                onChange={() => setAccountChoice('create')}
                className="w-4 h-4 sm:w-5 sm:h-5 accent-orange-500 cursor-pointer"
              />
              Create account
            </label>
          </div>
        </div>

        {/* Password Field (Conditional) */}
        {accountChoice === 'create' && (
          <div className="w-full">
            <label className="block font-bold text-gray-200 text-xs sm:text-sm mb-1.5 sm:mb-2">Password</label>
            <input
              className="w-full bg-[#1a1a1a] text-gray-100 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:border-orange-400 focus:outline-none transition-colors placeholder:text-gray-600"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
            {errors.password && <span className="block mt-1 text-red-300 text-xs sm:text-sm">{errors.password}</span>}
          </div>
        )}

        {/* Total & Submit */}
        <div className="w-full pt-3 sm:pt-4 mt-2 sm:mt-3 border-t border-gray-800">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="font-extrabold text-lg sm:text-xl md:text-2xl text-white">
              Total: ₹{(finalAmount / 100).toFixed(2)}
            </span>
          </div>
          <button 
            type="submit" 
            className="w-full px-5 py-3 sm:py-3.5 bg-orange-500 text-white font-bold text-sm sm:text-base rounded-lg hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/20"
            disabled={paying}
          >
            {paying ? 'Processing…' : finalAmount === 0 ? 'Get Free Report' : ctaLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
