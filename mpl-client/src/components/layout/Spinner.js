import React from "react";

export default function Spinner() {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-md-6 mx-auto">
          <div className="text-center text-info fw-bolder">
            <i className="fa fa-spinner fa-pulse fa-5x" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
