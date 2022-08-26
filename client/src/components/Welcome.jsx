import React, { useContext } from "react";
import banner from './images/banner.png';
import { PollingContext } from '../context/PollingContext';

function Welcome()
{
    const { connectWallet, currentAccount } = useContext(PollingContext);
    //console.log(connectWallet, currentAccount);

    return (
        <div class ="Home">

    <div className="wel_Body">
           <br></br>
            CREATE POLLS <br></br>QUICKLY & EASILY
            <br></br>
            <p2 class="wel_p2"><br></br>Our polls are quick and simple to create, get<br></br>started by choosing a template or make one of<br></br> your own, no matter how complicated the<br></br> questions or how many alternatives there are.</p2>
            <br></br>

        </div>
        <div class="sign">
            <a href="register" target="_blank"><button className="btn2" type="button">Sign Up Now!</button></a>
        
            <h1 class="wel_h1"> <br></br>FREE ONLINE<br></br>POLLS</h1>
            <br></br>
            <a href="login"><h2> <button className="btn" type="submit" >Create your own poll now!</button></h2></a>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <img src={banner} class="banner-main" width="1900" height="900" alt="Main Banner"/>
            <br></br>
            <br></br>
        </div>
        
        </div>


    );
    
}


export default Welcome;