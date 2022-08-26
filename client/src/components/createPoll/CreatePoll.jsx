import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./createPoll.css";
import UserSidebar from '../UserSidebar';
import { PollingContext } from '../../context/PollingContext';
import { LoaderBlock } from "../";
import { useNotification } from '../Notifications/NotificationProvider';
import '../Notifications/Notification.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = ({ placeholder, name, type, value, handleChange }) => (
        <input className="input-cont2" 
                placeholder={placeholder}
                type={type}
                step="0.0001"
                value={value}
                onChange={(e) => handleChange(e, name)}
        />
);

const Desc = ({ placeholder, name, type, value, handleChange }) => (
        <textarea className="input-desc" 
                placeholder={placeholder}
                type={type}
                step="0.0001"
                value={value}
                onChange={(e) => handleChange(e, name)}
        />
);

const Drop = ({name, handleChange }) => (
        <select className="input-cont2" onChange={(e) => handleChange(e, name)}>
                <option value="" selected disabled hidden>Select a category</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Politics">Politics</option>
                <option value="Technology">Technology</option>
                <option value="Other">Other</option>
        </select>
);

const CreatePoll = () => {
        <ToastContainer />
        const { connectWallet, currentAccount, formData, handleChange, makePoll, isLoading } = useContext(PollingContext);
        //console.log( formData, currentAccount);
        const [showComponent, setShowComponent] = useState(false);
        const dispatch = useNotification();


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
                setInterval(() => {
                        setShowComponent(true);
                }, 6000); 
                callExp();
                }, []);

        const handleSubmit = (e) => {
                
                const { title, category, description, optionOne, optionTwo, optionThree, optionFour, endDate } = formData;
                e.preventDefault();
                if (!title || !category || !description || !optionOne || !endDate) {
                        alert("Please fill in all the fields");
                        return;
                }else{
                        {showComponent && <div>
                                {
                                    dispatch({
                                        type: "SUCCESS",
                                        message: "Processing Request"
                                        })    
                                }
                                </div>
                        }
                        makePoll(); 
                       {currentAccount && (alert("Contents being uploaded to the Blockchain (Please Accept Wallet Notification)"))};
                      
              };
        }

        let date1; 

        const [inputVal, setInputVal] = useState("");

        return (
                
        <div className="main-content">
            
        <div className="side"><UserSidebar /></div>
        <div className="container-polling">
        <div className="main">
        {isLoading
              ? <LoaderBlock />
              : ( <>
              
                <label className="title1">Create a Poll</label>
                
                <Input placeholder="Poll Title" required="true" type="text" name="title" handleChange={handleChange} />
                <div>
                        <Drop placeholder="Poll Category" required="true" type="text" name="category" handleChange={handleChange} />
                </div>

                <div className="desc">
                        <Desc placeholder="Poll Description" required="true" type="textarea" name="description" handleChange={handleChange} />
                </div>
                
                <div className="date">
                        <br/>
                        Select End Date
                        <br/>
                        <Input type="date" name="endDate" handleChange={handleChange}/>
                        
                </div>
   
                <div className="options">
                        A.<Input placeholder="Option 1" required="true" type="text" name="optionOne" handleChange={handleChange}/>
                        B.<Input placeholder="Option 2" required="true"  type="text" name="optionTwo" handleChange={handleChange}/>
                </div>
                <div className="options">
                        C.<Input placeholder="Option 3" required="true" type="text" name="optionThree" handleChange={handleChange}/>
                        D.<Input placeholder="Option 4" required="true" type="text" name="optionFour" handleChange={handleChange}/>
                </div>

                <button type="button" onClick={handleSubmit} className="submit-poll">
                  Submit
                </button>
                </>
                )}
                <div>
                {currentAccount ? <div></div>: <div className="cap"><br/><a>Connect a MetaMask Wallet to Create Polls</a></div>}
                </div>
                </div>
    
    </div>
    </div>
    );
}

export default CreatePoll;