import React from "react";
import Sidebar from "../../layout/Sidebar";
import ErrorPage from "../../pages/ErrorPage";
import AuctionBoard from "./AuctionBoard";

export default function AuctionPage() {
  return (
    <div className="row">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="col mt-5">
        {window.location.pathname === "/auctionpage" ? (
          <AuctionBoard />
        ) : window.location.pathname === "/auctionlist" ? (
          <AuctionPage />
        ) : (
          <ErrorPage />
        )}
      </div>
    </div>
  );
}
