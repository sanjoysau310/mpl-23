import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TodoDataService } from "../../api/todo/TodoDataService";

const LoginPage = () => {
  //const [username,setUsername] = useState("");
  //const [password, setPassword]= useState("");

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("details-", user);
    TodoDataService.login(user).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-2 p-4 border">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="username"
                onChange={handleChange}
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
