import React from 'react';
import banner from './images/banner_aboutus.png';
import "./About.css"
export default function About() {
    return (

<div>

            <section className="section gradient-bg-welcome">
                <div className="container mx-auto">
                    <div className="main-heading">About Us</div>
                            
                        <div className="Para1">
                            BBPS is an Audience Engagement Platform which enables presenters interact and engage with their audience through live polls to get real-time input.
                            Our platform is targeted directly towards businesses and individuals who wish to independantly host any type of poll.  
                        </div>
                        <br></br>
                        <div className="Para">
                            Meet The Team
                        </div>

                        <br></br>
            <img src={banner} class="banner-main-about" alt="Main Banner" />
                </div>
                    
            </section>        
        </div>
    );
}