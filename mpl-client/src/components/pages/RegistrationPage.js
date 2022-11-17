import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  let navigate = useNavigate();
  const [player, setPlayer] = useState({
    pName: "",
    pEmail: "",
    pDob: "",
    pRole: "",
    pBatting: "",
    pBowling: "",
    pKit: "",
    pPayment: "",
  });
  const [pImage, setpImage] = useState("");

  const handleChange = (e) => {
    e.target.name === "pImage"
      ? setpImage(e.target.files[0])
      : setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const playerData = new FormData();
    playerData.append("player", JSON.stringify(player));
    playerData.append("pImage", pImage);
    console.log("details-", playerData);
    await axios.post("http://localhost:8080/addplayer", playerData);
    navigate("/");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mt-4">
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
              />
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
                    />
                    <label className="form-check-label" htmlFor="batting1">
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
                    />
                    <label className="form-check-label" htmlFor="batting2">
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
                    />
                    <label className="form-check-label" htmlFor="bowling1">
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
                    />
                    <label className="form-check-label" htmlFor="bowling2">
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
                name="pPayment"
                className="form-control"
                id="payment"
                onChange={handleChange}
              >
                <option value="">Select Payment</option>
                <option value="Cash">Cash Payment</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/" className="btn btn-outline-danger mx-3">
              Cancel
            </Link>
          </div>
          <div className="col-md-6">
            {pImage && (
              <img
                src={URL.createObjectURL(pImage)}
                alt={player.pName}
                className="img-fluid"
              />
            )}
            <h4>{pImage.name}</h4>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
