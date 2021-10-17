// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EtherGovernance {

    /* state */ 

    uint256 private proposalCreationRequirement;

    struct Proposal {
        address creator;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address => uint256) votes;
        bool isActive;
        // hash of the proposal's text
    }

    mapping(uint256 => Proposal) private proposals;
    uint256 private proposalCount;

    mapping(address => uint256) private votingPower;


    /* modifiers */

    modifier mustBeActive(uint256 _proposalId) {
        require(proposals[_proposalId].isActive, "Proposal must be active to vote");
        _;
    }

    modifier onlyCreator(uint256 _proposalId, address _sender) {
        require(proposals[_proposalId].creator == _sender, "Only proposal creator can access this function");
        _;
    }

    modifier hasVotingPower(address _sender) {
        require(votingPower[_sender] >= proposalCreationRequirement, "User does not have enough voting power to create proposal");
        _;
    }

    /* events */

    //TODO events

    constructor(uint256 _proposalCreationRequirement) public {
        proposalCreationRequirement = _proposalCreationRequirement;
        proposalCount = 0;
    }

    /* functions */
    
    function() external payable
    {
        votingPower[msg.sender] += msg.value;
        // emit event
    }

    // user redeems all or some of the Ether he previously locked, granted that it's available and not used in ongoing proposals
    function redeemEther(uint256 _amount) external {
        require(votingPower[msg.sender] >= _amount, "Trying to withdraw more ether than the user owns");
        votingPower[msg.sender] -= _amount;
        msg.sender.transfer(_amount);
    }

    // user redeems ether from a proposal
    // can be used to "unstake" eth from a closed proposal or unvote a currently open one
    function unvoteFromProposal(uint256 _proposalId) public {
        uint256 userVotes = proposals[_proposalId].votes[msg.sender];
        require(userVotes > 0, "User has not voted for this proposal");
        
        if(proposals[_proposalId].isActive){
            proposals[_proposalId].votes[msg.sender] = 0;
        }
        
        votingPower[msg.sender] += userVotes;
    }

    function createProposal() external hasVotingPower(msg.sender) returns (uint256) {
        proposals[proposalCount] = Proposal(
            msg.sender,
            0,
            0,
            true
            // hash of text ???
        );
        proposalCount++;
        return (proposalCount - 1);
    }


    // user stakes some ether on a proposal to vote for/against it
    function voteProposal(
        uint256 _proposalId,
        uint256 _votes,
        bool _voteForAgainst
    ) mustBeActive(_proposalId) external {
        require(votingPower[msg.sender] >= _votes, "User does not have enough voting power");
        if (_voteForAgainst){
            proposals[_proposalId].votesFor += _votes;
        } else {
            proposals[_proposalId].votesAgainst += _votes;
        }
        votingPower[msg.sender] -= _votes;
        proposals[_proposalId].votes[msg.sender] += _votes;
    }

    // proposal creator closes the proposal, preventing new votes from coming in
    function closeProposal(uint256 _proposalId)
    mustBeActive(_proposalId) onlyCreator(_proposalId, msg.sender) external
    {
        proposals[_proposalId].isActive = false;
    }

    function getUserBalance() public view returns (uint256) {
        return votingPower[msg.sender];
    }

    function getUserBalance(address _addr) public view returns (uint256) {
        return votingPower[_addr];
    }
}
