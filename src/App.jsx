import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


import Landing from './landingPage.jsx';
import PersonalisedReport from './PersonalisedReport.jsx';
import Plans from './plans.jsx';
import Consult from './Consult.jsx';
import TermsAndConditions from './TermsAndConditions.jsx';
import PrivacyPolicy from './PrivacyPolicy.jsx';
import RefundPolicy from './RefundPolicy.jsx';
import ShippingPolicy from './ShippingPolicy.jsx';


export default function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/personalised-report" element={<PersonalisedReport />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
      </Routes>
   
    </BrowserRouter>
  );
}
