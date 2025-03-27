import React, { useState } from "react";
import Background from "./assets/background.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    console.log(data);

    try {
      const response = await axios.post("https://back-end-ruvee-nature-therapy.fly.dev/employee/login", data);
      console.log(response.data);

      if (response.data && response.data._id) {
        navigate("/home");
      } else {
        alert("Login failed! Invalid username or password.");
      }
    } catch (error) {
      alert("Login failed! Invalid username or password.");
      console.error(error);
    }
  };

  return (
    <>
      <img
        src={Background}
        className="img-fluid position-absolute w-100 h-100"
        style={{ objectFit: "cover", zIndex: -1 }}
        alt="Background"
      />

      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        

        <div className="row w-100 justify-content-center">
          <div className="col-12 col-md-6">
            <form onSubmit={handleLogin} className="bg-light rounded p-3 p-md-5 shadow">
            <h1 className="text-center text-black mb-4">Ruvee Nature Spa</h1>
              <h3 className="text-center mb-4">-Login-</h3>
              
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={handleUsername}
                  placeholder="Enter your username"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={handlePassword}
                  placeholder="Enter your password"
                />
              </div>

              <button className="btn btn-success w-100 mt-2">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
