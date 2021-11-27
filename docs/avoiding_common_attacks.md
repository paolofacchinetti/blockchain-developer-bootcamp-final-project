# Avoiding common Attacks

---

Inside of the EtherGovernance.sol contract, the following attacks were prevented:

### Re-entrancy

re-entrancy attacks are avoided in the `redeemEther` function by doing state changes (updating the user's balance) before external calls.

SWC NUMBER: SWC-107

### Use Modifiers Only for Validation

modifiers are only used for validating if certain conditions are met before executing functions.

### Using specific Compiler Pragma

EtherGovernance requires solidity 0.7.0

SWC Number: SWC-103

### Proper use of .call and .delegateCall

EtherGovernance uses `msg.sender.call.value` in the `redeemEther` function, instead of `send` or `transfer`.

### Unexpected Revert DoS

Withdraws are made by each user and only for their own balance. There's no mass transactions being sent, that may cause DoS for users.

SWC Number: SWC-113