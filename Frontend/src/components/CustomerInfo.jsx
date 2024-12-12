import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import Select from "react-select";
import useCountryList from "react-select-country-list";
import { loadStripe } from "@stripe/stripe-js";

// Load the Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CustomerInfo = ({ setActiveStep }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    title,
    description,
    price,
    isAutoRenewal,
    duration,
    firstName,
    lastName,
    email,
    country,
  } = location.state || {};

  const [customerInfo, setCustomerInfo] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    country: country || "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    country: false,
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [sessionId, setSessionId] = useState(""); // Store sessionId for Stripe

  const countryOptions = useCountryList().getData();

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selectedCountry) => {
    setCustomerInfo({ ...customerInfo, country: selectedCountry.value });
  };

  const handleNext = async (e) => {
    e.preventDefault();

    const newErrors = {
      firstName: !customerInfo.firstName,
      lastName: !customerInfo.lastName,
      email: !customerInfo.email,
      country: !customerInfo.country,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      setLoading(true); // Start loading
      setActiveStep(2);

      try {
        // Send customerInfo data to the server
        const response = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            email: customerInfo.email,
            country: customerInfo.country,
            price, 
            title, 
            isAutoRenewal,
            duration
          }),
        });

        const session = await response.json();

        if (session.sessionId) {
          setSessionId(session.sessionId);
        } else {
          console.error("Failed to create checkout session");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error creating checkout session:", error);
        setLoading(false);
      }
    }
  };

  // Redirect to Stripe Checkout once sessionId is available
  useEffect(() => {
    if (sessionId) {
      const redirectToCheckout = async () => {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error("Error redirecting to checkout:", error);
          setLoading(false); // Stop loading if redirect fails
        }
      };
      redirectToCheckout();
    }
  }, [sessionId]);

  const handlePrevious = () => {
    setActiveStep(1);
    navigate("/subscribe", {
      state: {
        price,
        title,
        description,
        isAutoRenewal,
        duration,
        firstName,
        lastName,
        email,
        country,
      },
    });
  };

  return (
    <MDBContainer className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard style={{ border: "1px solid #C2C2C3" }}>
            <MDBCardBody>
              <MDBCardTitle className="text-center text-black">
                <h3>{title}</h3>
              </MDBCardTitle>
              <MDBCardTitle className="text-center mb-4 text-black">
                <h4>$ {price}</h4>
              </MDBCardTitle>

              <form onSubmit={handleNext}>
                <MDBInput
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={customerInfo.firstName}
                  onChange={handleChange}
                  className={`mb-4 ${errors.firstName ? "is-invalid" : ""}`}
                  required
                />

                <MDBInput
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={customerInfo.lastName}
                  onChange={handleChange}
                  className={`mb-4 ${errors.lastName ? "is-invalid" : ""}`}
                  required
                />

                <MDBInput
                  label="Email"
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleChange}
                  className={`mb-4 ${errors.email ? "is-invalid" : ""}`}
                  required
                />

                <Select
                  options={countryOptions}
                  value={countryOptions.find(
                    (option) => option.value === customerInfo.country
                  )}
                  onChange={handleCountryChange}
                  className={`mb-3 ${errors.country ? "is-invalid" : ""}`}
                  required
                  placeholder="Country"
                />

                <div className="d-flex justify-content-between mt-4">
                  <MDBBtn
                    style={{ background: "#6c757d" }}
                    onClick={handlePrevious}
                  >
                    Precedent
                  </MDBBtn>
                  <MDBBtn
                    className="flex-grow-1 mx-2"
                    style={{ background: "#362A7D" }}
                    type="submit"
                    disabled={loading} // Disable button during loading
                  >
                    {loading ? (
                      <div
                        className="spinner-border text-light spinner-border-sm"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Proceed"
                    )}
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CustomerInfo;
