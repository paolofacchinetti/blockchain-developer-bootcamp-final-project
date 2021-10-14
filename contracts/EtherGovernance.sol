// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EtherGovernance {
    uint256 proposalCreationRequirement;

    struct Proposal {
        uint256 proposalId;
        address creator;
        uint256 votesFor;
        uint256 votesAgainst;
        // block # of proposal creation?
        bool isActive;
        // hash of the proposal's text
    }

    // mapping or array?
    Proposal[] public proposals;
    // mapping(uint256 => Proposal) public proposals;
    // uint256 propostalCount;

    modifier mustBeActive(uint256 proposalId) {
        // require(proposals[proposalId].isActive);
        _;
    }

    modifier onlyCreator(uint256 proposalId, address sender) {
        // require(proposals[proposalId].creator == sender)
        _;
    }

    constructor(uint256 _proposalCreationRequirement) {
        proposalCreationRequirement = _proposalCreationRequirement;
    }

    function lockEther() public payable returns (uint256) {
        // user locks Ether and gets voting power
    }

    function redeemEther(uint256 amount) public {
        // user redeems all or some of the Ether he previously locked, granted that it's available and not used in ongoing proposals
    }

    function createProposal() public returns (uint256) {
        // check if user has enough voting power to create a proposal
        // create the proposal
        // return proposal ID
    }

    function voteProposal(
        uint256 proposalId,
        uint256 votes,
        bool voteForAgainst
    ) public returns (uint256) {
        // check if user has enough available voting power (votes <= votingPower)
        // add votes to proposal (for/against)
    }

    function closeProposal(uint256 proposalId)
        public
        onlyCreator(proposalId, msg.sender)
    {
        // close the proposal
    }
}
