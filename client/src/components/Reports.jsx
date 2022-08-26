import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import "./ContactAdmin.css";

export default function Reports() {

  const [reportData, setReportData] = useState('');
  const navigate = useNavigate();
  const callReport = async () => {
    try {
      const res = await fetch('/getReports', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json" 
        }
      });

      const data = await res.json();
      //console.log(data);
      setReportData(data);

      if(!res.status === 200) {
        throw new Error(res.error);
      }
    }
    catch (err) {
      console.log(err);
      navigate("/adminlogin");
    }
  }

  useEffect(() => {
    callReport();
  }, []);

  return (
    <div className="container-admin">
      <div className="side"><Sidebar /></div>
      <div className="contactAdmin">
      <div className="titleContactAdmin">Report(s):</div>
      <table className="tab-contact">
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Poll ID</th>
          <th>Poll Title</th>
          <th>Reason</th>
        </tr>
        {reportData && reportData.map(report =>
          <tr>
              <td>{report.username}</td>
              <td>{report.email}</td>
              <td>{report.pollID}</td>
              <td>{report.pollTitle}</td>
              <td>{report.reason}</td>
          </tr>
        )}
        </table>
      </div> 
    </div>
  );
}