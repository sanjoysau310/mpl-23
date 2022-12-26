import React from "react";
import Sidebar from "../../layout/Sidebar";
import PlayersList from "./PlayersList";

export default function PlayersPage() {
  return (
    <div className="container mt-5 p-5">
      <div className="row">
        {/* <div className="col-2">
        <Sidebar />
      </div>
      <div className="col mt-5">
        <PlayersList />
      </div> */}
        <PlayersList />
      </div>
    </div>
  );
}
