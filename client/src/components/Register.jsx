import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";

const Register = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        Username: "", email: "", firstName: "", lastName: "", password: "", cpassword: ""
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ... user, [name]:value});
    }
    
    const PostData = async (e) => {
        e.preventDefault();

        const { Username, email, firstName, lastName, password, cpassword } = user;

        const res = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type" :  "application/json"
            },
            body: JSON.stringify({
                Username, email, firstName, lastName, password, cpassword
            })
        });

        const data = await res.json();

        if(res.status === 422 || !data) {
            window.alert(data.error);
            console.log("Invalid Registration");
        } else {
            window.alert("Registeration Success");
            navigate("/login");
        }
    }

    return(
        <div className="register">
            <div className="titleRegister">Create new Account</div>
            <label>Already registered?
                <button className="reg-but">
                    <Link to="/login" style = {{ color: 'antiquewhite' }}>Login here</Link>
                </button>
            </label>
            <form method="POST" id="register-form">
                <div className="input-reg">
                    <label className="label-reg" htmlFor="Username">Username</label>
                    <input className="input" name="Username" id="Username" autoComplete="off"
                        value={user.Username}
                        onChange={handleInputs}
                        placeholder='harry_potter2002'
                    />
                </div>
                
                <div className="input-reg">
                    <label className="label-reg" htmlFor="email">Email</label>
                    <input className="input" name="email" id="email" autoComplete="off"
                        value={user.email}
                        onChange={handleInputs}
                        placeholder='something@example.com'
                    />
                </div>

                <div className="input-reg">
                    <label className="label-reg" htmlFor="firstName">First Name</label>
                    <input className="input" name="firstName" id="firstName" autoComplete="off"
                        value={user.firstName}
                        onChange={handleInputs}
                        placeholder='Harry'
                    />
                </div>

                <div className="input-reg">
                    <label className="label-reg" htmlFor="lastName">Last Name</label>
                    <input className="input" name="lastName" id="lastName" autoComplete="off"
                        value={user.lastName}
                        onChange={handleInputs}
                        placeholder='Potter'
                    />
                </div> 

                <div className="input-reg">
                    <label className="label-reg" htmlFor="password">Password</label>
                    <input className="input" name="password" id="password" autoComplete="off" type="password"
                        value={user.password}
                        onChange={handleInputs}
                        placeholder='********'
                    />
                </div>  

                <div className="input-reg">
                    <label className="label-reg" htmlFor="cpassword">Confirm Password</label>
                    <input className="input" name="cpassword" id="cpassword" autoComplete="off" type="password"
                        value={user.cpassword}
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
                By clicking "Sign up!" you are indicating and confirming that<br/>you agree to our Terms of Use and Privacy Policy.
            </form>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default Register;