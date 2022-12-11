import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import mplLogo from "../../assets/images/logos/mpl.png";
import rclLogo from "../../assets/images/logos/rcl.png";

export default function Header() {
  return (
    <header id="header" className="fixed-top ">
      <div className="container d-flex align-items-center">
        <NavLink to="/" className="logo me-auto text-decoration-none">
          <img src={mplLogo} alt="MPL" />
          {/* <img src={rclLogo} alt="RCL" /> */}
        </NavLink>
        <Navbar />
      </div>
    </header>
  );
}
