import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const SubscriptionDetails = ({ setActiveStep }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    title = "Default Title",
    description = "Default Description",
    price,
    isAutoRenewal: initialAutoRenewal,
    duration: initialDuration,
    firstName,
    lastName,
    email,
    country,
  } = location.state || {};

  const [isAutoRenewal, setIsAutoRenewal] = useState(initialAutoRenewal || false);
  const [duration, setDuration] = useState(initialDuration || "1-month");
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Validate duration: only 1-month is allowed if auto-renewal is enabled
    if (isAutoRenewal && duration !== "1-month") {
      newErrors.duration = "Only 1-month duration is available with automatic renewal enabled.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle Next button click
  const handleNext = () => {
    if (validateForm()) {
      setActiveStep(2);

      navigate("/subscribe", {
        state: { title, description, price, isAutoRenewal, duration,  firstName,
          lastName,
          email,
          country },
      });
    }
  };

  // Scroll to top when component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <MDBContainer className="my-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard style={{ border: "1px solid #C2C2C3" }}>
              <MDBCardBody className="p-4">
                <MDBCardTitle className="text-center text-black fw-bolder">
                  <h3>{title}</h3>
                </MDBCardTitle>
                <MDBCardText className="fw-bolder mb-4 text-black text-center">
                  <h4>$ {price}</h4>
                </MDBCardText>

                {/* Duration Selection */}
                <div className="mb-4">
                  <label className="form-label">Select Duration:</label>
                  <select
                    className="form-select"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    disabled={isAutoRenewal}
                  >
                    <option value="1-month">1 Month</option>
                    <option value="3-months">3 Months</option>
                    <option value="1-year">1 Year</option>
                    <option value="2-years">2 Years</option>
                    <option value="3-years">3 Years</option>
                  </select>
                  {errors.duration && (
                    <div className="text-danger">{errors.duration}</div>
                  )}
                </div>

                {/* Auto-Renewal Checkbox */}
                <MDBCheckbox
                  className="mb-4"
                  id="controlledCheckbox"
                  label="Enable Automatic Renewal"
                  checked={isAutoRenewal}
                  onChange={() => {
                    setIsAutoRenewal(!isAutoRenewal);
                    if (!isAutoRenewal) setDuration("1-month"); // Reset to 1 month if enabling auto-renewal
                  }}
                />
                
                {/* Next Button */}
                <MDBBtn
                  style={{ background: "#362A7D" }}
                  className="mt-2"
                  block
                  onClick={handleNext}
                >
                  Proceed
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default SubscriptionDetails;
