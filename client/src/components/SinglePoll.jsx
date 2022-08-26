import React, { useContext, useState, useEffect } from "react";
import UserSidebar from './UserSidebar';
import { PollingContext } from '../context/PollingContext';
import { generatePath, useNavigate, useParams }  from "react-router-dom";
import "./SinglePoll.css"
import icon  from './images/poll-not.png';


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


const PollCard = ({ sender, pollId, title, category, description, options, votes, timestamp, start, end, endDate, voter, Vvote, Vtimestamp }) => {
  const { currentAccount, mypolls, voteOnPoll, getMyPoll, endedPoll, getPollVotes, pollVotes } = useContext(PollingContext);
  
  const [toggle, setToggle] = useState(true);
  
  const onClick = (e) => {
    getPollVotes(pollId);
    setToggle(!toggle)
  };

  const handleSubmit = (e) => {
    endedPoll(pollId);
  };
  
    return (
      <div className="content-polls">
        <div className="data-polls">
          <div className="data-poll">
                
              <p><strong>Creator:</strong> {(sender)}</p>
              
              <p><strong>Title:</strong> {(title)}</p>
              <p><strong>Category:</strong> {category} </p>
              <p><strong>Description:</strong> {(description)}</p>
              <p><strong>EndDate:</strong> {endDate}</p>
            {options && (
              <>
                <br />
                <p className="">Options: </p>  
                <p className="">A. {options[0]}<br/>B. {options[1]}<br/>C. {options[2]}<br/>D. {options[3]}</p>
              </>
            )}
          </div>
          <div className="">
            <p className="">Poll Creation Timestamp: {timestamp}</p>
          
            
            {end == false ? <div><button className="submit-poll" type="button" name="Explore" onClick={handleSubmit} value="Explore">End Poll</button></div>: <>{!end ? true : <div>The Poll has already been ended</div>}</>}
            <button onClick={onClick} className='vote-but'>View voters</button>        

              {toggle && (
                <>{pollVotes.map((pollVotes, i) => (
                    <PollCardVote key={i} {...pollVotes} />
              ))} </>)}

          </div>
        </div>
      </div>
    );
  };

  
const SinglePoll = () => {
  const { currentAccount, mypolls, getMyPoll, getPollVotes, pollVotes } = useContext(PollingContext);
  getMyPoll(currentAccount);

  const navigate = useNavigate();
    const [userData, setUserData] = useState('');

    const callSingle = async () => {
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
      callSingle();
    }, []);


  return (
    <div class="my-polls">
        <UserSidebar />
          <div class="float-single">
          </div>
            <div class="single-content">
              <div class="singlecon-Title">
              {currentAccount ? (<h3 className="main-heading-polls">MY POLLS</h3>):(<h3 className="main-heading-polls">Connect your account to see the latest polls</h3>)}
              {mypolls.length ? null : (<div className="icon-polls"><br/><img src={icon} alt="No Poll Display Icon" /></div>)}
                <div>
                {mypolls.map((mypolls, i) => (
                    <PollCard key={i} {...mypolls} />
                  ))}
                  
                </div>
                
              </div>
            </div>
    </div>
          );
        };
    
    export default SinglePoll;