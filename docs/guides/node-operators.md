# Node Operators

One of the main parts of Lido for Polygon protocol are node operators. Node operators are entities which are running Polygon PoS 
validators and are registered in the Lido for Polygon node operator registry contract. They are responsible for managing a secure 
and stable infrastructure for running Polygon validator infrastructure for the benefit of the protocol. 
They are professional staking providers who can ensure the safety of funds belonging to the protocol users and 
correctness of validator operations.

There are two possible scenarios for new Lido for Polygon node operators:

1. Existing Polygon validator

2. Fresh (unstaked) Polygon validator

The difference between the two is that existing Polygon validators already have some amount of MATIC tokens staked and 
probably a significant amount of MATIC tokens delegated. They would not want to unstake, lose their validator slot and 
restake again after joining the Lido for Polygon. Lido for Polygon offers a `joinOperator` function for this scenario where node operators 
are going to migrate their Polygon validator ERC721 token to Lido for Polygon protocol. That way, validator does not have any 
downtime, existing delegators still continue to receive their rewards and node operator can manually claim validator 
rewards at any time.

In the second scenario, we have a fresh validator that does not have any amount of MATIC tokens staked.  
After being registered in the node operator registry, the node operator will call the `stake` function using Lido for Polygon 
protocol (as described below) and put the desired amount of tokens to stake (10 MATIC is minimum) + allocate the amount 
for heimdall fees (minimum 20 MATIC).

## Tutorial on How to join as an Operator during testnet phase

You can join as a Node Operator with an unstaked Validator node or with a pre-staked one.

### Unstaked (fresh) validator

If you are joining with an unstaked one, all you have to do is provide us with your 64 byte public key used on Heimdall,
an address which will own the Operator (all the validator rewards will be sent there) and an optional name for the 
Operator. We will create a new Operator node from the given data, but it still needs to be staked for a Validator share 
contract to be created. When Lido for Polygon production version launches, you will be required to submit a governance proposal in 
order to become Lido for Polygon node operator.

Validator share contract is important because all the delegators will be delegating their funds to it. You will need to 
provide 10 Matic for amount to stake and 20 more for Heimdall fee. To create it, you need to approve the total amount of 
Matic tokens and call the function stake from the address that owns the Operator. 

### Guide:
1. Calling the stake Function

   Visit https://remix.ethereum.org/, and create a new contract with an arbitrary name.
   
   ![xd2imfoj79nwf4aa0eml](https://user-images.githubusercontent.com/17001801/153889832-90ed824e-f08f-4916-a77c-c59fc3245b3d.png)
   
   Paste the following code in the created contract:
   
   ```solidity
   // SPDX-FileCopyrightText: 2021 Shardlabs
   // SPDX-License-Identifier: GPL-3.0
   pragma solidity 0.8.7;
   
   interface INodeOperatorRegistry {
       function stake(uint256 _amount, uint256 _heimdallFee) external;
   } 
   ```
   Press CTRL + S to compile the code. 

   After that, click on Deploy & Run transactions and make sure that `INodeOperatorRegistry` is selected in the 
   CONTRACT drop down list. Also, make sure that Injected Web3 is selected in the ENVIRONMENT drop down list and that 
   ACCOUNT corresponds to the address that owns the Operator (you can change the connected account via MetaMask).
   
   ![mgxkvjfkmjyys1mfsqi9](https://user-images.githubusercontent.com/17001801/153895814-77ba1f37-ee0d-4f35-828c-a9faf7e5dcf7.png)

   Enter the address of the NODE_OPERATOR_REGISTRY_PROXY* "0xb1f3f45360Cf0A30793e38C18dfefCD0d5136f9a"
   (the address in the image below is deprecated) in the field like from the image below, and then click on the blue 
   `At Address` button. This will provide you the interface to communicate with the NodeOperator.
   
   ![fdunad10cz2y2fpnxp2o](https://user-images.githubusercontent.com/17001801/153897300-ffce2e6f-1fe3-47e9-b79e-80b2bfa60897.png)

   Expand the `INODEOPERATORREGISTRY` interface from the bottom left corner of the Remix by clicking on the ">".
   
   ![cvununqdej0wyk5oyqlc](https://user-images.githubusercontent.com/17001801/153898159-0fddef99-2468-448a-b70a-2afc7e3cbe20.png)
   
   Expand the stake function arguments by clicking on the arrow that is pointing down.

   ![ssozd9dk2wfillhlswyl](https://user-images.githubusercontent.com/17001801/153898613-2855c232-9d2e-4df7-9df6-1c503c95ea69.png)
   
   Enter `10000000000000000000` in the _amount field and `20000000000000000000` in the _heimdallFee field.
   Numbers are large because they are in Wei, they are equal to 10 MATIC and 20 MATIC. You can choose to set different 
   amounts for these field if you would like to stake more than 10 MATIC or have more tokens to cover heimdall fees. 
   These values are the minimum for validator to be staked.

   After that, click on the `stake` button and confirm the transaction in the MetaMask.

   That's it, voilà! You have officially registered one of the Lido for Polygon Operators!

### Pre-staked (existing) Validator
If you're joining with a pre-staked one, you should interact with `joinOperator` function in NodeOperatorRegistry 
contract. Import INodeOperator interface to remix and attach it to the `NODE_OPERATOR_REGISTRY_PROXY` address. 
After the voting process is over, the DAO will create a new operator for you by calling `addOperator`  (Shard Labs owns 
the private key with DAO role during testnet phase).

Next thing to do is to approve your NFT staking token to the newly created Operator. Call `getOwnerValidatorProxy`
function by interacting with the NodeOperatorRegistry to retrieve the address of the ValidatorProxy that was created. 
You will need to approve the NFT token to the retrieved address. After you've approved the token, call the `joinOperator` 
function. That's it! You are now a part of the Lido for Polygon system!

Guide:
1. Approving the NFT token to ValidatorProxy

   Visit https://remix.ethereum.org/, and create a new contract with an arbitrary name.

   ![xd2imfoj79nwf4aa0eml](https://user-images.githubusercontent.com/17001801/153889832-90ed824e-f08f-4916-a77c-c59fc3245b3d.png)
   
   Paste the following code in the created contract:

   ```solidity
   // SPDX-FileCopyrightText: 2021 Shardlabs
   // SPDX-License-Identifier: GPL-3.0
   pragma solidity 0.8.7;

   interface INodeOperatorRegistry {
        function getOwnerValidatorProxy() external view returns (address);
   }
   ```
   
   Press CTRL + S to compile the code.

   After that, click on Deploy & Run transactions and make sure that `INodeOperatorRegistry` is selected in the CONTRACT 
   drop down list. Also, make sure that Injected Web3 is selected in the ENVIRONMENT drop down list and that ACCOUNT 
   corresponds to the address that owns the Operator (you can change the connected account via MetaMask).

   ![mgxkvjfkmjyys1mfsqi9](https://user-images.githubusercontent.com/17001801/153895814-77ba1f37-ee0d-4f35-828c-a9faf7e5dcf7.png)

   Enter the address of the `NODE_OPERATOR_REGISTRY_PROXY` "0xb1f3f45360Cf0A30793e38C18dfefCD0d5136f9a" 
   (the address in the image below is deprecated) in the field like from image below, and then click on the blue At 
   `Address` button. This will provide you the interface to communicate with the NodeOperator.

   ![fdunad10cz2y2fpnxp2o](https://user-images.githubusercontent.com/17001801/153897300-ffce2e6f-1fe3-47e9-b79e-80b2bfa60897.png)

   Expand the `INODEOPERATORREGISTRY` interface from the bottom left corner of the Remix by clicking on the ">".

   ![cvununqdej0wyk5oyqlc](https://user-images.githubusercontent.com/17001801/153898159-0fddef99-2468-448a-b70a-2afc7e3cbe20.png)

   ![agr8kfprb94onqhp7eem](https://user-images.githubusercontent.com/17001801/153906028-e9f28cfd-a940-4eb3-b617-8a8b9a88214c.png)

2. Calling the `joinOperator` Function
   
   Visit https://remix.ethereum.org/, and create a new contract with an arbitrary name.

   ![xd2imfoj79nwf4aa0eml](https://user-images.githubusercontent.com/17001801/153889832-90ed824e-f08f-4916-a77c-c59fc3245b3d.png)

   Paste the following code in the created contract:
   
   ```solidity
   // SPDX-FileCopyrightText: 2021 Shardlabs
   // SPDX-License-Identifier: GPL-3.0
   pragma solidity 0.8.7;
   
   interface INodeOperatorRegistry {
        function joinOperator() external;
   }
   ```

   Press CTRL + S to compile the code.

   After that, click on Deploy & Run transactions and make sure that `INodeOperatorRegistry` is selected in the CONTRACT 
   drop down list. Also, make sure that Injected Web3 is selected in the ENVIRONMENT drop down list and that ACCOUNT 
   corresponds to the address that owns the Operator (you can change the connected account via MetaMask).

   ![mgxkvjfkmjyys1mfsqi9](https://user-images.githubusercontent.com/17001801/153895814-77ba1f37-ee0d-4f35-828c-a9faf7e5dcf7.png)

   Enter the address of the `NODE_OPERATOR_REGISTRY_PROXY` "0xb1f3f45360Cf0A30793e38C18dfefCD0d5136f9a" 
   (the address in the image below is deprecated) in the field like in the image below, and then click on the blue 
   `At Address` button. This will provide you the interface to communicate with the NodeOperator.

   ![fdunad10cz2y2fpnxp2o](https://user-images.githubusercontent.com/17001801/153897300-ffce2e6f-1fe3-47e9-b79e-80b2bfa60897.png)

   Expand the `INODEOPERATORREGISTRY` interface from the bottom left corner of the Remix by clicking on the ">".

   ![cvununqdej0wyk5oyqlc](https://user-images.githubusercontent.com/17001801/153898159-0fddef99-2468-448a-b70a-2afc7e3cbe20.png)

   Expand the joinOperator​ function arguments by clicking on the arrow that is pointing down.

   ![al7yb6ggmvwcupoavy4g](https://user-images.githubusercontent.com/17001801/153908438-ce1fca50-f814-4f69-b9b1-408ca6b9ce83.png)

   Make sure that you are connected with the right address by checking the ACCOUNT field inside the Remix. After you've made sure, click on joinOperator and confirm the transaction.

   You have successfully joined the Lido for Polygon platform!

   Note:: Deployment addresses can be retrieved from Lido for Polygon README: