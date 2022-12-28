import React, { useEffect, useState } from "react";
import PublicAPI from "../../api/PublicAPI";

export default function TeamsPage() {
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

  const playerNames = [
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4",
    "Player 5",
    "Player 6",
    "Player 7",
    "Player 8",
    "Player 9",
    "Player 10",
  ];

  const [teamsCaptains, setTeamsCaptains] = useState([]);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const result = await PublicAPI.get("/v1/team/teamscaptains");
    console.log(result.data);
    setTeamsCaptains(result.data);
  };

  return (
    <div className="container p-5">
      <h1 className="text-center p-5">Teams</h1>
      <div className="row">
        {teamNames.map((teamName) => (
          <div className="col-sm-3 mb-3" key={teamName}>
            <div className="card bg-info">
              <div className="card-block">
                <h3 className="text-center mb-3">{teamName}</h3>
                <div className="row text-center">
                  <h5>Captain Names will be updated soon</h5>
                  {/* {playerNames.map((teamPlayer) => (
                    <div className="col-md-6" key={teamPlayer}>
                      {teamPlayer}
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
