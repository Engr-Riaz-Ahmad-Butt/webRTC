// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   PaymentRequestButtonElement,
// } from "@stripe/react-stripe-js";
// import {
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBBtn,
//   MDBSpinner,
// } from "mdb-react-ui-kit";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// const PaymentForm = ({ setActiveStep }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const stripe = useStripe();
//   const elements = useElements();

//   const {
//     price,
//     title,
//     description,
//     isAutoRenewal,
//     firstName,
//     lastName,
//     email,
//     country,
//   } = location.state || {};

//   const [paymentProcessing, setPaymentProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const [isPaymentRequestAvailable, setIsPaymentRequestAvailable] =
//     useState(false); // Track availability

//   // Store the paymentRequest object in state to persist it
//   const [paymentRequest, setPaymentRequest] = useState(null);

//   useEffect(() => {
//     if (stripe) {
//       const pr = stripe.paymentRequest({
//         country: "US",
//         currency: "usd",
//         total: {
//           label: title,
//           amount: Math.round(price * 100),
//         },
//         requestPayerName: true,
//         requestPayerEmail: true,
//       });

//       setPaymentRequest(pr);

//       pr.canMakePayment()
//         .then((result) => {
//           console.log("canMakePayment result:", result);
//           if (result) {
//             setIsPaymentRequestAvailable(true);
//           } else {
//             console.log(
//               "Payment Request Button not available on this browser."
//             );
//           }
//         })
//         .catch((err) => console.error("canMakePayment error:", err));
//     }
//   }, [stripe, price, title]);

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setPaymentProcessing(true);
//     setError("");

//     try {
//       const amountInCents = Math.round(price * 100); // Convert price to cents

//       if (isAutoRenewal) {
//         const { paymentMethod, error: paymentMethodError } =
//           await stripe.createPaymentMethod({
//             type: "card",
//             card: elements.getElement(CardNumberElement),
//           });

//         if (paymentMethodError) {
//           setError(paymentMethodError.message);
//           return;
//         }

//         const subscriptionResponse = await fetch(
//           `${import.meta.env.VITE_API_URL}/create-subscription`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               paymentMethodId: paymentMethod.id,
//               price: amountInCents / 100,
//               isAutoRenewal: true,
//               email,
//               title,
//               description,
//               firstName,
//               lastName,
//             }),
//           }
//         );

//         const subscriptionData = await subscriptionResponse.json();

//         if (subscriptionData.clientSecret) {
//           const { error } = await stripe.confirmCardPayment(
//             subscriptionData.clientSecret
//           );

//           if (error) {
//             setError(error.message);
//           } else {
//             setActiveStep(4);
//             navigate("/subscribe", { state: { title } });
//           }
//         } else {
//           setError("Subscription creation failed.");
//         }
//       } else {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}/create-payment-intent`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ amount: amountInCents }),
//           }
//         );

//         const { clientSecret } = await response.json();

//         const { paymentIntent, error } = await stripe.confirmCardPayment(
//           clientSecret,
//           {
//             payment_method: {
//               card: elements.getElement(CardNumberElement),
//             },
//             setup_future_usage: "off_session",
//           }
//         );

//         if (error) {
//           setError(error.message);
//         } else if (paymentIntent.status === "succeeded") {
//           setActiveStep(4);
//           navigate("/subscribe", { state: { title } });
//         }
//       }
//     } catch (err) {
//       setError("Payment failed. Please try again.");
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };

//   const handlePrevious = () => {
//     setActiveStep(2);
//     navigate("/subscribe", {
//       state: {
//         price,
//         title,
//         description,
//         isAutoRenewal,
//         firstName,
//         lastName,
//         email,
//         country,
//       },
//     });
//   };

//   const prButtonOptions = paymentRequest
//     ? {
//         paymentRequest,
//         buttonStyle: {
//           theme: "dark",
//           height: "64px",
//         },
//         onPaymentMethodReceived: async (event) => {
//           const { error, paymentMethod } = event;

//           if (error) {
//             setError(error.message);
//           } else {
//             const subscriptionResponse = await fetch(
//               `${import.meta.env.VITE_API_URL}/create-subscription`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   paymentMethodId: paymentMethod.id,
//                   price: Math.round(price * 100) / 100,
//                   isAutoRenewal: true,
//                   email,
//                   title,
//                   description,
//                   firstName,
//                   lastName,
//                 }),
//               }
//             );

//             const subscriptionData = await subscriptionResponse.json();

//             if (subscriptionData.clientSecret) {
//               const { error } = await stripe.confirmCardPayment(
//                 subscriptionData.clientSecret
//               );

//               if (error) {
//                 setError(error.message);
//               } else {
//                 setActiveStep(4);
//                 navigate("/subscribe", { state: { title } });
//               }
//             } else {
//               setError("Subscription creation failed.");
//             }
//           }
//         },
//       }
//     : {};

//   return (
//     <MDBContainer className="my-3">
//       <MDBRow className="justify-content-center">
//         <MDBCol md="6">
//           <MDBCard style={{ border: "1px solid #C2C2C3" }}>
//             <MDBCardBody>
//               <MDBCardTitle className="text-center">
//                 <h3 className="fw-bolder">{title}</h3>
//               </MDBCardTitle>
//               <MDBCardTitle className="text-center mb-4">
//                 <h5>${price}</h5>
//               </MDBCardTitle>

//               <form onSubmit={handlePayment} className="ps-1 py-4">
//                 <div className="mb-4">
//                   <label htmlFor="card-number" className="ms-1">
//                     Card Number
//                   </label>
//                   <div
//                     style={{ border: "1px solid #C2C2C3" }}
//                     className="rounded-1 p-2"
//                   >
//                     <CardNumberElement id="card-number" />
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="exp-date" className="ms-1">
//                     Expiration Date
//                   </label>
//                   <div
//                     style={{ border: "1px solid #C2C2C3" }}
//                     className="rounded-1 p-2"
//                   >
//                     <CardExpiryElement id="exp-date" />
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="cvv" className="ms-1">
//                     CVV
//                   </label>
//                   <div
//                     style={{ border: "1px solid #C2C2C3" }}
//                     className="rounded-1 p-2"
//                   >
//                     <CardCvcElement id="cvv" />
//                   </div>
//                 </div>

//                 {error && <div className="text-danger mb-3">{error}</div>}

//                 <div className="d-flex justify-content-between mt-4">
//                   <MDBBtn
//                     style={{
//                       backgroundColor: "#6c757d",
//                       color: "#ffffff",
//                       width: "150px",
//                     }}
//                     onClick={handlePrevious}
//                   >
//                     Previous
//                   </MDBBtn>

//                   <MDBBtn
//                     type="submit"
//                     disabled={paymentProcessing}
//                     style={{
//                       backgroundColor: "#362A7D",
//                       color: "#ffffff",
//                       flex: 1,
//                     }}
//                     className="mx-2 d-flex align-items-center justify-content-center"
//                   >
//                     {paymentProcessing ? (
//                       <MDBSpinner
//                         size="sm"
//                         role="status"
//                         tag="span"
//                         className="me-2"
//                       />
//                     ) : (
//                       "Pay Now"
//                     )}
//                   </MDBBtn>
//                 </div>
//               </form>

//               {isPaymentRequestAvailable && (
//                 <PaymentRequestButtonElement options={prButtonOptions} />
//               )}
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

// const Payment = (props) => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm {...props} />
//   </Elements>
// );

// export default Payment;


import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Make sure you use the Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const [sessionId, setSessionId] = useState(""); // Store sessionId

  useEffect(() => {
    const createCheckoutSession = async () => {
      try {
        const response = await fetch("http://localhost:3001/create-checkout-session", {
          method: "GET",
        });

        const session = await response.json();

        if (session.sessionId) {
          setSessionId(session.sessionId); // Set sessionId in state
        } else {
          console.error("Failed to create checkout session");
        }
      } catch (error) {
        console.error("Error creating checkout session:", error);
      }
    };

    // Handle the redirect to checkout once sessionId is set
    const handleCheckout = async () => {
      if (sessionId) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error("Error redirecting to checkout:", error);
        }
      }
    };

    // Create checkout session and automatically redirect
    createCheckoutSession().then(() => {
      handleCheckout();
    });
  }, [sessionId]); // Dependency array now includes sessionId

  return <div></div>; // No need for a button, it will redirect automatically
};

export default Payment;
