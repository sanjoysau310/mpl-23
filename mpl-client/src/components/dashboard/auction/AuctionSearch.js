import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateAPI from "../../../api/PrivateAPI";

export default function AuctionSearch() {
  let navigate = useNavigate();
  const [pId, setPId] = useState("");
  const [msg, setMsg] = useState("");

  const searchPlayerById = async (e) => {
    e.preventDefault();
    navigate(`/playerauction/${pId}`);
    await PrivateAPI.get(`/v1/player/playerid/${pId}`)
      .then((res) => {
        navigate(`/playerauction/${pId}`);
      })
      .catch((err) => {
        setMsg("Player not found with ID- " + pId);
      });
  };
  return (
    <div className="container mt-5 p-5">
      <h2 className="text-center">Player Under Hammer </h2>
      <h2 className="text-center p-5">
        <i className="fa fa-gavel f-left fa-5x" />
      </h2>
      <div className="d-flex justify-content-center">
        <form className="row g-3" onSubmit={searchPlayerById}>
          <div className="col-auto">
            <input
              type="number"
              className="form-control"
              id="playerId"
              name="pId"
              onChange={(e) => setPId(e.target.value)}
              placeholder="Search by Player ID"
              required
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="text-center mt-5">
        <i className="text-danger">{msg}</i>
      </div>
    </div>
  );
}
