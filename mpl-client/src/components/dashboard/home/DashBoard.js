import React from "react";
import { Link } from "react-router-dom";

export default function DashBoard() {
  return (
    <div className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-xl-3">
            <Link to="/home" className="text-decoration-none text-dark">
              <div className="card bg-primary">
                <div className="card-block">
                  <h2 className="mb-5">DashBoard</h2>
                  <h2 className="text-end">
                    <i className="fa fa-tachometer f-left" />
                  </h2>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4 col-xl-3">
            <Link to="/auctionpage" className="text-decoration-none text-dark">
              <div className="card bg-warning">
                <div className="card-block">
                  <h2 className="mb-5">Player Auction</h2>
                  <h2 className="text-end">
                    <i className="fa fa-gavel f-left" />
                  </h2>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4 col-xl-3">
            <Link to="/playerspage" className="text-decoration-none text-dark">
              <div className="card bg-success">
                <div className="card-block">
                  <h2 className="mb-5">Players</h2>
                  <h2 className="text-end">
                    <i className="fa fa-male f-left" />
                  </h2>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4 col-xl-3">
            <Link to="/teamspage" className="text-decoration-none text-dark">
              <div className="card bg-info">
                <div className="card-block">
                  <h2 className="mb-5">Teams</h2>
                  <h2 className="text-end">
                    <i className="fa fa-users f-left" />
                  </h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
