# Lido Matic

- [Source code](https://github.com/Shard-Labs/PoLido/blob/main/contracts/LidoMatic.sol)
- [Deployed contract](https://etherscan.io/address/0xae7ab96520de3a18e5e111b5eaab095312d7fe84)

Lido Matic is the core contract which acts as a liquid staking pool. The contract is responsible for deposits, withdrawals, minting and burning liquid tokens, delegating funds to node operators, applying fees and distributing rewards.

Lido Matic contract also defines stMATIC, an ERC20 token that represents the account's share of the total supply of MATIC tokens inside PoLido system. It is a non-rebasable token, which means that the amount of tokens in the user's wallet is not going to change. During time, the value of this token is changing, since the amount of MATIC tokens inside the protocol is not constant.

stMATIC will be integrated in variety of DeFi applications across Ethereum and Polygon.



## View Methods

### name()

Returns the name of the token

```solidity
function name() returns (string)
```

### symbol()

Returns the symbol of the token, usually a shorter version of the name

```solidity
function symbol() returns (string)
```

### decimals()

Returns the number of decimals for getting user representation of a token amount.

```solidity
function decimals() returns (uint8)
```

### totalSupply()

Returns the amount of tokens in existence.

```solidity
function totalSupply() returns (uint256)
```
---
### balanceOf()

Returns the amount of tokens owned by the `_account`

```solidity
function balanceOf(address _account) returns (uint256)
```
---

### getTotalStake()
Returns the total amount of stake the StMatic contract has in a validator
```solidity
function getTotalStake(IValidatorShare _validatorShare) returns (uint256, uint256)
```
#### Parameters:

| Name         | Type      | Description                  |
| ------------ | --------- | ---------------------------- |
| `_validatorShare` | `ValidatorShare` | An instance of the validator share contract  |
---

### getLiquidRewards()
Returns the liquid reward the StMatic contract has in a validator
```solidity
function getLiquidRewards(IValidatorShare _validatorShare) returns (uint256)
```
#### Parameters:

| Name         | Type      | Description                  |
| ------------ | --------- | ---------------------------- |
| `_validatorShare` | `ValidatorShare` | An instance of the validator share contract  |
---

### getTotalStakeAcrossAllValidators()
Returns the total staked across all validators 
```solidity
function getTotalStakeAcrossAllValidators() returns (uint256)
```
---

### getTotalPooledMatic()
Returns total pooled matic
```solidity
function getTotalPooledMatic() returns (uint256)
```
---

### convertStMaticToMatic
Returns the MATIC value of any StMatic amount passed to the function
```solidity
function convertStMaticToMatic(uint256 _balance) returns (uint256, uint256, uint256)
```
#### Parameters:

| Name         | Type      | Description                  |
| ------------ | --------- | ---------------------------- |
| `_balance` | `uint256` | Amount of StMatic to be convert to MATIC  |
---

### convertMaticToStMatic
Returns the StMatic value of any MATIC amount passed to the function
```solidity
function convertMaticToStMatic(uint256 _balance) returns (uint256, uint256, uint256)
```
#### Parameters:

| Name         | Type      | Description                  |
| ------------ | --------- | ---------------------------- |
| `_balance` | `uint256` | Amount of MATIC to be convert to StMatic |
---

### getMinValidatorBalance()
Returns the minimum balance allowed by a validator
```solidity
function getMinValidatorBalance() returns returns (uint256)
```
---

### getMaticFromTokenId()
Returns the amount of MATIC that will be claimed from an NFT token
```solidity
function getMaticFromTokenId(uint256 _tokenId) returns (uint256)
```
#### Parameters:

| Name         | Type      | Description                  |
| ------------ | --------- | ---------------------------- |
| `_tokenId` | `uint256` | NFT token ID |
---

## Methods

### transfer()

Moves `_amount` tokens from the caller's account to the `_recipient` account.

```sol
function transfer(address _recipient, uint256 _amount) returns (bool)
```

:::note
Requirements:

- `_recipient` cannot be the zero address.
- the caller must have a balance of at least `_amount`.
- the contract must not be paused.

:::

#### Parameters:

| Name         | Type      | Description                  |
| ------------ | --------- | ---------------------------- |
| `_recipient` | `address` | Address of tokens recipient  |
| `_amount`    | `uint256` | Amount of tokens to transfer |

#### Returns:

A boolean value indicating whether the operation succeeded.

### allowance()

Returns the remaining number of tokens that `_spender` is allowed to spend
on behalf of `_owner` through `transferFrom`. This is zero by default.

```sol
function allowance(address _owner, address _spender) returns (uint256)
```

:::note
This value changes when `approve` or `transferFrom` is called.
:::

#### Parameters:

| Name       | Type      | Description        |
| ---------- | --------- | ------------------ |
| `_owner`   | `address` | Address of owner   |
| `_spender` | `address` | Address of spender |

### approve()

Sets `_amount` as the allowance of `_spender` over the caller's tokens

```sol
function approve(address _spender, uint256 _amount) returns (bool)
```

:::note
Requirements:

- `_spender` cannot be the zero address.
- the contract must not be paused.

:::

#### Parameters:

| Name       | Type      | Description        |
| ---------- | --------- | ------------------ |
| `_spender` | `address` | Address of spender |
| `_amount`  | `uint256` | Amount of tokens   |

#### Returns:

A boolean value indicating whether the operation succeeded

### transferFrom()

Moves `_amount` tokens from `_sender` to `_recipient` using the
allowance mechanism. `_amount` is then deducted from the caller's
allowance.

```sol
function transferFrom(
  address _sender,
  address _recipient,
  uint256 _amount
) returns (bool)
```

:::note

Requirements:

- `_sender` and `_recipient` cannot be the zero addresses.
- `_sender` must have a balance of at least `_amount`.
- the caller must have allowance for `_sender`'s tokens of at least `_amount`.
- the contract must not be paused.

:::

#### Parameters:

| Name         | Type      | Description          |
| ------------ | --------- | -------------------- |
| `_sender`    | `address` | Address of spender   |
| `_recipient` | `address` | Address of recipient |
| `_amount`    | `uint256` | Amount of tokens     |

#### Returns:

A boolean value indicating whether the operation succeeded

### increaseAllowance()

Atomically increases the allowance granted to `_spender` by the caller by `_addedValue`

This is an alternative to `approve` that can be used as a mitigation for problems described [here](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol#L42)

```sol
function increaseAllowance(address _spender, uint256 _addedValue) returns (bool)
```

:::note

Requirements:

- `_spender` cannot be the the zero address.
- the contract must not be paused.

:::

#### Parameters:

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `_sender`     | `address` | Address of spender                     |
| `_addedValue` | `uint256` | Amount of tokens to increase allowance |

#### Returns:

Returns a boolean value indicating whether the operation succeeded

### decreaseAllowance()

Atomically decreases the allowance granted to `_spender` by the caller by `_subtractedValue`

This is an alternative to `approve` that can be used as a mitigation for
problems described [here](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol#L42)

```sol
function decreaseAllowance(address _spender, uint256 _subtractedValue) returns (bool)
```

:::note
Requirements:

- `_spender` cannot be the zero address.
- `_spender` must have allowance for the caller of at least `_subtractedValue`.
- the contract must not be paused.

:::

#### Parameters:

| Name               | Type      | Description                            |
| ------------------ | --------- | -------------------------------------- |
| `_sender`          | `address` | Address of spender                     |
| `_subtractedValue` | `uint256` | Amount of tokens to decrease allowance |

#### Returns:
Returns a boolean value indicating whether the operation succeeded

---

### submit()
Send MATIC to the StMATIC contract and mints `stMATIC` to msg.sender

```solidity
function submit(uint256 _amount) returns (uint256)
```

#### Parameters:

| Name        | Type      | Description               |
| ----------- | --------- | ------------------------- |
| `_amount` | `uint256` | Amount to submit |

#### Returns:
Amount of stMatic minted

---

### requestWithdraw()
Allows withdrawal requests to be made from validators or the StMatic contract
```solidity
 function requestWithdraw(uint256 _amount)
```
#### Parameters

| Name              | Type     | Description                                                    |
| ----------------- | -------- | -------------------------------------------------------------- |
| `_amount` | `uint256` | Amount to withdraw. |

---

### delegate()
Delegates the MATIC deposited into the StMatic contract equally to the validators 
```solidity
function delegate() 
```

---

### claimTokens()
Allows users claim their tokens from the validators. This requires that the user has a pending withdrawal request
```solidity
function claimTokens(uint256 _tokenId)
```
#### Parameters

| Name              | Type     | Description                                                    |
| ----------------- | -------- | -------------------------------------------------------------- |
| `_tokenId` | `uint256` | Token ID of a pending withdrawal request. |
---

### distributeRewards()
Distributes rewards claimed from validators to their operators
```solidity
function distributeRewards()
```
---

### withdrawTotalDelegated()
Allows a node operator withdraw the amount staked to a validator
```solidity
function withdrawTotalDelegated(address _validatorShare)
```
#### Parameters

| Name              | Type     | Description                                                    |
| ----------------- | -------- | -------------------------------------------------------------- |
| `_validatorShare` | `address` | Address of the validator proxy. |
---

### claimTokens2StMatic()
Claims tokens frm the validator and sends them to the StMatic contract
```solidity
function claimTokens2StMatic(uint256 _tokenId)
```
#### Parameters

| Name              | Type     | Description                                                    |
| ----------------- | -------- | -------------------------------------------------------------- |
| `_tokenId` | `uint256` | Token ID of the claim request. |
---

---
### setFees()

Set the DAO, operator, and insurance fee.

```solidity
function setFees(
  uint8 _daoFee,
  uint8 _operatorsFee,
  uint8 _insuranceFee
)
```

#### Parameters

| Name              | Type     | Description                                                    |
| ----------------- | -------- | -------------------------------------------------------------- |
| `_daoFee` | `uint8` | DAO fee in %. |
| `_operatorsFee` | `uint8` | Operator fees in %. |
| `_insuranceFee` | `uint8` | Insurance fee in %. |
