import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import "./featuredInfo.css";
import { useNavigate } from "react-router-dom";

export default function Admins() {

    const navigate = useNavigate();
    const [adminData, setAdminData] = useState('');
    
    const callAdmin = async () => {
      try {
        const res = await fetch('/admin', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
          },
          credentials: "include"
        });

        const data = await res.json();
        //console.log(data);
        setAdminData(data);

        if(!res.status === 200) {
          throw new Error(res.error);
        }
      }
      catch (err) {
        console.log(err);
        navigate("/AdminLogin");
      }
    }

    useEffect(() => {
      callAdmin();
    }, []);

    return (
      <div className="container-admin">
          <div className="side"><Sidebar /></div>
          
          <div className="content">
              <div className="adminHeading">Welcome {adminData.firstName} {adminData.lastName}!</div> 
              <div className="featured">
                  <div className="featuredItem">
                  
                      <span className="featuredTitle">Users</span>
                      <div className="featuredUserContainer">
                      <span className="featuredUserCount">55</span>
                      <span className="featuredUserRate">+2.1</span>
                      </div>    
                      <span className="featuredSub">Compared to last month</span>
                  </div>
              </div>     
              <div className="featured">
                  <div className="featuredItem">
                      <span className="featuredTitle">Pending Verifications</span>
                      <div className="featuredUserContainer">
                      <span className="featuredUserCount">23</span>
                      </div>    
                  </div>
              </div>     
          </div>
          <div>

          </div>
          
      </div>

    );
}