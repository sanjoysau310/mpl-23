import React, { useEffect, useState } from "react";
import PrivateAPI from "../../../api/PrivateAPI";

export default function Teams() {
  const teamNames = [
    "Cowboys",
    "Demons",
    "Falcons",
    "Hustlers",
    "Martians",
    "Pirates",
    "Scorpions",
    "Skyhawks",
    "Trojans",
    "Vikings",
  ];

  const [teamsPlayers, setTeamsPlayers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [reload, setReload] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      window.location.reload(1);
      setTimeLeft(30);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 30 * 0.25);
    }, 7500);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const result = await PrivateAPI.get("/v1/team/teamsplayers");
    setTeamsPlayers(result.data);
  };

  const refreshPage = () => {
    window.location.reload(1);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Teams</h2>
      {/* <div className="row">
        <div className="col float-end"></div>
        <button className="btn btn-secondary mb-5" onClick={refreshPage}>
          Update
        </button>
      </div> */}

      <div className="progress mb-5">
        <div
          className={
            "progress-bar progress-bar-striped progress-bar-animated w-" +
            (1 - timeLeft / reload) * 100
          }
          role="progressbar"
          aria-valuenow={(1 - timeLeft / reload) * 100}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          Updating... {(1 - timeLeft / reload) * 100}%
        </div>
      </div>

      <div className="row row-cols-5">
        {teamNames.map((teamName) => (
          <div className="col mb-3" key={teamName}>
            <div className="card bg-info">
              <div className="card-block">
                <h3 className="text-center mb-3">{teamName}</h3>
                <div className="row text-center">
                  <h5>Captain</h5>
                  {teamsPlayers.map((teamPlayer) => (
                    <div className="col-md-6" key={teamPlayer}>
                      {teamPlayer.pTeam === teamName ? teamPlayer.pName : ""}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
