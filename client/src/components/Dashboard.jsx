import React, { useEffect, useState, useContext } from 'react';
import UserSidebar from './UserSidebar';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link, useNavigate } from "react-router-dom";
import Avatar from 'react-avatar';
import "./dashboard.css";
import { PollingContext } from '../context/PollingContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard () {

    const notify = () => {
      toast('Please accept MetaMask Connection', {position: toast.POSITION.BOTTOM_RIGHT})
    }
  const { connectWallet, currentAccount } = useContext(PollingContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');
    
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const logoutHandler =() => {
      localStorage.clear();
      
      navigate('/Login');
  }

    const callDash = async () => {
      try {
        const res = await fetch('/Dash', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
          },
          credentials: "include"
        });

        const data = await res.json();
      
        setUserData(data);

        if(!res.status === 200) {
          throw new Error(res.error);
        }
      }
      catch (err) {
        console.log(err);
        navigate("/login");
      }
    }

    useEffect(() => {
      callDash();
    }, []);

    return (

        <div className="main-content">
            <div className="float-child">
                <div className="side"><UserSidebar /></div>
            </div>
            <div>
              <ToastContainer />
          </div>
            <div className="content">
                <div className="con-Title">
                <button className= "dash-but" type="button" onClick={handleClick}><Avatar name={userData.Username}  round={true} size="50"/></button>
                <h1>Welcome {userData.firstName} {userData.lastName}</h1>
                <p>This is your dashboard</p>
                <body>Get Started!</body>
                <br></br>
                {userData.image == null ? <div>Verification Status: You are not <font color="red">verified</font>!!<br/>Please upload an ID on <Link to="/profile">Profile</Link> page.</div>: <>{userData.verified ? null : <div>Verification Status: <font color="#FF6800">Pending</font></div>}</>} 
                <div>
                    {currentAccount ? <div><i>Wallet Connected.</i></div>: <div><button type="button" onClick={() => {connectWallet(); notify()}} className="connect-wall">Connect Wallet</button></div>}
                </div>
                    {userData.verified ? (<div className="con-Title"><iframe width="720" height="405"
                        src="https://www.youtube.com/embed/Wl9EFy71CAM?autoplay=1&mute=1&loop=1">
                    </iframe>
                    </div>):(<div className="con-Title"></div>)}
                </div>
            </div>
            <Menu
              keepMounted
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
            >
               <Link to="/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
               <Link to="/logout"><MenuItem onClick={handleClose}>Logout</MenuItem></Link>
            </Menu>
            
        </div>
    );
    
}

export default Dashboard;