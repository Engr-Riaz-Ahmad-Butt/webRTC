import { useLocation } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";
import { useEffect } from "react";

const SuccessPage = ({setActiveStep,title}) => {

  useEffect(()=>{
    setActiveStep(5);
  },[])




  return (
    <MDBContainer className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          <MDBCard className="shadow-none">
            <MDBCardBody className="text-center p-3 ">
              <img className="p-4 rounded-circle my-4"  style={{background:"#362A7D"}} src="./assets/tick.png" alt="" />
             


              <MDBCardTitle
                className="h3 mb-4"
                style={{ fontWeight: "bold", color: "black" }}
              >
                Payment Successful!
              </MDBCardTitle>

              <MDBCardText className="text-black mb-4">
                Congratulations! you have successfully subscribed to {title}
                 
              </MDBCardText>

              <Link style={{textDecoration:"underline"}} className="" to="/">Back To Home</Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SuccessPage;
