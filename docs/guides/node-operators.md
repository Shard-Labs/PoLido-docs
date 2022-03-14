# Node Operators

One of the main parts of Lido for Polygon protocol are node operators. Node operators are entities which are running Polygon PoS 
validators and are registered in the Lido for Polygon node operator registry contract. They are responsible for managing a secure 
and stable infrastructure for running Polygon validator infrastructure for the benefit of the protocol. 
They are professional staking providers who can ensure the safety of funds belonging to the protocol users and 
correctness of validator operations.

There are two possible scenarios for new Lido for Polygon node operators:

1. **Existing Polygon validator**

2. **Fresh (unstaked) Polygon validator**

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

## Tutorial on How to join as an Operator

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
1. Approve MATIC to Validator Proxy

   Visit https://remix.ethereum.org/, and create a new contract with the name IERC20.sol.

   ![xd2imfoj79nwf4aa0eml](https://user-images.githubusercontent.com/17001801/153889832-90ed824e-f08f-4916-a77c-c59fc3245b3d.png)

   Paste the following code in the created contract:

   ```solidity
   // SPDX-FileCopyrightText: 2021 Shardlabs
   // SPDX-License-Identifier: GPL-3.0
   pragma solidity 0.8.7;
   
   interface IERC20 { 
        function approve(address spender, uint256 amount) external returns (bool);
   }
   ```

   Press CTRL + S to compile the code.

   After that, click on `Deploy` and make sure that `IERC20` is selected in the CONTRACT drop down list.
   Also, make sure that Injected Web3 is selected in the ENVIRONMENT drop down list and that ACCOUNT corresponds to the
   address that owns the token (you can change the connected account via MetaMask).

   ![voxes](https://user-images.githubusercontent.com/17001801/154425200-64be1e73-b5bb-411b-8690-a77c5d5bf3f2.jpg)

   Enter the address of the matic token contract in the field like in the image below, and then click on the blue 
   `At Address` button. This will provide you the interface to communicate with the token contract.

   ![voxes](https://user-images.githubusercontent.com/17001801/154426844-6ffbfdf3-f002-4bb7-8e08-4a6d130fc13b.jpg)

   Expand the IERC20 interface from the bottom left corner of the Remix by clicking on the ">".
   
   ![voxes](https://user-images.githubusercontent.com/17001801/154427639-abefe956-4109-496f-ac99-10b5e5934ab2.jpg)

   Expand the approve function arguments by clicking on the arrow that is pointing down.

   ![voxes](https://user-images.githubusercontent.com/17001801/154428709-a4198d84-e2b2-4f06-99ba-a858111bb234.jpg)

   Make sure that you are connected with the right address by checking the ACCOUNT field inside Remix. After confirming, 
   click on approve and confirm the transaction. You have successfully approved the ValidatorProxy to spend your 
   Matic tokens.

2. Calling the stake Function

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

   Enter the address of the `NODE_OPERATOR_REGISTRY_PROXY` (please refer to the address in the deployment address table ) in the field 
    like from the image below, and then click on the blue 
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
After the voting process is over, the DAO will create a new operator for you by calling `addOperator`.

Next thing to do is to approve your NFT staking token to the newly created Operator. Call `getNodeOperator`
function by interacting with the NodeOperatorRegistry to retrieve the address of the ValidatorProxy that was created. 
You will need to approve the NFT token to the retrieved address. After you've approved the token, call the `joinOperator` 
function. That's it! You are now a part of the Lido for Polygon system!

Guide:
1. Fetching the address of the validator proxy

   Visit https://remix.ethereum.org/, and create a new contract with an arbitrary name.

   ![xd2imfoj79nwf4aa0eml](https://user-images.githubusercontent.com/17001801/153889832-90ed824e-f08f-4916-a77c-c59fc3245b3d.png)
   
   Paste the following code in the created contract:

   ```solidity
   // SPDX-FileCopyrightText: 2021 Shardlabs
   // SPDX-License-Identifier: GPL-3.0
   pragma solidity 0.8.7;

   enum NodeOperatorStatus {
      INACTIVE,
      ACTIVE,
      STOPPED,
      UNSTAKED,
      CLAIMED,
      EXIT,
      JAILED,
      EJECTED
   }

   struct NodeOperator {
      NodeOperatorStatus status;
      string name;
      address rewardAddress;
      bytes signerPubkey;
      address validatorShare;
      address validatorProxy;
      uint256 validatorId;
      uint256 commissionRate;
      uint256 maxDelegateLimit;
   }
   
   interface INodeOperatorRegistry {
        function getNodeOperator(uint256 _operatorId) external view returns (NodeOperator memory);
        function getNodeOperator(address _owner) external view returns (NodeOperator memory);
   }
   ```
   
   Press CTRL + S to compile the code.

   After that, click on Deploy & Run transactions and make sure that `INodeOperatorRegistry` is selected in the CONTRACT 
   drop down list. Also, make sure that Injected Web3 is selected in the ENVIRONMENT drop down list and that ACCOUNT 
   corresponds to the address that owns the Operator (you can change the connected account via MetaMask).

   ![mgxkvjfkmjyys1mfsqi9](https://user-images.githubusercontent.com/17001801/153895814-77ba1f37-ee0d-4f35-828c-a9faf7e5dcf7.png)

   Enter the address of the `NODE_OPERATOR_REGISTRY_PROXY` (please refer to the address in the deployment address table ) in the field 
   like from image below, and then click on the blue `At Address` button. This will provide you the interface to communicate with the NodeOperator.

   ![fdunad10cz2y2fpnxp2o](https://user-images.githubusercontent.com/17001801/153897300-ffce2e6f-1fe3-47e9-b79e-80b2bfa60897.png)

   Expand the `INODEOPERATORREGISTRY` interface from the bottom left corner of the Remix by clicking on the ">".

   ![cvununqdej0wyk5oyqlc](https://user-images.githubusercontent.com/17001801/153898159-0fddef99-2468-448a-b70a-2afc7e3cbe20.png)

   ![agr8kfprb94onqhp7eem](https://user-images.githubusercontent.com/17001801/153906028-e9f28cfd-a940-4eb3-b617-8a8b9a88214c.png)

2. Approving the NFT token to ValidatorProxy

   Visit https://remix.ethereum.org/, and create a new contract with the name IERC721.sol.

   ![xd2imfoj79nwf4aa0eml](https://user-images.githubusercontent.com/17001801/153889832-90ed824e-f08f-4916-a77c-c59fc3245b3d.png)

   Paste the following code in the created contract:

   ```solidity
   // SPDX-FileCopyrightText: 2021 Shardlabs
   // SPDX-License-Identifier: GPL-3.0
   pragma solidity 0.8.7;
   
   interface IERC721 { 
        function approve(address to, uint256 tokenId) external;
   }
   ```

   Press CTRL + S to compile the code.

   After that, click on `Deploy` and make sure that `IERC721` is selected in the CONTRACT drop down list. 
   Also, make sure that Injected Web3 is selected in the ENVIRONMENT drop down list and that ACCOUNT corresponds to the
   address that owns the NFT (you can change the connected account via MetaMask).

   ![vox](https://user-images.githubusercontent.com/17001801/154110691-306d27ad-0763-4d10-b87c-7045048b9159.jpg)

   Enter the address of the NFT Contract Address (please refer to the address in the deployment address table ) in the 
   field like in the image below, and then click on the blue `At Address` button. This will provide you the interface 
   to communicate with the NFT contract.

   ![154135589](https://user-images.githubusercontent.com/17001801/154412684-bf7a0d66-8d3d-4dcd-93c9-34b7c467ab46.jpeg)

   Expand the `IERC721` interface from the bottom left corner of the Remix by clicking on the ">".

   ![154135946](https://user-images.githubusercontent.com/17001801/154412910-d5730e16-83f7-4d56-a2dd-bd8e9eeca7f7.jpeg)

   Expand the `approve` function arguments by clicking on the arrow that is pointing down.

   ![154413145](https://user-images.githubusercontent.com/17001801/154413799-68574c02-1c89-4b7e-8373-04dec3dd654c.jpeg)

   Make sure that you are connected with the right address by checking the ACCOUNT field inside Remix. After confirming,
   click on `approve` and confirm the transaction. You have successfully approved the ValidatorProxy to transfer your NFT.

3. Calling the `joinOperator` Function
   
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

   Enter the address of the `NODE_OPERATOR_REGISTRY_PROXY` (please refer to the address in the deployment address table ) in the field like in the image below, and then click on the blue 
   `At Address` button. This will provide you the interface to communicate with the NodeOperator.

   ![fdunad10cz2y2fpnxp2o](https://user-images.githubusercontent.com/17001801/153897300-ffce2e6f-1fe3-47e9-b79e-80b2bfa60897.png)

   Expand the `INODEOPERATORREGISTRY` interface from the bottom left corner of the Remix by clicking on the ">".

   ![cvununqdej0wyk5oyqlc](https://user-images.githubusercontent.com/17001801/153898159-0fddef99-2468-448a-b70a-2afc7e3cbe20.png)

   Expand the `joinOperator` function arguments by clicking on the arrow that is pointing down.

   ![al7yb6ggmvwcupoavy4g](https://user-images.githubusercontent.com/17001801/153908438-ce1fca50-f814-4f69-b9b1-408ca6b9ce83.png)

   Make sure that you are connected with the right address by checking the ACCOUNT field inside the Remix. After you've made sure, click on joinOperator and confirm the transaction.

   You have successfully joined the Lido for Polygon platform!

## How to exit the protocol as a Node Operator

There are two ways a Node Operator can exit the protocol. First, by calling the `unstake()` function in the NodeOperatorRegistry contract, the
Node Operator can then claim their stake by calling the `unstakeClaim()` function. Second, by calling `migrate()` function.
Here's a guide to exit the protocol
as a NodeOperator:

1. Exiting the Node Operator Registry by Unstaking
   1. Call `unstake()` function in NodeOperator contract. 
   
      Visit https://remix.ethereum.org/, and create a new contract with the name NodeOperator.sol.

      ![xd2imfoj79nwf4aa0eml](https://user-images.githubusercontent.com/17001801/153889832-90ed824e-f08f-4916-a77c-c59fc3245b3d.png)

      Paste the following code in the created contract:

      ```solidity
      // SPDX-FileCopyrightText: 2021 Shardlabs
      // SPDX-License-Identifier: GPL-3.0
      pragma solidity 0.8.7;
   
      interface INodeOperatorRegistry { 
           function unstake() external;
           function unstakeClaim() external;
      }
      ```

      Press CTRL + S to compile the code.

      After that, click on `Deploy` and make sure that `INodeOperatorRegistry` is selected in the CONTRACT drop down list.
      Also, make sure that Injected Web3 is selected in the ENVIRONMENT drop down list and that ACCOUNT corresponds to the
      address that owns the token (you can change the connected account via MetaMask).

      ![mgxkvjfkmjyys1mfsqi9](https://user-images.githubusercontent.com/17001801/153895814-77ba1f37-ee0d-4f35-828c-a9faf7e5dcf7.png)

      Enter the address of the `NODE_OPERATOR_REGISTRY_PROXY` (please refer to the address in the deployment address table ) in the field
      like from image below, and then click on the blue `At Address` button. This will provide you the interface to communicate with the NodeOperator.

      ![fdunad10cz2y2fpnxp2o](https://user-images.githubusercontent.com/17001801/153897300-ffce2e6f-1fe3-47e9-b79e-80b2bfa60897.png)

      Expand the `INODEOPERATORREGISTRY` interface from the bottom left corner of the Remix by clicking on the ">".

      ![154491968](https://user-images.githubusercontent.com/17001801/154492398-3d1aa9d2-d6d8-40fe-b65c-58dd33040b33.jpeg)

      click on `unstake` to unstake the node operator from the node manager.
   2. To claim the staked tokens, the node operator needs to wait until after the withdrawal delay period before calling
      the `unstakeClaim` in the diagram above.

2. Exiting the Node Operator Registry by Migrating
   Exiting the Node Operator Registry by Migrating does not unstake a validator or remove a validator from a stake manager. 
   However, the validator no longer becomes part of the Lido for Polygon protocol after migrating, and the validator
   ownership is transferred to the reward address. 
   1. Call `migrate()` function in the NodeOperator contract.

      Visit https://remix.ethereum.org/, and create a new contract with the name NodeOperator.sol.

      ![xd2imfoj79nwf4aa0eml](https://user-images.githubusercontent.com/17001801/153889832-90ed824e-f08f-4916-a77c-c59fc3245b3d.png)

      Paste the following code in the created contract:

      ```solidity
      // SPDX-FileCopyrightText: 2021 Shardlabs
      // SPDX-License-Identifier: GPL-3.0
      pragma solidity 0.8.7;
   
      interface INodeOperatorRegistry { 
           function migrate() external;
      }
      ```

      Press CTRL + S to compile the code.

      After that, click on `Deploy` and make sure that `INodeOperatorRegistry` is selected in the CONTRACT drop down list.
      Also, make sure that Injected Web3 is selected in the ENVIRONMENT drop down list and that ACCOUNT corresponds to the
      address that owns the token (you can change the connected account via MetaMask).

      ![mgxkvjfkmjyys1mfsqi9](https://user-images.githubusercontent.com/17001801/153895814-77ba1f37-ee0d-4f35-828c-a9faf7e5dcf7.png)

      Enter the address of the `NODE_OPERATOR_REGISTRY_PROXY` (please refer to the address in the deployment address table ) in the field
      like from image below, and then click on the blue `At Address` button. This will provide you the interface to communicate with the NodeOperator.

      ![fdunad10cz2y2fpnxp2o](https://user-images.githubusercontent.com/17001801/153897300-ffce2e6f-1fe3-47e9-b79e-80b2bfa60897.png)

      Expand the `INODEOPERATORREGISTRY` interface from the bottom left corner of the Remix by clicking on the ">".

      ![154491968](https://user-images.githubusercontent.com/17001801/156926923-eba66e07-3414-4fb1-820b-b5e27bee9959.jpg)

      click on `migrate` to migrate the node operator from the node manager.

Note:: Deployment addresses can be retrieved from the table below

| Description          | Mainnet    | Testnet    |
| -------------------- | --------- | ------------------ |
| Node Operator Registry Proxy   | `0x797C1369e578172112526dfcD0D5f9182067c928`        | `0xb1f3f45360Cf0A30793e38C18dfefCD0d5136f9a `       |
| NFT Contract Address   | `0x47Cbe25BbDB40a774cC37E1dA92d10C2C7Ec897F`        | `0x532c7020E0F3666f9440B8B9d899A9763BCc5dB7 `       |

