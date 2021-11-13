# Avoiding common Attacks

---

Inside of the EtherGovernance.sol contract, the following attacks were prevented:

### Re-entrancy

re-entrancy attacks are avoided in the `redeemEther` function by doing state changes (updating the user's balance) before external calls.

### Use Modifiers Only for Validation

modifiers are only used for validating if certain conditions are met before executing functions.

### Using specific Compiler Pragma

EtherGovernance requires solidity 0.7.0

### Proper use of .call and .delegateCall

EtherGovernance uses `msg.sender.call.value` in the `redeemEther` function, instead of `send` or `transfer`.
