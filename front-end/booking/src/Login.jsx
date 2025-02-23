import React, { useState } from "react";
import Background from "./assets/background.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
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
      const response = await axios.post("http://localhost:3000/employee/login", data);
      console.log(response.data);

      
      if (response.data && response.data._id) {
        navigate('/home'); 
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
      <div>
        <h1 className="text-center">Ruvee Nature Spa</h1>
      </div>
      <div className="w-100 d-flex justify-content-center p-5">
        <form onSubmit={handleLogin}>
          <div className="row justify-content-center bg-light rounded p-4 shadow">
            <h2 className="text-center">Login</h2>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={handleUsername}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <button className="btn btn-success w-100">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
