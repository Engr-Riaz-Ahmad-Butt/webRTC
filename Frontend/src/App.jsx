import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TermsPage from "./components/TermsPage";
import PrivacyPage from "./components/PrivacyPage";
import RefundPage from "./components/RefundPage";
import CustomerInfo from "./components/CustomerInfo";
import SuccessPage from "./components/SuccessPage";
import Payment from "./components/Payment";
import Error404page from "./components/Error404page";
import StepperForm from "./components/StepperForm";
import Home from "./components/Home";
import './app.css';

import WebRTCVideo from "./components/WebRTCVideo";
import WebRTCAudio from "./components/WebRTCAudio";
import CallCenter from "./components/CallCenter";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<CallCenter />} />
          <Route path="/video-call" element={<WebRTCVideo />} />
          <Route path="/audio-call" element={<WebRTCAudio />} />
          <Route path="*" element={<Error404page />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
