import {React, useState } from 'react';
import "./AdminRegister.css";
import Sidebar from './Sidebar';
const Register = () => {

    const [admin, setAdmin] = useState({
        username: "", firstName: "", lastName: "", role: "", password: "", cpassword: ""
    });

    let name, value;

    const handleInputs = (e) => {
        //console.log(e);
        name = e.target.name;
        value = e.target.value;

        setAdmin({ ... admin, [name]:value});
    }
    
    const PostData = async (e) => {
        e.preventDefault();

        const { username, firstName, lastName, role, password, cpassword } = admin;

        const res = await fetch("/AdminRegister", {
            method: "POST",
            headers: {
                "Content-Type" :  "application/json"
            },
            body: JSON.stringify({
                username, firstName, lastName, role, password, cpassword
            })
        });

        const data = await res.json();

        if(res.status === 422 || !data) {
            window.alert(data.error);
            console.log("Invalid Registration");
        } else {
            window.alert("Registeration Success");
            console.log("Registration Success");
            window.location.reload(false);
        }
    }

    return(
        <div className="container-admin">
            <div className="side"><Sidebar /></div>
            <div className="adminRegister">
            <div className="title">Register a new Admin</div>
            <form method="POST" id="register-form">
                <div className="input-reg">
                    <label className="label-regAdmin" htmlFor="username">Username</label>
                    <input className="input" name="username" id="username" autoComplete="off"
                        value={admin.username}
                        onChange={handleInputs}
                        placeholder='harry_potter2002'
                    />
                </div>

                <div className="input-reg">
                    <label className="label-regAdmin" htmlFor="firstName">First Name</label>
                    <input className="input" name="firstName" id="firstName" autoComplete="off"
                        value={admin.firstName}
                        onChange={handleInputs}
                        placeholder='Harry'
                    />
                </div>

                <div className="input-reg">
                    <label className="label-regAdmin" htmlFor="lastName">Last Name</label>
                    <input className="input" name="lastName" id="lastName" autoComplete="off"
                        value={admin.lastName}
                        onChange={handleInputs}
                        placeholder='Potter'
                    />
                </div>

                <div className="input-reg">
                    <label className="label-regAdmin" htmlFor="role">Role</label>
                    <input className="input" name="role" id="role" autoComplete="off"
                        value={admin.role}
                        onChange={handleInputs}
                        placeholder='Software Developer'
                    />
                </div> 

                <div className="input-reg">
                    <label className="label-regAdmin" htmlFor="password">Password</label>
                    <input className="input" name="password" id="password" autoComplete="off"
                        value={admin.password}
                        onChange={handleInputs}
                        placeholder='********'
                    />
                </div>  

                <div className="input-reg">
                    <label className="label-regAdmin" htmlFor="cpassword">Confirm Password</label>
                    <input className="input" name="cpassword" id="cpassword" autoComplete="off"
                        value={admin.cpassword}
                        onChange={handleInputs}
                        placeholder='********'
                    />
                </div>  

                <div className="button-container">
                    <input type="submit" name="Signup" id="Signup" className="form-submit"
                        value='Sign up!' onClick={PostData}
                    />
                </div> 
                <br/>
            </form>
            <br></br>
            <br></br>
            <br></br>
        </div>
        </div>

    )
}

export default Register;