import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo-fut.png";


const Footer = () =>
{
    return (
        <nav>
            <div className="gradient-bg-footer">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="logo-text1">Blockchain Based</div>
                <div className="logo-text2">Polling System</div>
                
                    <div className="fot-right" >
                    <li className="fot">
                        <Link to="/" style = {{ textDecoration: 'none', color: 'white' }}>Terms & Conditions</Link>
                    </li>
                    <li className="fot">
                        <Link to="/privacy-policy" style = {{ textDecoration: 'none', color: 'white' }}>Privacy Policy</Link>
                    </li>
                    <li className="fot">
                        <Link to="/contact" style = {{ textDecoration: 'none', color: 'white' }}>Contact Us</Link>
                    </li>
                    <li className="fot">
                        <Link to="/AdminLogin" style = {{ textDecoration: 'none', color: 'white' }}>Staff Portal</Link>
                    </li>
                    </div>

            </div>
        </nav>
    );
}

export default Footer;