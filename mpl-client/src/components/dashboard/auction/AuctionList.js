import axios from "axios";
import React, { useEffect, useState } from "react";
import PrivateAPI from "../../../api/PrivateAPI";

export default function AuctionList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const result = await PrivateAPI.get("/v1/player/playerslist");
    setPlayers(result.data);
  };

  return (
    <div className="container mt-5 py-5">
      <h2 className="text-center mb-5">Auction List</h2>
      <div className="py-20">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Bating</th>
              <th scope="col">Bowling</th>
              <th scope="col">Team</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.pId}>
                <th scope="row">{player.pId}</th>
                <td>{player.pName}</td>
                <td>{player.pRole}</td>
                <td>{player.pBatting}</td>
                <td>{player.pBowling}</td>
                <td>{player.pTeam}</td>
                <td>{player.pStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
