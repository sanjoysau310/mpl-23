import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-md-6 mx-auto">
          <div className="card text-center">
            <div className="card-body">
              <h2 className="card-title">Your Registration has been failed</h2>
              <i
                className="fa fa-times-circle fa-5x text-danger"
                aria-hidden="true"
              />
              <h4>Thanks for your interest !</h4>
              <p className="card-text"></p>
              Please connect to MPL Committee for help.
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
