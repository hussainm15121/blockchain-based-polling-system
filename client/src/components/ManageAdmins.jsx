import Sidebar from './Sidebar';
import React from 'react';
import banner from './images/manage-your-team.png';
import './ManageAdmins.css'
export default function ManageAdmins() {
    return (
        <div className="container-admin">
            <div className="side"><Sidebar /></div>
            <div className="content">
                <div className="adminHeading">Manage Admins!</div> 
                <div>
                <img src={banner} class="banner-main-manage" alt="Main Banner" />
                </div>
            </div>
        </div>

);
}
