// // src/ConsciousKarmaSections.jsx
// import React, { useEffect, useState } from "react";
// import InstantReportForm from "./InstantReportForm.jsx";

// /* === Images (your filenames) === */
// import loveImg from "./Love.jpg";
// import financeImg from "./Finance.jpg";
// import fortuneImg from "./Fortune.png";
// import intelligenceImg from "./Intelligence.jpg";
// import intuitionImg from "./Intuition.jpg";
// import earthGif from "./Earth Gif.gif";
// import zeroPng from "./zero.png";
// import karmaTransparent from "./Karma transparent.png";
// import earthConnections from "./Earth connections.png";
// import gradeImg from "./Grade.jpg";
// import blankStarImg from "./blank-star.jpg";
// import mobileEnergyFlow from "./mobile number energy flow.png";
// import Typewriter from "./Typewriter.jsx";
// /* ============ THEME & LAYOUT (Injected CSS) ============ */
// const CSS = `
// /* --------- Fonts --------- */
// /* Balgin (self-host under /public/fonts/Balgin/*) */
// @font-face{
//   font-family:'Balgin';
//   src:url('/fonts/Balgin/Balgin-ExtraLight.woff2') format('woff2'),
//       url('/fonts/Balgin/Balgin-ExtraLight.woff')  format('woff');
//   font-weight:200; font-style:normal; font-display:swap;
// }
// @font-face{
//   font-family:'Balgin';
//   src:url('/fonts/Balgin/Fontspring-DEMO-balgin-extralight.otf') format('opentype');
//   font-weight:200; font-style:normal; font-display:swap;
// }

// /* use it on your headline */
// h1.headline, h2.headline, h3.headline, .headline{
//   font-family:'Balgin', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif !important;
//   font-size:clamp(28px,4vw,80px);
//   line-height:1.06; letter-spacing:.02em; margin:0;
// }
// .headline .accent{ color:var(--accent,#ff8a3d); }

// /* Arsenal (Google) also loaded via <link> below */
// :root{
//   --bg:#000; --text:#f2f2f2; --muted:#dcdcdc;
//   --accent:#ff8a3d; --accent-700:#f07a2e;
//   --line:#2a2a2a; --shadow:0 10px 30px rgba(0,0,0,.35);
//   --font-body:'Arsenal',system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,Helvetica,Arial,sans-serif;
//   --font-display:'Balgin','Arsenal',system-ui,sans-serif;
// }
// *{box-sizing:border-box}
// html,body,#root{height:100%}
// body{margin:0;background:var(--bg);color:var(--text);font:18px/1.6 var(--font-body)}
// a{color:var(--accent);text-decoration:none}
// img{max-width:100%;height:auto;display:block}

// .container{max-width:1280px;margin:0 auto;padding:0 24px}
// .section{padding:72px 0;position:relative;background:#000}
// .section .divider-top,.section .divider-bottom{position:absolute;left:0;right:0;height:4px;background:linear-gradient(90deg,#bbb,#444,#222);opacity:.5}
// .section .divider-top{top:0}.section .divider-bottom{bottom:0}

// /* --------- Type --------- */
// .h1,.h2,.h3,.headline{font-family: 'Balgin', system-ui, -apple-system, Segoe UI, Roboto, sans-serif!important;}
// .h1{font-size:clamp(34px,4.5vw,40px);line-height:1.1;margin:0 0 14px}
// .h2{font-size:clamp(30px,4vw,52px);line-height:1.1; margin:0 0 10px}
// .h3{font-size:clamp(16px,3.2vw,24px);line-height:1.15;margin:0 0 10px}
// .lead{color:var(--muted);max-width:72ch}
// .center{text-align:center}

// .headline{
//   font-family: 'Balgin', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
//   font-size:clamp(18px,3vw,64px);
//   line-height:1.08;
//   font-weight:700;
//   letter-spacing:.02em;
//   text-transform:uppercase;
// }
// .headline .accent{color:var(--accent)}

// /* --------- Navbar (text-only brand) --------- */
// .heroNav{display:flex;align-items:center;justify-content:space-between;padding:22px 0}
// .brandRow{display:flex;align-items:center}
// .brandMark{line-height:1}
// .brandTop{
//   font-family:'Arsenal',system-ui,sans-serif;
//   font-size:clamp(24px,2.2vw,32px);
//   letter-spacing:.2px; color:#fff; display:block;
// }
// .brandBottom{
//   font-family:'Balgin','Arsenal',system-ui,sans-serif;
//   font-size:clamp(28px,2.4vw,36px);
//   letter-spacing:2px; color:var(--accent);
//   display:block; margin-top:2px;
// }

// /* Hamburger + Drawer */
// .hamburger{display:grid;place-items:center;gap:6px;width:46px;height:42px;padding:8px;border-radius:12px;background:transparent;cursor:pointer}
// .hamburger span{display:block;width:24px;height:3px;background:var(--accent);border-radius:2px;transition:transform .25s ease, opacity .25s ease}
// .hamburger.is-open span:nth-child(1){transform:translateY(6px) rotate(45deg)}
// .hamburger.is-open span:nth-child(2){opacity:0}
// .hamburger.is-open span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
// .navBackdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(2px);z-index:1000}
// .navDrawer{position:fixed;top:0;right:-340px;height:100vh;width:min(340px,92vw);background:#0f0f0f;border-left:1px solid #333;box-shadow:0 20px 60px rgba(0,0,0,.5);z-index:1001;padding:22px 20px;display:flex;flex-direction:column;gap:8px;transition:right .28s ease}
// .navDrawer.open{right:0}
// .navTitle{font-family:var(--font-display);font-weight:800;font-size:18px;margin-bottom:8px;color:#fff}
// .navLink{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px;border:1px solid #3a3a3a;border-radius:12px;background:#141414;color:#f2f2f2;text-decoration:none;font-weight:700;font-family:var(--font-display)}
// .navLink:hover{background:#191919;border-color:#555}
// .navHint{font-size:12px;color:#cfcfcf;font-family:var(--font-body)}

// /* --------- Hero --------- */
// .heroStage{min-height:74vh;display:grid;grid-template-rows:auto 1fr}
// .heroGrid{display:grid;grid-template-columns:1fr;gap:28px;align-items:center}
// @media(min-width:980px){.heroGrid{grid-template-columns:1.2fr .8fr}}
// .heroRight{display:grid;row-gap:16px;justify-items:center}
// .heroStage .lead{
//   font-family:'Arsenal',system-ui,sans-serif;
// font-size: clamp(14px, 2vw, 30px);
//   line-height:1.35;color:#c8c8c8;margin:0 0 6px;text-align:center;
// }

// /* Right column / Icon list */
// .iconCol{display:block;margin:0;padding:0}
// .bigBadge{display:flex;align-items:center;gap:33px;margin:0}
// .bigBadge img{width:clamp(64px,2.2vw,102px);height:clamp(90px,5.2vw,120px);object-fit:contain;border-radius:14px;display:block}
// .bigBadge .label{font-family:'Arsenal',system-ui,sans-serif;font-size:clamp(18px,3.2vw,31px);line-height:1;margin:0}

// /* Form + actions */
// .formWrap{padding:14px;background:rgba(255,255,255,.03);}
// .formRow{display:grid;grid-template-columns:120px 1fr;gap:12px}
// select,.input{
//   appearance:none;width:100%;padding:14px;border:1px solid #555;border-radius:10px;background:#121212;color:var(--text);
//   font-size:16px;font-family:var(--font-body)
// }
// .input{max-width:420px}
// .btn{display:inline-flex;align-items:center;justify-content:center;border:2px solid var(--accent) ;border-radius:14px;padding:14px 18px;background:black;color:var(--accent);font-weight:800;cursor:pointer;font-family:var(--font-display)}
// .btn:hover{background:var(--accent-700);color:#000}
// .inline{display:flex;gap:12px;flex-wrap:wrap;margin-top:14px}
// .priceTag{font-weight:700;font-family:var(--font-display);font-size:28px;color:var(--accent)}
// .actionsRow{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:14px}

// /* PDF icon link */
// .pdfLink{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border:1px solid #6b6b6b;border-radius:10px;background:#141414;color:var(--accent)}
// .pdfLink:hover{color:var(--accent-700);border-color:#8a8a8a;background:#161616}
// .pdfIcon{width:22px;height:22px;display:block}
// .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

// /* --------- “What is this” (3 icons) --------- */
// .centerBlock{max-width:960px;margin:0 auto;text-align:center}
// .grid3{display:grid;grid-template-columns:1fr;gap:40px;align-items:start;justify-items:center}
// @media (min-width:1100px){.grid3{grid-template-columns:repeat(3,1fr)}}
// .iconCard{display:flex;flex-direction:column;align-items:center;text-align:center;gap:18px;max-width:360px}
// .iconCard p{margin:0;line-height:1.6;font-size:18px;color:#eaeaea}

// /* Uniform, equal-height icon circles (Earth/0/Karma) */
// .iconCircle{
//   width: clamp(180px, 14vw, 220px);
//   height: clamp(180px, 14vw, 220px);
//   border-radius: 50%;
//   display:grid;place-items:center;
//   background:transparent;overflow:hidden;
// }
// .iconCircle img{width:100%;height:100%;object-fit:cover;display:block}
// .iconCircle.--sketch img{transform:scale(1.06)}

// /* --------- Blog cards --------- */
// .blogGrid{display:grid;grid-template-columns:1fr;gap:18px}
// @media(min-width:960px){.blogGrid{grid-template-columns:repeat(3,1fr)}}
// .blogCard{padding:16px;background:rgba(255,255,255,.03);border:1px solid #3a3a3a;border-radius:14px;box-shadow:var(--shadow)}
// .blogCard h4{margin:8px 0 6px;font-size:18px;font-family:var(--font-display)}
// .blogCard p{color:#dcdcdc;font-family:var(--font-body)}

// /* --------- Footer --------- */
// .footerBar{position:relative;background:linear-gradient(180deg,var(--accent),var(--accent-700));padding:18px 0;margin-top:0}
// .footerBar .row{display:flex;flex-direction:column;gap:14px;align-items:center;justify-content:space-between}
// .footerBar a{color:#1d1209;text-decoration:underline;font-weight:700}
// @media (min-width:900px){.footerBar .row{flex-direction:row}}

// /* --------- Modal --------- */
// .modalOverlay{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);display:grid;place-items:center;z-index:1000}
// .modal{width:min(720px,92vw);max-height:86vh;overflow:auto;background:#0f0f0f;border:1px solid #3a3a3a;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.5);padding:24px;position:relative}
// .modalClose{position:absolute;top:10px;right:14px;width:36px;height:36px;border-radius:999px;border:1px solid #5a5a5a;background:#151515;color:#eee;font-size:20px;cursor:pointer}

// /* ==== UNIQUE SEQUENCE split layout + typewriter ==== */
// .split2{
//   display:grid;
//   grid-template-columns: 1.1fr .9fr;   /* left | right */
//   gap:48px;
//   align-items:center;
// }
// @media (max-width: 980px){
//   .split2{ grid-template-columns:1fr; gap:28px; }
// }

// /* Left column */
// .split2 .left .lead{ text-align:left; }
// .splitImg{
//   width:100%;
//   border-radius:14px;
//   box-shadow: var(--shadow);
//   margin: 14px 0 16px;
// }

// /* Right column */
// .rightBlock{
//   text-align:right;
//   display:grid;
//   row-gap:16px;
//   justify-items:end;
// }
// .rightHeading{
//   font-family:'Balgin','Arsenal',system-ui,sans-serif;
//   font-weight:300;
//   font-size: clamp(32px, 2.6vw, 64px);
//   line-height: 1.18;
//   letter-spacing: .01em;
// }
// .split2 .right .lead{ text-align:right; }

// /* Typewriter caret (shared) */
// .caret{
//   display:inline-block;
//   width:2px;
//   height:1em;
//   background: var(--accent);
//   margin-left:4px;
//   vertical-align: -0.12em;
//   animation: caretBlink 1s steps(1) infinite;
// }
// @keyframes caretBlink { 50% { opacity: 0; } }

// /* Bullet typewriter list */
// .tpList{ list-style:none; margin:6px 0 0; padding:0; width:100%; max-width:700px }
// .tpItem{ display:flex; gap:10px; align-items:flex-start; margin:8px 0 }
// .tpBullet{ width:8px; height:8px; border-radius:50%; background:var(--accent); margin-top:.65em }
// .tpText{ flex:1; line-height:1.5 }
// .rightBlock{
//   text-align: left;
//   display: grid;
//   row-gap: 16px;
//   justify-items: start;
// }
// .rightHeading{ text-align: left; }
// .split2 .right .lead{ text-align: left; }
// /* Right column line list: small + compact + left-aligned */
// .rightBlock .plainWrap { justify-self: stretch; text-align: left; }

// .tpPlain{ 
//   display: grid; 
//   row-gap: 0;           /* no space between lines */
//   margin: 0; 
//   padding: 0; 
// }
// .tpLine{
//   margin: 0; 
//   line-height: 1.18;    /* tight line height */
//   font-size: clamp(13px, 1.1vw, 17px); /* smaller text */
//   letter-spacing: .01em;
//   text-align: left; 
//   direction: ltr;       /* forces left-to-right typing */
//   white-space: normal; 
// }

// /* caret reused */
// .caret{
//   display:inline-block;width:2px;height:1em;background:var(--accent);
//   margin-left:4px;vertical-align:-0.12em;animation: caretBlink 1s steps(1) infinite;
// }
// @keyframes caretBlink { 50% { opacity: 0; } }
// /* Right column line list: small + compact + left-aligned */
// .rightBlock .plainWrap { justify-self: stretch; text-align: left; }

// .tpPlain{ 
//   display: grid; 
//   row-gap: 0;           /* no space between lines */
//   margin: 0; 
//   padding: 0; 
// }
// .tpLine{
//   margin: 0; 
//   line-height: 1.18;    /* tight line height */
//   font-size: clamp(13px, 1.1vw, 17px); /* smaller text */
//   letter-spacing: .01em;
//   text-align: left; 
//   direction: ltr;       /* forces left-to-right typing */
//   white-space: normal; 
// }

// /* caret reused */
// .caret{
//   display:inline-block;width:2px;height:1em;background:var(--accent);
//   margin-left:4px;vertical-align:-0.12em;animation: caretBlink 1s steps(1) infinite;
// }
// @keyframes caretBlink { 50% { opacity: 0; } }
// /* ==== WOVEN (left globe / right content + effects) ==== */
// .wovenGrid{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center}
// @media(max-width:980px){.wovenGrid{grid-template-columns:1fr;gap:28px}}

// .globeWrap{position:relative}
// .globeImg{width:100%;max-width:720px;border-radius:14px;box-shadow:var(--shadow);opacity:.95}

// .copyWrap{position:relative;z-index:1;text-align:left}
// .weaveHeading{margin:0 0 8px;font-family:'Balgin','Arsenal',system-ui,sans-serif;
//   font-weight:300;font-size:clamp(28px,3.2vw,52px);line-height:1.12;letter-spacing:.02em}
// .weavePara{margin:8px 0 0}

// //* Woven layout + typewriter bits */
// .wovenGrid{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center}
// @media(max-width:980px){.wovenGrid{grid-template-columns:1fr;gap:28px}}
// .globeImg{width:100%;max-width:720px;border-radius:14px;box-shadow:var(--shadow)}
// .copyWrap{text-align:left}
// .weaveHeading{margin:0 0 8px;font-family:'Balgin','Arsenal',system-ui,sans-serif;
//   font-weight:300;font-size:clamp(28px,3.2vw,52px);line-height:1.12;letter-spacing:.02em}
// .weavePara{margin:8px 0 0}
// .wAccent{color:var(--accent);font-weight:700}
// /* caret */
// @keyframes caretBlink{50%{opacity:0}}
// .weaveCaret{display:inline-block;width:2px;height:1em;background:var(--accent);
//   margin-left:4px;vertical-align:-0.12em;animation:caretBlink 1s steps(1) infinite}
// /* === Yantra section typography & alignment === */
// /* Center-align Yantra section */
// /* Center EVERYTHING in #yantra */
// #yantra .centerBlock{
//   text-align: center !important;
//   max-width: 980px;
//   margin: 0 auto;
// }

// /* Heading size */
// #yantra .yantraTitle{
//   font-family: 'Balgin','Arsenal',system-ui,sans-serif;
//   font-weight: 300;
//   font-size: clamp(28px, 3.4vw, 56px);
//   line-height: 1.12;
//   letter-spacing: .02em;
//   margin: 0 0 12px;
// }

// /* Paragraph centered + nice measure */
// #yantra .yantraLead{
//   max-width: 760px;          /* adjust if you want narrower/wider */
//   margin: 8px auto 16px;     /* centers the block itself */
//   font-size: clamp(15px, 1.2vw, 18px);
//   line-height: 1.55;
//   color: #e9e9e9;
//   text-align: center !important;
// }

// /* Center the CTA neatly */
// #yantra .ctaLink{
//   display: inline-block;
//   font-weight: 700;
//   margin: 0 auto;
// }

// /* === Final CTA: center everything === */
// #final-cta .heroGrid{
//   display:grid;
//   grid-template-columns: 1fr 1fr;      /* two equal columns on desktop */
//   gap:32px;
//   align-items:center;
//   justify-items:center;                /* centers each column's content */
// }
// @media (max-width: 980px){
//   #final-cta .heroGrid{ grid-template-columns:1fr; }
// }

// #final-cta .h2{
//   text-align:center;
//   margin: 0 0 12px;
//   font-size: clamp(26px, 3vw, 32px);
//   line-height: 1.15;
// }

// #final-cta .iconCol{
//   display:flex;                        /* horizontal row */

//   justify-content:center;
//   align-items:center;
//   flex-wrap:wrap;                      /* wrap nicely on small screens */
//   margin-top: 10px;
// }

// #final-cta .bigBadge{
//   display:flex;
//   flex-direction:column;
//   align-items:center;
//   gap:8px;
//   min-width: 116px;                    /* keeps spacing even */
// }

// #final-cta .bigBadge img{
//   width: clamp(70px, 7vw, 100px);
//   height: clamp(70px, 4vw, 100px);
//   object-fit: contain;
//   border-radius: 14px;
// }

// #final-cta .bigBadge .label{
//   font-family:'Arsenal',system-ui,sans-serif;
//   font-size: 16px;
//   line-height: 1;
// }

// #final-cta .ctaWrap{
//   display:grid;
//   justify-items:center;                /* centers form + link */
//   gap:12px;
// }

// #final-cta .ctaWrap .actionsRow{ justify-content:center; } /* center the price/btn row */
// #final-cta .ctaWrap .inline{ justify-content:center; }      /* center the "View Sample" link */

// /* ===== Poster layout: big image with top + bottom text ===== */
// .poster{
//   display:grid;
//   justify-items:center;
//   row-gap:36px;               /* space between title ↔ image ↔ caption */
// }

// .posterTitle{
//   // font-family: var(--font-display);
//   font-size: 32px;    /* same large size as your other big headings */
//   line-height: 1.18;
//   text-align: center;
//   margin: 0;
// }

// .posterImg{
//   width: min(790px, 63vw);    /* big, but responsive */
//   display: block;
//   margin: 0 auto;
//   border-radius: 14px;        /* optional: remove if you want square corners */
// }

// .posterCaption{
//   // font-family: var(--font-display);
//   font-size: 32px;    /* big paragraph like in screenshot */
//   line-height: 1.32;
//   text-align: center;
//   margin: 0;
//   max-width: 558px;
// }
// /* ===== DISTINCTLY YOURS block ===== */
// .mantra{
//   display: grid;
//   justify-items: center;
//   row-gap: clamp(22px, 3.6vw, 48px);   /* same gap between each line */
// }

// .mantraLine{
//   margin: 0;
//   text-align: center;
//   // font-family: var(--font-display);
//   font-size: clamp(28px, 4.6vw, 56px); /* size of the first 3 lines */
//   line-height: 1.22;
//   letter-spacing: .01em;
// }

// .mantraEm{
//   font-size: clamp(34px, 6vw, 72px);   /* bigger “DISTINCTLY YOURS.” */

//   letter-spacing: .02em;
// }

// .mantraCta{
//   margin-top: clamp(10px, 1.8vw, 18px);
//   font-size: clamp(16px, 1.6vw, 22px);
// }

// .ctaLink{ color: var(--accent); font-weight: 700; text-decoration: none; }
// /* ===== Yantra (multi-line verse with groups) ===== */
// .yantra{
//   display:grid;
//   justify-items:center;
//   row-gap: clamp(22px, 3.6vw, 42px);     /* space between the groups */
// }

// .yantraGroup{
//   display:grid;
//   justify-items:center;
//   row-gap: clamp(10px, 1.6vw, 16px);     /* space between lines inside a group */
// }

// /* Each line size matches the screenshot */
// .yantraLine{
//   margin: 0;
//   text-align: center;
//   // font-family: var(--font-display);
//   font-size: clamp(28px, 4.6vw, 32px);
//   line-height: 1.22;
//   letter-spacing: .01em;
// }

// /* Orange emphasis for “digital Age Yantra” */
// .yantraEm{ color: var(--accent); font-weight:700 }

// /* CTA line under the paragraph */
// .yantraCta{
//   margin-top: clamp(12px, 2vw, 24px);
//   font-size: clamp(16px, 1.6vw, 22px);
// }

// .ctaLink{ color: var(--accent); font-weight:700; text-decoration:none }
// /* ===== Woven globe + paragraph (like screenshot) ===== */
// .wovenPoster{
//   display:grid;
//   justify-items:center;
//   row-gap: clamp(24px, 4vw, 44px); /* space: globe ↔ text */
// }

// .wovenGlobe{
//   width: min(580px, 70vw);          /* big but responsive */
//   max-width: 100%;
//   border-radius: 14px;               /* remove if you want square */
//   box-shadow: var(--shadow);
//   margin: 0 auto;
// }

// .wovenCopy{
//   margin: 0;
//   text-align: center;
//   // font-family: var(--font-display);
//   font-size: clamp(28px, 4.6vw, 32px);  /* same big size as other posters */
//   line-height: 1.32;
//   letter-spacing: .01em;
//   max-width: 743px;                    /* comfortable measure */
// }

// .wovenCopy .accent{
//   color: var(--accent);
//   // font-weight: 700;
// }
// /* ===== Final CTA (poster layout) ===== */
// #final-cta .ctaPoster{
//   display:grid;
//   justify-items:center;
//   row-gap: clamp(18px,4vw,36px);
// }

// #final-cta .ctaTitle{
//   margin:0;
//   text-align:center;

//   font-size: clamp(28px, 4.6vw, 32px);
//   line-height:1.25;
//   letter-spacing:.01em;
// }

// #final-cta .ctaIcons{
//   display:flex;
//   align-items:center;
//   justify-content:center;
//   gap: clamp(18px,5vw,46px);
// }
// #final-cta .ctaIcons img{
//   width: clamp(52px,7vw,84px);
//   height: clamp(52px,7vw,84px);
//   object-fit:contain;
//   border-radius:14px;
// }

// #final-cta .ctaUI{
//   width: min(760px, 92vw);
//   display:grid;
//   row-gap:14px;
// }
// #final-cta .ctaRow{
//   display:flex;
//   align-items:center;
//   gap:16px;
// }
// #final-cta .ctaBox{
//   height:64px;
//   border:2px solid #8c8c8c;
//   background:transparent;
//   border-radius:16px;
// }
// #final-cta .ctaBox.small{ flex:0 0 clamp(110px,20vw,140px); }
// #final-cta .ctaBox.big{   flex:1; }
// #final-cta .ctaBox.hl{    border-color: var(--accent); }

// #final-cta .ctaPrice{
//   font-family: var(--font-display);
//   font-weight:800;
//   font-size: clamp(22px,3vw,32px);
//   color: var(--text);
//   margin-right:6px;
// }
// /* === Screenshot-style HERO (stacked headline + title) === */
// .stackHead{
//   font-family:'Balgin', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
//   font-weight:200;                 /* thin like the mock */
//   text-transform:uppercase;
//   font-size:clamp(28px, 4.6vw, 72px);
//   line-height:1.02;                /* tight like the mock */
//   letter-spacing:.02em;
//   margin: 0; 
// }
// .stackHead .line{ display:block; }
// .stackHead .line + .line{ margin-top:.14em; }
// .stackHead .accent{ color:var(--accent); }

// .heroRightTitle{
//   font-family:'Balgin', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
//   font-weight:300;
//   font-size:clamp(24px, 2.6vw, 40px);
//   line-height:1.1;
//   letter-spacing:.01em;
//   margin:0 0 10px;
//   text-align:left;
// }

// /* a little tighter spacing on the right list */
// .iconCol{ display:grid; gap:18px; }
// .bigBadge{ gap:18px; }
// .bigBadge .label{
//   font-family:'Arsenal',system-ui,sans-serif;
//   font-size:clamp(16px, 2vw, 22px);
//   line-height:1;
// }

// `;

// /* Load Arsenal from Google Fonts */
// function useLoadFonts(){
//   useEffect(()=>{
//     const id = "gf-arsenal";
//     if(!document.getElementById(id)){
//       const l = document.createElement("link");
//       l.id = id; l.rel = "stylesheet";
//       l.href = "https://fonts.googleapis.com/css2?family=Arsenal:wght@400;700&display=swap";
//       document.head.appendChild(l);
//     }
//   },[]);
// }

// /* Inject the CSS once */
// function useInjectCSS(){
//   useEffect(()=>{
//     const id = "ck-sections-css";
//     if(!document.getElementById(id)){
//       const s = document.createElement("style");
//       s.id = id; s.textContent = CSS; document.head.appendChild(s);
//     }  
//   },[]);
// }

// function Divider(){ return (<><div className="divider-top"/><div className="divider-bottom"/></>); }

// /* Inline form used in hero + modal */
// function InlineInstantReportForm({
//   ctaLabel="Get Instant Report",
//   onSubmit,
//   initialIsd="+91",
//   initialMobile=""
// }){
//   const [isd, setIsd] = useState(initialIsd);
//   const [mobile, setMobile] = useState(initialMobile);
//   useEffect(()=>{ setIsd(initialIsd); },[initialIsd]);
//   useEffect(()=>{ setMobile(initialMobile); },[initialMobile]);

//   function handleSubmit(e){
//     e.preventDefault();
//     const full = `${isd}${mobile}`.replace(/\s+/g,"");
//     if(!/^[+][0-9]{6,15}$/.test(full)){ alert("Please enter a valid mobile number"); return; }
//     onSubmit ? onSubmit({isd, mobile, full}) : alert(`Generating instant report for ${full}`);
//   }

//   return (
//     <form onSubmit={handleSubmit} className="formWrap" aria-label="Instant Report Form">
//       <div className="formRow">
//         <select value={isd} onChange={e=>setIsd(e.target.value)} aria-label="Country code">
//           <option value="+91">🇮🇳 +91</option>
//           <option value="+1">🇺🇸 +1</option>
//           <option value="+44">🇬🇧 +44</option>
//           <option value="+61">🇦🇺 +61</option>
//           <option value="+971">🇦🇪 +971</option>
//         </select>
//         <input
//           className="input"
//           type="tel"
//           inputMode="numeric"
//           pattern="[0-9 ]*"
//           placeholder="Enter your mobile number"
//           value={mobile}
//           onChange={e=>setMobile(e.target.value)}
//           aria-label="Mobile number"
//         />
//       </div>

//       <div className="actionsRow">
//         <span className="priceTag">₹269</span>
//         <button className="btn" type="submit">{ctaLabel}</button>

//         <a className="pdfLink" href="/sample-report" aria-label="View Sample Report (PDF)">
//           <svg className="pdfIcon" viewBox="0 0 24 24" fill="none"
//               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//               aria-hidden="true">
//             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//             <path d="M14 2v6h6"/>
//             <path d="M8 13h8M8 17h8"/>
//           </svg>

//         </a>
//       </div>
//     </form>
//   );
// }

// /* ---------- Bullet-by-bullet Typewriter (local, no external dep) ---------- */
// function BulletTypewriter({ items, speed = 26, lineDelay = 650 }) {
//   const [current, setCurrent] = useState(0);
//   const [typed, setTyped] = useState(() => items.map(() => ""));

//   useEffect(() => {
//     let timer;
//     const line = items[current];
//     if (!line) return;

//     if (typed[current].length < line.length) {
//       timer = setTimeout(() => {
//         setTyped((prev) => {
//           const next = [...prev];
//           next[current] = line.slice(0, prev[current].length + 1);
//           return next;
//         });
//       }, speed);
//     } else if (current < items.length - 1) {
//       timer = setTimeout(() => setCurrent((c) => c + 1), lineDelay);
//     }
//     return () => clearTimeout(timer);
//   }, [current, items, typed, speed, lineDelay]);

//   return (
//     <ul className="tpList" aria-live="polite">
//       {items.map((full, i) => {
//         const isActive = i === current;
//         const isDone = typed[i].length === full.length;
//         return (
//           <li className="tpItem" key={i}>
//             <span className="tpBullet" aria-hidden="true" />
//             <span className="tpText">
//               {typed[i]}
//               {isActive && !isDone ? <span className="caret" /> : null}
//             </span>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

// /* ===================== MAIN PAGE ===================== */
// export default function ConsciousKarmaSections(){
//   useLoadFonts();
//   useInjectCSS();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [prefillIsd, setPrefillIsd] = useState("+91");
//   const [prefillMobile, setPrefillMobile] = useState("");

//   // ESC & scroll lock when overlay is open
//   useEffect(()=>{
//     const overlayOpen = showForm || menuOpen;
//     if(!overlayOpen) return;
//     const onKey = (e)=>{ if(e.key === 'Escape'){ setShowForm(false); setMenuOpen(false); } };
//     const { body } = document; const prev = body.style.overflow;
//     body.style.overflow = "hidden"; window.addEventListener('keydown', onKey);
//     return ()=>{ window.removeEventListener('keydown', onKey); body.style.overflow = prev; };
//   },[showForm, menuOpen]);

//   function openPrefilledModal({isd, mobile}){
//     setPrefillIsd(isd); setPrefillMobile(mobile); setShowForm(true);
//   }

//   return (
//     <div>
//       {/* HERO */}
//       <section className="section heroStage" id="hero">
//         <div className="container">
//           <div className="heroNav">
//             {/* TEXT-ONLY BRAND */}
//             <div className="brandRow">
//               <div className="brandMark" aria-label="Conscious Karma">
//                 <span className="brandTop">conscious</span>
//                 <span className="brandBottom">KARMA</span>
//               </div>
//             </div>

//             {/* HAMBURGER */}
//             <button
//               className={`hamburger ${menuOpen ? "is-open" : ""}`}
//               aria-label="Open menu" aria-expanded={menuOpen}
//               onClick={()=>setMenuOpen(v=>!v)}
//             >
//               <span></span><span></span><span></span>
//             </button>
//           </div>

//         <div className="heroGrid">
//   {/* LEFT — stacked headline exactly like the screenshot */}
//   <div>
//     <h1 className="stackHead" aria-label="Your mobile number is the key to achieving your dreams">
//       <span className="line">YOUR MOBILE NUMBER</span>
//       <span className="line">IS THE <span className="accent">KEY</span></span>
//       <span className="line"><span className="accent">TO</span> ACHIEVING YOUR</span>
//       <span className="line"><span className="accent">DREAMS.</span></span>
//     </h1>
//   </div>

//   {/* RIGHT — title + list; form stays EXACTLY the same */}
//   <div className="heroRight">
//     <h2 className="heroRightTitle">Mobile Number Influence</h2>

//     <div className="iconCol">
//       {[
//         [financeImg,"Finance & Work"],
//         [fortuneImg,"Fortune"],
//         [loveImg,"Charm & Love"],
//         [intuitionImg,"Sense"],
//         [intelligenceImg,"Intelligence"],
//       ].map(([src,label],i)=>(
//         <div className="bigBadge" key={i}>
//           <img src={src} alt={label}/>
//           <div className="label">{label}</div>
//         </div>
//       ))}
//     </div>

//     {/* ⬇️ THIS stays untouched: price ₹269, button, and PDF icon */}
//     <InlineInstantReportForm ctaLabel="Get Instant Report" onSubmit={openPrefilledModal}/>
//   </div>
// </div>
// </div>

//         {/* Drawer */}
//         {menuOpen && <div className="navBackdrop" onClick={()=>setMenuOpen(false)} />}
//         <nav className={`navDrawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
//           <div className="navTitle">Menu</div>
//           <a className="navLink" href="/create-account" onClick={()=>setMenuOpen(false)}>
//             Create Account <span className="navHint">/create-account</span>
//           </a>
//           <a className="navLink" href="/get-report" onClick={()=>setMenuOpen(false)}>
//             Personalised Report <span className="navHint">/get-report</span>
//           </a>
//           <a className="navLink" href="/consult" onClick={()=>setMenuOpen(false)}>
//             Consult <span className="navHint">/consult</span>
//           </a>
//           <a className="navLink" href="#blogs" onClick={()=>setMenuOpen(false)}>
//             Blog <span className="navHint">#blogs</span>
//           </a>
//         </nav>

//         <Divider/>
//       </section>

//       {/* WHAT IS THIS */}
//       <section className="section" id="what-is-this">
//         <div className="container center">
//           <h2 className="h3">What is this</h2>

//           <div className="grid3" style={{ marginTop: 24 }}>
//             <div className="iconCard">
//               <span className="iconCircle">
//                 <img src={earthGif} alt="Earth rotating" />
//               </span>
//               <p>
//                 The <b>UNIVERSE</b> is alive with <b>ENERGY</b>. These cosmic forces
//                 move through us, subtly shaping thoughts, guiding actions, and colouring experiences.
//               </p>
//             </div>

//             <div className="iconCard">
//               <span className="iconCircle --sketch">
//                 <img src={zeroPng} alt="Zero symbol" />
//               </span>
//               <p>
//                 Sages used numbers as symbols for celestial influence, capturing
//                 the essence of cosmic energies with simplicity and precision.
//               </p>
//             </div>

//             <div className="iconCard">
//               <span className="iconCircle --sketch">
//                 <img src={karmaTransparent} alt="Karma symbol" />
//               </span>
//               <p>
//                 Our choices and the energies we embrace shape destiny, creating the
//                 path we walk and the reality we manifest.
//               </p>
//             </div>
//           </div>
//         </div>
//         <Divider />
//       </section>

//       {/* UNIQUE SEQUENCE */}
//      {/* UNIQUE SEQUENCE — big image with top & bottom text */}
// <section className="section" id="unique-sequence">
//   <div className="container">
//     <div className="poster">
//       <p className="posterTitle">
//         Every mobile number is a unique sequence,<br/>
//         each carrying distinct energy
//       </p>

//       <img
//         className="posterImg"
//         src={mobileEnergyFlow}
//         alt="Interlinked digit energy flow diagram"
//       />

//       <p className="posterCaption">
//         The interaction and position of its digits
//         form a pattern of vibrations, shaping
//         actions, behaviour, and the flow of life
//       </p>
//     </div>
//   </div>
//   <Divider/>
// </section>
// {/* DISTINCTLY YOURS — matches screenshot */}
// <section className="section" id="distinctly-yours">
//   <div className="container">
//     <div className="mantra">
//       <p className="mantraLine">Your date of birth can be shared.</p>
//       <p className="mantraLine">Your name can be repeated.</p>
//       <p className="mantraLine">Your mobile number is,</p>
//       <p className="mantraLine mantraEm">DISTINCTLY YOURS.</p>

//       <p className="mantraCta">
//         <a className="ctaLink" href="/get-report">Get personalised report  &raquo;&raquo;&raquo;</a>
//       </p>
//     </div>
//   </div>
//   <Divider/>
// </section>


// {/* YANTRA — exactly like the screenshot */}
// <section className="section" id="yantra">
//   <div className="container">
//     <div className="yantra">
//       <div className="yantraGroup">
//         <p className="yantraLine">
//           A mobile number is a <span className="yantraEm">digital Age Yantra</span>
//         </p>
//         <p className="yantraLine">a tool threaded with different forms of energy.</p>
//       </div>

//       <div className="yantraGroup">
//         <p className="yantraLine">Consciously crafted,</p>
//         <p className="yantraLine">it holds the power to ease a journey,</p>
//         <p className="yantraLine">shape a path, and</p>
//         <p className="yantraLine">open new opportunities.</p>
//       </div>

//       <div className="yantraGroup">
//         <p className="yantraLine">Your mobile number isn’t just for communication;</p>
//         <p className="yantraLine">it is your greatest asset – the code of your journey.</p>
//       </div>

//       <p className="yantraCta">
//         <a className="ctaLink" href="/consult">Invest in your greatest asset  &raquo;&raquo;&raquo;</a>
//       </p>
//     </div>
//   </div>
//   <Divider/>
// </section>

// {/* WOVEN — globe on top, big paragraph below (matches screenshot) */}
// <section className="section" id="woven">
//   <div className="container">
//     <div className="wovenPoster">
//       <img
//         className="wovenGlobe"
//         src={earthConnections}
//         alt="Networked Earth connections"
//       />

//       <p className="wovenCopy">
//         Just as numbers are woven into the fabric of the
//         universe, your mobile number is intricately woven into
//         your life. It guides your journey, <span className="accent">
//         influencing your karma with every call, message, and interaction.</span>
//       </p>
//     </div>
//   </div>
//   <Divider/>
// </section>

//       {/* BLOGS */}
//       <section className="section" id="blogs">
//         <div className="container">
//           <div className="centerBlock">
//             <p className="h2">Blogs</p>

//           </div>
//           <div className="blogGrid" style={{marginTop:24}}>
//             {[{img:gradeImg,title:"Grades of Energy"},
//               {img:blankStarImg,title:"Finding Your Lucky Pattern"},
//               {img:blankStarImg,title:"Mobile Number Energy Flow"}].map((b,i)=> (
//               <article className="blogCard" key={i}>
//                 <img src={b.img} alt={b.title}/>
//                 <h4>{b.title}</h4>
//                 <p>Short excerpt of your blog goes here. Replace with real content pulled from your CMS or Markdown files.</p>
//                 <a className="ctaLink" href={`/blog/sample-${i+1}`}>Read more »</a>
//               </article>
//             ))}
//           </div>
//         </div>
//         <Divider/>
//       </section>

//       {/* FINAL CTA */}
//      {/* FINAL CTA — same as screenshot */}
// {/* FINAL CTA — same as screenshot */}
// <section className="section" id="final-cta">
//   <div className="container">
//     <div className="ctaPoster">
//       <p className="ctaTitle">
//         Is Your Mobile Number Enhancing Your Journey or<br/>
//         Holding You Back?
//       </p>

//       <div className="ctaIcons">
//         {[financeImg, fortuneImg, loveImg, intuitionImg, intelligenceImg].map((src,i)=>(
//           <img key={i} src={src} alt="" />
//         ))}
//       </div>

//       {/* ⬇️ Use the existing inline form component */}
//       <InlineInstantReportForm
//         ctaLabel="Purchase & Get Report"
//         onSubmit={openPrefilledModal}
//       />
//     </div>

//     <footer className="footerBar" style={{marginTop:32}}>
//       <div className="container row">
//         <div className="row">
//           <a href="/termsandconditions">Terms & Conditions</a>
//           <a href="/privacy-policy">Privacy Policy</a>
//         </div>
//         <div style={{color:'#1d1209',fontWeight:700}}>
//           Contact Us – suma@consciouskarma.co
//         </div>
//       </div>
//     </footer>
//   </div>
//   <Divider/>
// </section>

// </div>

//   );
// }
// function TypeWriterOnce({ text, speed = 28 }) {
//   const [out, setOut] = React.useState("");
//   React.useEffect(() => {
//     let i = 0, t;
//     const step = () => {
//       if (i <= text.length) { setOut(text.slice(0, i++)); t = setTimeout(step, speed); }
//     };
//     step(); return () => clearTimeout(t);
//   }, [text, speed]);
//   return (
//     <h2 className="weaveHeading">
//       {out}{out.length < text.length ? <span className="weaveCaret" /> : null}
//     </h2>
//   );
// }

// /* Paragraph: true typewriter, with live accent on the final phrase */
// function ParagraphTypewriter({
//   text,
//   highlight = "",         // optional ending phrase that should be accented
//   speed = 14,
//   startDelay = 250,
// }) {
//   const full = highlight ? `${text} ${highlight}` : text;
//   const hiStart = highlight ? text.length + 1 : full.length;

//   const [i, setI] = React.useState(0);

//   React.useEffect(() => {
//     let t, kick;
//     const type = () => {
//       setI(prev => {
//         if (prev < full.length) {
//           t = setTimeout(type, speed);
//           return prev + 1;
//         }
//         return prev;
//       });
//     };
//     kick = setTimeout(type, startDelay);
//     return () => { clearTimeout(t); clearTimeout(kick); };
//   }, [full, speed, startDelay]);

//   const normal = full.slice(0, Math.min(i, hiStart));
//   const hi     = i > hiStart ? full.slice(hiStart, i) : "";

//   return (
//     <p className="lead weavePara" dir="ltr" style={{ textAlign: "left" }}>
//       {normal}{highlight && <span className="wAccent">{hi}</span>}
//       {i < full.length && <span className="weaveCaret" />}
//     </p>
//   );
// }





// src/ConsciousKarmaSections.jsx
import React, { useEffect, useState } from "react";
import InstantReportForm from "./InstantReportForm.jsx";

/* === Images (your filenames) === */
import loveImg from "./Love.jpg";
import financeImg from "./Finance.jpg";
import fortuneImg from "./Fortune.png";
import intelligenceImg from "./Intelligence.jpg";
import intuitionImg from "./Intuition.jpg";
import earthGif from "./Earth Gif.gif";
import zeroPng from "./zero.png";
import karmaTransparent from "./Karma transparent.png";
import earthConnections from "./Earth connections.png";
import gradeImg from "./Grade.jpg";
import blankStarImg from "./blank-star.jpg";
import mobileEnergyFlow from "./mobile number energy flow.png";

/* ===================== MAIN PAGE ===================== */
export default function ConsciousKarmaSections() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [prefillIsd, setPrefillIsd] = useState("+91");
  const [prefillMobile, setPrefillMobile] = useState("");
  const [expandedBlog, setExpandedBlog] = useState(null);

  // --- BLOG ITEMS (local demo data) ---
  const blogItems = [
    {
      img: gradeImg,
      title: "Grades of Energy",
      excerpt: "How different mobile number patterns influence energetic grades.",
      content:
        "Numbers carry vibrations. In this post we explore how digits combine to form energy grades, what to look for in your number, and simple practices to harmonize your communication frequency.",
    },
    {
      img: blankStarImg,
      title: "Finding Your Lucky Pattern",
      excerpt: "Small patterns can yield big shifts — learn to spot them.",
      content:
        "Lucky patterns are often subtle. We'll walk through examples, how to test patterns against real life events, and a practical checklist to identify patterns that work for you.",
    },
    {
      img: mobileEnergyFlow,
      title: "Mobile Number Energy Flow",
      excerpt: "Understand the flow your number creates in daily life.",
      content:
        "Your mobile number is a channel. This article dissects how call/message behaviour, number cycles, and timing shape the energy flow around you — and what to do if the flow feels blocked.",
    },
  ];

  // ESC & scroll lock when overlay is open
  useEffect(() => {
    const overlayOpen = showForm || menuOpen;
    if (!overlayOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowForm(false);
        setMenuOpen(false);
      }
    };
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      body.style.overflow = prev;
    };
  }, [showForm, menuOpen]);

  function openPrefilledModal({ isd, mobile }) {
    setPrefillIsd(isd);
    setPrefillMobile(mobile);
    setShowForm(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-50 font-arsenal overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 md:pt-8 lg:pt-12 pb-0">
      {/* Animated rotating border button styles (applies to all CTA buttons) */}
      <style>{`
        .rotating-border-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;background:#000;color:#fff;border:2px solid #ff8a3d;border-radius:9999px;overflow:hidden}
        .rotating-border-btn::before{content:"";position:absolute;inset:-2px;padding:2px;border-radius:inherit;background:conic-gradient(from 0deg, rgba(255,138,61,0.95), rgba(255,138,61,0.2) 18%, transparent 30%, transparent 70%, rgba(255,138,61,0.2) 82%, rgba(255,138,61,0.95));-webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:ckSpin 3.2s linear infinite;pointer-events:none}
        @keyframes ckSpin{to{transform:rotate(360deg)}}
        .rotating-border-btn:focus{outline:none;box-shadow:0 0 0 3px rgba(255,138,61,.25)}

        /* Fluid type helpers for consistent responsive text sizing */
        .text-fluid-16-20{font-size:clamp(16px,3.8vw,20px)}
        .text-fluid-18-24{font-size:clamp(18px,3.6vw,24px)}
        .text-fluid-18-30{font-size:clamp(18px,4vw,30px)}
        .text-fluid-24-30{font-size:clamp(24px,3.2vw,30px)}
      `}</style>
      {/* HERO */}
      <section className="relative min-h-screen bg-black flex flex-col pt-12 sm:pt-16 md:pt-4 lg:pt-18">
        <div className="container mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-center">
          {/* 🔹 Header (Brand + Hamburger) */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between py-3 sm:py-4 z-20 px-3 sm:px-6 lg:px-8">
            <a href="/" className="block" aria-label="conscious KARMA home">
              <img
                src="/ck-logo.svg"
                alt="conscious KARMA"
                className="h-[40px] sm:h-[52px] md:h-[60px] lg:h-[70px] w-auto select-none"
                draggable={false}
              />
            </a>

            {/* 🔹 Hamburger Icon */}
            <button
              className="flex flex-col justify-between w-[40px] h-[36px] sm:w-[46px] sm:h-[42px] p-[6px] sm:p-[8px] rounded-[12px] bg-transparent cursor-pointer transition-all duration-300"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block w-[28px] sm:w-[45px] h-[2.5px] sm:h-[3px] bg-white rounded-[2px] transition-all duration-300 ${menuOpen
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
          </div>

          {/* 🔹 Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-8 sm:gap-10 lg:gap-6 flex-1 justify-end mt-16 sm:mt-0">
            {/* LEFT — Hero Heading */}
            <div className="flex flex-col justify-center lg:justify-end h-full">
              <div className="flex flex-col items-center sm:items-start justify-center lg:justify-end">
                <h1 className="font-balgin mb-8 sm:mb-12 md:mb-16 lg:mb-[90px] font-extralight uppercase text-[24px] sm:text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] sm:leading-[1.02] tracking-[0.02em] text-center sm:text-left w-full sm:-ml-4 md:-ml-8 lg:-ml-12 xl:-ml-16 2xl:-ml-20">
                  <span className="block mb-1 sm:mb-2">YOUR MOBILE NUMBER</span>
                  <span className="block mb-1 sm:mb-2 text-center sm:text-left">
                    IS THE <span className="text-orange-400">KEY</span>
                  </span>
                  <span className="block mb-1 sm:mb-2 text-center sm:text-left">
                    <span className="text-orange-400">TO</span> ACHIEVING YOUR
                  </span>
                  <span className="block mb-1 sm:mb-2 text-center sm:text-left">
                    <span className="text-orange-400">DREAMS</span>
                  </span>
                </h1>
              </div>
            </div>

            {/* RIGHT — Info + Form */}
            <div className="flex flex-col items-center justify-start text-center gap-4 sm:gap-6 pt-[2px]">
              {/* Heading */}
              <div className="">
                <h2 className="font-thin text-gray-200 text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] leading-tight">
                  Mobile Number Influence
                </h2>
                <p className="font-thin text-gray-200 text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] mt-[-4px] sm:mt-[-6px]">
                  Key Areas of Life
                </p>
              </div>

              {/* Icon + Label Grid */}
              <div className="flex justify-center items-center mt-[-10px] sm:mt-[-20px]">
                {/* Fixed icon column + consistent gaps for perfectly equal spacing */}
                <div className="grid grid-cols-[36px_1fr] sm:grid-cols-[44px_1fr] md:grid-cols-[56px_1fr] items-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4 md:gap-y-5 text-[16px] sm:text-[18px] md:text-[20px] w-[240px] sm:w-[260px] md:w-[280px]">
                  {[
                    [financeImg, "Finance & Work"],
                    [fortuneImg, "Fortune"],
                    [loveImg, "Charm & Love"],
                    [intuitionImg, "Sense"],
                    [intelligenceImg, "Intelligence"],
                  ].map(([src, label], i) => (
                    <React.Fragment key={i}>
                      <div className="flex items-center justify-center">
                        <img
                          src={src}
                          alt={label}
                          className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
                        />
                      </div>
                      <div className="text-left text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] whitespace-nowrap">{label}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Price + Inputs */}
              <div className="w-full max-w-[95%] sm:max-w-[360px] flex flex-col items-center px-0">
                <div className="w-full">
                  <InlineInstantReportForm
                    ctaLabel="Get Instant Report"
                    onSubmit={openPrefilledModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-[2px] z-20"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <nav
          className={`fixed top-0 right-0 h-full w-[min(340px,92vw)] bg-[#0f0f0f] border-l border-[#333] shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-[30] flex flex-col gap-[8px] p-[22px_20px] transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="font-balgin font-bold text-white mb-2">Menu</div>
          {[
            ["Create Account", "/create-account"],
            ["Personalised Report", "/personalised-report"],
            ["Consult", "/consult"],
            ["Blog", "#blogs"],
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

        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#bbb] via-[#444] to-[#222] opacity-50" />
      </section>


      {/* WHAT IS THIS */}
      <section className="relative min-h-screen bg-black flex items-center justify-center pt-8 sm:pt-10 md:pt-12 lg:pt-[44px] pb-8 sm:pb-10 md:pb-12 lg:pb-[64px] px-4 sm:px-6">
        <div className="container mx-auto max-w-full text-center flex flex-col justify-center">
          <h2 className="font-balgin text-[20px] sm:text-[22px] md:text-[24px] lg:text-[25px] leading-[1.05] mb-8 sm:mb-10 md:mb-12 lg:mb-16 font-bold tracking-[0.02em] text-white">
            What is this
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-[44px] items-center justify-items-center">
            {/* Earth section */}
            <div className="flex flex-col items-center text-center gap-4 sm:gap-5 md:gap-6 lg:gap-[22px] w-full max-w-[320px]">
              <div className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] rounded-full grid place-items-center bg-transparent overflow-hidden">
                <img
                  src={earthGif}
                  alt="Earth rotating"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="m-0 leading-[1.7] text-[16px] sm:text-[17px] md:text-[18px] text-gray-200 font-thin w-full px-2 sm:px-0">
                The universe is alive with energy. These cosmic forces move
                through us, subtly shaping thoughts, guiding actions, and
                coloring experiences
              </p>
            </div>

            {/* Zero section */}
            <div className="flex flex-col items-center text-center gap-4 sm:gap-5 md:gap-6 lg:gap-[22px] w-full max-w-[320px]">
              <div className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] rounded-full grid place-items-center bg-transparent overflow-hidden">
                <img
                  src={zeroPng}
                  alt="Zero symbol"
                  className="w-full h-full object-cover scale-[1.02]"
                />
              </div>
              <p className="m-0 leading-[1.7] text-[16px] sm:text-[17px] md:text-[18px] text-[#eaeaea] w-full px-2 sm:px-0">
                Sages used numbers as symbols for celestial influence, capturing the &nbsp; &nbsp;&nbsp; essence of cosmic energies with &nbsp;&nbsp; simplicity and precision
              </p>
            </div>

            {/* Karma section */}
            <div className="flex flex-col items-center text-center gap-4 sm:gap-5 md:gap-6 lg:gap-[22px] w-full max-w-[320px] md:col-span-2 lg:col-span-1">
              <div className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] rounded-full grid place-items-center bg-transparent overflow-hidden">
                <img
                  src={karmaTransparent}
                  alt="Karma symbol"
                  className="w-full h-85 object-contain scale-[1.5]"
                />
              </div>
              <p className="m-0 leading-relaxed text-[16px] sm:text-[17px] md:text-[18px] text-thin w-full px-2 sm:px-0">
                Our choices and the energies we &nbsp;&nbsp; embrace shape destiny, creating the &nbsp;&nbsp;&nbsp;path we walk and the reality we &nbsp;&nbsp;&nbsp;manifest
              </p>
            </div>
          </div>
        </div>

        {/* Gradient line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#bbb] via-[#444] to-[#222] opacity-50" />
      </section>

      {/* UNIQUE SEQUENCE */}
      <section className="relative min-h-screen bg-black flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-[72px] px-4 sm:px-6">
        <div className="container mx-auto text-center">
          {/* Top Text (forced line breaks to match mock) */}
          <p className="text-center text-[#eaeaea] font-arsenal text-fluid-16-20 leading-[1.6] mb-6 sm:mb-8 md:mb-10 lg:mb-[40px] max-w-[90%] sm:max-w-[640px] mx-auto">
            <span className="block">Every mobile number is a unique sequence, each</span>
            <span className="block">carrying distinct energy</span>
          </p>

          {/* Middle Text (forced line breaks to match mock) */}
          <p className="text-center text-gray-200 font-arsenal text-fluid-16-20 leading-[1.6] mb-8 sm:mb-10 md:mb-12 lg:mb-[60px] max-w-[90%] sm:max-w-[700px] mx-auto">
            <span className="block">The interaction and position of its digits form a</span>
            <span className="block">pattern of vibrations, shaping actions, behaviour, and</span>
            <span className="block">the flow of life</span>
          </p>

          {/* Image */}
          <div className="w-full flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-[30px]">
            <img
              src={mobileEnergyFlow}
              alt="Mobile energy flow diagram"
              className="w-[280px] sm:w-[400px] md:w-[510px] lg:w-[600px] xl:w-[780px] max-w-[40vw] mx-auto rounded-[14px] object-contain"
            />
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#bbb] via-[#444] to-[#222] opacity-50" />
      </section>

      {/* DISTINCTLY YOURS */}
      <section className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center py-12 sm:py-16 md:py-20 lg:py-[72px] px-4 sm:px-6">
        <div className="container mx-auto">
          {/* Text block */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <p className="text-gray-200 font-thin text-fluid-24-30 leading-[1.22]">
              Your DATE of BIRTH can be <span className="text-[#d87d3d]">shared</span>.
            </p>
            <p className="text-gray-200 font-thin text-fluid-24-30 leading-[1.22]">
              Your NAME can be <span className="text-[#d87d3d]">repeated</span>.
            </p>
            <p className="text-gray-200 font-thin text-fluid-24-30 leading-[1.22]">
              Your MOBILE NUMBER
            </p>
            <p className="text-gray-200 font-thin text-fluid-24-30 leading-[1.22]">
              is <span className="text-[#d87d3d]">DISTINCTLY YOURS</span>.
            </p>
          </div>

          {/* Call to action */}
          <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-[170px]">
            <a
              href="/get-report"
            className="text-[#d87d3d] text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-relaxed font-light hover:opacity-80 transition-opacity"
            >
              Get personalised report &gt;&gt;&gt;
            </a>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#bbb] via-[#444] to-[#222] opacity-50" />
      </section>

     

      {/* WOVEN */}
      <section className="relative bg-black flex flex-col items-center justify-center py-12 sm:py-14 md:py-16 px-4 sm:px-6 text-center">
        {/* Text */}
        <p className="max-w-[90%] sm:max-w-[560px] mx-auto text-gray-200 text-fluid-16-20 leading-relaxed font-thin text-center">
          <span className="block">Just as numbers are woven into the fabric of</span>
          <span className="block"> the universe, your mobile number is intricately</span>
          <span className="block">woven into your life. It guides your journey,</span>
          <span className="block text-orange-400 font-medium">influencing your karma with every call,</span>
          <span className="block text-orange-400 font-medium">message, and interaction.</span>
        </p>

        {/* Image */}
        <img
          src={earthConnections}
          alt="Earth connections"
          className="mt-6 sm:mt-8 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[350px] mx-auto"
        />

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#bbb] via-[#444] to-[#222] opacity-50" />
      </section>
      {/* YANTRA */}
      <section className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center py-12 sm:py-16 md:py-20 lg:py-[72px] px-4 sm:px-6">
        <div className="container mx-auto max-w-[90%] sm:max-w-[680px]">
          {/* Text block */}
          <p className="text-gray-200 text-fluid-18-24 leading-relaxed font-light mb-6 sm:mb-8 md:mb-10 lg:mb-[40px]">
            <span className="block">
              A mobile number is a <span className="text-[#d87d3d]">DIGITAL AGE YANTRA</span>
            </span>
            <span className="block">a tool threaded with different forms of energy.</span>
          </p>

          <p className="text-gray-200 text-fluid-18-24 leading-relaxed font-light mb-6 sm:mb-7 md:mb-8 lg:mb-[32px]">
            <span className="block">Consciously crafted,</span>
            <span className="block">it holds the power to ease a journey,</span>
            <span className="block">shape a path, and</span>
            <span className="block">open new opportunities.</span>
          </p>

          <p className="text-gray-200 text-fluid-18-24 leading-relaxed font-light mb-8 sm:mb-10 md:mb-12 lg:mb-[48px]">
            <span className="block">Your mobile number is not just utility.</span>
            <span className="block">it is your greatest asset -</span>
            <span className="block">the code of your journey.</span>
          </p>

          {/* CTA */}
          <a
            href="/consult"
            className="text-[#d87d3d] text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-relaxed font-light hover:opacity-80 transition-opacity"
          >
            Invest in your greatest asset &gt;&gt;&gt;
          </a>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#bbb] via-[#444] to-[#222] opacity-50" />
      </section>
      {/* BLOGS */}
      <section id="blogs" className="relative min-h-screen bg-black flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-[72px] px-4 sm:px-6">
        <div className="container mx-auto text-center w-full">
          {/* 🔹 Heading */}
          <h2 className="font-balgin text-white text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] mb-8 sm:mb-10 md:mb-12 lg:mb-[40px]">
            Blogs
          </h2>

          {/* 🔹 Blog Cards (mapped with inline Read more) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-[24px] justify-items-center max-w-[1200px] mx-auto">
            {blogItems.map((b, i) => (
              <div
                key={i}
                className="w-full max-w-[400px] border-2 border-orange-400 rounded-lg overflow-hidden bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-all"
              >
                <div className="aspect-square bg-gradient-to-br from-orange-400/20 to-orange-600/10 flex items-center justify-center">
                  {b.img ? (
                    <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-5xl sm:text-6xl">✦</div>
                  )}
                </div>
                <div className="p-4 sm:p-5 md:p-6 text-left">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">{b.title}</h3>
                  <p className="text-gray-300 text-sm mb-3 sm:mb-4">{b.excerpt}</p>

                  {expandedBlog === i ? (
                    <div className="mt-2 text-sm text-gray-200">
                      <p className="mb-3">{b.content}</p>
                      <button
                        className="btn text-sm px-3 py-2"
                        onClick={() => setExpandedBlog(null)}
                        aria-expanded={true}
                      >
                        Read less
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <button
                        className="text-orange-400 font-semibold text-sm hover:text-orange-300"
                        onClick={() => setExpandedBlog(i)}
                        aria-expanded={false}
                      >
                        Read more →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 🔹 Bottom “more >>>” */}
          <div className="mt-[20px] text-right w-full max-w-[960px] mx-72">
            <a href="/blogs" className="text-white text-[20px] font-light">
              more &gt;&gt;&gt;
            </a>
          </div>
        </div>

        {/* 🔹 Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#bbb] via-[#444] to-[#222] opacity-50" />
      </section>


      {/* FINAL CTA */}
  <section className="relative min-h-screen bg-black flex flex-col items-center justify-center py-10 sm:py-12 md:py-[45px] px-4 sm:px-6">
        <div className="container mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-7 md:space-y-8 mb-8 sm:mb-12">
          {/* 🔹 Heading */}
          <p className="font-thin text-white text-fluid-18-30 leading-relaxed max-w-[90%] sm:max-w-[620px] mx-auto">
            <span className="block">Is Your Mobile Number Enhancing Your</span>
            <span className="block">Journey or Holding You Back?</span>
          </p>

          {/* 🔹 Icon Row */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full overflow-x-auto px-4 scrollbar-hide">
            {[
              financeImg,
              fortuneImg,
              loveImg,
              intuitionImg,
              intelligenceImg,
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex-shrink-0 object-contain"
              />
            ))}
          </div>

          {/* 🔹 Form Section */}
          <div className="w-full max-w-[360px] mt-2 sm:mt-[8px] flex flex-col items-center">
            <InlineInstantReportForm
              ctaLabel="Get Report"
              onSubmit={openPrefilledModal}
            />
          </div>
        </div>

      </section>

      {/* Global Footer (sticks to page bottom, full width, with orange border around) */}
      <footer className="mt-auto w-screen relative left-1/2 -translate-x-1/2 bg-black text-white border-2 border-orange-400 py-2 sm:py-2 md:py-3">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-between text-center lg:text-left">
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
            <a
              href="/termsandconditions"
              className="text-white underline font-bold text-xs sm:text-sm hover:text-gray-300 transition-colors"
            >
              Terms & Conditions
            </a>
            <a
              href="/privacy-policy"
              className="text-white underline font-bold text-xs sm:text-sm hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/refund-policy"
              className="text-white underline font-bold text-xs sm:text-sm hover:text-gray-300 transition-colors"
            >
              Refund Policy
            </a>
            <a
              href="/shipping-policy"
              className="text-white underline font-bold text-xs sm:text-sm hover:text-gray-300 transition-colors"
            >
              Shipping & Delivery
            </a>
          </div>
          <div className="text-white font-bold text-xs sm:text-sm break-all sm:break-normal">
            Contact Us – suma@consciouskarma.co
          </div>
        </div>
      </footer>


      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-[4px] z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-600 rounded-[16px] p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="font-balgin text-xl sm:text-2xl mb-4 text-orange-400">
              Enter Details
            </h3>
            <InstantReportForm
              ctaLabel="Confirm & Pay"
              initialIsd={prefillIsd}
              initialMobile={prefillMobile}
              onSubmit={(data) => {
                // Handle submission (e.g., API call for report sending)
                console.log("Submitted:", data);
                alert(`Generating and sending report for ${data.full}...`); // Simulate report send
                setShowForm(false);
              }}
            />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 w-full py-2 border border-gray-500 rounded-md text-gray-50 hover:bg-gray-800 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Inline form used in hero + modal */
function InlineInstantReportForm({
  ctaLabel = "Get Instant Report",
  onSubmit,
  initialIsd = "+91",
  initialMobile = "",
}) {
  const [isd, setIsd] = useState(initialIsd);
  const [mobile, setMobile] = useState(initialMobile);
  useEffect(() => {
    setIsd(initialIsd);
  }, [initialIsd]);
  useEffect(() => {
    setMobile(initialMobile);
  }, [initialMobile]);

  function handleSubmit(e) {
    e.preventDefault();
    const full = `${isd}${mobile}`.replace(/\s+/g, "");
    if (!/^[+][0-9]{6,15}$/.test(full)) {
      alert("Please enter a valid mobile number");
      return;
    }
    onSubmit
      ? onSubmit({ isd, mobile, full })
      : alert(`Generating instant report for ${full}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 sm:p-4 bg-transparent rounded-[10px] flex flex-col gap-3 sm:gap-4 w-full"
      aria-label="Instant Report Form"
    >
      <div className="flex gap-2 sm:gap-3 w-full">
        <select
          value={isd}
          onChange={(e) => setIsd(e.target.value)}
          className="w-[70px] sm:w-[85px] p-2.5 sm:p-3 rounded-md bg-black border border-gray-500 text-gray-50 text-[11px] sm:text-sm font-medium appearance-none bg-no-repeat pr-6 cursor-pointer hover:border-gray-400 focus:border-orange-400 focus:outline-none transition-colors"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"%3e%3cpath stroke="%239ca3af" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8 4 4 4-4"/%3e%3c/svg%3e\')',
            backgroundPosition: 'right 0.25rem center',
            backgroundSize: '0.9em',
          }}
          aria-label="Country code"
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
          <option value="+61">🇦🇺 +61</option>
          <option value="+971">🇦🇪 +971</option>
        </select>
        <input
          className="flex-1 p-2.5 sm:p-3 rounded-md bg-black border border-gray-500 text-gray-50 text-[13px] sm:text-sm placeholder:text-gray-500 hover:border-gray-400 focus:border-orange-400 focus:outline-none transition-colors"
          type="tel"
          inputMode="numeric"
          pattern="[0-9 ]*"
          placeholder="Mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          aria-label="Mobile number"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 justify-center w-full">
        <span className="px-3 py-2.5 sm:py-3 text-white text-[17px] sm:text-xl font-arsenal font-bold rounded-md w-full sm:w-[90px] flex items-center justify-center">
          ₹ 269
        </span>
        <button
          className="rotating-border-btn px-4 py-2.5 sm:py-3 text-white font-balgin text-[13px] sm:text-sm font-bold transition w-full sm:w-[220px]"
          type="submit"
        >
          {ctaLabel}
        </button>

        <a
          className="w-full sm:w-[40px] h-[40px] sm:h-[44px] border border-gray-500 rounded-md bg-black hover:bg-gray-800 active:bg-gray-700 flex items-center justify-center transition-colors"
          href="/sample-report"
          aria-label="View Sample Report (PDF)"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M8 13h8M8 17h8" />
          </svg>
          <span className="sm:hidden ml-2 text-[12px] font-medium">View Sample</span>
        </a>
      </div>
    </form>
  );
}


