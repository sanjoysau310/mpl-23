import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [navClass, setNavClass] = useState("navbar");
  const toggleNav = () => {
    navClass === "navbar"
      ? setNavClass("navbar-mobile")
      : setNavClass("navbar");
  };

  const closeNav = () => {
    setNavClass("navbar");
  };

  return (
    <nav id="navbar" className={navClass}>
      <ul>
        <li>
          <NavLink
            to="/"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gallery"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/playersview"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Players
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/teams"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Teams
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            <i className="fa fa-right-to-bracket me-1" aria-hidden="true" />
            Login
          </NavLink>
        </li>
      </ul>
      {navClass === "navbar" ? (
        <i className="fa fa-bars mobile-nav-toggle" onClick={toggleNav} />
      ) : (
        <i className="fa fa-times mobile-nav-toggle" onClick={toggleNav} />
      )}
    </nav>
  );
}
