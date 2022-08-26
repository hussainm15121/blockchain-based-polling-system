import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import "./ContactAdmin.css";

export default function ContactAdmin() {

  const [contactData, setContactData] = useState('');

  const callContact = async () => {
    try {
      const res = await fetch('/contactAdmin', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json" 
        }
      });

      const data = await res.json();
      //console.log(data);
      setContactData(data);

      if(!res.status === 200) {
        throw new Error(res.error);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    callContact();
  }, []);

  return (
    <div className="container-admin">
      <div className="side"><Sidebar /></div>
      <div className="contactAdmin">
      <div className="titleContactAdmin">Message(s):</div>
      <table className="tab-contact">
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Date</th>
          <th>Message</th>
        </tr>
        {contactData && contactData.map(message =>
          <tr>
              <td>{message.name}</td>
              <td>{message.phoneNumber}</td>
              <td>{message.email}</td>
              <td>{message.date}</td>
              <td>{message.message}</td>
          </tr>
        )}
        </table>
      </div> 
    </div>
  );
}