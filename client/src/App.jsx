import { Navbar, Welcome, Footer, About, Contact, Login, Forgot, Explore, SinglePoll, FAQCall, Loader, Dashboard, Admins, Register, ManageAdmins, CreatePoll, Users, Profile, AdminLogin, AdminRegister, Analytics, ContactAdmin, AdminView, Reports} from './components';
import LogOut from './components/LogOut.jsx'
import ActivePoll from './components/ActivePoll.jsx'
import EndedPoll from './components/EndedPoll.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Outlet } from 'react-router';
import React, { Component, useState, useEffect } from "react";
import pic404 from './components/images/404.png';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <div className="gradient-bg-footer">
        <Footer />
      </div>
    </div>
  );
};


export default function App(){
  const [loader, setLoader] = useState(true);
  
  useEffect(() => {

    setTimeout(() => {
      setLoader(false);
    }, 3000)

  }, [])


  return loader ? (
    <Loader />
  ) : (
    <Router>
      <div className="min-h-screen">
          <div className="gradient-bg-welcome">
            <Routes >
              <Route path="/" element={<AppLayout />}>
              <Route index element={<Welcome />} />
              <Route path="about" element={<About/>} />
              <Route path="login" element={<Login/>} />
              <Route path="register" element={<Register/>} />
              <Route path="forgot" element={<Forgot/>} />
              <Route path="contact" element={<Contact/>} />
              <Route path="faq" element={<FAQCall/>} />
              <Route path="adminlogin" element={<AdminLogin/>} />
            </Route>
              <Route path="/admin" element={<Admins/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/createPoll" element={<CreatePoll/>} />
              <Route path="/explore" element={<Explore/>} />
              <Route path="/users" element={<Users/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/adminregister" element={<AdminRegister />} />
              <Route path="/adminView" element={<AdminView />} />
              <Route path="/contactAdmin" element={<ContactAdmin />} />
              <Route path="/logout" element={<LogOut/>} />
              <Route path="/analytics" element={<Analytics/>} />
              <Route path="/loader" element={<Loader/>} /> 
              <Route path="/manageadmins" element={<ManageAdmins/>} /> 
              <Route path="/poll" element={<SinglePoll/>} />
              <Route path="/reports" element={<Reports/>} />
              <Route path="/active" element={<ActivePoll/>} />
              <Route path="/ended" element={<EndedPoll/>} />
              
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
      </div>
      </Router>
  );
}

class NotFound extends Component {
  render() {
    return (
      <>
      <section className="section gradient-bg-welcome">
                <div className="container mx-auto">
                <img src={pic404} class="pic404" width="1700" height="700" alt="404 Image Display"/>
                    <center>    
          <div className="main-heading head-mid">
            The page your are looking for doesn't exist.
            Go to{" "}  
            <Link to="/" style = {{ color: 'gold' }}>Home</Link>
            </div>
        </center>
        </div>
        </section>
      </>
    );
  }
}