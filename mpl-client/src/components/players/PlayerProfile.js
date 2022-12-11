import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerAge } from "../util/PlayerAge";

export const PlayerProfile = () => {
  let { id } = useParams();
  const [player, setPlayer] = useState({
    pName: "",
    pEmail: "",
    pImage: "",
    pDob: "",
    pRole: "",
    pBatting: "",
    pBowling: "",
    pKit: "",
    pPayment: "",
  });

  useEffect(() => {
    loadPlayer();
  }, []);

  const loadPlayer = async () => {
    const result = await axios.get(`http://localhost:8080/player/${id}`);
    console.log(result.data);
    setPlayer(result.data);
    console.log(player);
  };

  return (
    <>
      <div className="bg-dark text-secondary text-center">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white">Player Profile</h1>
        </div>
      </div>
      <div className="container">
        <div className="py-20">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">WhatsApp</th>
                <th scope="col">Role</th>
                <th scope="col">Bating</th>
                <th scope="col">Bowling</th>
                <th scope="col">Kit Size</th>
                <th scope="col">Payment Mode</th>
                <th scope="col">DOB</th>
                <th scope="col">Age</th>
                <th scope="col">Image</th>
              </tr>
            </thead>
            <tbody>
              <tr key={player.pId}>
                <th scope="row">{player.pId}</th>
                <td>{player.pName}</td>
                <td>{player.pEmail}</td>
                <td>{player.pEmail}</td>
                <td>{player.pEmail}</td>
                <td>{player.pRole}</td>
                <td>{player.pBatting}</td>
                <td>{player.pBowling}</td>
                <td>{player.pKit}</td>
                <td>{player.pPayment}</td>
                <td>{player.pDob}</td>
                <td>
                  <PlayerAge dob={player.pDob} />
                </td>
                <td>
                  <img
                    src={
                      "https://drive.google.com/uc?export=view&id=" +
                      player.pImage
                    }
                    width="100px"
                    height="100px"
                    alt={player.pName}
                    className="img-fluid"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
