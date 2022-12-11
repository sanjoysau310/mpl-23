import React from "react";
import { Link } from "react-router-dom";

export default function MainBodyPage() {
  return (
    <div className="d-flex vh-100 text-center text-secondary bg-dark">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white mt-5">
            Musketeers Premier League 2023
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-5">Season 8</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-5">
              <button
                type="button"
                className="btn btn-lg px-4 me-sm-3 fw-bold mt-5"
              >
                <Link to="/register" className="text-decoration-none mt-5">
                  <h2 className="mt-5">Click here to Register</h2>
                </Link>

                <Link to="/playersview" className="text-decoration-none mt-5">
                  <h2 className="mt-5">Registered Players</h2>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
