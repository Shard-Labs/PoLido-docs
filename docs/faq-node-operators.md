# FAQ - Node Operators
<!--  -->

### Becoming a Validator on Lido for Polygon

One of the core parts of Lido for Polygon are Node Operators. They are responsible for managing a secure and stable infrastructure for running Polygon validator infrastructure for the benefit of the protocol decentralization and accumulating rewards. They are professional staking providers who can ensure the safety of funds belonging to the protocol users and correctness of validator operations.

Polygon’s validator set consists of 100 validators, for which slots were initially granted on a first come, first served basis. Since an auction mechanism for slots is not yet active, the only way to replace the existing validators is to come to an agreement with them and have them give up their slot, which is represented by the staking NFT held in the owner account.

This directly affects the way Lido can choose Node Operators since it puts a restriction on candidates. Lido is approaching lower performing Node Operators in order to come to an agreement and gain additional slots for onboarding new Node Operators. Whenever slots are purchased from existing operators, or via auction, Lido will seek to distribute them in a fair fashion to accepted applicants.

In order for a Node Operator to join Lido for Polygon, they need to submit an application during one of the upcoming onboarding rounds. Applications will be evaluated by the Lido Node Operator Subgovernance Group. Once applications are evaluated, a shortlist of suggested operators is sent to the DAO for approval. After DAO approval, operators will be added to the Lido for Polygon Node Operator registry smart contract which enables them to join Lido. Finally, a Node Operator can begin receiving delegations from Lido by calling the “join” function through Lido contract using the validator owner account which holds the staking NFT. Calling that function will transfer the staking NFT to Lido protocol and set the Node Operator to active status.

### Why is ownership transfer required?

One of the requirements is to set your commission to 5% before joining Lido. After transferring the ownership to Lido protocol, you will not be able to modify the commission fee by yourself. This is done to ensure uniformity across the Lido operator set. This value could be modified in the future by the Lido DAO.

### What happens to the existing stake on the Node Operator?

Your validator will not lose existing delegators nor rewards. You will not have any downtime in the process. You will be able to claim all future validator rewards using Lido smart contract function call. Rewards will be sent to the address you provided during the node registration procedure.

### What does it mean for an existing node operators to join Lido for Polygon? How do they transfer their slot?

Existing node operators can join without losing their slot and without downtime (take a look at the second scenario in the guide above). 

They will transfer their ownership to Lido for Polygon by calling the [joinOperator](./guides/node-operators.md) function from the account that currently controls the validator. (this has to be done by using the same address that was used in stakeManager).

### How will Node Operator rewards and fees change?

There will at least three reward income streams:

Node Operators will be able to collect validator rewards (rewards accumulated from their own stake).
They will receive commission from the delegator rewards that they set. The commission rate is initially 5% (this value can be updated through a governance vote).
Matic delegator rewards across are distributed in the following way:
- 90% gets restaked (i.e. turned into stMATIC),
- 5% goes to the Lido treasury,
- 5% is distributed equally amongst all active Lido Node Operators.

### Can the same Node Operator run multiple validators?

In an effort to promote decentralization, Lido for Polygon will prioritize available slots going to operators who are not already validating on Polygon. In case a Node Operator is in possession of a second slot, they are invited to contact Lido and discuss how that slot might best be put to use. If a Node Operator is already in the Lido set, or running a node for another validator who is, then they are asked not to apply to join the Lido set again under a different name/validator.

### How is stake distributed across validators?

Each submission of MATIC tokens to Lido for Polygon gets split in X equal parts, where X is the current number of Node Operators under Lido. Each part is then delegated to each respective validator. This means that validators that join Lido for Polygon earlier will have a slight advantage. To mitigate the “laddering” effect of this deposit mechanism in the short-term, we will be using delegation limits to ensure that stake is as evenly distributed as possible as additional Node Operators are onboarded to the operator set. In the long-term, we will seek to upgrade the staking contract to allow for smarter delegation of stake and rebalancing as mitigation.


### How to compensate them for the possible returns that node operators lose by joining Lido for Polygon instead of running these validators independently?

Many validators have commission rate set around 5%, which means that they would gain more rewards by joining Lido for Polygon since they would not lose their delegators, commission rate is set to 5%, and additionally, they will get the part of Lido for Polygon delegator rewards.
   
The only scenario where they would lose on the rewards is if they had significant commission fees set that could not be compensated by the Lido for Polygon delegator rewards distribution.
   
We are currently analyzing historical Polygon Staking APY to think of an appropriate incentive program for node operators.

### How many slots will be available for new node operators?

- We are expecting to have at least 5 initial slots for new node operators.
- In later stages, we are aiming for ~20 slots.

### How will they be selected?

Polygon is planning to enable auctions for adding more validators. More information here: https://forum.matic.network/t/auction-mechansim-a-mechanism-to-replace-bad-and-under-performing-validators/1044
   
   2. Until then, we will have to coordinate with Polygon team to get some initial slots.

### What is the validator slashing?

If the operator gets slashed by Polygon stakeManager, it will not receive any rewards until it became active again.

### Can an operator exit the protocol at anytime?

Yes, an operator can quit the protocol at anytime they wish to.
