<!-- # Guide to Easy Track
This document is intended for: 
- the Lido Node Operators who wish to increase their staking limits within the Lido protocol;
- the Lido Ecosystem Grants Organisation members who wish to allocate funds into LEGO program;
- the Lido Rewards Committee members who wish to allocate funds into ongoing reward programs, or add a new reward program into the list of active reward programs, or remove a reward program from the list of active reward programs.

The guide consists of two sections: [General overview](#General-overview) and [Operations HOWTO](#Operations-HOWTO). If you’re here for the technical details of interacting with Easy Track, feel free to skip to the latter.
## General overview
### What is Easy Track motion
Easy Track motion is a lightweight voting considered to have passed if the minimum objections threshold hasn’t been reached. As opposed to regular Aragon votings, Easy Track motions are cheaper (no need to vote ‘pro’, token holders only have to vote ‘contra’ if they have objections) and easier to manage (no need to ask broad DAO community vote on proposals that spark no debate).
An Easy Track motion can be enacted if the minimum objections threshold of 0.5% of total LDO supply hasn't been reached within 72 hours after the motion has been started.
To prevent motion spam, only up to 12 active motions can exist at the same time.
### Motivation behind Easy Track
Initially, the Lido DAO governance used to rely on Aragon voting model. The DAO approved or rejected proposals by direct governance token voting. Though transparent and reliable, it is not a convenient way to make decisions only affecting small groups of Lido DAO members. Besides, direct token voting didn’t exactly reflect all the decision-making processes within the Lido DAO and was often used only to adopt an existing consensus. Votings on such decisions often struggled to attract wider DAO attention and thus, to pass.
Easy Track has been developed as a solution to problem of the DAO getting tired of governance.
### Easy Track use cases
There are three types of votings run periodically by the Lido DAO wrapped into the Easy Track motions:
- Node Operators increasing staking limits
- Funds being allocated to LEGO program
- Funds being allocated into reward programs
### Links
You can read more about Easy Track functionality in the [LIP-3](https://github.com/lidofinance/lido-improvement-proposals/blob/develop/LIPS/lip-3.md).  
For more in-depth technical description, please read through the full project [specification](https://github.com/lidofinance/easy-track/blob/master/specification.md).
## Operations HOWTO
- [Node Operators guide to Easy Track](#node-operators-guide-to-easy-track)
- [LEGO guide to Easy Track](#lego-guide-to-easy-track)
- [Rewards Committee guide to Easy Track](#rewards-committee-guide-to-easy-track)
## Node Operators guide to Easy Track
There are several features of staking limit related Easy Track motions to keep in mind before starting one:
1. **A node operator can only increase staking limits for themselves.** Before starting a motion, please make sure you have access to the address associated with the right node operator in the Lido Node Operators Registry. The correct address can be looked up in the Aragon UI ([goerli-prater testnet](https://testnet.testnet.fi/#/lido-testnet-prater/0x9d4af1ee19dad8857db3a45b0374c81c8a1c6320/), [mainnet](https://mainnet.lido.fi/#/lido-dao/0x55032650b14df07b85bf18a3a3ec8e0af2e028d5/)). 
3. **Single motion can only address staking limit of a single node operator.** Increasing limits for several node operators in one motion isn't supported.
3. **Total amount of node operator's signing keys must be greater than or equal to the new staking limit.** Make sure you have submitted enough valid signing keys before starting a motion.
### Conducting an Easy Track motion
To start a staking limit Easy Track motion, proceed to Easy Track UI ([goerli-prater testnet](https://easytrack.testnet.lido.fi/), [mainnet](https://easytrack.lido.fi/)).
Connect your wallet using the 'Connect wallet' button top right. Please use the address specified as your reward address in the Node Operators Registry.
In the header menu click 'Start motion' button. You will see the motion creation interface. Motion type you are looking for is 'Increase node operator staking limit'.
Fill in the form (all fields are required). 
Your node operator ID can be looked up in the Aragon UI ([goerli-prater testnet](https://testnet.testnet.fi/#/lido-testnet-prater/0x9d4af1ee19dad8857db3a45b0374c81c8a1c6320/), [mainnet](https://mainnet.lido.fi/#/lido-dao/0x55032650b14df07b85bf18a3a3ec8e0af2e028d5/)) – it is the number you can see to the left from your node operator name.
Fill the desired staking limit value in the 'New limit' field.
Press 'Submit' button below the form and sign the transaction (gas costs apply).
As soon as transaction is confirmed, the motion has been started and you can see it on the 'Active motions' page of Easy Track UI. Notifications will be sent out to let the DAO know about the motion. From this moment on, the LDO token holders will have 72 hours to submit their objections if they have any. Please note the motion duration may be different for testnet deployment.
### Possible motion outcomes
A motion can have three possible outcomes:
1. **Motion passed.**
In case the minimum objections threshold of 0.5% of total LDO supply hasn't been reached, the motion is considered to have passed, and it can be enacted. This operation is permissionless, which means anyone can enact a passed motion. Please note, it is still possible to object a non-enacted motion even after 72 hours timelock. The enacted motion will be automatically de-activated and put to the motion archive available under the 'Archive motions' section of Easy Track UI.
2. **Motion rejected.**
In case the minimum objections threshold of 0.5% of total LDO supply has been reached, the motion is considered rejected. It will be automatically de-activated and put to the motion archive available under the 'Archive motions' section of Easy Track UI.
3. **Motion canceled.**
In case you find out you have made a mistake when starting the motion (e.g. you don't want to increase your staking limits just yet or you've misclicked when specifying the new limit value etc.), you can cancel the motion at any moment before it has been enacted. To do so, click on the motion to see the detailed motion view and press 'Cancel' motion button top right. Please note, this is on-chain action, and you will have to sign a transaction to complete it (gas costs apply).

## LEGO guide to Easy Track
There are several features of LEGO Easy Track motions to keep in mind before starting one:
1. **Only a LEGO committee member can start a motion to allocate funds to LEGO program.** Before starting a motion, please make sure you have access to [the LEGO Committee Gnosis safe multi-sig](https://gnosis-safe.io/app/#/safes/0x12a43b049A7D330cB8aEAB5113032D18AE9a9030). 
2. **LEGO Easy Track motions support fund allocation in one or multiple of three crypto currencies: ETH, stETH, and LDO.** 
### Conducting an Easy Track motion
To start a LEGO Easy Track motion, proceed to the [Easy Track UI](https://easytrack.lido.fi/) and click 'Connect' button top right.
Pick 'Wallet Connect' option, you will see the QR code. Copy it by clicking 'Copy to clipboard' button under the code.
Next, proceed to [the LEGO Committee Gnosis safe multi-sig](https://gnosis-safe.io/app/#/safes/0x12a43b049A7D330cB8aEAB5113032D18AE9a9030) and connect your wallet by clicking 'Connect your wallet' button top right.
Open the 'APPS' section in the drawer menu on the left and find Wallet Connect Safe app in the list.
Paste the code into the field on the left. Now the LEGO Committee Gnosis multisig is connected to Easy Track app.
> You need to keep the Wallet Connect Safe app tab open in your browser for transactions to pop up. You will not receive transaction requests if you don't have it open.

In the header menu of Easy Track UI click 'Start motion' button. You will see the motion creation interface. Motion type you are looking for is 'Top up LEGO'.
Fill in the form (all fields are required).
Pick the token you want to top up the LEGO program with.
Specify the amount of tokens you want to top up the LEGO program with.
> You can add multiple token allocations into a single motion by clicking 'One more token' below the form.

Press 'Submit' button below the form and sign the transaction on the Wallet Connect safe app page (gas costs apply).
Next, you will need another LEGO Committee Gnosis multi-sig owner to confirm the transaction in the Gnosis Safe.
As soon as transaction is confirmed, the motion has been started and you can see it on the 'Active motions' page of Easy Track UI. Notifications will be sent out to let the DAO know about the motion. From this moment on, the LDO token holders will have 72 hours to submit their objections if they have any.
### Possible motion outcomes
A motion can have three possible outcomes:
1. **Motion passed.**
In case the minimum objections threshold of 0.5% of total LDO supply hasn't been reached, the motion is considered to have passed, and it can be enacted. This operation is permissionless, which means anyone can enact a passed motion. Please note, it is still possible to object a non-enacted motion even after 72 hours timelock. The enacted motion will be automatically de-activated and put to the motion archive available under the 'Archive motions' section of Easy Track UI.
2. **Motion rejected.**
In case the minimum objections threshold of 0.5% of total LDO supply has been reached, the motion is considered rejected. It will be automatically de-activated and put to the motion archive available under the 'Archive motions' section of Easy Track UI.
3. **Motion canceled.**
In case you find out you have made a mistake when starting the motion (e.g. you don't want to top-up LEGO program just yet or you've misclicked when specifying the amount of tokens to transfer etc.), you can cancel the motion at any moment before it has been enacted. To do so, click on the motion to see the detailed motion view and press 'Cancel' motion button top right. Please note, this is on-chain action, and you will have to sign a transaction in the Gnosis safe to complete it (gas costs apply).
## Rewards Committee guide to Easy Track
There are several features of Rewards Committee Easy Track motions to keep in mind before starting one:
1. **Only a Lido Rewards Committee member can start a motion to allocate funds to reward programs.** Before starting a motion, please make sure you have access to [the Rewards Committee Gnosis safe multi-sig](https://gnosis-safe.io/app/eth:0x87D93d9B2C672bf9c9642d853a8682546a5012B5/balances). 
2. **Rewards Committee Easy Track motions support fund allocation in LDO only.**
3. **Finance Team Easy Track supports topping up multiple reward programs in a single motion.** Though be careful, lack of consensus on one reward program will prevent the whole motion from passing.
4. **To top up a reward program via Easy Track motion, it should first be added into the list of active reward programs.** This action requires a separate Easy Track motion to complete.
5. **When no longer active, reward program should be removed from the list of active reward programs.** This action requires a separate Easy Track motion to complete.
### Conducting an Easy Track motion
To start a LEGO Easy Track motion, proceed to the [Easy Track UI](https://easytrack.lido.fi/) and click 'Connect' button top right.
Pick 'Wallet Connect' option, you will see the QR code. Copy it by clicking 'Copy to clipboard' button under the code.
Next, proceed to [the Rewards Committee Gnosis safe multi-sig](https://gnosis-safe.io/app/eth:0x87D93d9B2C672bf9c9642d853a8682546a5012B5/balances) and connect your wallet by clicking 'Connect your wallet' button top right.
Open the APPS section in the drawer menu on the left and find Wallet Connect Safe app in the list.
Paste the code into the field on the left. Now the Rewards Committee Gnosis multi-sig is connected to Easy Track app.
> You need to keep the Wallet Connect Safe app tab open in your browser for transactions to pop up. You will not receive transaction requests if you don't have it open.

In the header menu of Easy Track UI click 'Start motion' button. You will see the motion creation interface. The motion type you are looking for is 'Add reward program'
Fill in the form (all fields are required).
Title should be a human-readable description of the reward program (e.g. 'Curve ETH<\>stETH LP incentives').
Fill the Ethereum address of the reward program (it could be reward contract or reward manager contract depending on the specific program) in the 'Address' field.
> When creating a motion to remove a reward program from the list or to top up a previously added program, you will be able to pick a program by the program title, rather than pasting Ethereum address.

Press 'Submit' button below the form and sign the transaction on the Wallet Connect safe app page (gas costs apply).
Next, you will need another Rewards Committee Gnosis multi-sig owner to confirm the transaction in the Gnosis Safe.
As soon as transaction is confirmed, the motion has been started and you can see it on the 'Active motions' page of Easy Track UI. Notifications will be sent out to let the DAO know about the motion. From this moment on, the LDO token holders will have 72 hours to submit their objections if they have any.
### Possible motion outcomes
A motion can have three possible outcomes:
1. **Motion passed.**
In case the minimum objections threshold of 0.5% of total LDO supply hasn't been reached, the motion is considered to have passed, and it can be enacted. This operation is permissionless, which means anyone can enact a passed motion. Please note, it is still possible to object a non-enacted motion even after 72 hours timelock. The enacted motion will be automatically de-activated and put to the motion archive available under the 'Archive motions' section of Easy Track UI.
2. **Motion rejected.**
In case the minimum objections threshold of 0.5% of total LDO supply has been reached, the motion is considered rejected. It will be automatically de-activated and put to the motion archive available under the 'Archive motions' section of Easy Track UI.
3. **Motion canceled.**
In case you find out you have made a mistake when starting the motion (e.g. you have added the wrong address for the new reward program or you've misclicked when specifying the amount of tokens to be allocated etc.), you can cancel the motion at any moment before it has been enacted. To do so, click on the motion to see the detailed motion view and press 'Cancel' motion button top right. Please note, this is on-chain action, and you will have to sign a transaction via WalletConnect Safe app, as well as a confirmation from another Finance Team multi-sig owner to complete it (gas costs apply). -->
