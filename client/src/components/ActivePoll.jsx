import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { PollingContext } from '../context/PollingContext';
import UserSidebar from './UserSidebar';
import "./BrowsePolls.css"
import { LoaderBlock } from './';
import { Notify } from './';
import {FAQ} from './index.js';
import { useNotification } from '../components/Notifications/NotificationProvider';
import '../components/Notifications/Notification.css'
import { Link} from "react-router-dom";



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

const PollCard = ({ sender, pollId, title, category, description, options, votes, timestamp, start, end, VhasVoted }) => {
    
    const { currentAccount, polls, voteOnPoll, getPollVotes, isLoading, pollVotes, processing} = useContext(PollingContext);
    let value;

    const dispatch = useNotification();
    const [inputVal, setInputVal] = useState("");
    const [toggle, setToggle] = useState(false);

    const handleNewNotification = () => {
     
    }
    const [showComponent, setShowComponent] = useState(true);

    useEffect(() => {
      setInterval(() => {
          setShowComponent(true);
      }, 6000); 
          }, []);

    const handleSubmit = (e) => {
        {currentAccount && (alert("Vote is being placed"))}
        //console.log(processing);
        {<div>
          {
              dispatch({
                  type: "SUCCESS",
                  message: "Processing Request"
                  })    
          }
          </div>
        }
        voteOnPoll(e.target.value, pollId, currentAccount) 
  
    }
   
    const onClick = (e) => {
      getPollVotes(pollId);
      setToggle(!toggle)
    };
   


    return (
      
      <div className="content-polls">
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Category: </strong> {category} </p>
        <p><strong>Description:</strong> {description}</p>
        <p>{start}</p>
        <p>{end}</p>
        {options && (
          <>
            {end ? <div className="ended">The poll has ended.</div> : 
            <div>
                  {isLoading
              ? <LoaderBlock />   
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
        <p>{timestamp}</p>
        
       
        <button onClick={onClick} className='vote-but'>View Votters</button>        

        {toggle && (
          <>{pollVotes.map((pollVotes, i) => (
              <PollCardVote key={i} {...pollVotes} />
        ))} </>)}
              </div>
      
    );
  };
   

  const ActivePoll = () => {
    const { currentAccount, polls, voteOnPoll, pollId, getPollVotes } = useContext(PollingContext);
    const [query, setQuery] = useState("")
    
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');

    const callAct = async () => {
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
      callAct();
    }, []);


    return (
      <div class="main-poll">
      <div class="float-child">
          <div class="side"><UserSidebar /></div>
      </div>
      
        <div class="content">
          <div class="con-Title">
          {currentAccount ? (<div className="con-Title">ACTIVE POLLS<br/><input class="searchPoll" placeholder="Search for polls..."  
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
            
          }).map((polls, i) => (
              <>
              {polls.end ? 
                <> </> : <PollCard key={i} {...polls} /> 

              } </>
            ))}
           
          </div>
        </div>
      </div>
      );
    };

export default ActivePoll;