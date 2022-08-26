import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { BsPersonFill, BsShieldLockFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const LoginAdmin = async(e) => {
    e.preventDefault();

    const res = await fetch('/AdminLogin', {
      method: "POST",
      headers: {
        "Content-Type" :  "application/json"
      },
      body: JSON.stringify({
        username, 
        password
      })
    });

    const data = await res.json();

      if(res.status === 400 || !data) {
        toast.error("Invalid Credentials");
      } 
      else {
        alert("Login Success");
        navigate("/admin");
        
      }
  }

  return(
    <div className="loginAdmin">
      <div className="login-admin">
        <div className="titleAdminLogin">Admin Portal</div>
        <div className="h3">Unauthorized Access is not allowed</div>
      <div className="form"> 
      <ToastContainer />
      <form method="POST" id="login-admin">
              <div className="input-adminCont">
              <label className="label-reg" htmlFor="username"><BsPersonFill /> </label>
              <input className="input-containerAdmin" type="username" name="username" id="username" autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username'
              />
              </div>
              <div>
              
              </div>
              <div className="input-adminCont">
              <label className="label-reg" htmlFor="password"><BsShieldLockFill /></label>
              <input className="input-containerAdmin" type="password" name="password" id="password" autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
              />
              </div>

          <div className="button-containerAdmin">
          <ToastContainer />
              <input type="submit" name="Login" id="Login" className="form-submit"
                  value='Login' onClick={LoginAdmin}
              />
          </div>  
      </form>
      </div>
      </div>
    </div>
  )
}