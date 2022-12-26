import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrivateAPI from "../../../api/PrivateAPI";
import { PlayerAge } from "../../../util/PlayerAge";
import DeleteConfirmModal from "./DeleteConfirmModal";
import SearchPlayer from "./SearchPlayer";

const { REACT_APP_API_PLAYER_URL } = process.env;

export default function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    await PrivateAPI.get(REACT_APP_API_PLAYER_URL + "/playerslist").then(
      (result) => {
        setPlayers(result.data);
      }
    );
  };
  const [msg, setMsg] = useState("");
  //const[msgColor,setMsgColor]=
  const deletePlayer = async (pId) => {
    if (
      window.confirm("Do you want to delete the player record!\nID- " + pId) ==
      true
    ) {
      await PrivateAPI.delete(`/v1/player/deleteplayer/${pId}`)
        .then((res) => {
          setMsg(res.data);
          window.location.reload(1);
        })
        .catch((err) => {
          setMsg("Player deletion failed!");
        });
    } else {
      setMsg("Delete action canceled!");
    }
  };

  return (
    <div className="container">
      <div className="py-20">
        <div className="text-center mt-2">
          <span
            className={
              msg.includes("deleted")
                ? "bg-success"
                : msg.includes("failed")
                ? "bg-danger"
                : msg.includes("canceled")
                ? "bg-warning"
                : ""
            }
          >
            {msg} &emsp;
            {msg && (
              <i className="fa-solid fa-xmark" onClick={() => setMsg("")}></i>
            )}
          </span>
        </div>
        <div className="d-flex float-end mt-2">
          <SearchPlayer />
        </div>
        <table className="table table-striped">
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
              <th scope="col">Action</th>
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
                <td>
                  {player.pPaymentStatus === "Payment Successful"
                    ? "Completed"
                    : "Pending"}
                </td>
                <td>
                  <span
                    className="text-danger"
                    onClick={() => deletePlayer(player.pId)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
