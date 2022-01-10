# NodeOperatorsRegistry

- [Source Code](https://github.com/Shard-Labs/PoLido/blob/main/contracts/NodeOperatorRegistry.sol)
- [Deployed Contract](https://goerli.etherscan.io/address/0xb1f3f45360Cf0A30793e38C18dfefCD0d5136f9a)

Node Operators act as validators on the Goerli chain for the benefit of the protocol. The DAO selects node operators and adds their addresses to the NodeOperatorRegistry contract. Authorized operators have to generate a set of keys for the validation and provide the public key used on heimdall to the smart contract. As Matic is received from users, it is distributed between all active operators. The contract contains a list of operators, their public keys, the logic for managing their state by the DAO, and the .

## View Methods

### getNodeOperatorState()
This function returns a list of node operators that are currently in ACTIVE, UNSTAKE, STOPPED CLAIMED or WAIT state. It's primarily used by the Lido contract to calculate the total delegated amount.

```sol
function getNodeOperatorState()
        external
        view
        override
        returns (address[] memory)
```

### getNodeOperator()

Returns the node operator based on the owners address.

```sol
function getNodeOperator(address _owner)
        external
        view
        returns (NodeOperator memory)
```
#### Parameters:

| Name        | Type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| `_owner`    | `address` | Address of the node operator owner     |

### getNodeOperator()

Returns the node operator based on the operators id.

```sol
function getNodeOperator(uint256 _operatorId)
        external
        view
        returns (NodeOperator memory)
```
#### Parameters:

| Name         | Type      | Description                            |
| -----------  | --------- | -------------------------------------- |
| `_operatorId`| `uint256` | Id of the operator                     |


### getNodeOperatorState()

Returns the addresses of all operators that are currently in: ACTIVE, UNSTAKE, STOPPED, CLAIMED or WAIT state.

```sol
function getNodeOperatorState()
        external
        view
        override
        returns (address[] memory)
```

### getContracts()

Returns the addresses of ValidatorFactory, StakeManager, PolygonERC20 and StMATIC contracts.

```sol
function getContracts()
        external
        view
        override
        returns (
            address _validatorFactory,
            address _stakeManager,
            address _polygonERC20,
            address _stMATIC
        )
```

### getState()

Returns the global state consisting of total number of node operators and number of operators that are: inactive, active, stoppe, unstaked, claimed, waiting and exited.

```sol
function getState()
        external
        view
        override
        returns (
            uint256 _totalNodeOperator,
            uint256 _totalInactiveNodeOperator,
            uint256 _totalActiveNodeOperator,
            uint256 _totalStoppedNodeOperator,
            uint256 _totalUnstakedNodeOperator,
            uint256 _totalClaimedNodeOperator,
            uint256 _totalWaitNodeOperator,
            uint256 _totalExitNodeOperator
        )
```

### getOperatorIds()

Returns an array consisting of the operator ids.

```sol
function getOperatorIds()
        external
        view
        override
        returns (uint256[] memory)
    {
        return operatorIds;
    }
```

### getValidatorStake()

Returns the total stake of the validator that corresponds to the given reward address. 

```sol
function getValidatorStake(address _rewardAddress)
        external
        view
        override
        returns (uint256)
```

#### Parameters:

| Name            | Type      | Description                           |
| --------------  | --------- | ----------------------------------    |
| `_rewardAddress`| `address` | Reward address for a certain operator |


### getIfOperatorsWereSlashed()

Returns the array of ids of all the operators that were slashed.

```sol
function getIfOperatorsWereSlashed()
        external
        view
        override
        returns (bool[] memory)
```

### getOperatorInfos()
Returns an OperatorInfo array of all the operators that are active

```sol
function getOperatorInfos(bool _rewardData)
        external
        view
        override
        returns (Operator.OperatorInfo[] memory)
```
#### Parameters:

| Name            | Type      | Description                                                         |
| --------------  | --------- | ----------------------------------                                  |
| `_rewardData`   | `bool`    | If true, function will also calculate the rewards for each operator |

### getOperator()
Returns the operator id and the NodeOperator struct based on the given operator id.

```sol
 function getOperator(uint256 _operatorId)
        private
        view
        returns (uint256, NodeOperator storage)
```

#### Parameters:

| Name            | Type      | Description                                                         |
| --------------  | --------- | ----------------------------------                                  |
| `_operatorId`   | `uint256` | Id of the operator |

### getOperatorId()
Returns the operator struct based on the operator owner address

```sol
 function getOperatorId(address _user) 
        private 
        view 
        returns (uint256)
```

#### Parameters:

| Name            | Type      | Description                                                         |
| --------------  | --------- | ----------------------------------                                  |
| `_user`   | `address` | Address of the operator owner|

## Methods

### addOperator()

Add node operator named `_name` with reward address `_rewardAddress` and signer (heimdall) public key `_signerPubkey`

```sol
function addOperator(
        string memory _name,
        address _rewardAddress,
        bytes memory _signerPubkey
    )
        external
        override
```

#### Parameters:

| Name             | Type      | Description                                                       |
| ---------------- | --------- | ----------------------------------------------------------------- |
| `_name`          | `string`  | Human-readable name                                               |
| `_rewardAddress` | `address` | Goerli address which receives stMATIC rewards for this operator   |
| `_signerPubKey`  | `bytes`   | Public key used on heimdall that is 64 bytes long.                |

### stopOperator()

Disable the node operator with given id

```sol
function stopOperator(uint256 _operatorId)
        external
        override
```

#### Parameters:

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `_id`     | `uint256` | Node Operator id                  |

### exitOperator()

Changes the state from WAIT to EXIT for the operator based on the given validator share address

```sol
function exitOperator(address _validatorShare) external override
```

#### Parameters:

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `_validatorShare`     | `address` | Address of the validator share             |

### removeOperator()

Removes the node operator with given id

```sol
function removeOperator(uint256 _operatorId)
        external
        override
```

#### Parameters:

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `_id`     | `uint256` | Node Operator id                  |

### joinOperator()

Adds a validator that was already staked on the polygon stake manager to the PoLido protocol.

```sol
function joinOperator() external override
```

### stake()

Stakes a validator on the Polygon stakeManager contract.

```sol
function stake(uint256 _amount, uint256 _heimdallFee)
```

#### Parameters:

| Name    | Type      | Description         |
| ------- | --------- | ------------------- |
| `_amount`   | `uint256` | Amount to stake   |
| `_heimdallFee` | `uint256`  | Heimdall fee |

### restake()

Restakes Matics to the validator of corresponding owner on the Polygon stakeManager

```sol
function restake(uint256 _amount, bool _restakeRewards)
        external
        override
```

#### Parameters:

| Name    | Type      | Description         |
| ------- | --------- | ------------------- |
| `_amount`   | `uint256` | Amount to stake   |
| `_restakeRewards` | `bool`  | If true, the rewards will also be restaked |

### unstake()

Unstakes a validator from the Polygon stakeManager contract.

```sol
function unstake() external override
```

### unjail()

Unjails the validator and turns its status from UNSTAKED to ACTIVE.

```sol
function unjail() external override
```

### topUpFee()

Tops up heimdall fees.

```sol
function topUpForFee(uint256 _heimdallFee)
        external
        override
```

#### Parameters:

| Name    | Type      | Description         |
| ------- | --------- | ------------------- |
| `_heimdallFee`   | `uint256` | Amount of Matic that will be added to the current heimdallFee provided   |

### unstakeClaim()

Begins the unstaking process of the staked tokens. Tokens will be unstaked after the withdraw delay has passed.

```sol
function unstakeClaim() external override
```

### claimFee()

Withdraws the Heimdall fees.

```sol
function claimFee(
        uint256 _accumFeeAmount,
        uint256 _index,
        bytes memory _proof
    ) external override
```
#### Parameters:

| Name    | Type      | Description         |
| ------- | --------- | ------------------- |
| `_accumFeeAmount`   | `uint256` | Amount of Heimdall fees in Matic that will be withdrawn   |
| `_index`   | `uint256` | Index of the Validator   |
| `_proof`   | `bytes` | Proof for the Stake manager  |

### withdrawRewards()

Withdraws rewards to the operator owner.

```sol
function withdrawRewards() external override
```

### updateSigner()

Updates the operators public key. Callable only by the owner.

```sol
function updateSigner(bytes memory _signerPubkey)
        external
        override
```
#### Parameters:

| Name    | Type      | Description         |
| ------- | --------- | ------------------- |
| `_signerPubKey`   | `bytes` | New public key used for signing on Heimdall  |

### setNodeOperatorRewardAddress()

Change reward address of the node operator `_id` to `_rewardAddress`

```sol
function setNodeOperatorRewardAddress(uint256 _id, address _rewardAddress)
```

#### Parameters:

| Name             | Type      | Description        |
| ---------------- | --------- | ------------------ |
| `_id`            | `uint256` | Node Operator id   |
| `_rewardAddress` | `address` | New reward address |

### setNodeOperatorStakingLimit()

Set the maximum number of validators to stake for the node operator `_id` to `_stakingLimit`

```sol
function setNodeOperatorStakingLimit(uint256 _id, uint64 _stakingLimit)
```

:::note
Increases the keysOpIndex
:::

#### Parameters:

| Name            | Type      | Description                       |
| --------------- | --------- | --------------------------------- |
| `_id`           | `uint256` | Node Operator id                  |
| `_stakingLimit` | `address` | Max number of validators to stake |

### reportStoppedValidators()

Report `_stoppedIncrement` more stopped validators of the node operator `_id`

```sol
function reportStoppedValidators(uint256 _id, uint64 _stoppedIncrement)
```

#### Parameters:

| Name                | Type      | Description                              |
| ------------------- | --------- | ---------------------------------------- |
| `_id`               | `uint256` | Node Operator id                         |
| `_stoppedIncrement` | `uint64`  | Count of stopped validators to increment |

### trimUnusedKeys()

Remove unused signing keys

```sol
function trimUnusedKeys()
```

:::note
Function is used by the Lido contract
:::

### addSigningKeys()

Add `_quantity` validator signing keys of operator `_id` to the set of usable keys.
Concatenated keys are: `_pubkeys`.
Can be done by the DAO in question by using the designated rewards address.

:::note
Increases the keysOpIndex
:::

```sol
function addSigningKeys(
  uint256 _operator_id,
  uint256 _quantity,
  bytes _pubkeys,
  bytes _signatures
)
```

:::note
Along with each key the DAO has to provide a signatures for the
(pubkey, withdrawal_credentials, 32000000000) message.

Given that information, the contract'll be able to call
`depositContract.deposit` on-chain.
:::

#### Parameters:

| Name           | Type      | Description                                                                                |
| -------------- | --------- | ------------------------------------------------------------------------------------------ |
| `_operator_id` | `uint256` | Node Operator id                                                                           |
| `_quantity`    | `uint64`  | Number of signing keys provided                                                            |
| `_pubkeys`     | `bytes`   | Several concatenated validator signing keys                                                |
| `_signatures`  | `bytes`   | Several concatenated signatures for (pubkey, withdrawal_credentials, 32000000000) messages |

### addSigningKeysOperatorBH()

Add `_quantity` validator signing keys of operator `_id` to the set of usable keys.
Concatenated keys are: `_pubkeys`.
Can be done by node operator in question by using the designated rewards address.

```sol
function addSigningKeysOperatorBH(
  uint256 _operator_id,
  uint256 _quantity,
  bytes _pubkeys,
  bytes _signatures
)
```

:::note
Along with each key the DAO has to provide a signatures for the
(pubkey, withdrawal_credentials, 32000000000) message.

Given that information, the contract'll be able to call
`depositContract.deposit` on-chain.
:::

#### Parameters:

| Name           | Type      | Description                                                                                |
| -------------- | --------- | ------------------------------------------------------------------------------------------ |
| `_operator_id` | `uint256` | Node Operator id                                                                           |
| `_quantity`    | `uint64`  | Number of signing keys provided                                                            |
| `_pubkeys`     | `bytes`   | Several concatenated validator signing keys                                                |
| `_signatures`  | `bytes`   | Several concatenated signatures for (pubkey, withdrawal_credentials, 32000000000) messages |

### removeSigningKey()

Removes a validator signing key #`_index` of operator #`_id` from the set of usable keys. Executed on behalf of DAO.

:::note
Increases the keysOpIndex
:::

```sol
function removeSigningKey(uint256 _operator_id, uint256 _index)
```

#### Parameters:

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `_operator_id` | `uint256` | Node Operator id                  |
| `_index`       | `uint256` | Index of the key, starting with 0 |

### removeSigningKeys()
Removes an #`_amount` of validator signing keys starting from #`_index` of operator #`_id` usable keys. Executed on behalf of DAO.

Keys removing from the last index to the highest one, so we won't get outside the array

:::note
Increases the keysOpIndex
:::

```sol 
function removeSigningKeys(uint256 _operator_id, uint256 _index, uint256 _amount)
```

#### Parameters:

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `_operator_id` | `uint256` | Node Operator id                  |
| `_index`       | `uint256` | Index of the key, starting with 0 |
| `_amount`      | `uint256` | Amount of keys                    |

### removeSigningKeyOperatorBH()

Removes a validator signing key `_index` of operator `_id` from the set of usable keys. Executed on behalf of Node Operator.

```sol
function removeSigningKeyOperatorBH(uint256 _operator_id, uint256 _index)
```

#### Parameters:

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `_operator_id` | `uint256` | Node Operator id                  |
| `_index`       | `uint256` | Index of the key, starting with 0 |

### removeSigningKeysOperatorBH()

Removes an #`_amount` of validator signing keys starting from #`_index` of operator #`_id` usable keys. Executed on behalf of Node Operator.

Keys removing from the last index to the highest one, so we won't get outside the array

```sol
function removeSigningKeysOperatorBH(uint256 _operator_id, uint256 _index, uint256 _amount)
```

#### Parameters:

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `_operator_id` | `uint256` | Node Operator id                  |
| `_index`       | `uint256` | Index of the key, starting with 0 |
| `_amount`      | `uint256` | Amount of keys                    |

### assignNextSigningKeys()

Selects and returns at most `_numKeys` signing keys (as well as the corresponding
signatures) from the set of active keys and marks the selected keys as used.
May only be called by the Lido contract.

```sol
function assignNextSigningKeys(uint256 _numKeys) returns (
  bytes memory pubkeys,
  bytes memory signatures
)
```

#### Parameters:

| Name       | Type    | Description                                                                                                  |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `_pubkeys` | `bytes` | The number of keys to select. The actual number of selected keys may be less due to the lack of active keys. |

#### Returns:

| Name          | Type    | Description                                                                                |
| ------------- | ------- | ------------------------------------------------------------------------------------------ |
| `_pubkeys`    | `bytes` | Several concatenated validator signing keys                                                |
| `_signatures` | `bytes` | Several concatenated signatures for (pubkey, withdrawal_credentials, 32000000000) messages |
