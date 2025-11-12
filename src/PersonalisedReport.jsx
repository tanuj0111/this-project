// src/ConsciousKarmaPage.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import "./PersonalizedReport.css";

// Base URL for backend API
// Vite: VITE_API_URL
// CRA:  REACT_APP_API_URL
const API_BASE ='http://localhost:4000';

// Pricing
const BASE_PRICE = 1000; // INR
const MAX_PARALLEL_NUMBERS = 3;

const ConsciousKarmaPage = () => {
  const [step, setStep] = useState(0); // 0..4
  const [menuOpen, setMenuOpen] = useState(false); // For hamburger menu

  // ----- GENERAL INFO -----
  const [general, setGeneral] = useState({
    name: "",
    gender: "",
    ageYears: "",
    ageMonths: "",
    email: "",
  });

  // ----- PRIMARY NUMBER (always paid) -----
  const [primary, setPrimary] = useState({
    isd: "+91",
    number: "",
    sinceMonth: "",
    sinceYear: "",
    usageType: "",
    lineOfWork: "",
    role: "",
  });

  // ----- PARALLEL NUMBERS (max 3, each paid) -----
  const [parallels, setParallels] = useState([]);
  const [openParallelIndex, setOpenParallelIndex] = useState(null);

  // ----- PREVIOUS NUMBERS (any, no price impact) -----
  const [previousNumbers, setPreviousNumbers] = useState([]);
  const [openPreviousIndex, setOpenPreviousIndex] = useState(null);

  // ----- FAQ STATE -----
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // ----- OTP STATE -----
  const [otpPrimary, setOtpPrimary] = useState({
    sent: false,
    code: "",
    verified: false,
    cooldown: 0, // seconds before resend
  });

  // Parallels: array index aligned with parallels[]
  // each: { sent, code, verified, cooldown }
  const [otpParallels, setOtpParallels] = useState([]);

  // ----- PRICE -----
  const paidCount = 1 + parallels.length; // primary + each parallel
  const totalPrice = BASE_PRICE * paidCount;
  const priceText = `₹ ${BASE_PRICE} x ${paidCount} = ₹ ${totalPrice}`;

  // ----- STEP NAV -----
  const goNext = () => setStep((s) => (s < 4 ? s + 1 : s));
  const goPrev = () => setStep((s) => (s > 0 ? s - 1 : s));

  // ----- GENERAL / PRIMARY HANDLERS -----
  const handleGeneralChange = (field, value) =>
    setGeneral((g) => ({ ...g, [field]: value }));

  const handlePrimaryChange = (field, value) =>
    setPrimary((p) => ({ ...p, [field]: value }));

  // ----- PARALLEL NUMBERS (ACCORDION, MAX 3) -----
  const addParallel = () => {
    if (parallels.length >= MAX_PARALLEL_NUMBERS) return;
    const newIndex = parallels.length;

    setParallels((list) => [
      ...list,
      {
        isd: "+91",
        number: "",
        sinceMonth: "",
        sinceYear: "",
        usageType: "",
        role: "",
      },
    ]);

    setOtpParallels((list) => [
      ...list,
      { sent: false, code: "", verified: false, cooldown: 0 },
    ]);

    setOpenParallelIndex(newIndex);
  };

  const updateParallel = (index, field, value) => {
    setParallels((list) =>
      list.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const toggleParallelOpen = (index) => {
    setOpenParallelIndex((prev) => (prev === index ? null : index));
  };

  const toggleRemoveParallel = (index) => {
    setParallels((list) => list.filter((_, i) => i !== index));
    setOtpParallels((list) => list.filter((_, i) => i !== index));

    setOpenParallelIndex((prev) => {
      if (prev == null) return prev;
      if (prev === index) return null;
      if (prev > index) return prev - 1;
      return prev;
    });
  };

  // ----- PREVIOUS NUMBERS (ACCORDION, UNLIMITED) -----
  const addPrevious = () => {
    setPreviousNumbers((list) => {
      const next = [
        ...list,
        {
          isd: "+91",
          number: "",
          usedSinceMonth: "",
          usedSinceYear: "",
          usedTillMonth: "",
          usedTillYear: "",
          usageType: "",
          role: "",
        },
      ];
      setOpenPreviousIndex(next.length - 1);
      return next;
    });
  };

  const updatePrevious = (index, field, value) => {
    setPreviousNumbers((list) =>
      list.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const togglePreviousOpen = (index) => {
    setOpenPreviousIndex((prev) => (prev === index ? null : index));
  };

  const removePrevious = (index) => {
    setPreviousNumbers((list) => list.filter((_, i) => i !== index));
    setOpenPreviousIndex((prev) => {
      if (prev == null) return prev;
      if (prev === index) return null;
      if (prev > index) return prev - 1;
      return prev;
    });
  };

  // ----- FAQ TOGGLE -----
  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  // ----- FAQ DATA -----
  const faqs = [
    {
      question: "1 - What happens after I submit the form?",
      answer: "A - Once your details are submitted, the analysis begins. Each number is studied individually, and your personalised report is prepared within 5–7 working days. You'll receive it directly on your registered email."
    },
    {
      question: "2 - Why do I need to verify my mobile number with an OTP?",
      answer: "A - OTP verification confirms that the number is active and genuinely belongs to you."
    },
    {
      question: "3 - Can I include more than one number in a single report?",
      answer: "A – Yes. You can include more than one number in the same report. This gives insights into each number on its own, and also how they interact together. (Each additional number is charged.)"
    },
    {
      question: "4 – How many secondary numbers can I add?",
      answer: "A - You can include up to three secondary numbers along with your primary number. If you're using more than four numbers, we recommend booking a consultation."
    },
    {
      question: "5 - What if I've changed my number in the past?",
      answer: "A - You can add your previous number(s) in the form. They help us understand how your mobile number energy has shifted over time and provide context for your current number's influence."
    },
    {
      question: "6 - Why do you ask for my age, gender, and work details?",
      answer: "A - These details help in understanding how your number's energy interacts with your stage of life and the environment you function in. Each number expresses differently depending on who uses it and for what purpose."
    },
    {
      question: "7 - What if I enter the wrong number in the form?",
      answer: "A - If an incorrect number is verified or submitted, it will produce a report for that number. Please double-check all digits before submission, as each number sequence is unique."
    }
  ];

  // ========== OTP COOLDOWN HELPERS (15s) ==========

  const startPrimaryCooldown = () => {
    setOtpPrimary((prev) => ({ ...prev, cooldown: 15 }));
    const id = setInterval(() => {
      setOtpPrimary((prev) => {
        if (!prev.cooldown || prev.cooldown <= 1) {
          clearInterval(id);
          return { ...prev, cooldown: 0 };
        }
        return { ...prev, cooldown: prev.cooldown - 1 };
      });
    }, 1000);
  };

  const startParallelCooldown = (index) => {
    setOtpParallels((list) =>
      list.map((o, i) =>
        i === index ? { ...o, cooldown: 15 } : o
      )
    );
    const id = setInterval(() => {
      setOtpParallels((list) => {
        let stop = false;
        const next = list.map((o, i) => {
          if (i !== index) return o;
          if (!o.cooldown || o.cooldown <= 1) {
            stop = true;
            return { ...o, cooldown: 0 };
          }
          return { ...o, cooldown: o.cooldown - 1 };
        });
        if (stop) clearInterval(id);
        return next;
      });
    }, 1000);
  };

  // ========== OTP API CALLS ==========

  // Primary
  const sendOtpPrimary = async () => {
    if (!primary.number || otpPrimary.cooldown > 0 || otpPrimary.verified) return;

    try {
      const res = await fetch(`${API_BASE}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: `${primary.isd}${primary.number}`,
          type: "primary",
        }),
      });
      const data = await res.json();

      if (data.ok) {
        setOtpPrimary((o) => ({ ...o, sent: true }));
        startPrimaryCooldown();
        Swal.fire({
          icon: "success",
          title: "OTP sent",
          text: "Primary number OTP sent successfully. Valid for 15 seconds.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        throw new Error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not send OTP. Please try again.", "error");
    }
  };

  const verifyOtpPrimary = async () => {
    if (!otpPrimary.code || otpPrimary.verified) return;

    try {
      const res = await fetch(`${API_BASE}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: `${primary.isd}${primary.number}`,
          code: otpPrimary.code,
          type: "primary",
        }),
      });
      const data = await res.json();

      if (data.verified) {
        setOtpPrimary((o) => ({
          ...o,
          verified: true,
          cooldown: 0,
        }));
        Swal.fire({
          icon: "success",
          title: "Verified",
          text: "Primary number OTP verified.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Invalid OTP", "Please check and try again.", "warning");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not verify OTP.", "error");
    }
  };

  // Parallel
  const sendOtpParallel = async (index) => {
    const p = parallels[index];
    const o = otpParallels[index];
    if (!p || !p.number || (o && (o.cooldown > 0 || o.verified))) return;

    try {
      const res = await fetch(`${API_BASE}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: `${p.isd}${p.number}`,
          type: "parallel",
          index,
        }),
      });
      const data = await res.json();

      if (data.ok) {
        setOtpParallels((list) =>
          list.map((x, i) =>
            i === index ? { ...x, sent: true } : x
          )
        );
        startParallelCooldown(index);
        Swal.fire({
          icon: "success",
          title: "OTP sent",
          text: `Parallel number #${index + 1} OTP sent successfully. Valid for 15 seconds.`,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        throw new Error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not send OTP.", "error");
    }
  };

  const verifyOtpParallel = async (index) => {
    const p = parallels[index];
    const o = otpParallels[index];
    if (!p || !o || !o.code || o.verified) return;

    try {
      const res = await fetch(`${API_BASE}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: `${p.isd}${p.number}`,
          code: o.code,
          type: "parallel",
          index,
        }),
      });
      const data = await res.json();

      if (data.verified) {
        setOtpParallels((list) =>
          list.map((x, i) =>
            i === index
              ? { ...x, verified: true, cooldown: 0 }
              : x
          )
        );
        Swal.fire({
          icon: "success",
          title: "Verified",
          text: `Parallel number #${index + 1} OTP verified.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Invalid OTP", "Please check and try again.", "warning");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not verify OTP.", "error");
    }
  };

  // ========== OTP COMPLETE CHECKS ==========

  const allParallelOtpsVerified =
    parallels.length === 0 ||
    (otpParallels.length === parallels.length &&
      otpParallels.every((x, i) =>
        parallels[i]?.number ? x.verified : true
      ));

  const allOtpsVerified = otpPrimary.verified && allParallelOtpsVerified;

  // ========== RAZORPAY HELPER ==========

  const openRazorpayCheckout = ({ key, orderId, amount, onSuccess, onFailure }) => {
    if (!window.Razorpay) {
      Swal.fire("Error", "Razorpay SDK not loaded.", "error");
      return;
    }

    const options = {
      key,
      amount,
      currency: "INR",
      name: "Conscious Karma",
      description: "Personalized Mobile Number Report",
      order_id: orderId,
      handler: (response) => {
        onSuccess && onSuccess(response);
      },
      modal: {
        ondismiss: () => {
          onFailure && onFailure();
        },
      },
      prefill: {
        name: general.name,
        email: general.email,
        contact: `${primary.isd}${primary.number}`,
      },
      theme: { color: "#ff8a2b" },
    };

    new window.Razorpay(options).open();
  };

  // ========== FINAL PROCEED (AFTER OTP VERIFIED) ==========

  const handleProceed = async () => {
    if (!allOtpsVerified) {
      Swal.fire(
        "OTP pending",
        "Please verify all OTPs before proceeding to payment.",
        "warning"
      );
      return;
    }

    try {
      // 1) Create order on backend (also send full form data)
      const createRes = await fetch(`${API_BASE}/api/pay/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: general.name,
          email: general.email,
          phone: `${primary.isd}${primary.number}`,
          price: totalPrice,
          form: {
            general,
            primary,
            parallels,
            previousNumbers,
          },
        }),
      });
      const createData = await createRes.json();
      if (!createData.ok) {
        throw new Error(createData.message || "Failed to create order");
      }

      const localOrderId = createData.orderId;

      // 2) If free (0 amount) -> directly start report + emails
      if (createData.free || !createData.order) {
        const startRes = await fetch(`${API_BASE}/api/report/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: localOrderId }),
        });
        const startData = await startRes.json();
        if (!startData.ok) {
          throw new Error(startData.message || "Failed to trigger report");
        }

        Swal.fire({
          icon: "success",
          title: "All set!",
          text:
            "OTP verified. Your request is confirmed. Your report will be sent within 3–5 days.",
        });
        return;
      }

      // 3) Paid flow: open Razorpay
      const { keyId, order } = createData;

      openRazorpayCheckout({
        key: keyId,
        orderId: order.id,
        amount: order.amount,
        onSuccess: async (rzpRes) => {
          try {
            // 4) Verify payment with backend
            const verifyRes = await fetch(`${API_BASE}/api/pay/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: localOrderId,
                razorpay_order_id: rzpRes.razorpay_order_id,
                razorpay_payment_id: rzpRes.razorpay_payment_id,
                razorpay_signature: rzpRes.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyData.ok) {
              throw new Error(verifyData.message || "Payment verification failed");
            }

            // 5) Trigger report generation + admin mail + user mail (handled in backend)
            const startRes = await fetch(`${API_BASE}/api/report/start`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: localOrderId }),
            });
            const startData = await startRes.json();
            if (!startData.ok) {
              throw new Error(startData.message || "Failed to trigger report");
            }

            Swal.fire({
              icon: "success",
              title: "Verified & Confirmed",
              text:
                "OTP verified and payment successful. Your personalized report will be emailed within 3–5 days.",
            });
          } catch (err) {
            console.error(err);
            Swal.fire(
              "Error",
              err.message || "Something went wrong after payment.",
              "error"
            );
          }
        },
        onFailure: () => {
          Swal.fire("Payment cancelled", "You can try again anytime.", "info");
        },
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Something went wrong.", "error");
    }
  };

  // ========== RENDER ==========

  return (
    <div className="ck-page">
      {/* RESPONSIVE HEADER from Landing Page */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between py-3 sm:py-4 z-50 px-3 sm:px-6 lg:px-8 bg-black/90 backdrop-blur-sm">
        <div className="leading-[1] flex flex-col items-start cursor-pointer">
          <span className="block text-[18px] sm:text-[24px] md:text-[26px] lg:text-[28px] text-white">
            conscious
          </span>
          <span className="block text-[20px] sm:text-[26px] md:text-[30px] lg:text-[32px] tracking-[0.5px] sm:tracking-[2px] mt-[-2px] sm:mt-[-8px] text-orange-400 font-balgin">
            KARMA
          </span>
        </div>

        {/* Hamburger Icon */}
        <button
          className="flex flex-col justify-between w-[40px] h-[36px] sm:w-[46px] sm:h-[42px] p-[6px] sm:p-[8px] rounded-[12px] bg-transparent cursor-pointer transition-all duration-300"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-[28px] sm:w-[45px] h-[2.5px] sm:h-[3px] bg-white rounded-[2px] transition-all duration-300 ${
                menuOpen
                  ? i === 0
                    ? "rotate-45 translate-y-[8px] sm:translate-y-[10px]"
                    : i === 1
                    ? "opacity-0"
                    : "-rotate-45 -translate-y-[8px] sm:-translate-y-[10px]"
                  : ""
              }`}
            />
          ))}
        </button>
      </header>

      {/* Drawer/Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-[2px] z-40"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            className={`fixed top-0 right-0 h-full w-[min(340px,92vw)] bg-[#0f0f0f] border-l border-[#333] shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-[8px] p-[22px_20px] transition-transform duration-300 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="font-balgin font-bold text-white mb-2">Menu</div>
            {[
              ["Home", "/"],
              ["Instant Report", "/"],
              ["Personalised Report", "/personalised-report"],
              ["Consult", "/consult"],
            ].map(([label, link], i) => (
              <a
                key={i}
                href={link}
                className="p-3 border border-[#3a3a3a] rounded-[12px] bg-[#141414] hover:bg-[#191919] hover:border-[#555] transition text-gray-50 font-balgin font-bold"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </>
      )}

      {/* Add padding-top to prevent content from going under fixed header */}
      <div className="pt-16 sm:pt-20"></div>

      {/* HERO */}
      <section className="ck-hero">
        <p className="ck-hero-text">
          Every mobile number is alive with energy,
          <br />
          shaping how we think, feel, speak, and live.
        </p>

        <div className="ck-tags-wrap">
          <div className="ck-tags-row">
            <div className="ck-tag ck-tag-t1">Speech</div>
            <div className="ck-tag ck-tag-t2">Appearance</div>
            <div className="ck-tag ck-tag-t3">Emotions</div>
          </div>
          <div className="ck-tags-row">
            <div className="ck-tag ck-tag-t4">Money Patterns</div>
            <div className="ck-tag ck-tag-t5">Work-style</div>
          </div>
          <div className="ck-tags-row">
            <div className="ck-tag ck-tag-t6">Social life</div>
            <div className="ck-tag ck-tag-t7">
              Opportunities &amp; Obstacles
            </div>
          </div>
        </div>

        <p className="ck-hero-sub">
          Every Mobile Number tells a story.
          <br />
          This is YOURS.
        </p>
      </section>

      {/* FORMS */}
      <section className="ck-form-section">
        <div className="ck-form-slider">
          <div
            className="ck-form-track"
            style={{ transform: `translateX(-${step * 100}%)` }}
          >
            {/* STEP 0: GENERAL INFO */}
            <div className="ck-form-slide">
              <div className="ck-form-title-outside">Personalized Report</div>
              <div className="ck-form-card">
                <div className="ck-form-inner">
                  <div className="ck-form-heading">General Information</div>

                  <div className="ck-field-block">
                    <div className="ck-label">Name</div>
                    <input
                      className="ck-input"
                      placeholder="ABCXYZ"
                      value={general.name}
                      onChange={(e) =>
                        handleGeneralChange("name", e.target.value)
                      }
                    />
                  </div>

                  <div className="ck-field-block">
                    <div className="ck-label">Gender</div>
                    <div className="ck-btn-row ck-btn-row-horizontal">
                      {["Female", "Male", "Other"].map((g) => (
                        <button
                          key={g}
                          type="button"
                          className={
                            "ck-pill" +
                            (general.gender === g ? " ck-pill-active" : "")
                          }
                          onClick={() => handleGeneralChange("gender", g)}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="ck-field-block">
                    <div className="ck-label">Age</div>
                    <div className="ck-btn-row">
                      <input
                        className="ck-input age-input"
                        placeholder="Years+"
                        value={general.ageYears}
                        onChange={(e) =>
                          handleGeneralChange("ageYears", e.target.value)
                        }
                      />
                      <input
                        className="ck-input age-input"
                        placeholder="Months+"
                        value={general.ageMonths}
                        onChange={(e) =>
                          handleGeneralChange("ageMonths", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="ck-field-block">
                    <div className="ck-label">
                      <span>Email-id</span>
                      <span className="ck-label-right">Create account</span>
                    </div>
                    <input
                      className="ck-input"
                      placeholder="abc@gmail.com"
                      value={general.email}
                      onChange={(e) =>
                        handleGeneralChange("email", e.target.value)
                      }
                    />
                  </div>

                  <div className="ck-step-nav single-step-nav">
                    <span className="ck-next-link" onClick={goNext}>
                      next &gt;&gt;&gt;
                    </span>
                  </div>
                </div>

                <div className="ck-form-footer">
                  <div className="ck-price-pill">{priceText}</div>
                  <button className="ck-proceed-btn" disabled>
                    Proceed
                  </button>
                </div>
              </div>

              <div className="ck-delivery-text">
                Delivery within 5-7 days
                <br />
                Requires mobile number OTP verification
              </div>
            </div>

            {/* STEP 1: PRIMARY NUMBER */}
            <div className="ck-form-slide">
              <div className="ck-form-title-outside">Personalized Report</div>
              <div className="ck-form-card">
                <div className="ck-form-inner">
                  <div className="ck-form-heading">Primary Number</div>

                  <div className="ck-field-block">
                    <div className="ck-label">Mobile Number</div>
                    <div className="ck-inline-inputs">
                      <input
                        className="ck-pill isd-input"
                        value={primary.isd}
                        onChange={(e) =>
                          handlePrimaryChange("isd", e.target.value)
                        }
                      />
                      <input
                        className="ck-input-flex"
                        value={primary.number}
                        onChange={(e) =>
                          handlePrimaryChange("number", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="ck-field-block">
                    <div className="ck-label">Using this number since</div>
                    <div className="ck-btn-row">
                      <input
                        className="ck-input month-input"
                        placeholder="Month"
                        value={primary.sinceMonth}
                        onChange={(e) =>
                          handlePrimaryChange("sinceMonth", e.target.value)
                        }
                      />
                      <input
                        className="ck-input year-input"
                        placeholder="Year"
                        value={primary.sinceYear}
                        onChange={(e) =>
                          handlePrimaryChange("sinceYear", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="ck-field-block">
                    <div className="ck-label">Usage type</div>
                    <div className="ck-btn-row">
                      {["Personal", "Work", "Both"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={
                            "ck-pill" +
                            (primary.usageType === t ? " ck-pill-active" : "")
                          }
                          onClick={() => handlePrimaryChange("usageType", t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="ck-field-block">
                    <div className="ck-label">Line of Work</div>
                    <input
                      className="ck-input"
                      value={primary.lineOfWork}
                      onChange={(e) =>
                        handlePrimaryChange("lineOfWork", e.target.value)
                      }
                      placeholder="IT, Finance, Marketing, etc."
                    />
                  </div>

                  <div className="ck-field-block">
                    <div className="ck-label">Role</div>
                    <input
                      className="ck-input"
                      value={primary.role}
                      onChange={(e) =>
                        handlePrimaryChange("role", e.target.value)
                      }
                      placeholder="Student, Shop Keeper, Accountant, etc."
                    />
                  </div>

                  <div className="ck-step-nav">
                    <span className="ck-prev-link" onClick={goPrev}>
                      &lt;&lt;&lt; prev
                    </span>
                    <span className="ck-next-link" onClick={goNext}>
                      next &gt;&gt;&gt;
                    </span>
                  </div>
                </div>

                <div className="ck-form-footer">
                  <div className="ck-price-pill">{priceText}</div>
                  <button className="ck-proceed-btn" disabled>
                    Proceed
                  </button>
                </div>
              </div>

              <div className="ck-delivery-text">
                Delivery within 5-7 days
                <br />
                Requires mobile number OTP verification
              </div>
            </div>

            {/* STEP 2: PARALLEL NUMBERS */}
            <div className="ck-form-slide">
              <div className="ck-form-title-outside">Personalized Report</div>
              <div className="ck-form-card">
                <div className="ck-form-inner">
                  <div className="ck-form-heading">Parallel Number</div>

                  <div className="ck-parallel-container">
                    {parallels.map((p, i) => {
                      const isOpen = openParallelIndex === i;
                      return (
                        <div key={i} className="ck-parallel-block">
                          <div className="ck-parallel-header">
                            <div className="ck-label">
                              Parallel Mobile Number #{i + 1}
                            </div>
                            <div className="ck-parallel-header-actions">
                              <button
                                type="button"
                                className="ck-toggle-btn"
                                onClick={() => toggleParallelOpen(i)}
                              >
                                {isOpen ? "−" : "+"}
                              </button>
                            <button
                              type="button"
                              className="ck-remove-btn"
                              onClick={() => toggleRemoveParallel(i)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {isOpen && (
                          <>
                            <div className="ck-field-block">
                              <div className="ck-label">Mobile Number</div>
                              <div className="ck-inline-inputs">
                                <input
                                  className="ck-pill isd-input"
                                  value={p.isd}
                                  onChange={(e) =>
                                    updateParallel(i, "isd", e.target.value)
                                  }
                                />
                                <input
                                  className="ck-input-flex"
                                  value={p.number}
                                  onChange={(e) =>
                                    updateParallel(
                                      i,
                                      "number",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="ck-field-block">
                              <div className="ck-label">Using this number since</div>
                              <div className="ck-btn-row">
                                <input
                                  className="ck-input month-input"
                                  placeholder="Month"
                                  value={p.sinceMonth}
                                  onChange={(e) =>
                                    updateParallel(
                                      i,
                                      "sinceMonth",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  className="ck-input year-input"
                                  placeholder="Year"
                                  value={p.sinceYear}
                                  onChange={(e) =>
                                    updateParallel(
                                      i,
                                      "sinceYear",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="ck-field-block">
                              <div className="ck-label">Usage type</div>
                              <div className="ck-btn-row">
                                {["Personal", "Work", "Both"].map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    className={
                                      "ck-pill" +
                                      (p.usageType === t
                                        ? " ck-pill-active"
                                        : "")
                                    }
                                    onClick={() =>
                                      updateParallel(i, "usageType", t)
                                    }
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="ck-field-block">
                              <div className="ck-label">Role</div>
                              <input
                                className="ck-input"
                                value={p.role}
                                onChange={(e) =>
                                  updateParallel(i, "role", e.target.value)
                                }
                                placeholder="Student, Shop Keeper, Accountant, etc."
                              />
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                  </div>

                  {parallels.length < MAX_PARALLEL_NUMBERS && (
                    <div className="ck-add-btn-wrap">
                      <button
                        type="button"
                        className="ck-add-btn"
                        onClick={addParallel}
                      >
                        Add Number
                      </button>
                      <span className="ck-if-any-text">If any</span>
                    </div>
                  )}

                  <div className="ck-step-nav">
                    <span className="ck-prev-link" onClick={goPrev}>
                      &lt;&lt;&lt; prev
                    </span>
                    <span className="ck-next-link" onClick={goNext}>
                      next &gt;&gt;&gt;
                    </span>
                  </div>
                </div>

                <div className="ck-form-footer">
                  <div className="ck-price-pill">{priceText}</div>
                  <button className="ck-proceed-btn" disabled>
                    Proceed
                  </button>
                </div>
              </div>

              <div className="ck-delivery-text">
                Delivery within 5-7 days
                <br />
                Requires mobile number OTP verification
              </div>
            </div>

            {/* STEP 3: PREVIOUS NUMBERS */}
            <div className="ck-form-slide">
              <div className="ck-form-title-outside">Personalized Report</div>
              <div className="ck-form-card">
                <div className="ck-form-inner">
                  <div className="ck-form-heading">Previous Number</div>

                  <div className="ck-parallel-container">
                    {previousNumbers.map((p, i) => {
                      const isOpen = openPreviousIndex === i;
                      return (
                        <div key={i} className="ck-parallel-block">
                          <div className="ck-parallel-header">
                            <div className="ck-label">
                              Previous Mobile Number #{i + 1}
                            </div>
                            <div className="ck-parallel-header-actions">
                              <button
                                type="button"
                                className="ck-toggle-btn"
                                onClick={() => togglePreviousOpen(i)}
                              >
                                {isOpen ? "−" : "+"}
                              </button>
                              <button
                                type="button"
                                className="ck-remove-btn"
                                onClick={() => removePrevious(i)}
                              >
                                Remove
                              </button>
                          </div>
                        </div>

                        {isOpen && (
                          <>
                            <div className="ck-field-block">
                              <div className="ck-label">Previous Mobile Number</div>
                              <div className="ck-inline-inputs">
                                <input
                                  className="ck-pill isd-input"
                                  value={p.isd}
                                  onChange={(e) =>
                                    updatePrevious(i, "isd", e.target.value)
                                  }
                                />
                                <input
                                  className="ck-input-flex"
                                  value={p.number}
                                  onChange={(e) =>
                                    updatePrevious(
                                      i,
                                      "number",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="ck-field-block ck-field-two-col">
                              <div>
                                <div className="ck-label">Used since</div>
                                <div className="ck-btn-row">
                                  <input
                                    className="ck-input month-input"
                                    placeholder="Month"
                                    value={p.usedSinceMonth}
                                    onChange={(e) =>
                                      updatePrevious(
                                        i,
                                        "usedSinceMonth",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <input
                                    className="ck-input year-input"
                                    placeholder="Year"
                                    value={p.usedSinceYear}
                                    onChange={(e) =>
                                      updatePrevious(
                                        i,
                                        "usedSinceYear",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="ck-label">Used till</div>
                                <div className="ck-btn-row">
                                  <input
                                    className="ck-input month-input"
                                    placeholder="Month"
                                    value={p.usedTillMonth}
                                    onChange={(e) =>
                                      updatePrevious(
                                        i,
                                        "usedTillMonth",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <input
                                    className="ck-input year-input"
                                    placeholder="Year"
                                    value={p.usedTillYear}
                                    onChange={(e) =>
                                      updatePrevious(
                                        i,
                                        "usedTillYear",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="ck-field-block">
                              <div className="ck-label">Usage type</div>
                              <div className="ck-btn-row">
                                {["Personal", "Work", "Both"].map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    className={
                                      "ck-pill" +
                                      (p.usageType === t
                                        ? " ck-pill-active"
                                        : "")
                                    }
                                    onClick={() =>
                                      updatePrevious(i, "usageType", t)
                                    }
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="ck-field-block">
                              <div className="ck-label">Role</div>
                              <input
                                className="ck-input"
                                value={p.role}
                                onChange={(e) =>
                                  updatePrevious(i, "role", e.target.value)
                                }
                              />
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                  </div>

                  <div className="ck-add-btn-wrap">
                    <button
                      type="button"
                      className="ck-add-btn"
                      onClick={addPrevious}
                    >
                      Add Number
                    </button>
                    <span className="ck-if-any-text">If any</span>
                  </div>

                  <div className="ck-step-nav">
                    <span className="ck-prev-link" onClick={goPrev}>
                      &lt;&lt;&lt; prev
                    </span>
                    <span className="ck-next-link" onClick={goNext}>
                      next &gt;&gt;&gt;
                    </span>
                  </div>
                </div>

                <div className="ck-form-footer">
                  <div className="ck-price-pill">{priceText}</div>
                  <button className="ck-proceed-btn" disabled>
                    Proceed
                  </button>
                </div>
              </div>

              <div className="ck-delivery-text">
                Delivery within 5-7 days
                <br />
                Requires mobile number OTP verification
              </div>
            </div>

            {/* STEP 4: OTP VERIFICATION + PROCEED (RAZORPAY) */}
            <div className="ck-form-slide">
              <div className="ck-form-title-outside">Personalized Report</div>
              <div className="ck-form-card">
                <div className="ck-form-inner">
                  <div className="ck-form-heading">OTP Verification</div>

                  {/* Primary */}
                  <div className="ck-field-block">
                    <div className="ck-label">Primary Number</div>
                    <div className="ck-inline-inputs">
                      <div className="ck-input-flex readonly-input">
                        {primary.isd} {primary.number}
                      </div>
                      <button
                        type="button"
                        className="ck-pill"
                        onClick={sendOtpPrimary}
                        disabled={
                          otpPrimary.verified || otpPrimary.cooldown > 0
                        }
                      >
                        {otpPrimary.verified
                          ? "Verified"
                          : otpPrimary.sent
                          ? otpPrimary.cooldown > 0
                            ? `Resend in ${otpPrimary.cooldown}s`
                            : "Resend OTP"
                          : "Send OTP"}
                      </button>
                    </div>
                  </div>

                  <div className="ck-field-block">
                    <div className="ck-inline-inputs">
                      <input
                        className="ck-input-flex"
                        placeholder="Enter OTP"
                        value={otpPrimary.code}
                        onChange={(e) =>
                          setOtpPrimary((o) => ({
                            ...o,
                            code: e.target.value,
                          }))
                        }
                        disabled={otpPrimary.verified}
                      />
                      <button
                        type="button"
                        className="ck-pill"
                        onClick={verifyOtpPrimary}
                        disabled={otpPrimary.verified}
                      >
                        {otpPrimary.verified ? "Verified" : "Verify"}
                      </button>
                    </div>
                  </div>

                  {/* Parallels */}
                  {parallels.map((p, i) => {
                    const status =
                      otpParallels[i] || {
                        sent: false,
                        code: "",
                        verified: false,
                        cooldown: 0,
                      };
                    return (
                      <div key={i}>
                        <div className="ck-field-block">
                          <div className="ck-label">
                            Parallel Number #{i + 1}
                          </div>
                          <div className="ck-inline-inputs">
                            <div className="ck-input-flex readonly-input">
                              {p.isd} {p.number}
                            </div>
                            <button
                              type="button"
                              className="ck-pill"
                              onClick={() => sendOtpParallel(i)}
                              disabled={
                                status.verified || status.cooldown > 0
                              }
                            >
                              {status.verified
                                ? "Verified"
                                : status.sent
                                ? status.cooldown > 0
                                  ? `Resend in ${status.cooldown}s`
                                  : "Resend OTP"
                                : "Send OTP"}
                            </button>
                          </div>
                        </div>
                        <div className="ck-field-block">
                          <div className="ck-inline-inputs">
                            <input
                              className="ck-input-flex"
                              placeholder="Enter OTP"
                              value={status.code || ""}
                              onChange={(e) =>
                                setOtpParallels((list) =>
                                  list.map((x, idx) =>
                                    idx === i
                                      ? { ...x, code: e.target.value }
                                      : x
                                  )
                                )
                              }
                              disabled={status.verified}
                            />
                            <button
                              type="button"
                              className="ck-pill"
                              onClick={() => verifyOtpParallel(i)}
                              disabled={status.verified}
                            >
                              {status.verified ? "Verified" : "Verify"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="ck-step-nav">
                    <span className="ck-prev-link" onClick={goPrev}>
                      &lt;&lt;&lt; prev
                    </span>
                    <span className="ck-next-link disabled">
                      next &gt;&gt;&gt;
                    </span>
                  </div>
                </div>

                <div className="ck-form-footer">
                  <div className="ck-price-pill">{priceText}</div>
                  <button
                    className="ck-proceed-btn"
                    disabled={!allOtpsVerified}
                    onClick={handleProceed}
                  >
                    Proceed
                  </button>
                </div>
              </div>

              <div className="ck-delivery-text">
                Delivery within 3–5 days
                <br />
                Requires OTP verification &amp; payment completion
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="ck-faq-section">
        <div className="ck-faq-title">Faqs</div>
        <div className="ck-faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`ck-faq-item ${openFaqIndex === index ? "ck-faq-item-active" : ""}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">{faq.question}</div>
              {openFaqIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
        <div className="ck-faq-footer">
          For any questions, write to us at hello@consciouskarma.co
        </div>
      </section>

      {/* RESPONSIVE FOOTER from Landing Page */}
      <footer className="bg-orange-400 py-4 sm:py-5 md:py-6 mt-8">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-3 sm:gap-4 items-center justify-between text-center lg:text-left">
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
            <a
              href="/termsandconditions"
              className="text-[#1d1209] underline font-bold text-xs sm:text-sm hover:text-[#3d2d19] transition-colors"
            >
              Terms & Conditions
            </a>
            <a
              href="/privacy-policy"
              className="text-[#1d1209] underline font-bold text-xs sm:text-sm hover:text-[#3d2d19] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/refund-policy"
              className="text-[#1d1209] underline font-bold text-xs sm:text-sm hover:text-[#3d2d19] transition-colors"
            >
              Refund Policy
            </a>
            <a
              href="/shipping-policy"
              className="text-[#1d1209] underline font-bold text-xs sm:text-sm hover:text-[#3d2d19] transition-colors"
            >
              Shipping & Delivery
            </a>
          </div>
          <div className="text-[#1d1209] font-bold text-xs sm:text-sm break-all sm:break-normal">
            Contact Us – suma@consciouskarma.co
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConsciousKarmaPage;
