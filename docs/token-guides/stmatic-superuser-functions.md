# StMatic superuser functions

<!--  -->

## Superuser privileges, accounts, and roles

StMatic token is an upgradable contract. TheLido on Polygon DAO can change the implementation with the successful DAO vote.

StMatic can be stopped by the DAO vote. No operations changing StMatic balances can be performed on the stopped contract:
1. `approve` and `transfer` calls revert;
2. No mints or burns can be performed. Note that StMatic contract can mint StMatic only in two cases: 
   user deposits (tokens are minted to the depositor's address) or 
   fee distribution (where tokens are minted in accordance to fee calculations to the addresses set in the contract — namely the DAO treasury, the insurance fund and the Node Operator's reward addresses);
3. Users can't submit their MATIC to the StMatic contract;
4. No MATIC buffered in the StMatic contract can be sent to the Stake Manager;
5. Staking withdrawals (once available) can't be performed.

StMatic contract specifies two roles: **DEFAULT_ADMIN_ROLE** (address can pause the protocol by calling the `togglePause()` function) 
and the **DAO_ROLE**. The DEFAULT_ADMIN_ROLE is assigned to the multi-sig contract [https://etherscan.io/address/0xd65Fa54F8DF43064dfd8dDF223A446fc638800A9](https://etherscan.io/address/0xd65Fa54F8DF43064dfd8dDF223A446fc638800A9). 
And the DAO_ROLE is set when the contract is initially being deployed, and can be changed only by the DAO after deployment
by calling the `setDaoAddress()` function.


## Superuser privileges decentralization

The superuser privileges are managed by the Lido DAO's governance system. To enact any change the DAO has to have a successful vote.
Here are the list of functions that can be called only by the DAO role:
- setFees: Set the fees for the dao, operator, and insurance
- setDaoAddress: Set a new dao address
- setInsuranceAddress: Set a new insurance address
- setNodeOperatorRegistryAddress: Set a new node operator address
- setDelegationLowerBound: Set a new lower bound for delegation
- setRewardDistributionLowerBound: Set a new lower bound for rewards distribution
- setPoLidoNFT: Set the poLidoNFT address
- setFxStateRootTunnel: Set the fxStateRootTunnel address
- setSubmitThreshold: Set the submitThreshold
- flipSubmitHandler: Set submitHandler value to true or false

## Superuser actions thresholds

The "superuser actions" with the StMatic token are performed via DAO votes. The votes are managed by the Aragon voting. 
Voting power is proportional to the addresses' LDO token balance ([https://etherscan.io/token/0x5a98fcbea516cf06857215779fd812ca3bef1b32](https://etherscan.io/token/0x5a98fcbea516cf06857215779fd812ca3bef1b32)). 
For the voting to pass successfully, it should: 1) get at least 5% of the total LDOs to be cast "for" the vote; 2) get at least 50% of votes cast "for" the vote. 
The voting duration is 24 hours.


## Superuser keys management

Token management roles belong to smart contracts, and any changes in roles must pass through the successful DAO vote.

## Superuser keys generation procedure

There was no special keygen ceremony, as the permissions are managed by smart contracts. The votes can be cast by the EOAs and smart contracts with the voting power proportional to the addresses' LDO balance.
