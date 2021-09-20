# BagOfX - an ERC-20 to ERC-721 wrapper - Bringing non-fungibility to fungible tokens

# Problem

ERC-20 Tokens are inherently fungible. This makes it impossible to differentiate between tokens of the same type.

# Solution

BagOfX is a ERC-20 to ERC-721 (NFT) wrapper. Users will be able to create a Bag (or ERC-721) that contains a certain number of ERC-20 tokens, and specify some settings that will change the behaviour of the Bag.

The Bag's owners will be able to burn the Bag to get back the original tokens whenever they want (if the Bag's properties allow it). Until then, the Bag behaves as a tradable ERC-721 token.

One of the simplest use-cases of BagOfX is the creation of a NFT representing locked tokens. Instead of having the tokens be locked inside of a smart contract and redeemable by a whitelisted address after the lockup period ends, it will be possible to lock N tokens (i.e. a presale allocation by a single buyer) into a BagOfX, and set its properties to allow the redemption of the tokens only after a lockup period is over.
This way, the end user will be able to transfer the Bag between its wallets, or even selling it on secondary markets (presumably at a discount due to the lockup period).

# Example User Workflow

* User interacts with the BagsOfX contract, calls mintBag() function, locks a number of ERC-20 tokens and sets the properties of the Bag. A Bag ERC-721 is sent to the user
* User can then interact with the contract once again, calling a redeemBag() function. Burns the Bag ERC-721 and redeems the ERC-20 tokens associated with the Bag.
