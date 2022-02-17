# Lido for Polygon Architecture

The Lido for Polygon architecture has 3 main parts:

- **StMatic contract**
- **PoLidoNFT contract**
- **NodeOperator contract**

  ![archi-resized](https://user-images.githubusercontent.com/17001801/154430912-49b66eea-6a77-45b7-ad80-da18ef44326e.jpeg)


### StMatic contract

The StMatic contract is an ERC20 token contract which performs the following functions:
- User interaction
- Reward Distribution
- Manage withdrawals
- Manage reward fees
- Delegate to validators
- Mint and burn NFTs

### ACL

The StMatic contract uses OpenZeppelin AccessControl to manage permissions.

### User Interaction:

A user can interact only with the lido contract to:
- Submit ERC20 MATIC
- Request Withdraw
- Claim withdraw
- call ERC20 functions

Users can submit MATIC and get stMATIC automatically by calling the submit function inside the StMatic contract and 
passing the delegated amount.

### Minting stMatic 
The total amount of stMATIC that a user will get when delegate his MATIC tokens is calculated as follows:

`sharePerUser = submittedMatics * totalShares / totalPooledMatic`

The **totalPooledMatic is the total amount of the buffered tokens (submitted by the user but not yet delegated) plus the 
total delegated.**

`totalPooledMatic = totalBufferedMatic + totalDelegatedMatics`

#### Example:

##### Case 1
Initial states

| totalShares         | 0      
| ------------ | --------- | 
| totalPooledMatic | 0 | 

User1 submit

- submit ==> 1000 Matic

- Gets ==> 1000 stMatic

Update states

| totalShares         | 1000      
| ------------ | --------- |
| totalPooledMatic | 1000 | 

Users Shares

| User         | userP = userShares / totalShares      | userMatic = userP * totalPooledMatic                 |
| ------------ | --------- | ---------------------------- |
| 1 | 1 = 1000 / 1000 | 1 * 1000 = 1000  |


##### Case 2

User2 submit

- submit ==> 500 Matic

- Gets ==> 500 * 1000 / 1000 = 500 stMatic

Update states

| totalShares         | 1500
| ------------ | --------- |
| totalPooledMatic | 1500 | 

Users Shares

| User         | userP = userShares / totalShares      | userMatic = userP * totalPooledMatic                 |
| ------------ | --------- | ---------------------------- |
| 1 | 0.66 = 1000 / 1500 | 0.66 * 1500 = 1000  |
| 2 | 0.33 = 500/ 1500 | 0.33 * 1500 = 500  |

##### Case 3
The system was slashed => -100 MATIC

Update states

| totalShares         | 1500
| ------------ | --------- |
| totalPooledMatic | 1500 - 100 = 1400 | 

Users Shares

| User         | userP = userShares / totalShares      | userMatic = userP * totalPooledMatic                 |
| ------------ | --------- | ---------------------------- |
| 1 | 0.66 = 1000 / 1500 | 0.66 * 1400 = 933.33  |
| 2 | 0.33 = 500/ 1500 | 0.33 * 1400 = 466.66  |

##### Case 4
User3 submit

- submit ==> 500 Matic

- Gets ==> 500 * 1500 / 1400 = 535.71 stMatic

Update states

| totalShares         | 2035.71
| ------------ | --------- |
| totalPooledMatic | 1900 | 

Users Shares

| User         | userP = userShares / totalShares      | userMatic = userP * totalPooledMatic                 |
| ------------ | --------- | ---------------------------- |
| 1 | 0.4912= 1000 / 2035.71 | 0.4912 * 1900 = 933.33  |
| 2 | 0.2456= 500 / 2035.71 | 0.2456 * 1900 = 466.66  |
| 3 | 0.2631= 535.71 / 2035.71 | 0.2631 * 1900 = 500  |

##### Case 4
The system accumulates reward => +200 MATIC

Update states

| totalShares         | 2035.71
| ------------ | --------- |
| totalPooledMatic | 1900 + 200 = 2100 | 

Users Shares

| User         | userP = userShares / totalShares      | userMatic = userP * totalPooledMatic                 |
| ------------ | --------- | ---------------------------- |
| 1 | 0.4912= 1000 / 2035.71 | 0.4912 * 2100=1031.52  |
| 2 | 0.2456= 500 / 2035.71 | 0.2456 * 2100= 515.76  |
| 3 | 0.2631= 535.71 / 2035.71 | 0.2631 * 2100= 552.62  |

When the system gets slashed, the total pooled MATIC decreases, and it increases when a user submits MATIC again or the 
system gets rewarded.

### Delegate to Validators
The StMatic contract is used to delegate tokens to validators.

The delegation flow is based on the actual bufferedMatic contained inside the StMatic contract, when we reach the 
minDelegationAmount, we start to delegate to all the Staked operators. Each operator has maxDelegateLimit value; this 
value is set by the DAO. For example, a trusted operator will have a large value, and a non-trusted validator will have 
a lower value. Using this maxDelegateLimit we can distribute the tokens to those operators.

### Manage Withdrawals

The withdrawal uses the new validatorShare exit API. This allows us to have a nonce that we can use to map each user 
request with this nonce. The Matic contract tracks each validatorShare nonce which will increment each time a new 
withdrawal request happens.

1. Request withdrawal:
   When a user requests to withdraw the system his MATIC tokens, a new ERC721 token is minted then mapped to this 
   request. The owner can trade this token, sell it or use it to claim his MATIC tokens.
   1. The user requests withdrawal
   2. Mint an NFT and map its id with the request.
   3. Store the request nonce of the validatorShare and validatorShare address.
   4. Call the sellVoucher_new function
2. Claim tokens:
   1. The user calls the claim token function and passes the tokenId.
   2. Check if the msg.sender is the owner of this NFT.
   3. Call the claim unstake tokens function on the validatorShare contract.
   4. Transfer tokens to the user
   5. Burn the NFT.

### Distribute Rewards
MATIC tokens are accumulated and stored inside the StMatic contract upon 2 events:
1. Each time a user requests to withdraw, the validatorShare contract transfers the rewards
2. Scheduled job (explained below)

`TOTAL_REWARDS = accumulated rewards on lido + accumulated rewards on all validators`

As we are going to allow the operator to stake a max of 10 MATIC tokens, the accumulated rewards on all validator's 
sides are ignored. We are going to use Chainlink Keeper or Gelato to distribute rewards. We regularly check if the 
amount is greater than a lower bound (a variable that can be set). If that requirement is fulfilled, StMatic calculates 
the amount that the Node Operators and the treasury get, transfers tokens to them immediately. Finally, the remaining 
MATIC tokens are added as a buffered and re-delegated which increases totalPooledMatic value. 
5% of the staking rewards go to Lido DAO treasury, and 5% goes to Node Operators, whereas 90% goes to the stMATIC value 
using re-delegation.

The operator's rewards are distributed between all the staked operators using a ratio. A validator has a ratio of 100% 
if he was not slashed during the last period. Else if the validator was slashed his ratio is 80% of his total reward 
part the remainder will be distributed to the other validators.

### withdrawTotalDelegated
When an operator was unstaked, the nodeOperator contract called withdrawTotalDelegated function which claims all the 
delegated Matics from the unstacked validator an NFT token is mint and mapped with this request later a cron job can 
call claimTokens2StMatic to withdraw the matics from the validatorShare.

### ValidatorShare Behaviour

When a user requests withdrawal, the validatorShare contract transfers the total rewards accumulated automatically. The 
same thing happens when buying new vouchers. So the idea is to consider all the tokens that are not submitted 
(not buffered) using the submit function as rewards, and they should be distributed.

### Manage reward fees:
We can manage the rewards fees using the StMatic contract.

### ValidatorShare API
The StMatic implements the validatorShare contract API
1. BuyVoucher_new: buy shares from a validator link.
2. SellVouchernew: sell an amount of shares link. Also, it has a good feature that allows us to track each sell request 
using a nonce.
3. unstakeClaimTokens_new: claim the token by a nonce link.
4. getTotalStake: get the total staked amount link.
5. getLiquidRewards: get the accumulated rewards link


### PoLidoNFT 

The PoLidoNFT contract is an ERC721 contract used by the StMatic contract to manage withdrawal requests.

Each time a user calls the requestWithdraw function inside the StMatic contract a new NFT is minted and mapped with the 
request. 

When a user owns an NFT he can:

- Claim a tokens from the withdraw request
- Trade NFT to someone else, who will then be able to claim
- Approve it to someone else who willl then also be able to claim

This ERC721 is slightly modified so it returns a list of owned tokens of an address by using the public mapping 
owner2Tokens. Same goes for retrieving the list of approved tokens by using the mapping address2Approved.

### Operator contract
- Manage operators

  The validator contract is used to stake on the polygon stake manager. Each operator gets a new validatorProxy contract 
  created each time the addOperator function is called, this validatorProxy is used as the owner of the validator on the 
  Polygon stakeManager.Thought it an operator’s owner can interact with the stakeManager API to:
  - stakeFor: stake a validator link.
  - unstake: unstake a validator link.
  - topUpForFee: topUpHeimdallFees for a validator link.
  - validatorStake: get the total staked by a validator link.
  - restake: restake amount link.
  - getValidatorContract: get validator share contract link.
  - updateSIgner: allows to update signer pubkey
  - claimFee: allows to withdraw heimdall fees
  - updateCommisionRate: allows to update commision
  - withdrawRewards: withdraw rewards link

### Manage Operators

1. Add an operator
   1. A new Operator expresses their interest to join the PoLido protocol.
   2. The DAO votes to include the new operator. After successful voting for inclusion, the Node Operator becomes active:
      1. A new validator contract is created.
      2. Set the status to NotStaked.
      3. A default max delegation value is set that means the system will delegate this amount (at max) each time the 
         delegate function is called.
         
   Each operator owner can interact with his operator using the reward address to do the following actions:
   
   - stake
   - join
   - Unstake
   - topUpHeimdallFees
   - unjail
   - restake
   - update signer pub key
   - unstake claim.
   - claim fee.

#### Stake an operator

1. The operator calls the stake function, including the amount of MATICs and heimdallFees.

2. The operator is switched to staked status and becomes ready to accept delegation.

#### Join

1. Allows already staked validators to join the PoLido protocol.

2. They have first to approve the NFT token to the specific validatorProxy contract.

3. Call this function to join the system.


#### Unstake an Operator

When an operator is ongoing to be unstaked, the NodeOperator contract calls the StMatic contract in his turn calls the 
validatorShare contract and withdraws the total delegated MATIC tokens. After the withdrawal delay the lido contract can 
claim those tokens. This last step claiming the tokens can be done using a cron job.

#### Remove an Operator

Remove an operator is the last step after it was unstaked and he claimed his staked tokens. The DAO can call this 
function to remove the operator and delete the validatorProxy contract.

#### Top Up Heimdall Fees

A validator has the possibility to topup the heimdall fees used by the heimdall and the Bor node for validating new blocks

#### Unjail

When an operator was unstaked there is a period where he can restake again, by default this feature is disabled.

#### Restake

Allows a validator to stake more Matics, by default this feature is disabled.

#### Update Signer Public Key

Allows the operator to update the Signer Public key used by the heimdall.

#### Unstake Claim

Allows the operator owner to claim his staked MATIC tokens.

#### Claim Fee

Allows the operator owner to claim his heimdall fees.

#### Update Operator Commision Rate

Update the operator's commission rate.

#### Set Stake Amount And Fees

Set the min and max amount and heimdall fees an operator can use to stake or topup heimdall fees.

### Validator Factory

The validator Factory is used to deploy new validatorProxy that is later added to an array of validators.
#### create
- permission:

  - OPERATOR

- description:

  - Creates a new ValidatorProxy and appends it to array of validators


#### remove

- permission:

  - OPERATOR

- description:

  - Removes a ValidatorProxy determined by its address from the array of validators


### Sequence Diagram of Operators Lifecycle

![squence-diagram](https://user-images.githubusercontent.com/17001801/154485063-7829e045-9e56-49be-9a7c-3fce30624387.png)