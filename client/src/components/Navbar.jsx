import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
    <nav>
      <div className="logo">
        <img src={logo} alt="logo"/>
      </div>
      <div className= {showMediaIcons ? "topnav-right menu-mobile" : "topnav-right"}>
      <ul className="topnav-right" >
        <li className="Nav">
          <Link to="/contact" style = {{ textDecoration: 'none', color: 'white' }}>Contact Us</Link>
        </li>
        <li className="Nav">
          <Link to="/faq" style = {{ textDecoration: 'none', color: 'white' }}>FAQ</Link>
        </li>
        <li className="Nav">
          <Link to="/about" style = {{ textDecoration: 'none', color: 'white' }}>About</Link>
        </li>
        <li className="Nav">
          <Link to="/" style = {{ textDecoration: 'none', color: 'white' }}>Home</Link>
        </li>
      </ul>
      {/*Hamburger Menu*/}
      </div>
      <div className="hamburger-menu">
        <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}> 
            <GiHamburgerMenu />
        </a>
      </div>
    </nav>
    </>
  );
};

export default Navbar;