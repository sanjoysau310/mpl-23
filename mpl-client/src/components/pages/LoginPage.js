import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { REACT_APP_API_URL } = process.env;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("details-", user);
    const result = await axios.post(`${REACT_APP_API_URL}/authuser`, user);
    if (result.data === "Auth Successful") navigate("/home");
    else {
      setUser("");
      setMessage("Please enter correct credentials!!!");
    }
  };

  return (
    <div className="container p-5">
      <div></div>
      <h1 className="text-center mt-5">Admin Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3 mt-2 p-4 border">
            {message ? <h4 style={{ color: "red" }}>{message}</h4> : ""}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/" className="btn btn-outline-danger mx-3">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
