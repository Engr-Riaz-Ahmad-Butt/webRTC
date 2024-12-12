import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";

const Stepper = ({ activeStep, setActiveStep }) => {
  const stepLabels = [
    "Subscription Details",
    "User Details",
    "Payment",
    "Success",
  ];

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="12" lg="12" xl="12">
          <MDBCard className="shadow-none">
            <MDBCardBody>
              {/* Horizontal Stepper */}
              <MDBRow className="mb-4">
                <MDBCol className="d-flex justify-content-center align-items-center">
                  {["1", "2", "3", "4"].map((step, index) => (
                    <div
                      key={index}
                      className="stepper-item d-flex align-items-center justify-content-center"
                    >
                      <div>
                        <div
                          className={`step-circle ${
                            activeStep >= index + 1 ? "active" : ""
                          } ${activeStep > index + 1 ? "completed" : ""}`}
                        >
                          {activeStep > index+1 ? (
                            <MDBIcon fas icon="check" />
                          ) : (
                            step
                          )}
                        </div>
                        <div className="step-label1">{stepLabels[index]}</div>
                      </div>

                      <div
                        className={`step-line ${
                          activeStep > index ? "completed" : ""
                        } ${index === 3 ? "lastline" : ""}`}
                        style={{
                          width: "70px",
                          height: "2px",
                          backgroundColor:
                            activeStep > index ? "grey" : "#ccc",
                        }}
                      ></div>
                    </div>
                  ))}
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Stepper;
