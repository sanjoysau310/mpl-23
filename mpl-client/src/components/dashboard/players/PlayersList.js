import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlayerAge } from "../../util/PlayerAge";
import SearchPlayer from "./SearchPlayer";

export default function PlayersList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const result = await axios.get("http://localhost:8080/players");
    //console.log(result.data);
    setPlayers(result.data);
  };

  return (
    <div className="container">
      <div className="py-20">
        <div className="d-flex float-end mt-5">
          <SearchPlayer />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">WhatsApp</th>
              {/* <th scope="col">Role</th>
              <th scope="col">Bating</th>
              <th scope="col">Bowling</th> */}
              <th scope="col">Kit Size</th>
              <th scope="col">DOB</th>
              <th scope="col">Age</th>
              <th scope="col">Payment Mode</th>
              <th scope="col">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.pId}>
                <th scope="row">
                  <Link to={`/player/${player.pId}`} className="mx-2 ">
                    {player.pId}
                  </Link>
                </th>
                <td>{player.pName}</td>
                <td>{player.pEmail}</td>
                <td>{player.pPhone}</td>
                <td>{player.pWhatsapp}</td>
                {/* <td>{player.pRole}</td>
                <td>{player.pBatting}</td>
                <td>{player.pBowling}</td> */}
                <td>{player.pKit}</td>
                <td>{player.pDob}</td>
                <td>
                  <PlayerAge dob={player.pDob} />
                </td>
                <td>{player.pPaymentMode}</td>
                <td>{player.pPaymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
