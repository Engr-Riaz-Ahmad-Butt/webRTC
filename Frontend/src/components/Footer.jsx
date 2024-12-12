import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <MDBFooter
      bgColor="light"
      className="text-center text-lg-start px-5  text-muted"
    >
      <section className="">
        <MDBContainer className="text-center p-5 text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-dark">
                Subscriptions
              </h6>

              {/* Subscription Plan Links */}
              <p className="mb-2 text-dark">
                <a href="/#subscriptions" className="text-reset">
                  Adobe Subscription
                </a>
              </p>
              <p className="mb-2 text-dark">
                <a href="/#subscriptions" className="text-reset">
                  Microsoft Office Subscription
                </a>
              </p>
              <p className="mb-2 text-dark">
                <a href="/#subscriptions" className="text-reset">
                  Spotify Subscription
                </a>
              </p>
              <p className="mb-2 text-dark">
                <a href="/#subscriptions" className="text-reset">
                  WooCommerce Subscription
                </a>
              </p>
              <p className="mb-2 text-dark">
                <a href="/#subscriptions" className="text-reset">
                  BigCommerce Subscription
                </a>
              </p>
              <p className="mb-2 text-dark">
                <a href="/#subscriptions" className="text-reset">
                  Azure Subscription
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-dark">
                Social links
              </h6>
              <p className="mb-2 text-dark">
                <a href="#" className="text-reset">
                  Home
                </a>
              </p>
              <p className="mb-2 text-dark">
                <a href="" className="text-reset">
                  Faqs
                </a>
              </p>

              <h6 className="text-uppercase fw-bold mb-4 text-dark">
                Useful links
              </h6>
              <p className="mb-2 text-dark">
                <a href="#" className="text-reset">
                  LinkedIn
                </a>
              </p>
              <p className="mb-2 text-dark">
                <a href="" className="text-reset">
                  Facebook
                </a>
              </p>
              <p className="mb-2 text-dark">
                <a href="" className="text-reset">
                  Twitter
                </a>
              </p>
              <p className="mb-2 text-dark">
                <a href="" className="text-reset">
                  Instagram
                </a>
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-dark">Privacy</h6>
              <p className="mb-2 text-dark">
                <Link to="/terms-conditions" className="text-reset">
                  Terms & Conditions
                </Link>
              </p>
              <p className="mb-2 text-dark">
                <Link to="/privacy-terms" className="text-reset">
                  Privacy Policy
                </Link>
              </p>
              <p className="mb-2 text-dark">
                <Link to="refund-policy" className="text-reset">
                  Refund Policy
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-dark">Contact</h6>
              <p className="text-dark">
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p className="text-dark">
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p className="text-dark">
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p className="text-dark">
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="text-center text-black text-wrap ">
        Copyright © 2024
        <a className="text-black fw-bold" href="/"> Subscription ABC - All rights reserve</a>
      </div>
    </MDBFooter>
  );
}
