import { Link } from "react-router-dom";
import React from "react";
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebarAdmin">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
            <li className="sidebarListItem">
              Home
            </li>
            </Link>
            <Link to="/analytics" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
            <li className="sidebarListItem">
              Analytics
            </li>
            </Link>
            <Link to="/users" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
            <li className="sidebarListItem">
              Users
            </li>
            </Link>
            <Link to="/reports" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
            <li className="sidebarListItem">
              Reported Polls
            </li>
            </Link>
              
            <Link to="/manageadmins" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
            <li className="sidebarListItem">
              Manage Admins
            </li>
            </Link>
              <ul>
                <Link to="/AdminRegister" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
                <li className="sidebarListItem1">
                  Create 
                </li>
                </Link>
                <Link to="/AdminView" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
                <li className="sidebarListItem1">
                  View  
                </li>
                </Link>
            </ul>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
          <a href="http://www.gmail.com/" target="_blank" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
            <li className="sidebarListItem">
              Mail
            </li>
          </a>
            <Link to="/ContactAdmin" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
            <li className="sidebarListItem">
              Messages
            </li>
            </Link>
          </ul>
          <Link to="/logout" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
            <li className="sidebarListItem">
              Logout
            </li>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;