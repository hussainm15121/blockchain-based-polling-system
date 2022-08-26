import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
import { Loader } from '../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const PollingContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const pollingContract = new ethers.Contract(contractAddress, contractABI, signer);

       /* 
    console.log({
        provider,
        signer,
        pollingContract
        
    });*/
    
   return pollingContract;

}

export const PollingProvider = ({ children }) => {
    <ToastContainer />
    const [currentAccount, setCurrentAccount] = useState('');
    const [userData, setUserData] = useState('');
    const [formData, setFormData] = useState({ title: "", description: "", optionOne: "", optionTwo: "", optionThree: "", optionFour: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [processing, setIsProcess] = useState(false);
    const [pollingCount, setPollingCount] = useState(localStorage.getItem('pollingCount'));
    const [polls, setPolls] = useState([]);
    const [mypolls, setmyPolls] = useState([]);
    const [pollVotes, setPollVotes] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllPolls = async() => {
        <ToastContainer />
        try {
            if(!ethereum) return toast("Please Install MetaMask");
            const pollingContract = getEthereumContract();
            const availablePolls = await pollingContract.getAllPolls();

            const structuredPolls = availablePolls.map((poll) => ({
                sender: poll.sender,
                pollId: poll.pollId,
                title: poll.title,
                category: poll.category,
                description: poll.description,
                options: poll.options,
                votes: poll.votes,
                timestamp: new Date(poll.timestamp * 1000).toLocaleString(),
                start: poll.start,
                end: poll.end,
                endDate: new Date(poll.endDate * 1000).toLocaleString()
            }))

            let curDate = new Date().toLocaleString() + "";
            let timestampinU = Math.floor(new Date(curDate).getTime() / 1000);
            let endDateinU;

            for (var i = 0; i < structuredPolls.length; i++) {
                endDateinU = Math.floor(new Date(structuredPolls[i].endDate).getTime() / 1000);
                if(structuredPolls[i].end != true)
                {
                    if((endDateinU - timestampinU) <= 0)
                    {
                        endedPoll(structuredPolls[i].pollId)
                    }
                }
            } 
            
            //console.log(structuredPolls);
            setPolls(structuredPolls);
           
        } catch (error) {
            console.log(error);
        }

    }

    const getPollVotes = async(_pollId) => {
        <ToastContainer />
        try {
            if(!ethereum) return toast("Please Install MetaMask");
            const pollingContract = getEthereumContract();
            const availableVotes = await pollingContract.getVotes(_pollId);

            const structuredVotes = availableVotes.map((votePpl) => ({
                voter: votePpl.voter,
                VpollId: votePpl.VpollId,
                Vvote: votePpl.Vvote,
                Vtimestamp: new Date(votePpl.Vtimestamp * 1000).toLocaleString(),
                VhasVoted: votePpl.VhasVoted
            }))
            
            setPollVotes(structuredVotes);
           
        } catch (error) {
            console.log(error);
        }

    }

    const getMyPoll = async(creator) => {
        <ToastContainer />
        try {
            if(!ethereum) return toast("Please Install MetaMask");
            const pollingContract = getEthereumContract();
            const myavailablePolls = await pollingContract.getMyPoll(creator);

            const myStructuredPolls = myavailablePolls.map((pollMy) => ({
                sender: pollMy.sender,
                pollId: pollMy.pollId,
                title: pollMy.title,
                category: pollMy.category,
                description: pollMy.description,
                options: pollMy.options,
                votes: pollMy.votes,
                timestamp: new Date(pollMy.timestamp * 1000).toLocaleString(),
                start: pollMy.start,
                end: pollMy.end,
                endDate: new Date(pollMy.endDate * 1000).toLocaleString()
            }))
        
            setmyPolls(myStructuredPolls);
           
        } catch (error) {
            console.log(error);
        }

    }

    const checkIfWalletIsConnected = async () => {
        <ToastContainer />
        try {
                if(!ethereum) return toast("Please Install MetaMask");
                const accounts = await ethereum.request({ method: 'eth_accounts' });
            
                if(accounts.length) {
                    setCurrentAccount(accounts[0]);
                    getAllPolls();
                } else {
                    console.log('No Accounts Found');
                }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")

        }
    }

    const checkIfPollsExist = async () => {
        try {
            const pollingContract = getEthereumContract();
            const pollingCount = await pollingContract.getPollCount();

            window.localStorage.setItem("pollingCount", pollingCount)
        } catch (error){
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    const connectWallet = async () => {
        <ToastContainer />
        try {
            if(!ethereum) return toast("Please Install MetaMask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts', });
            
            await setCurrentAccount(accounts[0]);
            walletToDatabase();
        } catch (error){
            console.log(error);
            alert("Unable to connect wallet. Contact Administrator");
            throw new Error("No ethereum object.")
        }
    }

    const makePoll = async () => {
        <ToastContainer />
        try {
            if(!ethereum) return toast("Please Install MetaMask");
            if(userData.verified) {
                let endDateinU;
                const { title, category, description, optionOne, optionTwo, optionThree, optionFour, endDate } = formData;
                //.log(endDate);
                if(!endDate) {
                    endDateinU = 0;
                    //console.log("EndDate: ", endDateinU)
                }
                else {
                    endDateinU = Math.floor(new Date(endDate).getTime() / 1000)
                    //console.log("Date in unix: ", endDateinU)
                    //console.log("Converted back: ", new Date(endDateinU * 1000).toLocaleString())
                }
                const pollingContract = getEthereumContract();
                const pollingHash = await pollingContract.addToBlockchain(title, category, description, optionOne, optionTwo, optionThree, optionFour, endDateinU);
                
                setIsLoading(true);
                toast(`Loading - ${pollingHash.hash}`);
                alert(`Loading - ${pollingHash.hash}`);
                await pollingHash.wait();
                setIsLoading(false);
                toast(`Success - ${pollingHash.hash}`);
                alert(`Success - ${pollingHash.hash}`);
                toast("Congratulations! Your poll has been created on the blockchain!");
                window.location.reload();
                const pollingCount = await pollingContract.getPollCount();
            }
            else {
                toast.warn("Unable to create poll: You are not verified!")
            }
        } catch (error){
            console.log(error);
            alert("Error Occured while sending to blockchain, Try Again");
            throw new Error("No ethereum object.");
        }
    };

    const endedPoll = async(_pollId) => {
        <ToastContainer />
        try {
            const pollingContract = getEthereumContract();
            const pollEnd = await pollingContract.endPoll(_pollId)
            toast.log(`Loading - ${pollEnd.hash}`);
            console.log(`Loading - ${pollEnd.hash}`);
            await pollEnd.wait();
            toast.log(`Success - ${pollEnd.hash}`);
            console.log(`Success - ${pollEnd.hash}`);
            window.location.reload();     
            
        } catch (error){
            toast.error("Unable to End Poll")
            console.log("Not able to end poll");
            console.log(error);
        }
    }

   const hasUserVoted = async(account, _pollId) => {
    <ToastContainer />
        try{
            const pollingContract = getEthereumContract();
            const userVoted = await pollingContract.hasVoted(account, _pollId);
            if(userVoted == true) {
                return true;
            }
            else {
                return false;
            }
        } 
        catch (error){
            console.log(error);
        }
    }

    const voteOnPoll = async(_option, _pollId, account) => {
        <ToastContainer />
        try {
            if(!ethereum) return toast("Please Install MetaMask");
            if(userData.verified) {
                const pollingContract = getEthereumContract();
                const userVoted = await pollingContract.hasVoted(account, _pollId);
                if(userVoted != true) {
                    
                    const votePoll = await pollingContract.vote(_option, _pollId);
                    setIsLoading(true);
                    setIsProcess(true);
                    toast(`Loading - ${votePoll.hash}`)
                    //alert(`Loading - ${votePoll.hash}`);
                    await votePoll.wait();
                    setIsLoading(false);
                    setIsProcess(false);
                    toast(`Success - ${votePoll.hash}`)
                    //alert(`Success - ${votePoll.hash}`);
                    window.location.reload();
                    alert("Amazing! Your vote has been casted");
                    
                }
                else {
                    setIsProcess(false);
                    toast.warn("You have already voted");
                    setIsProcess(true);
                }
            }
            else {
                toast.warn("Unable to vote: You are not verified");
            }
        } catch (error){
            toast.error("Vote not casted");
            console.log("Not able to vote");
            console.log(error);
        }
    }

    const callDash = async () => {
        <ToastContainer />
        try {
          const res = await fetch('/Dash', {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json" 
            },
            credentials: "include"
          });
  
          const data = await res.json();
          if(!res.status === 200) {
            throw new Error(res.error);
          }
          setUserData(data);
        }
        catch (err) {
          console.log(err);
        }
      }
  
      const walletToDatabase = async () => {
        <ToastContainer />
        const accounts = await ethereum.request({ method: 'eth_requestAccounts', });
        const wallet = accounts[0]
        try{
        //console.log(userData)
        //console.log(wallet)
        const res = await fetch('/walletID', {
          method: "POST",
          headers: {
            "Content-Type" :  "application/json"
          },
          body: JSON.stringify({
            userData,
            wallet
          })
        });
    
        const data = await res.json();
        if(res.status === 422 || !data) {
          toast("Wallet ID exists for other account");
        } 
        else {
          toast("Wallet Updated in database");
          }
        }
        catch (err){
          console.log(err)
        }
      }
    

    useEffect(() => {
        callDash();
        checkIfWalletIsConnected();
        checkIfPollsExist();
    }, []);


return(
        <PollingContext.Provider value={{ connectWallet, currentAccount, formData, handleChange, makePoll, polls, voteOnPoll, endedPoll, getPollVotes, mypolls, getMyPoll, pollVotes, isLoading, processing, hasUserVoted}}>
            {children}
        </PollingContext.Provider>
    );

};
