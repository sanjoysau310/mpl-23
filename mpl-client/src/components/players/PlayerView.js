import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrivateAPI from "../../api/PrivateAPI";
import { PlayerAge } from "../../util/PlayerAge";

export const PlayerView = () => {
  let navigate = useNavigate();
  let { email } = useParams();

  const [player, setPlayer] = useState({});

  useEffect(() => {
    loadPlayer();
  }, []);

  const loadPlayer = async () => {
    const result = await PrivateAPI.get(`/v1/player/playerview/${email}`);
    setPlayer(result.data);
  };

  const makePayment = async () => {
    await navigate(`/pay/${player.pId}`);
  };

  return (
    <>
      <div className="container mt-5 p-5">
        <h2 className="text-center">Profile </h2>
        <div className="row gutters-sm mt-3">
          <div className="col-md-5 mb-3">
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
          </div>
          <div className="col-md-7">
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
              </div>
            </div>
            {/* this features will be added soon */}
            {/* {player.pPaymentMode === "Online" ? (
              player.pPaymentStatus !== "Payment Successful" ? (
                <div>
                  <button className="btn btn-primary" onClick={makePayment}>
                    Pay Now
                  </button>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}  */}
          </div>
        </div>
      </div>
    </>
  );
};
