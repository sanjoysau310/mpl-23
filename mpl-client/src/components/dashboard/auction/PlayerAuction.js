import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlayerAge } from "../../../util/PlayerAge";
import PrivateAPI from "../../../api/PrivateAPI";
import bg2 from "../../../assets/images/backgrounds/bg2.gif";
import TeamPurse from "../teams/TeamPurse";

export default function PlayerAuction() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [flag, setFlag] = useState(true);
  const [player, setPlayer] = useState([]);
  const teamNames = [
    "",
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

  const [playerData, setPlayerData] = useState({
    pId: "",
    pName: "",
    pTeam: "",
    pSoldPrice: "",
    pStatus: "",
  });
  const [currentBid, setCurrentBid] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadPlayer();
  }, []);

  useEffect(() => {
    setPlayerData({
      pId: player.pId,
      pName: player.pName,
      pBasePrice: player.pBasePrice ? player.pBasePrice : "",
      pTeam: player.pTeam ? player.pTeam : "",
      pSoldPrice: player.pSoldPrice ? player.pSoldPrice : "",
      pStatus: player.pStatus ? player.pStatus : "",
    });
    setCurrentBid(player.pBasePrice ? player.pBasePrice : 10);
  }, [player]);

  const loadPlayer = async () => {
    const result = await PrivateAPI.get(`/v1/player/playerid/${id}`);
    setPlayer(result.data);
  };

  const decreaseCurrentBid = () => {
    //setPlayerData({ ...playerData, pTeam: "", pStatus: "" });

    currentBid > 500
      ? setCurrentBid(currentBid - 25)
      : currentBid > 200
      ? setCurrentBid(currentBid - 20)
      : currentBid > 50
      ? setCurrentBid(currentBid - 10)
      : setCurrentBid(currentBid - 5);

    currentBid === player.pBasePrice ? setFlag(true) : setFlag(false);
    //!flag ? setMsg("Now you can select the highest bidding team") : setMsg("");
  };

  const increaseCurrentBid = () => {
    //setPlayerData({ ...playerData, pTeam: "", pStatus: "" });
    setFlag(false);
    currentBid < 50
      ? setCurrentBid(currentBid + 5)
      : currentBid < 200
      ? setCurrentBid(currentBid + 10)
      : currentBid < 500
      ? setCurrentBid(currentBid + 20)
      : setCurrentBid(currentBid + 25);

    //!flag ? setMsg("Now you can select the highest bidding team") : setMsg("");
  };

  const playerSoldTo = async () => {
    await PrivateAPI.put("/v1/team/updateplayerdata", {
      ...playerData,
      pSoldPrice: currentBid,
      pStatus: "SOLD",
    }).then((res) => {
      setPlayerData(res.data);
    });
    navigate("/auctionsearch");
  };
  const unSoldPlayer = async () => {
    //setPlayerData({ ...playerData, pStatus: "UnSold" });
    await PrivateAPI.put("/v1/team/updateplayerdata", {
      ...playerData,
      pStatus: "UNSOLD",
    }).then((res) => {
      setPlayerData(res.data);
    });
    navigate("/auctionsearch");
  };

  const myStyle = {
    backgroundImage: `url(${bg2})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div style={myStyle}>
      <div className="container text-light mt-3">
        {console.log(playerData)}
        <div className="text-center">
          <h2>MPL 2023 Player Auction</h2>
        </div>
        <div className="row gutters-sm mt-5">
          <div className="col-md-4">
            <div className="card border-0 bg-transparent text-white fs-5 mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Player ID</h6>
                  </div>
                  <div className="col-sm-8">{player.pId}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-8">{player.pName}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Age</h6>
                  </div>
                  <div className="col-sm-8">
                    <PlayerAge dob={player.pDob} />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-8">{player.pEmail}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Contact</h6>
                  </div>
                  <div className="col-sm-8">{player.pPhone}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <h6 className="mb-0">WhatsApp</h6>
                  </div>
                  <div className="col-sm-8">{player.pWhatsapp}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Role</h6>
                  </div>
                  <div className="col-sm-8">{player.pRole}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Batting Style</h6>
                  </div>
                  <div className="col-sm-8">{player.pBatting}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Bowling Style</h6>
                  </div>
                  <div className="col-sm-8">{player.pBowling}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Base price</h6>
                  </div>
                  <div className="col-sm-8">{player.pBasePrice}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 bg-transparent text-white">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={
                      player.pImage !== undefined
                        ? "https://drive.google.com/uc?export=view&id=" +
                          player.pImage
                        : ""
                    }
                    alt={player.pName}
                    className="img-thumbnail border-0 bg-transparent"
                  />
                  <div
                    className="card border-0 bg-transparent mt-2"
                    style={{ color: "red" }}
                  >
                    <h1 className="text-center">Current Bid</h1>
                    <h1 className="text-center">{currentBid}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card border-0 bg-transparent text-white text-center">
              <div className="mt-3">
                <h1>{player.pName}</h1>
              </div>
            </div>

            <div className="card border-0 bg-transparent text-white  mt-3">
              <div className="card-body">
                <h6 className="d-flex align-items-center mb-3">
                  {/* Base Price: {player.pBasePrice} */}
                  <i>Decrese/Increase the Bidding</i>
                </h6>
                <div className="mb-2 text-center">
                  <button
                    id="cuurentBidding"
                    className="btn btn-danger mx-3"
                    onClick={decreaseCurrentBid}
                    disabled={
                      currentBid === player.pBasePrice ||
                      playerData.pTeam.length > 0
                    }
                  >
                    <i className="fa fa-minus fa-3x" aria-hidden="true"></i>
                  </button>

                  <button
                    id="cuurentBidding"
                    className="btn btn-warning mx-3"
                    onClick={increaseCurrentBid}
                  >
                    <i className="fa fa-plus fa-3x" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card border-0 bg-transparent text-white  mt-3">
              <div className="card-body">
                <h6 className="d-flex align-items-center mb-3">Team Name</h6>
                <div className="mb-2 text-center">
                  <select
                    name="pTeam"
                    className="form-control"
                    id="teamName"
                    onChange={(e) => {
                      setPlayerData({
                        ...playerData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    disabled={flag || currentBid === player.pBasePrice}
                  >
                    {teamNames.map((teamName) => (
                      <option key={teamName} name={teamName} value={teamName}>
                        {/* {teamName.length > 0 ? teamName : "Select Team"} */}
                        {playerData.pStatus === "SOLD"
                          ? playerData?.pTeam
                          : teamName.length > 0
                          ? teamName
                          : "Select Team"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-center">
                {!flag ? (
                  <i style={{ color: "green" }}>
                    Now you can select the highest bidding team
                  </i>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="text-end mt-5">
              <button
                type="submit"
                className="btn btn-success btn-lg mx-3"
                disabled={
                  !playerData.pTeam.length > 0 || playerData.pStatus === "SOLD"
                }
                onClick={playerSoldTo}
              >
                Sold
              </button>
              <button
                type="submit"
                className="btn btn-danger btn-lg"
                disabled={playerData.pTeam.length > 0}
                onClick={unSoldPlayer}
              >
                Unsold
              </button>
            </div>
            <div className="text-end mt-5 p-5">
              <h5 className="text-secondary mt-5">
                <i>
                  MPL AUCTION <br />
                  2023
                </i>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <TeamPurse />
    </div>
  );
}
