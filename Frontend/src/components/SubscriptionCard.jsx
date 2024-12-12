import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

const SubscriptionCard = ({
  title,
  description,
  buttonText,
  features,
  onClick,
  price,
  oldPrice,
  discount,
  logo,
  logoWidth,
  logoHeight
}) => {
  return (
    <MDBCard
      className=" shadow-sm hover-shadow-lg d-flex flex-column"
      style={{
        minHeight: "400px",
        borderRadius: "4px",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        height: "100%",
        border:"1px solid #C2C2C3"
      }}
    >
      <MDBCardBody className="d-flex flex-column justify-content-between p-4">
        {/* Title */}

        <div className="text-center">
        <img src={logo} alt="logo" style={{ width: logoWidth, height: logoHeight }} />
        </div>
        <MDBCardTitle
          className="my-5 text-center"
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {title}
        </MDBCardTitle>

        {/* Price Section */}
        <div className=" mb-4">
          <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${price}</h3>
          {oldPrice && (
            <h4
              style={{
                fontSize: "1rem",
                textDecoration: "line-through",
                color: "#AFBABA",
              }}
            >
              ${oldPrice}
            </h4>
          )}
          {discount && (
            <div
              style={{
                backgroundColor: "#FAE9E7 ",
                color: "#DD301C",
                padding: "4px 8px",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: "bold",
                marginTop: "5px",
                border: "1px solid #DD301C ",
                width: "fit-content",
              }}
            >
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Subscribe Button */}
        <MDBBtn
          className="mt-auto mx-auto rounded-pill py-2 px-4"
          style={{
            fontSize: "1.1rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#362A7D ",
          }}
          onClick={onClick}
        >
          {buttonText || "Subscribe"}
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SubscriptionCard;
