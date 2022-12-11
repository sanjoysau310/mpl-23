import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchPlayer() {
  let navigate = useNavigate();
  const [pId, setPId] = useState("");

  const searchPlayerById = async (e) => {
    e.preventDefault();
    navigate(`/player/${pId}`);
  };
  return (
    <div className="justify-content-center mt-5">
      <div className="">
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
    </div>
  );
}
