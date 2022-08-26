import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate} from "react-router-dom";
import './Forgot.css';

export default function Forgot() {

// States for registration
const [email, setEmail] = useState('');
const [forgotB, setForgotB] = useState(true)
const [code, setCode] = useState('');
const [password, setPassword] = useState('');
const [cpassword, setCpassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);
const navigate = useNavigate()

const handleCode = (e) => {
    setCode(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleCPassword = (e) => {
    setCpassword(e.target.value);
    setSubmitted(false);
  };

// Handling the email change
const handleEmail = (e) => {
	setEmail(e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = async (e) => {
	e.preventDefault();
	if (email === '') {
	setError(true);
    toast.error("Invalid Email!", {position: toast.POSITION.TOP_RIGHT})
	} else {
	    setSubmitted(true);
	    setError(false);
        
        const res = await fetch("/email-send", {
            method: "POST",
            headers: {
                "Content-Type" :  "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        });

        const response = await res.json();
          if(response.statusText === 'Success') {
                toast.success(response.message, {position: toast.POSITION.TOP_RIGHT})
                setForgotB(false)
            }else{
                toast.error(response.message, {position: toast.POSITION.TOP_RIGHT})
            }
        
	}
};

const handlePass = async (e) => {
    e.preventDefault();
    if (password === '' || cpassword === '' || password !== cpassword || code === '') {
        setError(true);
        toast.warn("Please enter all the field properly!", {position: toast.POSITION.TOP_RIGHT})
    } else {
        setSubmitted(true);
        setError(false);
        console.log(code)
          const res = await fetch("/change-password", {
              method: "POST",
              headers: {
                  "Content-Type" :  "application/json"
              },
              body: JSON.stringify({
                  email,
                  code,
                  password
              })
          });
  
          const response = await res.json();
            if(response.statusText === 'Success') {
                  //alert(response.message);
                  alert(response.message)
                  navigate('/login')
              }else{
                 // alert(response.message);
                  toast.error(response.message, {position: toast.POSITION.TOP_RIGHT})
              }
          
    }
  };

return (

    <div className="forgot">
        <div className="forgot-form">
        <ToastContainer />
        { forgotB ? <div>
        <div className="title-For">Forgot Password?</div>
            <label>Enter your email address and we'll send you an<br/> email with a link to reset your password.</label>
            
            <label className="label-for">Email Address</label>
            <input className="input-for" onChange={handleEmail} placeholder="something@example.com" value={email} type="email" />

            <button onClick={handleSubmit} className="btn-for" type="submit">
            Send OTP
            </button>

            <button className="btn-for" type="submit">
            <Link to="/login" style = {{ textDecoration: 'none', color: 'antiquewhite' }}>Cancel</Link>
            </button>
        </div> 
        : <div>
            <label className="label-for">OTP</label>
            <input className="input-for" onChange={handleCode} placeholder="1234" maxLength="4" value={code} type="otp" />

            <label className="label-for">Password</label>
            <input className="input-for" onChange={handlePassword} placeholder="********" value={password} type="password" />

            <label className="label-for">Confirm Password</label>
            <input className="input-for" onChange={handleCPassword} placeholder="********" value={cpassword} type="password" />
        
            <button onClick={handlePass} className="btn-for" type="submit">
            Reset Password
            </button>

            <button className="btn-for" type="submit">
            <Link to="/login" style = {{ textDecoration: 'none', color: 'antiquewhite' }}>Cancel</Link>
            </button>
            </div>}
        </div>
    </div>
);
}

