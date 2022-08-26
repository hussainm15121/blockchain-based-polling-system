import UserSidebar from './UserSidebar';
import Avatar from 'react-avatar';
import './profile.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Profile () {

  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const [file, setFile] = useState('');
    
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


  const onChange = e => {
    setFile(e.target.files[0]);
}

  const upload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file, userData._id + "_" + file.name);
    try{
      const res = await axios.post('/upload', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
      //console.log(res.data);
      window.alert('File Uploaded');
    }catch(err){
      if(err.response.status === 500) {
          console.log('There was a problem with the sever ')
      } else {
          console.log(err.response.data.msg)
      }
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClick = (event) => {
    setAnchorEl.currentTar(          
      );}

  return(
        <div class="main-content">
            <div class="float-child">
                <div class="side"><UserSidebar /></div>
            </div>
            <div class="content">

                <div class="con-Title">
                <div class="profile-class">
                  <div className="profile-pic">
                  <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.pexels.com/photos/12319685/pexels-photo-12319685.jpeg" />
                  </div>
                  
                
                    <h2>{userData.firstName}'s Profile </h2>
                    <p1>Username: <label> {userData.Username}</label></p1> <br></br><br></br>
                    <p1> Name: <label> {userData.firstName} {userData.lastName}</label></p1><br></br><br></br>
                    <p1> Email: <label> {userData.email}</label></p1><br></br><br></br>
                </div>
                    <Link to="/forgot"><p1> Change Password</p1></Link><br></br>
                    <div className="upload">
                    <form onSubmit={upload}>
                        <div>
                            <input type="file" onChange={onChange}/>
                            <input type="submit" value="Upload"/>
                        </div>
                    </form>
                    <div className="walletConnect">
                     

                    </div>
                  </div>

                </div>
            </div>

        </div>
  );
        
}
export default Profile;