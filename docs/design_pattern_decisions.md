# Design pattern decisions

---

Inside of the EtherGovernance.sol contract, the following design patterns were implemented:

### Inheritance and Interfaces

EtherGovernance inherits from OpenZeppelin's "Ownable" contract.

### Access Control Design Patterns

The `onlyOwner()` modifier, provided by OpenZeppelin's Ownable contract, is used to restrict access to the `updateProposalCreationRequirement` function to the contract's owner only.
