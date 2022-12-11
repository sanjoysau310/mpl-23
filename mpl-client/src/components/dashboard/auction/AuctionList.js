import axios from "axios";
import React, { useEffect, useState } from "react";
import AuctionSearch from "./AuctionSearch";

export default function AuctionList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const result = await axios.get("http://localhost:8080/players");
    setPlayers(result.data);
  };

  return (
    <div className="container">
      <div className="py-20">
        <div className="d-flex float-end mt-5">
          <AuctionSearch />
        </div>

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
