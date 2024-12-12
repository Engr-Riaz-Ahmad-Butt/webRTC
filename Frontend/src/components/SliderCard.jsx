import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

const SliderCard = ({
  title,
  logo,
  logoHeight,
  logoWidth
  
}) => {
  return (
    <MDBCard
      className=" shadow-sm hover-shadow-lg mx-3 mt-5 d-flex flex-column"
      style={{
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
      </MDBCardBody>
    </MDBCard>
  );
};

export default SliderCard;
