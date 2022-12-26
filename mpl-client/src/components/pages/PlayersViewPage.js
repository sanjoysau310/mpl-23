import React, { useEffect, useState } from "react";
import PublicAPI from "../../api/PublicAPI";

export default function PlayersViewPage() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const result = await PublicAPI.get("/v1/player/playersview");
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
              <th scope="col">Payment Status</th>
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
