import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

const Error404page = () => {
  return (
    <MDBContainer className="d-flex justify-content-center align-items-center min-vh-100" fluid>
      <MDBRow className="text-center">
        <MDBCol>
          <div className="error-container">
            {/* Icon with animation */}
            <MDBIcon fas icon="exclamation-triangle" size="6x" className="error-icon mb-4" />

            <MDBTypography tag="h1" className="error-title">
              404
            </MDBTypography>
            <MDBTypography tag="p" className="error-message">
              Oops! The page you are looking for doesn't exist.
            </MDBTypography>

            {/* Button to navigate back to home */}
            <MDBBtn color="primary" href="/" className="go-home-btn">
              Go Back to Home
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Error404page;
