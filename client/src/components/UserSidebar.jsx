import { Link } from "react-router-dom";
import React from "react";
import './usersidebar.css';
import { BsFillArchiveFill, BsFillPencilFill, BsCollectionFill, BsBellFill, BsFillHouseDoorFill, BsExclamationTriangleFill, BsFillDoorOpenFill} from "react-icons/bs";

function UserSidebar() {
  
  return (
    <div className="sidebarUser">
      <div className="sidebarTitleUser">Menu</div>
      <ul className="sidebarListUser">
        <Link to="/dashboard" className="link" style = {{textDecoration: 'none', color: 'black' }}>
        <li className="sidebarListItemUser">
        <BsFillHouseDoorFill /> &nbsp; Dashboard
        </li>
        </Link>
        <Link to="/CreatePoll" className="link" style = {{ textDecoration: 'none', color: 'black' }}> 
        <li className="sidebarListItemUser">
        <BsFillPencilFill /> &nbsp; Create a Poll
        </li>
        </Link>
        <Link to="/poll" className="link" style = {{ textDecoration: 'none', color: 'black' }} > 
        <li className="sidebarListItemUser">
        <BsCollectionFill /> &nbsp; My Polls
        </li>
        </Link>
        <Link to="/explore" className="link" style = {{ textDecoration: 'none', color: 'black' }}> 
        <li className="sidebarListItemUser">
        <BsFillArchiveFill /> &nbsp; Explore 
        </li>
        <ul className="sidebarListItemUser1">
          <Link to="/active" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
          <li className="sidebarListItemUser2">Active Polls</li>
          </Link>
          
          <Link to="/ended" className="link" style = {{ textDecoration: 'none', color: 'black' }}> 
          <li className="sidebarListItemUser2">Ended Polls</li>
          </Link>
        </ul>
        </Link>
        <Link to="/logout" className="link" style = {{ textDecoration: 'none', color: 'black' }}>
        <li className="sidebarListItemUser">
        <BsFillDoorOpenFill /> &nbsp; Logout
        </li>
        </Link>
      </ul>
    </div>
  );
}

export default UserSidebar;