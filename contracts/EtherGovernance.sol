// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EtherGovernance {

    /* state */ 

    uint256 private proposalCreationRequirement;

    struct Proposal {
        address creator;
        uint256 votesFor;
        uint256 votesAgainst;
        /*
        address[] votersFor;
        address[] votersAgainst;
        mapping(address => uint256) votesForPerAddress;
        mapping(address => uint256) votesAgainstPerAddress;
        */
        bool isActive;
        // todo way of giving voting power back
        // hash of the proposal's text
    }

    mapping(uint256 => Proposal) private proposals;
    uint256 private propostalCount;

    mapping(address => uint256) private votingPower;


    /* modifiers */

    modifier mustBeActive(uint256 proposalId) {
        require(proposals[proposalId].isActive, "Proposal must be active to vote");
        _;
    }

    modifier onlyCreator(uint256 proposalId, address sender) {
        require(proposals[proposalId].creator == sender, "Only proposal creator can access this function");
        _;
    }

    modifier hasVotingPower(address sender) {
        require(votingPower[sender] >= proposalCreationRequirement);
        _;
    }

    /* events */

    //TODO events

    constructor(uint256 _proposalCreationRequirement) {
        proposalCreationRequirement = _proposalCreationRequirement;
        proposalCount = 0;
    }

    // ?? receive() { -> lockEther? } 
    // ?? fallback() ?

    // user locks eth and gets voting power
    function lockEther() external payable returns (uint256) {
        votingPower[msg.sender] += msg.value;
        // emit event
        return votingPower[msg.sender];
    }

    // user redeems all or some of the Ether he previously locked, granted that it's available and not used in ongoing proposals
    function redeemEther(uint256 amount) external {
        require(votingPower[msg.sender] >= amount, "Trying to withdraw more ether than the user owns");
        votingPower[msg.sender] -= amount;
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
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

    function voteProposal(
        uint256 proposalId,
        uint256 votes,
        bool voteForAgainst
    ) mustBeActive(proposalId) external {
        require(votingPower[msg.sender] >= votes, "User does not have enough voting power");
        if (voteForAgainst){
            proposals[proposalId].votesFor += votes;
        } else {
            proposals[proposalId].votesAgainst += votes;
        }
        votingPower[msg.sender] -= votes;
    }

    function closeProposal(uint256 proposalId)
    mustBeActive(proposalId) onlyCreator(proposalId, msg.sender) external
    {
        proposals[proposalId].isActive = false;
        // ? redeem voters 
    }
}
