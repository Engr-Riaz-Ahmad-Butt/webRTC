import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBContainer,
  MDBCollapse,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBBtn,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

// Import Link from react-router-dom for navigation
import { Link } from "react-router-dom";
import SubscriptionCards from "./SubscriptionCards";
import Home from "./Header";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <MDBNavbar className="navbar navbar1 text-dark" expand="lg">
        <MDBContainer fluid className="py-3">
          <Link to="/">
            <MDBNavbarBrand>
              <img
                src="assets/logoabc2.png"
                className="img-fluid logo"
                alt="subscriptionABC logo"
              />
            </MDBNavbarBrand>
          </Link>

          <MDBNavbarToggler
            type="button"
            aria-expanded={openNav}
            aria-label="Toggle navigation"
            onClick={() => setOpenNav(!openNav)}
          >
            <MDBIcon icon="bars" fas className="text-light" />
          </MDBNavbarToggler>

          <MDBCollapse
            className=" justify-content-lg-end justify-content-end"
            navbar
            open={openNav}
          >
            <MDBNavbarNav className="d-flex align-items-lg-center py-lg-0 py-3 gap-3">
              <MDBNavbarItem>
                {/* Using Link component for routing */}
                <MDBNavbarLink className="text-dark">
                  <Link to="/" className="text-dark text-decoration-none">
                    Home
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink className="text-dark">
                  <a className="text-dark" href="/#faqs">
                    FAQ
                  </a>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBDropdown>
                <MDBDropdownToggle
                  style={{ color: "white", fontSize: "16px" }}
                  className="bg-transparent fw-normal p-0 shadow-none"
                  nav
                >
                  Policies
                </MDBDropdownToggle>
                <MDBDropdownMenu className="">
                  {/* Use Link component for internal navigation */}
                  <Link
                    to="/terms-conditions"
                    className="text-dark text-decoration-none"
                  >
                    <MDBDropdownItem link>Terms of Use</MDBDropdownItem>
                  </Link>
                  <Link
                    to="/privacy-terms"
                    className="text-dark text-decoration-none"
                  >
                    <MDBDropdownItem link>Privacy Notice</MDBDropdownItem>
                  </Link>
                  <Link
                    to="/refund-policy"
                    className="text-dark text-decoration-none"
                  >
                    <MDBDropdownItem link>Refund Policy</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>

              <MDBNavbarItem className=" ">
                {/* Using Link component for routing */}
                <MDBBtn style={{ backgroundColor: "violet" }}>
                  Track My Order
                </MDBBtn>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Navbar;
