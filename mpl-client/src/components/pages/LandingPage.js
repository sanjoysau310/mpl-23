import React from "react";
import { Link } from "react-router-dom";
// import banner1 from "../../assets/images/banners/banner1.png";
// import banner2 from "../../assets/images/banners/banner2.png";
// import player1 from "../../assets/images/banners/player1.png";
import player2 from "../../assets/images/banners/player2.png";
// import rclLogo from "../../assets/images/logos/rcl.png";
// import mplLogo from "../../assets/images/logos/mpl.png";

export const LandingPage = () => {
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            <h1>Musketeers Premier League 2023</h1>
            <h1>Season 8</h1>

            <h2>No one is born star. We make them stars.</h2>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <div>
                <Link
                  to="/register"
                  className="btn scrollto text-decoration-none me-5"
                >
                  Click here to Register
                </Link>
              </div>
              <div>
                <Link
                  to="/playersview"
                  className="btn scrollto text-decoration-none"
                >
                  Registered Players
                </Link>
              </div>
            </div>
            <h2 className="mt-5 p-5">Event Dates- 21 and 22 January 2023</h2>
            {/* <div className="logo d-flex justify-content-center p-5">
              <img src={rclLogo} alt="RCL" />
            </div> */}
          </div>
          <div
            className="col-lg-6 order-1 order-lg-2 hero-img"
            data-aos="zoom-in"
            data-aos-delay={200}
          >
            {/* <img src={banner1} className="img-fluid animated" alt="Banner1" />
            <img src={banner} className="img-fluid animated" alt="Banner2" />
            <img src={player1} className="img-fluid animated" alt="Banner3" /> */}
            <img src={player2} className="img-fluid animated" alt="Banner4" />
          </div>
        </div>
      </div>
    </section>
  );
};
