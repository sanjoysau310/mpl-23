import React, { useEffect, useState } from "react";
import PrivateAPI from "../../../api/PrivateAPI";

const TeamPurse = () => {
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

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const result = await PrivateAPI.get("/v1/team/teamsplayers");
    setTeamsPlayers(result.data);
  };

  return (
    <div className="fixed-bottom">
      <div className="marquee bg-transparent text-light">
        {teamNames.map((teamName) => {
          let totalUsedPurse = 0;
          return (
            <span key={teamName}>
              {teamsPlayers.map((teamPlayer) => {
                if (teamPlayer.pTeam === teamName)
                  totalUsedPurse += teamPlayer.pSoldPrice;
              })}
              <>
                {teamName}-{purse - totalUsedPurse}&emsp;
              </>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TeamPurse;
