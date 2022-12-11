import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlayerAge } from "../../util/PlayerAge";

export default function PlayerProfile() {
  let { id } = useParams();
  const [flag, setFlag] = useState(false);
  const [player, setPlayer] = useState([]);
  const [playerData, setPlayerData] = useState({
    pId: "",
    pKit: "",
    pBaseprice: "",
    pTeam: "",
    pPaymentMode: "",
    pPaymentStatus: "",
  });

  useEffect(() => {
    loadPlayer();
  }, []);

  const loadPlayer = async () => {
    const result = await axios.get(`http://localhost:8080/player/${id}`);
    //console.log(result.data);
    setPlayer(result.data);
  };

  const handleChange = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
    //console.log(playerData);
  };
  const saveEditProfile = () => {
    //setPlayerData({ ...playerData, pId:id });
    console.log(id);
    setPlayerData((prev) => ({ ...prev, pId: id }));
    console.log(playerData);
    setFlag(false);
  };
  return (
    <div>
      {/* {console.log(playerData)} */}
      <div className="mt-5 p-1">
        <Link to="/players" className="text-decoration-none text-dark">
          <i className="fa fa-arrow-left fa-3x" aria-hidden="true"></i>
        </Link>
        {/* <h1 className="text-center">MPL 2023 Player Profile </h1> */}
      </div>
      <div className="container">
        <h2 className="text-center">MPL 2023 Player Profile </h2>
        <div className="row gutters-sm mt-3">
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
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Player ID</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">{player.pId}</div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Full Name</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">{player.pName}</div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Email</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">{player.pEmail}</div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Contact Number</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">{player.pPhone}</div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">WhatsApp Number</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">
                    {player.pWhatsapp}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Date of Birth</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">{player.pDob}</div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Age</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">
                    <PlayerAge dob={player.pDob} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Kit Details</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">
                    Half Sleve | {player.pKit}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Role</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">{player.pRole}</div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Batting Style</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">
                    {player.pBatting}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Bowling Style</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">
                    {player.pBowling}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Base Price</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">
                    {player.pBaseprice}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Team</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">{player.pTeam}</div>
                </div>

                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Payment Mode</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">
                    {player.pPaymentMode}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-0">Payment Status</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">
                    {player.pPaymentStatus ? "Done" : "Not Done"}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <button
                      type="submit"
                      className="btn btn-info"
                      onClick={() => setFlag(true)}
                      disabled={flag}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {flag ? (
            <div className="col-sm-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <form className="row g-3" onSubmit={saveEditProfile}>
                    <div className="">
                      <label htmlFor="playerId" className="form-label">
                        Player ID
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="playerId"
                        name="pId"
                        value={id}
                        placeholder="Player ID"
                        readOnly
                      />
                    </div>
                    <div className="">
                      <label htmlFor="pkitsize" className="form-label">
                        Player Kit Size
                      </label>
                      <select
                        name="pKit"
                        // value={player.pKit ? player.pKit : ""}
                        className="form-control"
                        id="pkitsize"
                        onChange={handleChange}
                      >
                        <option value="">Select Kit Size</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    </div>
                    <div className="">
                      <label htmlFor="playerBasePrice" className="form-label">
                        Base Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="playerBasePrice"
                        name="pBaseprice"
                        // value={player.pBaseprice ? player.pBaseprice : 0}
                        onChange={handleChange}
                        placeholder="Base Price"
                      />
                    </div>
                    <div className="">
                      <label htmlFor="playerId" className="form-label">
                        Team
                      </label>
                      <select
                        name="pTeam"
                        //value={player.pTeam ? player.pTeam : ""}
                        className="form-control"
                        id="teamName"
                        onChange={handleChange}
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

                    <div className="">
                      <label htmlFor="paymentM" className="form-label">
                        Payment Mode
                      </label>
                      <select
                        name="pPaymentMode"
                        //value={player.pPaymentMode ? player.pPaymentMode : ""}
                        className="form-control"
                        id="paymentM"
                        onChange={handleChange}
                      >
                        <option value="">Select Payment</option>
                        <option value="Cash">Cash Payment</option>
                        <option value="Online">Online Payment</option>
                      </select>
                    </div>
                    <div className="">
                      <label htmlFor="paymentS" className="form-label">
                        Payment Status
                      </label>
                      <select
                        name="pPaymentStatus"
                        value={player.pPaymentStatus}
                        className="form-control"
                        id="paymentS"
                        onChange={handleChange}
                      >
                        <option value="">Select Payment Status</option>
                        <option value="Done">Done</option>
                        <option value="Not Done">Not Done</option>
                      </select>
                    </div>
                    <div className="text-end mt-5">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg mx-3"
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-danger btn-lg"
                        onClick={() => setFlag(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
