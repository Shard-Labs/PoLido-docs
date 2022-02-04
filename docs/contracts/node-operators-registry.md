# NodeOperatorsRegistry

- [Source Code](https://github.com/Shard-Labs/PoLido/blob/main/contracts/NodeOperatorRegistry.sol)
- [Deployed Contract](https://goerli.etherscan.io/address/0xb1f3f45360Cf0A30793e38C18dfefCD0d5136f9a)

Node Operators act as validators on the Goerli chain for the benefit of the protocol. The DAO selects node operators and adds their addresses to the NodeOperatorRegistry contract. Authorized operators have to generate a set of keys for the validation and provide the public key used on heimdall to the smart contract. As Matic is received from users, it is distributed between all active operators. The contract contains a list of operators, their public keys, the logic for managing their state by the DAO, and the .

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
Returns an OperatorInfo array of all the operators that are active

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

### migrate()

Migrates the validator ownership to reward address

```sol
function migrate() external override
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

### setOperatorName()

Updates the operator name.

```sol
function setOperatorName(string memory _name)
        external
        override
```
#### Parameters:

| Name    | Type      | Description         |
| ------- | --------- | ------------------- |
| `_name`   | `string` | New operator name  |

### setOperatorRewardAddress()

Allows node operator to update reward address

```sol
function setOperatorRewardAddress(address _rewardAddress)
        external
```

#### Parameters:

| Name             | Type      | Description        |
| ---------------- | --------- | ------------------ |
| `_rewardAddress` | `address` | New reward address |

## DAO Methods
:::note
This methods can be called by DAO-only roles.
:::

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

#### Paramet# NodeOperatorsRegistry

- [Source Code](https://github.com/Shard-Labs/PoLido/blob/main/contracts/NodeOperatorRegistry.sol)
- [Deployed Contract](https://goerli.etherscan.io/address/0xb1f3f45360Cf0A30793e38C18dfefCD0d5136f9a)

Node Operators act as validators on the Goerli chain for the benefit of the protocol. The DAO selects node operators and adds their addresses to the NodeOperatorRegistry contract. Authorized operators have to generate a set of keys for the validation and provide the public key used on heimdall to the smart contract. As Matic is received from users, it is distributed between all active operators. The contract contains a list of operators, their public keys, the logic for managing their state by the DAO, and the .

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
Returns an OperatorInfo array of all the operators that are active

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

### migrate()

Migrates the validator ownership to reward address

```sol
function migrate() external override
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

### setOperatorName()

Updates the operator name.

```sol
function setOperatorName(string memory _name)
        external
        override
```
#### Parameters:

| Name    | Type      | Description         |
| ------- | --------- | ------------------- |
| `_name`   | `string` | New operator name  |

### setOperatorRewardAddress()

Allows node operator to update reward address

```sol
function setOperatorRewardAddress(address _rewardAddress)
        external
```

#### Parameters:

| Name             | Type      | Description        |
| ---------------- | --------- | ------------------ |
| `_rewardAddress` | `address` | New reward address |

## DAO Methods
:::note
This methods can be called by DAO-only roles.
:::

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
