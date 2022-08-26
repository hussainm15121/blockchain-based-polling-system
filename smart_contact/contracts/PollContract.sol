// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract PollContract {
    uint256 pollCount;
    uint256 voteCount;
    uint256 pollId;

    event Create(address from, uint256 pollId, string title, string category, string description, string[] options, uint8[4] votes, uint256 timestamp, bool start, bool end, uint256 endDate);
    event CreateVote(address from, uint256 VpollId, string Vvote, uint256 Vtimestamp, bool VhasVoted);
  
    struct PollStruct {
        address sender;
        uint256 pollId;
        string title;
        string category;
        string description;
        string[] options;
        uint8[4] votes;
        uint256 timestamp;
        bool start;
        bool end;
        uint256 endDate;
    }

    struct VoteStruct {
        address voter;
        uint256 VpollId;
        string Vvote;
        uint256 Vtimestamp;
        bool VhasVoted;
    }

    PollStruct[] polls;
    VoteStruct[] votes;
    VoteStruct[] votedPoll;
    PollStruct[] thePoll;
    PollStruct thePolls;
    string[] _options;
    mapping (uint256 => VoteStruct[]) public PollVotes;
    mapping (address => PollStruct[]) public CreatorPoll;
    
    
    function addToBlockchain(string memory title, string memory category, string memory description, string memory optionOne, string memory optionTwo, string memory optionThree, string memory optionFour, uint256 endDate) public {
        
        while(_options.length != 0) {
            _options.pop();
        } 

        pollCount += 1;
        pollId += 1;

        uint8[4] memory _votes = [0,0,0,0];

        _options.push(optionOne);
        _options.push(optionTwo);
        _options.push(optionThree);
        _options.push(optionFour);

        PollStruct memory newpoll = PollStruct(msg.sender, pollId, title, category, description, _options, _votes, block.timestamp, true, false, endDate);
        polls.push(newpoll);
        CreatorPoll[msg.sender].push(newpoll);
        emit Create(msg.sender, pollId, title, category, description, _options, _votes, block.timestamp, true, false, endDate);
    }

    function vote(string memory _vote, uint256 _pollId) public {
        voteCount += 1;

        for(uint i=0; i<pollCount; i++){
            if(polls[i].pollId == _pollId) {
                if(polls[i].end == false) {
                    uint j = 0;
                    while(keccak256(abi.encodePacked(polls[i].options[j])) != keccak256(abi.encodePacked(_vote))) {
                        j += 1;
                    }
                    if(keccak256(abi.encodePacked(polls[i].options[j])) == keccak256(abi.encodePacked(_vote))) {
                        polls[i].votes[j] += 1;
                    }     
                }
            }
        }
        VoteStruct memory votePpl = VoteStruct(msg.sender, _pollId, _vote, block.timestamp, true);
        votes.push(votePpl);
        PollVotes[_pollId].push(votePpl);

        emit CreateVote(msg.sender, _pollId, _vote, block.timestamp, true);
    }

    function getVotes(uint256 _pollId) public view returns(VoteStruct[] memory) {

        return PollVotes[_pollId];
    }

    function getMyPoll(address _creator) public view returns (PollStruct[] memory) {
        
        return CreatorPoll[_creator];
    }

    function endPoll(uint256 _pollId) public {
        for(uint i=0; i<pollCount; i++){
            if(polls[i].pollId == _pollId) {
                polls[i].end = true;
            }
        }
    }

    function hasVoted(address _voter, uint256 _pollId) public view returns (bool) {
        bool has;
        for(uint i=0; i<voteCount; i++){
            if((votes[i].VpollId == _pollId) && (votes[i].voter == _voter)) {
                has = true;
            }
        }
        return has;
    }

    function getAllPolls() public view returns (PollStruct[] memory) {
        return polls;
    }

    function getPollCount() public view returns (uint256) {
        return pollCount;
    }
}