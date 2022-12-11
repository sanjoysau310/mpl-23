import React from "react";
import { Link } from "react-router-dom";

export default function SuccessfulPage() {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-md-6 mx-auto">
          <div className="card text-center">
            <div className="card-body">
              <h2 className="card-title">
                Your Registration has been received
              </h2>
              <i
                className="fa fa-check-circle fa-5x text-success"
                aria-hidden="true"
              />
              <h4>Thanks for your nomination !</h4>
              <p className="card-text"></p>
              You will have to connect MPL Committee to confirm your nomination
              by paying registration fess.
              <p />
              <Link to="/contact" className="btn btn-info">
                Contact US
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
