// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./Ownable.sol";

/// @title On-chain governance based on Ether
/// @author paolofacchinetti
/// @notice You can use this library as per MIT license
/// @dev 
contract EtherGovernance is Ownable {
    struct Proposal {
        address creator;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address => uint256) votes;
        bool isActive;
        string textHash;
    }

    /* state */
    uint256 public proposalCreationRequirement;
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    mapping(address => uint256) public votingPower;

    /* modifiers */
    modifier mustBeActive(uint256 _proposalId) {
        require(proposals[_proposalId].isActive, "Proposal is closed");
        _;
    }

    modifier onlyCreator(uint256 _proposalId, address _sender) {
        require(
            proposals[_proposalId].creator == _sender,
            "Only proposal creator can access this function"
        );
        _;
    }

    modifier hasVotingPower(address _sender) {
        require(
            votingPower[_sender] >= proposalCreationRequirement,
            "User does not have enough voting power to create proposal"
        );
        _;
    }

    /* events */
    event Deposit(address indexed _from, uint256 _value);

    event Withdraw(address indexed _to, uint256 _value);

    event CreateProposal(
        address indexed _creator,
        string _textHash,
        uint256 indexed _proposalId
    );

    event Vote(
        address indexed _voter,
        uint256 indexed _proposalId,
        uint256 _value,
        bool _forAgainst
    );

    event Unvote(
        address indexed _voter,
        uint256 indexed _proposalId,
        uint256 _votes
    );

    event CloseProposal(address indexed _closer, uint256 indexed _proposalId);

    /* functions */

    /**
     * @dev Initializes the contract setting an initial proposalCreationRequirement and setting the deployer as the initial owner
     */
    constructor(uint256 _proposalCreationRequirement) {
        proposalCreationRequirement = _proposalCreationRequirement;
        proposalCount = 0;
    }

    receive() external payable {
        votingPower[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    /**
     * @dev user redeems all or some of the Ether he previously locked, granted that it's available and not used in ongoing proposals
     */
    function redeemEther(uint256 _amount) external {
        require(
            votingPower[msg.sender] >= _amount,
            "Trying to withdraw more ether than the user owns"
        );

        votingPower[msg.sender] -= _amount;

        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Transfer failed.");

        emit Withdraw(msg.sender, _amount);
    }

    /**
     * @dev user creates a proposal
     */
    function createProposal(string memory _textHash)
        external
        hasVotingPower(msg.sender)
        returns (uint256)
    {
        Proposal storage newProp = proposals[proposalCount];
        newProp.creator = msg.sender;
        newProp.isActive = true;
        newProp.votesAgainst = 0;
        newProp.votesFor = 0;
        newProp.textHash = _textHash;

        emit CreateProposal(msg.sender, _textHash, proposalCount); 

        proposalCount++;
        return (proposalCount - 1);
    }

    /**
     * @dev user votes on a proposal by allocating some of his voting power
     */
    function voteProposal(
        uint256 _proposalId,
        uint256 _votes,
        bool _voteForAgainst
    ) external mustBeActive(_proposalId) {
        require(
            votingPower[msg.sender] >= _votes,
            "User does not have enough voting power"
        );
        if (_voteForAgainst) {
            proposals[_proposalId].votesFor += _votes;
        } else {
            proposals[_proposalId].votesAgainst += _votes;
        }
        votingPower[msg.sender] -= _votes;
        proposals[_proposalId].votes[msg.sender] += _votes;

        emit Vote(msg.sender, _proposalId, _votes, _voteForAgainst);
    }

    /**
     * @dev user unvotes from a proposal, redeeming the voting power he previously committed to the proposal.
     * Can be done on both an open and an already closed proposal
     */
    function unvoteFromProposal(uint256 _proposalId) external {
        require(
            proposals[_proposalId].votes[msg.sender] > 0,
            "User has not voted for this proposal"
        );

        votingPower[msg.sender] += proposals[_proposalId].votes[msg.sender];

        emit Unvote(
            msg.sender,
            _proposalId,
            proposals[_proposalId].votes[msg.sender]
        );

        if (proposals[_proposalId].isActive) {
            proposals[_proposalId].votes[msg.sender] = 0;
        }
    }

    /**
     * @dev the proposal creator closes the proposal, preventing new votes
     */
    function closeProposal(uint256 _proposalId)
        external
        mustBeActive(_proposalId)
        onlyCreator(_proposalId, msg.sender)
    {
        proposals[_proposalId].isActive = false;
        emit CloseProposal(msg.sender, _proposalId);
    }

    /**
     * @dev contract's owner updates the proposalCreationRequirement value, which is the minimum amount of voting power
     * required to open a new proposal
     */
    function updateProposalCreationRequirement(uint _proposalCreationRequirement) onlyOwner() external {
        proposalCreationRequirement = _proposalCreationRequirement;
    }

    /* view functions */

    function getVotingPower() public view returns (uint256) {
        return votingPower[msg.sender];
    }

    function getVotingPower(address _addr) public view returns (uint256) {
        return votingPower[_addr];
    }

    function getProposalVotes(uint256 _proposalId)
        public
        view
        returns (uint256, uint256)
    {
        return (
            proposals[_proposalId].votesFor,
            proposals[_proposalId].votesAgainst
        );
    }

    function isProposalActive(uint256 _proposalId) public view returns (bool) {
        return proposals[_proposalId].isActive;
    }
}
