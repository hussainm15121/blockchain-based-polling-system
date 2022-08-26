import React, { useState } from 'react';
import "./Contact.css";

function Contact() {

    const [contact, setContact] = useState({
        name: "", phoneNumber: "", email: "",  message: ""
    });

    let name, value;
    
    const handleInputs = (e) => {
        //console.log(e);
        name = e.target.name;
        value = e.target.value;

        setContact({ ... contact, [name]:value});
    }

    const PostData = async (e) => {
        e.preventDefault();
        
        const { name, phoneNumber, email, message} = contact;

        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type" :  "application/json"
            },
            body: JSON.stringify({
                name, phoneNumber, email, message
            })
        });

        const data = await res.json();

        if(res.status === 422 || !data) {
            window.alert(data.error);
            console.log("Message not sent");
        } else {
            window.alert("Message Successfully sent");
            console.log("Message Successfully sent");

        }
    }

    return (
        <div className="contact">
                <div className="cont-form">
                    <label className="title1">Contact Us</label>
                    <div>
                        <input className="input-cont" name="name" placeholder="Your Name" value={contact.name} onChange={handleInputs} />
                        <input className="input-cont" name="phoneNumber" placeholder="Your Phone Number" value={contact.phoneNumber} onChange={handleInputs}  />
                        <input className="input-cont" name="email" placeholder="Your Email" value={contact.email} onChange={handleInputs}  />
                        <textarea className="input-message" name="message" placeholder="Your Message" value={contact.message} onChange={handleInputs}  />
                    </div>
                    <button type="submit" className="cont-but" onClick={PostData}>Send Message</button>
                </div>
        </div>
    );
}

export default Contact;