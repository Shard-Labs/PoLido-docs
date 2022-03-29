# Protocol levers

The protocol provides a number of settings controllable by the DAO. Modifying each of them requires
the caller to have a specific permission. After deploying the DAO, all permissions belong to the DAO
`Voting` app, which can also manage them. This means that, initially, levers can only be changed by
the DAO voting, and other entities can be allowed to do the same only as a result of the voting.

All existing levers are listed below, grouped by the contract.

### A note on upgradeability

The following contracts are upgradeable by the DAO voting:

- [`StMatic`](/contracts/StMatic)
- [`NodeOperatorsRegistry`](/contracts/node-operators-registry)

Upgradeability is implemented by the Aragon kernel and base contracts. To upgrade an app, one needs
the `dao.APP_MANAGER_ROLE` permission provided by Aragon. All upgradeable contracts use the
[Unstructured Storage pattern] in order to provide stable storage structure across upgrades.

[unstructured storage pattern]: https://blog.openzeppelin.com/upgradeability-using-unstructured-storage

## [StMatic](/contracts/StMatic)

### Fees

The entity fee for `_daoFee`, `_operatorsFee`, `_insuranceFee`, all expressed in % that sum up to `100%`.

- Mutator: `setFees(uint8 _daoFee, uint8 _operatorsFee, uint8 _insuranceFee)`
  - Permission required: `DAO`
- Accessor: `entityFees() returns (
  {
     uint8 dao;
     uint8 operators;
     uint8 insurance;
  }
)`

The fee is taken on staking rewards and distributed between the treasury, the insurance fund, and
node operators.

### DAO Address

The DAO address for the StMatic contract.

- Mutator: `setDaoAddress(address _address)`
  - Permission required: `DAO`
- Accessor: `dao() returns(address)`


### Insurance Address

The insurance address for the StMatic contract.

- Mutator: `setInsuranceAddress(address _address)`
  - Permission required: `DAO`
- Accessor: `insurance() returns(address)`

### NodeOperatorRegistry Address

The Node Operator Registry contract address for the StMatic contract.

- Mutator: `setNodeOperatorRegistryAddress(address _address)`
  - Permission required: `DAO`
- Accessor: `nodeOperatorRegistry() returns(INodeOperatorRegistry)`

### DelegationLowerBound Address

The new lower bound for delegation for the StMatic contract.

- Mutator: `setDelegationLowerBound(uint256 _delegationLowerBound)`
  - Permission required: `DAO`
- Accessor: `delegationLowerBound() returns(uint256)`

### DistributionLowerBound Address

The new lower bound for rewards distribution for the StMatic contract.

- Mutator: `setRewardDistributionLowerBound(uint256 _rewardDistributionLowerBound)`
  - Permission required: `DAO`
- Accessor: `rewardDistributionLowerBound() returns(uint256)`

### PoLidoNFT Address

The new poLidoNFT address for the StMatic contract.

- Mutator: `setPoLidoNFT(address _poLidoNFT)`
  - Permission required: `DAO`
- Accessor: `poLidoNFT() returns(IPoLidoNFT)`

### FxStateRootTunnel Address

The new fxStateRootTunnel address for the StMatic contract.

- Mutator: `setFxStateRootTunnel(address _fxStateRootTunnel)`
  - Permission required: `DAO`
- Accessor: `fxStateRootTunnel() returns(IFxStateRootTunnel)`

### SubmitThreshold Address

The new SubmitThreshold address for the StMatic contract.

- Mutator: `setSubmitThreshold(uint256 _submitThreshold)`
  - Permission required: `DAO`
- Accessor: `submitThreshold() returns(uint256)`


### SubmitHandler Address

The submit handler  enables or disables the `submit` function.

- Mutator: `flipSubmitHandler()`
  - Permission required: `DAO`
- Accessor: `submitHandler() returns(bool)`


### Pausing

- Mutators: `togglePause()`
  - Permission required: `DEFAULT_ADMIN_ROLE`
- Accessor: `paused() returns (bool)`

When paused, `StMatic` doesn't accept user submissions, doesn't allow user withdrawals and reward distribution.
No token actions (burning, transferring, approving transfers and changing allowances) are allowed. 
The following transactions revert:

- calls to `submit(uint256)`;
- calls to `requestWithdraw(uint256)`;
- calls to `delegate()` 
- calls to `claimTokens(uint256)`;
- calls to `distributeRewards()`
- calls to `withdrawTotalDelegated()`
- calls to `claimTokens2StMatic(uint256)`


## [NodeOperatorsRegistry](/contracts/node-operators-registry)

### Adding a node operator

Add a new Node Operator to the registry and part of the largerLido on Polygon protocol.
- Mutator: `addOperator(string memory _name, uint8 address _rewardAddress, bytes memory _signerPubkey)`
  - Permission required: `DAO_ROLE`

### Removing a node operator

A node operator can be removed from the registry by calling this function. Operators removed from protocol don’t
take part in fee distribution.

- Mutator: `removeOperator(uint256 _operatorId)`
  - Permission required: `REMOVE_OPERATOR_ROLE`

### Unstaking a node operator

A node operator can be unstaked from the protocol by the DAO. The DAO can withdraw delegated tokens from an unstaked 
node operator. 

- Mutator: `unstake(uint256 _operatorId)`
  - Permission required: `DAO_ROLE`

### Maximum delegate limit

The maximum delegate limit can be changes by the DAO. This determines how much is delegated to each node operator.
The new maximum delegate limit must be less than 10Billion. 

- Mutator: `setDefaultMaxDelegateLimit(uint256 _defaultMaxDelegateLimit)`
  - Permission required: `DAO_ROLE`
- Accessor: `defaultMaxDelegateLimit() returns(uint256)`

### Maximum delegate limit

The maximum delegate limit can be changes by the DAO. This determines how much is delegated to each node operator.
The new maximum delegate limit must be less than 10Billion.

- Mutator: `setDefaultMaxDelegateLimit(uint256 _defaultMaxDelegateLimit)`
  - Permission required: `DAO_ROLE`
- Accessor: `defaultMaxDelegateLimit() returns(uint256)`

### Maximum operator delegate limit

The maxim delegate limit per operator. This is different from the default maximum delegate limit. I can only be changed
by the DAO.

- Mutator: `setMaxDelegateLimit(uint256 _operatorId, uint256 _maxDelegateLimit)`
  - Permission required: `DAO_ROLE`

### Set commission rate

The commission rate to be used to calculate commission during reward distribution to all node operators. It can only be
called by the DAO. 

- Mutator: `setCommissionRate(uint256 _commissionRate)`
  - Permission required: `DAO_ROLE`
- Accessor: `commissionRate() returns(uint256)`

### Update operator commission rate

The commission rate to be used to calculate commission during reward distribution to per node operators. It can only be
called by the DAO.

- Mutator: `updateOperatorCommissionRate(uint256 _operatorId, uint256 _newCommissionRate)`
  - Permission required: `DAO_ROLE`

### Set stake amount and fees

The DAO can set the stake amount and heimdall fees.

- Mutator: `setStakeAmountAndFees(uint256 _minAmountStake, uint256 _minHeimdallFees)`
  - Permission required: `DAO_ROLE`

### Set restake

The DAO uses this function to determine whether a node operator can restake their rewards.

- Mutator: `setRestake(bool _restake)`
  - Permission required: `DAO_ROLE`
- Accessor: `allowsRestake() returns(bool)`

### Set stmatic address

The DAO sets the stmatic contract address in the node operator registry contract. 

- Mutator: `setStMATIC(address _stMATIC)`
  - Permission required: `DAO_ROLE`
- Accessor: `stMATIC() returns(address)`

### Set validator factory address

The DAO sets the validator factory contract address in the node operator registry contract.

- Mutator: `setValidatorFactory(address _validatorFactory)`
  - Permission required: `DAO_ROLE`
- Accessor: `validatorFactory() returns(address)`

## Set stake manager address

The DAO sets the stake manager contract address in the node operator registry contract.

- Mutator: `setStakeManager(address _stakeManager)`
  - Permission required: `DAO_ROLE`
- Accessor: `stakeManager() returns(address)`

## Set stake manager address

The DAO sets the version of the node operator registry contract.

- Mutator: `setVersion(string memory _version)`
  - Permission required: `DAO_ROLE`
- Accessor: `version() returns(string memory)`

### Pausing

- Mutators: `togglePause()`
  - Permission required: `DAO_ROLE`
- Accessor: `paused() returns (bool)`

When paused, `NodeOperatorRegistry` doesn't allow node operator addition, unstaking, or fee claiming.
The following transactions revert:

- calls to `addOperator(string memory, address, bytes memory)`;
- calls to `stopOperator(uint256)`;
- calls to `removeOperator(uint256)`
- calls to `joinOperator()`;
- calls to `stake(uint256, uint256 )`
- calls to `restake(uint256 , bool)`
- calls to `unstake()`
- calls to `migrate()`
- calls to `unjail()`