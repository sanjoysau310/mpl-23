import React from "react";
import Sidebar from "../../layout/Sidebar";
import ErrorPage from "../../pages/ErrorPage";
import TeamPurse from "../teams/TeamPurse";
import AuctionBoard from "./AuctionBoard";
import AuctionList from "./AuctionList";
import AuctionListSold from "./AuctionListSold";
import AuctionListUnsold from "./AuctionListUnSold";
import AuctionSearch from "./AuctionSearch";

export default function AuctionPage() {
  return (
    <div className="container mt-5 p-5">
      <div className="row">
        {/* <div className="col-2">
        <Sidebar />
      </div>
      <div className="col mt-5">
        <AuctionBoard />
      </div> */}
        <AuctionBoard />
      </div>
    </div>
  );
}
