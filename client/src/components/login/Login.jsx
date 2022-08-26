import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const notification = () => {
    toast.info('Login Successful', {position: toast.POSITION.TOP_CENTER})
  }

  const LoginUser = async(e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method: "POST",
      headers: {
        "Content-Type" :  "application/json"
      },
      body: JSON.stringify({
        email, 
        password
      })
    });
   

    const data = await res.json();
        
      if(res.status === 400 || !data) {
        window.alert("Invalid Credentials");
      } 
      else {
      
        notification();
        <ToastContainer />
        navigate("/dashboard");
        }
  }

  return(
    <div className="login">
      <div className="login-form">
        <div className="titleLogin">Login to your account</div>
        <label>Dont Have an Account?
        <button className="log-but">
            <Link to="/register" style = {{ color: 'antiquewhite' }}>Sign up!</Link>
        </button></label>
        <form method="POST" id="login-form">
                <div className="input-container">
                <label className="label-log" htmlFor="email">Email</label>
                <input className="login-input" type="email" name="email" id="email" autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='something@example.com'
                />
                </div>

                <div className="input-container">
                <label className="label-log" htmlFor="password">Password</label>
                <input className="login-input" type="password" name="password" id="password" autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='********'
                />
                </div>

            <div className="button-container">
                <input type="submit" name="Login" id="Login" className="form-submit"
                    value='Login' onClick={LoginUser}
                />
                  
            </div>  

            <button className="log-but">
              <Link to="/forgot" style = {{ color: 'antiquewhite' }}>Forgot your password?</Link>
            </button>

            </form>
      </div>
      </div>
  )
}