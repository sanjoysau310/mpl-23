import React from "react";
import { Link } from "react-router-dom";
import MakePayment from "../payment/MakePayment";
import PlayersList from "../players/PlayersList";
export const LandingPage = () => {
  return (
    <>
      <div className="bg-dark text-secondary text-center">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white">
            Musketeers Premier League 2023
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4">Season 8</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button type="button" className="btn btn-lg px-4 me-sm-3 fw-bold">
                {/* <Link to="/register">Click here to Register</Link> */}
                <Link to="/test">Click here to Test</Link>
              </button>
              <MakePayment />
            </div>
          </div>
        </div>
      </div>
      <PlayersList />
    </>
  );
};
