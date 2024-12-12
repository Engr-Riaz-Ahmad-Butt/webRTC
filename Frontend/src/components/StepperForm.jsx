import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Stepper from "./Stepper";
import CustomerInfo from "./CustomerInfo";
import Payment from "./Payment";
import SuccessPage from "./SuccessPage";
import SubscriptionDetails from "./SubscriptionDetails";

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const location = useLocation();

  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get("paymentStatus");
  const title = queryParams.get("title");



  useEffect(() => {
    if (paymentStatus === "success") {
      setActiveStep(4);
    }
  }, [paymentStatus]);

  return (
    <div>
      <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />

      {activeStep === 1 && (
        <SubscriptionDetails setActiveStep={setActiveStep} />
      )}
      {activeStep === 2 && <CustomerInfo setActiveStep={setActiveStep} />}
      {activeStep === 3 && <Payment setActiveStep={setActiveStep} />}
      {activeStep === 4 && <SuccessPage setActiveStep={setActiveStep} />}
      {activeStep === 5 && <SuccessPage setActiveStep={setActiveStep} title={title} />}

    </div>
  );
};

export default StepperForm;
