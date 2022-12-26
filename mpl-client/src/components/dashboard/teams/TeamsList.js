import React from "react";
import Sidebar from "../../layout/Sidebar";
import Teams from "./Teams";

export default function TeamsList() {
  return (
    <div className="container mt-5 p-5">
      <div className="row">
        {/* <div className="col-2">
        <Sidebar />
      </div>
      <div className="col mt-5">
        <Teams />
      </div> */}
        <Teams />
      </div>
    </div>
  );
}
