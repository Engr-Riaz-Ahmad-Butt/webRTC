import React from "react";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";

const Header = () => {
  return (
    <MDBContainer className="text-center py-5  my-5">
      <h1
        className="mb-3"
        style={{ fontWeight: "bold", lineHeight: "1.2", color: "#362A7D" }}
      >
        Unlock the Power of Top Platforms, <br /> All in One Subscription
      </h1>
      <div className="mt-4">
        <MDBBtn
          style={{ background: "#362A7D" }}
          className="mx-2 px-5  rounded-pill"
          size="lg"
        >
          Learn More
        </MDBBtn>
        <MDBBtn outline className="mx-2  px-4 rounded-pill" size="lg">
          Buy Now
        </MDBBtn>
      </div>
    </MDBContainer>
  );
};

export default Header;
