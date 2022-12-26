import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignupPage = () => {
  let navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [disable, setDisable] = useState(true);
  const { REACT_APP_API_URL } = process.env;

  const handleChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
    handleValidation(e);
  };

  //   useEffect(() => {
  //     buttonValidate();
  //   }, []);
  //   const buttonValidate = () => {
  //     if (
  //       signupDetails.name.length > 0 &&
  //       signupDetails.username.length > 0 &&
  //       signupDetails.phone.length > 0 &&
  //       signupDetails.password.length > 0 &&
  //       signupDetails.confirmPassword.length > 0
  //     )
  //       setDisable(false);
  //   };

  const handleValidation = (e) => {
    let { name, value } = e.target;
    // console.log(value === undefined);
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "name":
          if (value === undefined || !value) {
            stateObj[name] = "Please enter full name.";
          }
          break;
        case "username":
          if (!value) {
            stateObj[name] = "Please enter valid email address.";
          }
          break;
        case "phone":
          if (!value) {
            stateObj[name] = "Please enter valid phone number.";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (
            signupDetails.confirmPassword &&
            value !== signupDetails.confirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = signupDetails.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (
            signupDetails.password &&
            value !== signupDetails.password
          ) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //handleValidation(e);
    console.log("details-", signupDetails);
    const result = await axios.post(
      `${REACT_APP_API_URL}/signup`,
      setSignupDetails
    );
    navigate("/register");
  };

  return (
    <div className="container p-5">
      <h1 className="text-center mt-5">Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="row text-start mt-5">
          <div className="col-md-6 offset-md-3 mt-2 p-4 border">
            <div className="mb-3">
              <label htmlFor="fname" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fname"
                name="name"
                onChange={handleChange}
                onBlur={handleValidation}
                required
              />
              <i style={{ color: "red" }}>{error.name}</i>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="username"
                onChange={handleChange}
                onBlur={handleValidation}
                required
              />
              <i style={{ color: "red" }}>{error.username}</i>
            </div>

            <div className="mb-3">
              <label htmlFor="phn" className="form-label">
                Phone number
              </label>
              <input
                type="number"
                className="form-control"
                id="phn"
                name="phone"
                onChange={handleChange}
                onBlur={handleValidation}
                required
              />
              <i style={{ color: "red" }}>{error.phone}</i>
            </div>
            <div className="mb-3">
              <label htmlFor="pass" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="pass"
                name="password"
                onChange={handleChange}
                onBlur={handleValidation}
                required
              />
              <i style={{ color: "red" }}>{error.password}</i>
            </div>
            <div className="mb-3">
              <label htmlFor="cpass" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpass"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleValidation}
                required
              />
              <i style={{ color: "red" }}>{error.confirmPassword}</i>
            </div>
            {/* {console.log(error)} */}
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
