import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function EditProfile() {
  const basePrice = 10;
  const [flag, setFlag] = useState(false);
  const [team, setTeam] = useState("");
  const handleChange = (e) => {
    setTeam({ [e.target.name]: e.target.value });
  };
  const saveEditProfile = () => {
    setFlag(false);
  };
  return (
    <div className="container">
      <div className="text-center mb-md-5">
        <h1>MPL 2023 Player Player </h1>
      </div>
      <div className="row gutters-sm mt-5">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Admin"
                  className="rounded-circle"
                  width={150}
                />
                <div className="mt-3">
                  <h4>John Doe</h4>
                  <p className="text-secondary mb-1">Email</p>
                  <p className="text-secondary mb-1">Contact 1 | Contact 2</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Player ID</h6>
                </div>
                <div className="col-sm-9 text-secondary">1</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">Mike Ali</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Age</h6>
                </div>
                <div className="col-sm-9 text-secondary">10</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Kit Details</h6>
                </div>
                <div className="col-sm-9 text-secondary">Half Sleve | XL</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Role</h6>
                </div>
                <div className="col-sm-9 text-secondary">All Rounder</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Batting Style</h6>
                </div>
                <div className="col-sm-9 text-secondary">Left Hand</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Bowling Style</h6>
                </div>
                <div className="col-sm-9 text-secondary">Left Hand</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Base Price</h6>
                </div>
                <div className="col-sm-9 text-secondary">10</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Team</h6>
                </div>
                <div className="col-sm-9 text-secondary">Team Name</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Payment Mode</h6>
                </div>
                <div className="col-sm-9 text-secondary">Payment</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Payment Status</h6>
                </div>
                <div className="col-sm-9 text-secondary">Not Done</div>
              </div>
              <hr />
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
                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="playerId"
                      name="pId"
                      onChange={handleChange}
                      placeholder="Player ID"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="playerId"
                      name="pId"
                      onChange={handleChange}
                      placeholder="Base Price"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="playerId"
                      name="pId"
                      onChange={handleChange}
                      placeholder="Payment Status"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="text-end mt-5">
              <button type="submit" className="btn btn-success btn-lg mx-3">
                Save
              </button>
              <button
                className="btn btn-danger btn-lg"
                onClick={() => setFlag(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
