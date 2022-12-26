import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlayerAge } from "../../../util/PlayerAge";
import PrivateAPI from "../../../api/PrivateAPI";

export default function PlayerProfile() {
  let { id } = useParams();
  const [flag, setFlag] = useState(false);
  const [player, setPlayer] = useState([]);
  const [playerData, setPlayerData] = useState({
    pId: "",
    pKit: "",
    pBasePrice: "",
    pTeam: "",
    pPaymentMode: "",
    pPaymentStatus: "",
  });

  const kitDetails = [
    "",
    "M | Half Sleeve",
    "L | Half Sleeve",
    "XL | Half Sleeve",
    "XXL | Half Sleeve",
    "M | Full Sleeve",
    "L | Full Sleeve",
    "XL | Full Sleeve",
    "XXL | Full Sleeve",
  ];
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

  useEffect(() => {
    loadPlayer();
  }, []);

  useEffect(() => {
    setPlayerData({
      pId: player.pId,
      pKit: player.pKit ? player.pKit : "",
      pBasePrice: player.pBasePrice ? player.pBasePrice : "",
      pTeam: player.pTeam ? player.pTeam : "",
      pPaymentMode: player.pPaymentMode ? player.pPaymentMode : "",
      pPaymentStatus: player.pPaymentStatus ? player.pPaymentStatus : "",
    });
  }, [player]);

  const loadPlayer = async () => {
    await PrivateAPI.get(`/v1/player/playerid/${id}`).then((result) => {
      setPlayer(result.data);
    });
  };

  const handleChange = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };
  const saveEditProfile = async () => {
    const result = await PrivateAPI.put("/v1/player/editplayer", playerData);
    setFlag(false);
  };
  return (
    <div>
      <div className="container mt-5 p-5">
        <div className="row gutters-sm mt-3">
          <div className="col-md-4 mb-3">
            <Link
              to="/playerspage"
              className="text-decoration-none text-dark text-start"
            >
              <i className="fa fa-arrow-left fa-3x" aria-hidden="true"></i>
            </Link>
            <div className="card">
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
                    className="img-thumbnail"
                  />
                </div>
              </div>
            </div>
            <div className="card mt-2">
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
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <h2 className="text-center">MPL 2023 Player Profile </h2>
            <div className="card mb-3">
              <div className="card-body">
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
                  <div className="col-sm-7 text-secondary">{player.pKit}</div>
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
                {/* <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Base Price</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">
                    {player.pBasePrice}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Sold Price</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">
                    {player.pSoldPrice}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Team</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">{player.pTeam}</div>
                </div> */}
                {player.pBasePrice ? (
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-3">Base Price</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      {player.pBasePrice}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {player.pSoldPrice ? (
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-3">Sold Price</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      {player.pSoldPrice}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {player.pTeam ? (
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-3">Team</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      {player.pTeam}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="row">
                  <div className="col-sm-5">
                    <h6 className="mb-3">Payment Fees</h6>
                  </div>
                  <div className="col-sm-7 text-secondary">{player.pFees}</div>
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
                    {player.pPaymentStatus === "Payment Successful"
                      ? "Completed"
                      : "Pending"}
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
            <div className="col-sm-3 mb-3">
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
                        className="form-control"
                        id="pkitsize"
                        value={playerData?.pKit}
                        onChange={handleChange}
                      >
                        {kitDetails.map((kit) => (
                          <option key={kit} name={kit} value={kit}>
                            {kit.length > 0 ? kit : "Select Kit Details"}
                          </option>
                        ))}
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
                        name="pBasePrice"
                        value={playerData?.pBasePrice}
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
                        value={playerData?.pTeam}
                        className="form-control"
                        id="teamName"
                        onChange={handleChange}
                      >
                        {teamNames.map((teamName) => (
                          <option
                            key={teamName}
                            name={teamName}
                            value={teamName}
                          >
                            {teamName.length > 0 ? teamName : "Select Team"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="">
                      <label htmlFor="paymentM" className="form-label">
                        Payment Mode
                      </label>
                      <select
                        name="pPaymentMode"
                        value={playerData?.pPaymentMode}
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
                        value={playerData.pPaymentStatus}
                        className="form-control"
                        id="paymentS"
                        onChange={handleChange}
                      >
                        <option value="">Select Payment Status</option>
                        <option value="Payment Successful">Completed</option>
                        <option value="Payment Unsuccessful">Pending</option>
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
