import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import "./Users.css";

export default function Users() {

  const [userData, setUserData] = useState('');

  const callUser = async () => {
    try {
      const res = await fetch('/getUsers', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json" 
        }
      });

      const data = await res.json();
      //console.log(data);
      setUserData(data);

      if(!res.status === 200) {
        throw new Error(res.error);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    callUser();
  }, []);

  const verify = async (id) => {
    const res = await fetch("/update", {
        method: "POST",
        headers: {
            "Content-Type" :  "application/json"
        },
        body: JSON.stringify({
          id
        })
    });

    const data = await res.json();

    if(res.status === 422 || !data) {
        window.alert(data.error);
        console.log("User not verified");
    } else {
        window.alert("User verified");
        console.log("User Verified");
        window.location.reload(false);
    }
  }

  return (
    <div className="container-admin">
      <div className="side"><Sidebar /></div>
      <div className="user">
      <div className="titleUser">User(s) information:</div> 
      <table className="tab-user">
        <tr>
          <th>ID and Wallet ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Username</th>
          <th>Status</th>
          <th>Verification</th>
        </tr>
        {userData && userData.map(user =>
          <tr>
              <td>{user.walletID == null ? <div>Wallet not connected</div>: <div>{user.walletID}</div>}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.Username}</td>
              <td>{user.image == null ? <>{user.verified? <div className="verified">Verified</div>: <div className="notVerified">Not Verified</div>}</>: <>{user.verified ? <div className="verified">Verified</div>: <div className="pending">Pending</div>}</>}</td>
              <td>{user.image == null ? <div>ID not uploaded</div>:<div><a href={user.image} target="_blank" rel="noreferrer">Verification ID</a><br/>{user.verified ? null : <input type="submit" className="form-submit" value='Verify' onClick={() => verify(user._id)}/>}</div>}</td>
          </tr>
        )}
        </table>
      </div> 
    </div>
  );
}