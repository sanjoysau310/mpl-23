import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="d-flex flex-column vh-100 flex-shrink-0 p-3 text-white bg-dark mt-5">
      <ul className="nav nav-pills flex-column mb-auto mt-5">
        <li>
          <Link to="/home" className="nav-link text-white">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/auctionpage" className="nav-link text-white">
            Auction
          </Link>
        </li>
        <li>
          <Link to="/playerspage" className="nav-link text-white">
            Players
          </Link>
        </li>
        <li>
          <Link to="/teamspage" className="nav-link text-white">
            Teams
          </Link>
        </li>
      </ul>
    </div>
  );
}
