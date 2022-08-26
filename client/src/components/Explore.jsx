import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { PollingContext } from '../context/PollingContext';
import UserSidebar from './UserSidebar';
import "./BrowsePolls.css"
import { Loader } from './';
import { Notify } from './';
import {FAQ} from './index.js';
import { useNotification } from '../components/Notifications/NotificationProvider';
import '../components/Notifications/Notification.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PollCardVote = ({ sender, pollId, title, category, description, options, votes, timestamp, start, end , voter, Vvote, Vtimestamp }) => {
  const { currentAccount, mypolls, voteOnPoll, getMyPoll, endedPoll, getPollVotes, pollVotes } = useContext(PollingContext);
    
    return (
      <div className="browseContainer">
        <div className="data-polls">
          <div className="data-poll">
            <p className="">Voter: {(voter)}</p>
            <p className="">Vote: {Vvote} </p>
            <p className="">Vote Time: {(Vtimestamp)}</p>
          </div>
        </div>
      </div>
    );
  };

const PollCard = ({ sender, pollId, title, category, description, options, votes, timestamp, start, end, endDate, VhasVoted }) => {
    const { currentAccount, polls, voteOnPoll, getPollVotes, endedPoll, isLoading, pollVotes, processing, hasUserVoted} = useContext(PollingContext);
    let value;
    let val = 0;

    const dispatch = useNotification();
    const [inputVal, setInputVal] = useState("");
    const [toggle, setToggle] = useState(false);
    const [toggleReport, setToggleReport] = useState(false);
    const [reason, setReason] = useState("");

    const [showComponent, setShowComponent] = useState(false);

    const reportNoti = () => {
      toast('Poll has been reported', {position: toast.POSITION.TOP_RIGHT})
    }

    useEffect(() => {
      setInterval(() => {
          setShowComponent(true);
      }, 6000); 
          }, []);

    const getVoteStatus = (e) => {
      hasUserVoted(currentAccount, pollId).then(function(result){
          //console.log("Result: ", result)
        })
    }

    const handleSubmit = (e) => {
        {currentAccount && (toast.info("Processing Request", {position: toast.POSITION.TOP_RIGHT}))}
        //console.log(processing);
        voteOnPoll(e.target.value, pollId, currentAccount)
    }
   
    const onClick = (e) => {
      getPollVotes(pollId);
      if(pollVotes.length === 0){
        toast("No Voters to display");
      }
      if(pollVotes.length > 0 && toggle === false){
        toast.success("Voters are displayed");
      }
      setToggle(!toggle)
      
    };

    const report =(e) => {
      setToggleReport(!toggleReport)
    }
    
    const reportPoll = async () => {
      if(reason == "")
      {
        toast.warn("Please Select Reason to Report")
      }
      else
      {
        try{
          const res = await fetch('/sendReport', {
            method: "POST",
            headers: {
              "Content-Type" :  "application/json"
            },
            body: JSON.stringify({
              currentAccount,
              pollId,
              title,
              reason
            })
          });
      
          const data = await res.json();
          if(res.status === 400 || !data) {
            window.alert("oops");
          } 
          else {
            toast("Poll has been reported");
            //window.alert("Poll has been reported");
            }
          }
          catch (err){
            toast.error("Error while reporting poll");
            console.log(err)
          }
      }
    }


    return (
      
      <div className="content-polls">
        <ToastContainer />
        
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Category: </strong> {category} </p>
        <p><strong>Description:</strong> {description}</p>
        <p>{start}</p>
        <p>{end}</p>
        <p><strong>End Date:</strong> {endDate}</p>
        {options && (
          <>
            {end ? <div className="ended">The poll has ended.</div> : 
            <div>
                  {isLoading
              ? <Loader />   
              : ( <>
              <strong>Please Select one of the options to vote:</strong><br/>
              <button className="vote-but" onClick={handleSubmit} value={options[0]}>{options[0]}</button>
              <button className="vote-but" onClick={handleSubmit} value={options[1]}>{options[1]}</button>
              <button className="vote-but" onClick={handleSubmit} value={options[2]}>{options[2]}</button>
              <button className="vote-but" onClick={handleSubmit} value={options[3]}>{options[3]}</button>
              
              </>
              )
            }
            
            </div>}

            <p><strong>Votes Recorded:</strong> <br/><strong>{options[0]}</strong>: {(votes[0])} <strong>{options[1]}</strong>: {(votes[1])} <strong>{options[2]}</strong>: {(votes[2])} <strong>{options[3]}</strong>: {(votes[3])}</p>        
          </>
        )}

        <p><strong>Creator:</strong> {(sender)}</p>
        <p><strong>Creation Date:</strong> {timestamp}</p>
        
        
       
        <button onClick={onClick} className='vote-but'>View Voters</button>  
              
        <button className="report-but" onClick={report}>Report this poll</button>

        {toggleReport && (
          <>
          <br/>
          <select className="input-report" defaultValue="" onChange={(e) => setReason(e.target.value)}>
                  <option value="" disabled hidden>Select a reason</option>
                  <option value="inappropriate content">Inappropriate Content</option>
                  <option value="false information">False Information</option>
                  <option value="hate speech">Hate Speech</option>
                  <option value="violence">Promotes Violence</option>
                  <option value="bullying">Bullying</option>
                  <option value="spam">Spam</option>
                  <option value="racism">Racist</option>
                  <option value="sexism">Sexism</option>
                  <option value="other">Other</option>
          </select> 
          <br/>
        <button className="send-but" onClick={reportPoll}>Send</button></>)}

        {toggle && (
          <>{pollVotes.map((pollVotes, i) => (
              <PollCardVote key={i} {...pollVotes} />
        ))} </>)}
              </div>
      
    );
  }
   

  const Explore = () => {

    const { currentAccount, polls, voteOnPoll, pollId, getPollVotes } = useContext(PollingContext);
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');

    const callExp = async () => {
      try {
        const res = await fetch('/exp', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
          },
          credentials: "include"
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
        navigate("/login");
      }
    }

    useEffect(() => {
      callExp();
    }, []);



    return (
   
      <div className="main-poll">
        
      <div className="float-child">
          <div className="side"><UserSidebar /></div>
      </div>
      
        <div className="content">
          <div className="con-Title">
          {currentAccount ? (<div className="con-Title">LATEST POLLS <br/><input class="searchPoll" placeholder="Search for polls..." 
          onChange={event => setQuery(event.target.value)} /></div>):(<div className="con-Title">Connect your account to see the latest polls</div>)}
          </div>
          <div className="poll">
            {polls.filter(polls => {
              if (query == '') {
              return polls;
            } else if ((polls.title.toLowerCase().includes(query.toLowerCase()) || (polls.description.toLowerCase().includes(query.toLowerCase())) 
            || (polls.category.toLowerCase().includes(query.toLowerCase())))) {

              return polls;
            }
            
          }).reverse().map((polls, i) => (
              <PollCard key={i} {...polls} />
            ))}

            
          </div>
          
        </div>
      </div>
    );
  }; 
export default Explore;