# FAQ
1. What does it mean for an existing node operators to join PoLido? How do they transfer their slot?

   1. Existing node operators can join without losing their slot and without downtime (take a look at the second scenario 
      in the guide above). 
   2. They will transfer their ownership to PoLido by calling the `joinOperator` function from the account that currently 
   controls the validator. (this has to be done by using the same address that was used in stakeManager).

2. How will their rewards and fees change? 
   1. There will be the minimum of three reward income streams:
      1. They will be able to collect all validator rewards (rewards accumulated from their stake).
   
      2. They will still receive the commission from the delegator rewards that they set. The commission rate is 
         initially 5% (this value can be updated through the governance vote).
      
      3. Delegator rewards across all node operators are getting distributed in the following way:90% gets restaked  
         5% goes to the treasury,  5% is distributed proportionally (depends on the validator score) among all active node operators.

3. What is the validator score? 
   1. Each operator has a counter that will increase each time he gets slashed. When the counter gets increased, the timestamp is stored that we later use to check if the penalty period passed. With this counter, we are calculating rewards percentage that an operator will get.

4. How to compensate them for the possible returns that node operators lose by joining PoLido instead of running these validators independently?

   1. Many validators have commission rate set around 5%, which means that they would gain more rewards by joining PoLido since they would not lose their delegators, commission rate is set to 5%, and additionally, they will get the part of PoLido delegator rewards.
   
   2. The only scenario where they would lose on the rewards is if they had significant commission fees set that could not be compensated by the PoLido delegator rewards distribution.
   
   3. We are currently analyzing historical Polygon Staking APY to think of an appropriate incentive program for node operators.

5. How many slots will be available for new node operators?

   1. We are expecting to have at least 5 initial slots for new node operators.
   
   2. In later stages, we are aiming for ~20 slots.

6. How will they be selected?

   1. Polygon is planning to enable auctions for adding more validators. More information here: https://forum.matic.network/t/auction-mechansim-a-mechanism-to-replace-bad-and-under-performing-validators/1044
   
   2. Until then, we will have to coordinate with Polygon team to get some initial slots.
