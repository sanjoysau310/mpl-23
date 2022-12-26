import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicAPI from "../../api/PublicAPI";
import { useStoreContext } from "../../context/StoreContext";
import { isAdmin } from "../../util/tokenUtils";

const LoginPage = () => {
  const { store, setStore } = useStoreContext();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (store && store.token) {
      isAdmin(store.token)
        ? navigate("/home")
        : navigate(`/playerview/${loginDetails.username}`);
    }
  }, [store]);

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PublicAPI.post("/v1/auth/login", loginDetails)
      .then((res) => {
        setStore({ token: res.data.token });
        sessionStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        setMessage("Invalid credential");
      });
  };

  return (
    <div className="container p-5">
      <h1 className="text-center mt-5">Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="row text-start mt-5">
          <div className="col-md-6 offset-md-3 mt-2 p-4 border">
            {message ? <h4 style={{ color: "red" }}>{message}</h4> : ""}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pass" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={passwordType}
                  onChange={handleChange}
                  value={loginDetails.password}
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
                <div className="input-group-btn">
                  <span
                    className="btn btn-outline-secondary"
                    onClick={togglePassword}
                  >
                    {passwordType === "password" ? (
                      <i className="fa-solid fa-eye" />
                    ) : (
                      <i className="fa-solid fa-eye-slash" />
                    )}
                  </span>
                </div>
              </div>
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
