# EtherGovernance - On-chain Governance based on Ether

# Deployed version url:
https://ethergovernance.netlify.app/

# Walkthrough of this project:

https://youtu.be/UcPdqDBATbw

# Directory structure
* `client`: The frontend
    * `contracts`: the JSON output of the smart contract compilations, used by the client to extract the contract's ABI
* `contracts`: The solidity Smart Contracts that are deployed in the Rinkeby Testnet
* `migrations`: Truffle's migrations for deploying smart contracts
* `docs`: The documentation describing avoiding common attacks, design pattern decisions and a .txt file with the Rinkeby testnet address for this project.
* `test`: Tests for the smart contracts

# Public Ethereum account for NFT certification:

0xd83574a348608Db87b94969B5825fa1bc23C960D

# Local dev guide

This project uses plain html/js/css with a few libraries acquired through CDN.

### Testing
Tests should be run with Truffle. It will look for a local network on port 8545 (as shown in the `truffle-config.js` file).

The local network can be served through Truffle or with Ganache.

Using Ganache:

* In one console, launch the command `ganache-cli`
* In another console, and in the root directory of this repository, launch the command `truffle test`

Using Truffle only:

* In the root directory of this repository, launch the command `truffle develop` to open truffle's console
* Inside the same truffle console, launch the command `test`

# Project Overview

## The Problem

Protocols or DAOs that haven't issued a governance token yet (or don't want to), but want to partecipate in on-chain governance, can't.

## The Solution

Ether, the currency of the Ethereum network, has a wide distribution with millions of users. If your dApp or protocol is deployed on Ethereum, your users will certainly hold some amount of Ether.

By using on-chain, Ether-based governance, organizations can bootstrap governance in their early stages, when they still haven't released a proper governance token. If they don't intend to release a governance token, they can use EtherGovernance to democratize their governance process (which usually consists of off-chain polls and discussion, such as on Discord or proprietary forums), making them as transparent as possible.

Users will be able to create proposals and vote on them by locking Ether in the contract to receive voting power. After the proposals they've voted for are over, they will be able to withdraw their Ether.

---

## Example User Workflow

- User visits the frontend, connects MetaMask

### Getting voting power

- User picks the amount of Ether he wants to lock in the smart contract
- User calls the `lockEther()` function in the smart contract, sending the amount of Ether he wants to lock
- The smart contract keeps track of the amount of Ether he deposited, and gives the user's address the same amount of voting power

### Creating a proposal

- User inputs the proposal's content as text in the frontend
- User calls the `createProposal()` function in the smart contract, a hash of the proposal's text is passed as proof
- The smart contracts checks if the User has the minimum required amount of voting power to create a proposal (value is initialized on contract deployment and can be customized)
- The proposal is created

### Voting on a proposal

- User calls a `voteProposal()` function in the smart contract, specifying the proposal he wants to vote for, and his vote (for or against)
- The smart contract deducts voting points from the user's balance and sets the user's vote

### Closing a proposal

- The proposal's creator decides to close the proposal
- He calls the `closeProposal()` function in the smart contract
- The proposal goes into a `closed` state, and the voting power that was committed by voters of this proposal is given back to the voters.

### Redeeming Ether

- User calls a `redeemEther()` function in the smart contract, withdrawing Ether from his available amount that's stored in the contract
