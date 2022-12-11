import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PlayersViewPage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const result = await axios.get("http://localhost:8080/playersview");
    //console.log(result.data);
    setPlayers(result.data);
  };

  return (
    <div className="container p-5">
      <h1 className="text-center p-5">Players List</h1>
      <div className="py-20">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Payment Mode</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.pId}>
                <th scope="row">{player.pId}</th>
                <td>{player.pName}</td>
                <td>{player.pPaymentMode}</td>
                <td>
                  {player.pPaymentStatus === "Payment Successful"
                    ? "Completed"
                    : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
