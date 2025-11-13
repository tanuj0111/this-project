import React, { useState } from "react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const ADDRESS = "B1/H3, mohan estate, New delhi - 110044";
  const CONTACT_EMAIL = "hello@consciouskarma.co";
  const WHATSAPP = "+91 8094289536";

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("New contact from consciouskarma.co");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nWhatsApp/Phone: ${phone}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const waHref = () => {
    const text = encodeURIComponent(
      `Hi, this is ${name || ''}. ${message || ''}`
    );
    // Use international number for wa.me link
    const number = "918094289536"; // +91 8094289536
    return `https://wa.me/${number}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 sm:px-6 md:px-8 py-10 sm:py-12">
      <div className="w-full max-w-3xl">
        <h1 className="font-balgin text-2xl sm:text-3xl md:text-4xl mb-6">Contact Us</h1>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8">
          <div className="border border-orange-400 rounded-lg p-4">
            <div className="text-orange-400 font-semibold mb-1">Address</div>
            <div className="text-gray-200 text-sm sm:text-base">{ADDRESS}</div>
          </div>
          <div className="border border-orange-400 rounded-lg p-4">
            <div className="text-orange-400 font-semibold mb-1">Email</div>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-200 text-sm sm:text-base underline break-all">{CONTACT_EMAIL}</a>
          </div>
          <div className="border border-orange-400 rounded-lg p-4 sm:col-span-2">
            <div className="text-orange-400 font-semibold mb-1">WhatsApp</div>
            <a href={waHref()} target="_blank" rel="noreferrer" className="text-gray-200 text-sm sm:text-base underline">{WHATSAPP}</a>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">WhatsApp / Phone</label>
            <input
              type="tel"
              placeholder="+91"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="rotating-border-btn px-5 py-2 text-sm sm:text-base">
              Send Email
            </button>
            <a
              href={waHref()}
              target="_blank"
              rel="noreferrer"
              className="border-2 border-orange-400 rounded-[10px] px-5 py-2 text-sm sm:text-base hover:bg-orange-500/10"
            >
              Message on WhatsApp
            </a>
          </div>
        </form>

        {/* Bring in rotating-border styles for buttons on this page */}
        <style>{`
          .rotating-border-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;background:#000;color:#fff;border:2px solid #ff8a3d;border-radius:10px;overflow:hidden}
          .rotating-border-btn::before{content:"";position:absolute;inset:-2px;padding:2px;border-radius:inherit;background:conic-gradient(from 0deg, rgba(255,138,61,0.95), rgba(255,138,61,0.2) 18%, transparent 30%, transparent 70%, rgba(255,138,61,0.2) 82%, rgba(255,138,61,0.95));-webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:ckSpin 3.2s linear infinite;pointer-events:none}
          @keyframes ckSpin{to{transform:rotate(360deg)}}
        `}</style>
      </div>
    </div>
  );
}
