import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicAPI from "../../api/PublicAPI";
import Spinner from "../layout/Spinner";
import Upload from "../../util/Upload";

const RegistrationPage = () => {
  let navigate = useNavigate();

  const [player, setPlayer] = useState({
    pName: "",
    pEmail: "",
    pPassword: "",
    pConfirmPassword: "",
    pPhone: "",
    pWhatsapp: "",
    pDob: "",
    pRole: "",
    pBatting: "",
    pBowling: "",
    pKit: "",
    pPaymentMode: "",
  });

  const [error, setError] = useState({
    pName: "",
    pEmail: "",
    pPassword: "",
    pConfirmPassword: "",
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
  const [passwordType, setPasswordType] = useState("password");
  const [contactCheck, setContactCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = async (e) => {
    const numberRegex = /^[0-9\b]+$/;
    if (e.target.name === "pPhone" || e.target.name === "pWhatsapp") {
      if (e.target.value === "" || numberRegex.test(e.target.value)) {
        setPlayer({ ...player, [e.target.name]: e.target.value });
      }
    } else {
      setPlayer({ ...player, [e.target.name]: e.target.value });
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleValidation = (e) => {
    let { name, value } = e.target;
    var passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8})"
    );
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "pPassword":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (!passwordRegex.test(value)) {
            stateObj[name] =
              "Password should contain minimum 8 letter password, at least 1 special character, upper and lower case letters and number";
          } else if (
            player.pConfirmPassword &&
            value !== player.pConfirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = player.pConfirmPassword
              ? ""
              : error.pConfirmPassword;
          }
          break;
        case "pConfirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (player.pPassword && value !== player.pPassword) {
            stateObj[name] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = player.pConfirmPassword
              ? ""
              : error.pConfirmPassword;
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };

  const checkBoxClick = () => {
    setContactCheck(!contactCheck);
    !contactCheck
      ? setPlayer({ ...player, pWhatsapp: player.pPhone })
      : setPlayer({ ...player, pWhatsapp: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const playerData = new FormData();
    playerData.append("player", JSON.stringify(player));
    playerData.append("pImage", pImage);

    const checkEmail = await PublicAPI.get(
      `/v1/player/checkemail/${player.pEmail}`
    );
    const checkPhone = await PublicAPI.get(
      `/v1/player/checkphone/${player.pPhone}`
    );
    if (checkEmail.data && checkPhone.data) {
      setErrorMessage(
        "This Email and Phone number have been registered already"
      );
    } else if (checkEmail.data && !checkPhone.data) {
      setErrorMessage("This Email has been registered already");
    } else if (!checkEmail.data && checkPhone.data) {
      setErrorMessage("This Phone number has been registered already");
    } else if (!checkEmail.data && !checkPhone.data) {
      if (error.pPassword === "" && error.pConfirmPassword === "") {
        setLoading(true);
        const result = await PublicAPI.post("/v1/player/register", playerData);
        result.data ? setLoading(false) : setLoading(true);
        result.data ? navigate("/successpage") : navigate("/errorpage");
      }
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
                <i style={{ color: "red" }}>{error.pName}</i>
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
                <label htmlFor="pass" className="form-label">
                  Password
                </label>

                <div className="input-group">
                  <input
                    type={passwordType}
                    onChange={handleChange}
                    value={player.pPassword}
                    id="pass"
                    name="pPassword"
                    className="form-control"
                    placeholder="Password"
                    onBlur={handleValidation}
                    required
                  />
                  <div className="input-group-btn">
                    <span className="form-control" onClick={togglePassword}>
                      {passwordType === "password" ? (
                        <i className="fa-solid fa-eye" />
                      ) : (
                        <i className="fa-solid fa-eye-slash" />
                      )}
                    </span>
                  </div>
                </div>
                <i style={{ color: "red" }}>{error.pPassword}</i>
              </div>
              <div className="mb-2">
                <label htmlFor="cpass" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="cpass"
                  name="pConfirmPassword"
                  onChange={handleChange}
                  onBlur={handleValidation}
                  required
                />
                <i style={{ color: "red" }}>{error.pConfirmPassword}</i>
              </div>
              <div className="mb-2">
                <label htmlFor="phonenumber" className="form-label">
                  Primary Contact
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phonenumber"
                  name="pPhone"
                  value={player.pPhone}
                  maxLength="10"
                  minLength="10"
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
                  type="text"
                  className="form-control"
                  id="whatsappnumber"
                  name="pWhatsapp"
                  value={player.pWhatsapp}
                  onChange={handleChange}
                  readOnly={contactCheck}
                  maxLength="10"
                  minLength="10"
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
                <Upload setpImage={setpImage} />
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
