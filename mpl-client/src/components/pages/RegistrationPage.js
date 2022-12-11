import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";

const RegistrationPage = () => {
  let navigate = useNavigate();
  const [player, setPlayer] = useState({
    pName: "",
    pEmail: "",
    pPhone: "",
    pWhatsapp: "",
    pDob: "",
    pRole: "",
    pBatting: "",
    pBowling: "",
    pKit: "",
    pPaymentMode: "",
  });
  const [pImage, setpImage] = useState("");
  const [contactCheck, setContactCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const { REACT_APP_API_URL } = process.env;

  const handleChange = async (e) => {
    e.target.name === "pImage"
      ? setpImage(e.target.files[0])
      : setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const checkBoxClick = () => {
    setContactCheck(!contactCheck);
    // !contactCheck
    //   ? setPlayer({ ...player, pWhatsapp: player.pPhone })
    //   : setPlayer({ ...player, pWhatsapp: player.pWhatsapp });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log("player-", player);
    const playerData = new FormData();
    playerData.append("player", JSON.stringify(player));
    playerData.append("pImage", pImage);
    const checkEmail = await axios.get(
      `${REACT_APP_API_URL}/checkemail/${player.pEmail}`
    );
    const checkPhone = await axios.get(
      `${REACT_APP_API_URL}/checkphone/${player.pPhone}`
    );

    // checkEmail.data
    //   ? setEmailMessage("This Email has been already registered")
    //   : setEmailMessage("");
    // checkPhone.data
    //   ? setPhoneMessage("This Phone number has been already registered")
    //   : setPhoneMessage("");

    if (checkEmail.data && checkPhone.data) {
      setErrorMessage(
        "This Email and Phone number have been registered already"
      );
    } else if (checkEmail.data && !checkPhone.data) {
      setErrorMessage("This Email has been registered already");
    } else if (!checkEmail.data && checkPhone.data) {
      setErrorMessage("This Phone number has been registered already");
    } else if (!checkEmail.data && !checkPhone.data) {
      setLoading(true);
      const result = await axios.post(
        `${REACT_APP_API_URL}/addplayer`,
        playerData
      );
      result.data ? setLoading(false) : setLoading(true);
      player.pPaymentMode === "Online"
        ? await navigate(`/pay/${result.data.pId}`)
        : navigate("/successpage");
    }
  };

  return (
    <div className="container p-5">
      <h1 className="text-center mt-5">Player Registration</h1>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row mt-4 justify-content-center text-start fw-bold">
            <div className="col-md-6">
              <div className="mb-2">
                <label htmlFor="fullname" className="col-sm-2 col-form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  name="pName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="username" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  name="pEmail"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="phonenumber" className="form-label">
                  Primary Contact
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phonenumber"
                  name="pPhone"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2"></div>
              <div className="mb-2">
                <label htmlFor="whatsappnumber" className="form-label pe-5">
                  WhatsApp Contact
                </label>
                <div className="form-check form-check-inline text-end">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="contact"
                    name="contactCheck"
                    onClick={checkBoxClick}
                  />
                  <label className="form-check-label" htmlFor="contact">
                    Same as Primary Contact
                  </label>
                </div>
                <input
                  type="number"
                  className="form-control"
                  id="whatsappnumber"
                  name="pWhatsapp"
                  value={contactCheck ? player.pPhone : player.pWhatsapp}
                  onChange={handleChange}
                  readOnly={contactCheck}
                  placeholder={contactCheck ? player.pPhone : ""}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="dob" className="form-label">
                  DOB
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="pDob"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="pimage" className="form-label">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="form-control"
                  id="pimage"
                  name="pImage"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                {pImage && (
                  <img
                    src={URL.createObjectURL(pImage)}
                    width="100px"
                    height="100px"
                    alt={player.pName}
                    className="img-fluid"
                  />
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="prole" className="form-label">
                  Player Role
                </label>
                <select
                  name="pRole"
                  className="form-control"
                  id="prole"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All Rounder">All Rounder</option>
                  <option value="Wicket-Keeper Batsman">
                    Wicket-Keeper Batsman
                  </option>
                </select>
              </div>

              <div className="mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="batting" className="form-label">
                      Batting Style
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="batting1"
                        name="pBatting"
                        value="Left Hand"
                        onChange={handleChange}
                        required
                      />
                      <label
                        className="form-check-label fw-normal"
                        htmlFor="batting1"
                      >
                        Left Hand
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="batting2"
                        name="pBatting"
                        value="Right Hand"
                        onChange={handleChange}
                        required
                      />
                      <label
                        className="form-check-label fw-normal"
                        htmlFor="batting2"
                      >
                        Right Hand
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="bowling" className="form-label">
                      Bowling Style
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="bowling1"
                        name="pBowling"
                        value="Left Hand"
                        onChange={handleChange}
                        required
                      />
                      <label
                        className="form-check-label fw-normal"
                        htmlFor="bowling1"
                      >
                        Left Hand
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="bowling2"
                        name="pBowling"
                        value="Right Hand"
                        onChange={handleChange}
                        required
                      />
                      <label
                        className="form-check-label fw-normal"
                        htmlFor="bowling2"
                      >
                        Right Hand
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="pkitsize" className="form-label">
                  Player Kit Size
                </label>
                <select
                  name="pKit"
                  className="form-control"
                  id="pkitsize"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Kit Size</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="payment" className="form-label">
                  Payment Mode
                </label>
                <select
                  name="pPaymentMode"
                  className="form-control"
                  id="payment"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Payment</option>
                  <option value="Cash">Cash Payment</option>
                  <option value="Online">Online Payment</option>
                </select>
              </div>
              <div>
                <i className="text-danger">{errorMessage}</i>
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <Link to="/" className="btn btn-outline-danger mx-3">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegistrationPage;
