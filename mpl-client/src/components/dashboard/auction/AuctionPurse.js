import React, { useEffect, useState } from "react";
import PrivateAPI from "../../../api/PrivateAPI";

const AuctionPurse = () => {
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
  const [purse, setPurse] = useState(3000);

  const [timeLeft, setTimeLeft] = useState(60);
  const [reload, setReload] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) {
      window.location.reload(1);
      setTimeLeft(60);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 15);
    }, 15000);
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
    <div className="container mt-5 p-5">
      <h2 className="text-center mb-5">Teams Purse</h2>
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
      <div className="row">
        {teamNames.map((teamName) => {
          let totalUsedPurse = 0;
          return (
            <div className="col-lg-6 mb-3" key={teamName}>
              <div className="card bg-info">
                <div className="card-block text-center">
                  <h3 className="mb-3">{teamName}</h3>
                  {teamsPlayers.map((teamPlayer) => (
                    <h5 key={teamPlayer.pId}>
                      {teamPlayer.pTeam === teamName
                        ? teamPlayer.pStatus === "CAPTAIN"
                          ? teamPlayer.pName
                          : ""
                        : ""}
                    </h5>
                  ))}
                  <div className="row">
                    {teamsPlayers.map((teamPlayer) => {
                      if (teamPlayer.pTeam === teamName)
                        totalUsedPurse += teamPlayer.pSoldPrice;
                      return (
                        <div className="col-md-6" key={teamPlayer.pId}>
                          {teamPlayer.pTeam === teamName ? (
                            teamPlayer.pStatus !== "CAPTAIN" ? (
                              <i>
                                {teamPlayer.pName}-{teamPlayer.pSoldPrice}
                              </i>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="card-footer bg-warning">
                  Purse Left: {purse - totalUsedPurse}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuctionPurse;
