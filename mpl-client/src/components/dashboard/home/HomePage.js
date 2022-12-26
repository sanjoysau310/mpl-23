import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import ErrorPage from "../../pages/ErrorPage";
import AuctionPage from "../auction/AuctionPage";
import PlayersList from "../players/PlayersList";
import PlayersPage from "../players/PlayersPage";
import TeamPurse from "../teams/TeamPurse";
import TeamsList from "../teams/TeamsList";
import DashBoard from "./DashBoard";

export default function HomePage() {
  const [users, setUsers] = useState([]);

  return (
    <div className="container mt-5 p-5">
      <div className="row">
        {/* <div className="col-2">
          <Sidebar />
        </div>
        <div className="col mt-5">
          {window.location.pathname === "/home" ? (
            <DashBoard />
          ) : window.location.pathname === "/auctionpage" ? (
            <AuctionPage />
          ) : window.location.pathname === "/playerspage" ? (
            <PlayersPage />
          ) : window.location.pathname === "/teamspage" ? (
            <TeamsList />
          ) : (
            <ErrorPage />
          )}
        </div> */}
        <DashBoard />
      </div>
    </div>
  );
}
