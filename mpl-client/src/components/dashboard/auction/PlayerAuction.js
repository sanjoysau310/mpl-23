import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlayerAge } from "../../util/PlayerAge";

export default function PlayerAuction() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [flag, setFlag] = useState(true);
  const [player, setPlayer] = useState([]);

  useEffect(() => {
    loadPlayer();
  }, []);

  const loadPlayer = async () => {
    const result = await axios.get(`http://localhost:8080/player/${id}`);
    setPlayer(result.data);
    console.log(player);
  };
  const [playerData, setPlayerData] = useState({
    pId: "",
    pTeam: "",
    pSoldPrice: "",
    pStatus: "",
  });

  const [currentBid, setCurrentBid] = useState(10);
  const playerSoldTo = () => {
    // setPlayer((prev) => {
    //   return { ...prev, pSoldPrice: currentBid, pStatus: "Sold" };
    // });
    //setPlayer({ ...player, pSoldPrice: currentBid, pStatus: "Sold" });
    setPlayerData((prev) => {
      return {
        ...prev,
        pId: id,
        pSoldPrice: currentBid,
        pStatus: "Sold",
      };
    });
    console.log(playerData);
    //axioss update backend
    //navigate("/auctionlist");
  };
  const unSoldPlayer = () => {
    //setPlayer({ ...player, pStatus: "Unsold" });
    setPlayerData((prev) => {
      return {
        ...prev,
        pId: id,
        pStatus: "UnSold",
      };
    });
    console.log(playerData);
    //axioss update backend
    navigate("/auctionlist");
  };

  const updateCurrentBid = () => {
    setFlag(false);
    currentBid < 50
      ? setCurrentBid(currentBid + 5)
      : currentBid < 200
      ? setCurrentBid(currentBid + 10)
      : currentBid < 500
      ? setCurrentBid(currentBid + 20)
      : currentBid < 1000
      ? setCurrentBid(currentBid + 30)
      : setCurrentBid(currentBid + 50);
  };
  return (
    <div className="container">
      <div className="text-center mb-md-5">
        <h1>MPL 2023 Player Auction </h1>
      </div>
      <div className="row gutters-sm mt-5">
        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Player ID</h6>
                </div>
                <div className="col-sm-9 text-secondary">{player.pId}</div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">{player.pName}</div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Age</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <PlayerAge dob={player.pDob} />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">{player.pEmail}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Contact</h6>
                </div>
                <div className="col-sm-9 text-secondary">{player.pPhone}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">WhatsApp</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {player.pWhatsapp}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Role</h6>
                </div>
                <div className="col-sm-9 text-secondary">{player.pRole}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Batting Style</h6>
                </div>
                <div className="col-sm-9 text-secondary">{player.pBatting}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Bowling Style</h6>
                </div>
                <div className="col-sm-9 text-secondary">{player.pBowling}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src={
                    "https://drive.google.com/uc?export=view&id=" +
                    player.pImage
                  }
                  alt={player.pName}
                  className="img-thumbnail"
                />
                <div className="mt-3">
                  <h4>{player.pName}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card mt-3" style={{ color: "red" }}>
            <h1 className="text-center">Current Bid</h1>
            <h1 className="text-center">{currentBid}</h1>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h6 className="d-flex align-items-center mb-3">
                Base Price: {player.pBasePrice}
              </h6>

              <div className="mb-2 text-center">
                <button
                  id="cuurentBidding"
                  className="btn btn-warning mx-3"
                  onClick={updateCurrentBid}
                >
                  <i className="fa fa-plus fa-3x" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="card-footer text-center">
              <i>Increase the Bidding</i>
            </div>
          </div>
          <div className="card mt-3">
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
                  disabled={flag}
                >
                  <option value="">Select Team</option>
                  <option value="1">team 1</option>
                  <option value="2">team 2</option>
                  <option value="3">team 3</option>
                  <option value="4">team 4</option>
                  <option value="5">team 5</option>
                  <option value="6">team 6</option>
                  <option value="7">Team 7</option>
                  <option value="8">team 8</option>
                  <option value="9">team 9</option>
                  <option value="10">team 10</option>
                </select>
              </div>
            </div>
            <div className="card-footer text-center">
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
              disabled={playerData.pTeam === null}
              onClick={playerSoldTo}
            >
              Sold
            </button>
            <button
              type="submit"
              className="btn btn-danger btn-lg"
              disabled={playerData.pTeam !== null}
              onClick={unSoldPlayer}
            >
              Unsold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
