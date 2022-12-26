import React from "react";
import { Link } from "react-router-dom";

export default function AuctionBoard() {
  return (
    <div className="container mt-5 p-5">
      <div className="row">
        <div className="col-md-4 col-xl-3 mb-3">
          <Link to="/auctionsearch" className="text-decoration-none text-dark">
            <div className="card bg-primary">
              <div className="card-block">
                <h2 className="mb-5">Let's Start</h2>
                <h2 className="text-end">
                  <i className="fa fa-gavel f-left" />
                </h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 col-xl-3 mb-3">
          <Link to="/auctionlist" className="text-decoration-none text-dark">
            <div className="card bg-info">
              <div className="card-block">
                <h2 className="mb-5">Auction List</h2>
                <h2 className="text-end">
                  <i className="fa fa-users f-left" />
                </h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 col-xl-3 mb-3">
          <Link
            to="/auctionlistsold"
            className="text-decoration-none text-dark"
          >
            <div className="card bg-success">
              <div className="card-block">
                <h2 className="mb-5">Sold Players</h2>
                <h2 className="text-end">
                  <i className="fa fa-male f-left" />
                </h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 col-xl-3 mb-3">
          <Link
            to="/auctionlistunsold"
            className="text-decoration-none text-dark"
          >
            <div className="card bg-warning">
              <div className="card-block">
                <h2 className="mb-5">Unsold Players</h2>
                <h2 className="text-end">
                  <i className="fa fa-male f-left" />
                </h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 col-xl-3 mb-3">
          <Link
            to="/auctionteampurse"
            className="text-decoration-none text-dark"
          >
            <div className="card bg-secondary">
              <div className="card-block">
                <h2 className="mb-5">Team Purse</h2>
                <h2 className="text-end">
                  <i className="fa-solid fa-wallet"></i>
                </h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
