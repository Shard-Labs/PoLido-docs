# NodeOperatorsRegistry
- [Source Code](https://github.com/Shard-Labs/PoLido/blob/main/contracts/NodeOperatorRegistry.sol)

The NodeOperatorRegistry contract is the core contract that allows node operators to participate in the Lido staking
protocol. Node Operators participate on the protocol as validators and get rewarded for their work. A Node Operator gets 
added to the Registry by the DAO. Validator reward is distributed evenly amongst all active operators. 
The contract contains a list of operators, their public keys, and the logic for managing their state.

## View Methods

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

Returns the global state consisting of total number of node operators and number of operators that are: 
inactive, active, stopped, unstaked, jailed, ejected, claimed and exited.

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
            uint256 _totalExitNodeOperator,
            uint256 _totalJailedNodeOperator,
            uint256 _totalEjectedNodeOperator
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


### getOperatorInfos()
Returns an OperatorInfo array of all the operators that are active, or include jailed and ejected if _allActive is 
set to true.

```sol
function getOperatorInfos(bool _withdrawRewards, bool _delegation, bool _allActive)
        external
        view
        override
        returns (OperatorInfo[] memory)
```
#### Parameters:

| Name            | Type      | Description                                                         |
| --------------  | --------- | ----------------------------------                                  |
| `_withdrawRewards`   | `bool`    | If true, check if operator accumulated min rewards. |
| `_delegation`   | `bool`    | If true, return all operators that delegation is set to true. |
| `_allActive`   | `bool`    | If true, return all operators with ACTIVE, EJECTED, JAILED. |

### getValidatorShare()
Returns a validator share address

```sol
  function getValidatorShare(uint256 _operatorId)
        external
        view
        returns (address)
```

#### Parameters:

| Name            | Type      | Description                                                         |
| --------------  | --------- | ----------------------------------                                  |
| `_operatorId`   | `uint256` | Id of the node operator |

### getValidator()
Returns an instance of the validator from the stake manager

```sol
  function getValidator(uint256 _operatorId)
        external
        view
        returns (Validator memory va)
```

#### Parameters:

| Name            | Type      | Description                                                         |
| --------------  | --------- | ----------------------------------                                  |
| `_operatorId`   | `uint256` | Id of the node operator |

## Methods

### removeOperator()

Removes the node operator with given id. It requires operator status equal to be EXIT.

:::note
This method can be called by REMOVE_OPERATOR_ROLE-only role.
:::

```sol
function removeOperator(uint256 _operatorId)
        external
        override
        userHasRole(REMOVE_OPERATOR_ROLE)
```

#### Parameters:

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `_id`     | `uint256` | Node Operator id                  |


### unstake()

It allows the operator owner to unstake their operator from the Polygon stakeManager contract. 
It requires operator status equal to ACTIVE or EJECTED.

```sol
function unstake() external override
```

### migrate()

Migrates the validator ownership to reward address

```sol
function migrate() external override
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


### setOperatorRewardAddress()

Allows operator's owner to update reward address

```sol
function setOperatorRewardAddress(address _rewardAddress)
        external
```

#### Parameters:

| Name             | Type      | Description        |
| ---------------- | --------- | ------------------ |
| `_rewardAddress` | `address` | New reward address |

### togglePause()
:::note
This method can only be called by a pause operator role.
:::

Allows an authorized user to pause the contract. 

```solidity
function togglePause() userHasRole(PAUSE_OPERATOR_ROLE) external
```
## Operator Owner Methods
:::note
These methods can only be called by an operator owner.
:::

### joinOperator()

Adds a validator that was already staked on the polygon stake manager to the PoLido protocol.
It requires operator status equal to be ACTIVE. Callable only by the owner.

```sol
function joinOperator() external override
```

### stake()

Stakes a validator on the Polygon stakeManager contract. The user has first to approve the amount + _heimdallFee to the
validatorProxy. It requires operator status to be INACTIVE. Callable only by the owner.

```sol
function stake(uint256 _amount, uint256 _heimdallFee)
```

#### Parameters:

| Name    | Type      | Description         |
| ------- | --------- | ------------------- |
| `_amount`   | `uint256` | Amount to stake   |
| `_heimdallFee` | `uint256`  | Heimdall fee |

### restake()

Restakes Matic add/or accumulated rewards on the stake manager.
The user has first to approve the amount to the validatorProxy.
It requires operator status to be ACTIVE. Callable only by the owner.

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

### unjail()

Unjails the validator and turns its status from UNSTAKED to ACTIVE. Callable only by the owner.

```sol
function unjail() external override
```

### setOperatorName()

Updates the operator name. Callable only by the owner.

```sol
function setOperatorName(string memory _name)
        external
        override
```
#### Parameters:

| Name    | Type      | Description         |
| ------- | --------- | ------------------- |
| `_name`   | `string` | New operator name  |

### withdrawRewards()

Withdraws staking rewards accumulated by a validator and transfers the amount to the operator's owner.
Callable only by the owner.

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

### topUpFee()

Tops up heimdall fees. Callable only by the owner.

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
Callable only by the owner.

```sol
function unstakeClaim() external override
```

## DAO Methods
:::note
These methods can be called by DAO-only roles.
:::

### addOperator()

Allows the DAO to add node operator named `_name` with reward address `_rewardAddress` and signer (heimdall) 
public key `_signerPubkey`

```sol
function addOperator(
        string memory _name,
        address _rewardAddress,
        bytes memory _signerPubkey
    )
        external
        override
        userHasRole(DAO_ROLE)
```

#### Parameters:

| Name             | Type      | Description                                                       |
| ---------------- | --------- | ----------------------------------------------------------------- |
| `_name`          | `string`  | Human-readable name                                               |
| `_rewardAddress` | `address` | Goerli address which receives stMATIC rewards for this operator   |
| `_signerPubKey`  | `bytes`   | Public key used on heimdall that is 64 bytes long.                |

### stopOperator()

Allows the DAO to disable the node operator with given id. It requires operator status equal to be ACTIVE or INACTIVE

```sol
function stopOperator(uint256 _operatorId)
        external
        override
        userHasRole(DAO_ROLE)

```

#### Parameters:

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `_id`     | `uint256` | Node Operator id                  |

### setDefaultMaxDelegateLimit()

Allows the DAO to set the operator defaultMaxDelegateLimit.

```sol
function setDefaultMaxDelegateLimit(uint256 _defaultMaxDelegateLimit)
        external
        userHasRole(DAO_ROLE)
```
#### Parameters:

| Name            | Type      | Description                       |
| --------------- | --------- | --------------------------------- |
| `_defaultMaxDelegateLimit`           | `uint256` | Default Max Delegate Limit                 |


### setMaxDelegateLimit()
Allows the DAO to set the operator maxDelegateLimit.

```sol
function setMaxDelegateLimit(uint256 _operatorId, uint256 _maxDelegateLimit)
        external
        userHasRole(DAO_ROLE)
```

#### Parameters:

| Name                | Type      | Description                              |
| ------------------- | --------- | ---------------------------------------- |
| `_operatorId`               | `uint256` | Node Operator id                         |
| `_maxDelegateLimit` | `uint256`  | Maximum delegate limit |

### setCommissionRate()

Allows the DAO to set the commission rate used.

```sol
function setCommissionRate(uint256 _commissionRate)
        external
        userHasRole(DAO_ROLE)
```
#### Parameters:

| Name                | Type      | Description                              |
| ------------------- | --------- | ---------------------------------------- |
| `_commissionRate`               | `uint256` | Commission rate                         |


### updateOperatorCommissionRate()

Allows the DAO to update commission rate for an operator.

```sol
function updateOperatorCommissionRate(
        uint256 _operatorId,
        uint256 _newCommissionRate
    ) external userHasRole(DAO_ROLE)
```

#### Parameters:

| Name           | Type      | Description                                                                                |
| -------------- | --------- | ------------------------------------------------------------------------------------------ |
| `_operator_id` | `uint256` | Node Operator id                                                                           |
| `_newCommissionRate`    | `uint256`  | New commission rate                                                           |


### setStakeAmountAndFees()

Allows the DAO to update the stake amount and heimdall fees

```sol
function setStakeAmountAndFees(
        uint256 _minAmountStake,
        uint256 _minHeimdallFees
    )
        external
        userHasRole(DAO_ROLE)
```

#### Parameters:

| Name           | Type      | Description                                                                                |
| -------------- | --------- | ------------------------------------------------------------------------------------------ |
| `_minAmountStake` | `uint256` | Minimum amount stake                                                                          |
| `_minHeimdallFees`    | `uint256`  | Minimum heimdall fees                                                          |


### setRestake()
Allows the DAO to toggle restake.
```sol 
function setRestake(bool _restake) external override userHasRole(DAO_ROLE)
```

#### Parameters:

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `_restake` | `bool` | Restake toggle                |


### setStMATIC()
Allows the DAO to set the StMATIC contract address.

```sol
function setStMATIC(address _stMATIC)
        external
        userHasRole(DAO_ROLE)
```

#### Parameters:

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `_stMATIC` | `address` | New stMATIC address               |


### setValidatorFactory()
Allows the DAO to set the validator factory contract address.

```sol
function setValidatorFactory(address _validatorFactory)
        external
        userHasRole(DAO_ROLE)
```

#### Parameters:

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `_validatorFactory` | `address` | New validator factory address                |


### setStakeManager()
Allows the DAO to set the stake manager contract address.

```sol
function setStakeManager(address _stakeManager)
        external
        userHasRole(DAO_ROLE)
```

#### Parameters:

| Name       | Type    | Description                                                                                                  |
| ---------- | ------- | ------------- |
| `_stakeManager` | `address` | New stake manager address |


### setVersion()
:::note
This method can be called by DEFAULT_ADMIN_ROLE-only role.
:::

Allows the DAO to set the version of the contract address.

```sol
function setVersion(string memory _version)
        external
        userHasRole(DEFAULT_ADMIN_ROLE)
```

#### Parameters:

| Name       | Type    | Description                                                                                                  |
| ---------- | ------- | ------------- |
| `_version` | `string` | New contract version |
