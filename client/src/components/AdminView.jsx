import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import "./AdminView.css";

export default function Users() {

  const [adminData, setContactData] = useState('');

  const callContact = async () => {
    try {
      const res = await fetch('/getAdmins', {
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
      <div className="AdminView">
      <div className="titleAdminView">Admin(s):</div>
      <table className="tab-admin">
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
        {adminData && adminData.map(admin =>
          <tr>
              <td>{admin.username}</td>
              <td>{admin.firstName} {admin.lastName}</td>
              <td>{admin.role}</td>
          </tr>
        )}
        </table>
      </div> 
    </div>
  );
}