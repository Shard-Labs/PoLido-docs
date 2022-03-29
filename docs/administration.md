# Administration

Lido on Polygon is governed by the Lido Decentralized Autonomous Organization (Lido DAO). Members of the DAO — holders of the LDO governance token — can vote on high-level proposals, such as whether to expand to a new chain. For day-to-day tasks, we have a much more narrowly scoped need for somebody to execute privileged operations: an administrator. The administrator rights reside with a 3-out-of-5 multi-sig that consists of established validators and ecosystem partners.

## Administrator responsibilities

Lido on Polygon is a program that runs on the Ethereum blockchain. The Program has an upgrade authority: an address that can replace the program with a newer version. This upgrade authority has a lot of power, especially for a program likeLido on Polygon that manages user’s funds. After all, the upgrade authority could deploy a new program that withdraws all staked Matics into an address of their choice. Therefore, it is essential that the upgrade authority is trustworthy.

## Multisig administration

Different administration methods exist, each with different advantages and disadvantages.

- A single person could act as the administrator. This has a very low overhead, and the administrator can move quickly when there is a need to deploy a critical bug fix. However, it also places a high degree of trust in a single person.
- On the opposite side of the spectrum, a DAO program could act as the administrator. Administrative tasks could only be executed after a majority of LDO token holders approve. This is decentralized, but it makes it very difficult to act quickly when needed.

A good middle ground between these two extremes is a multi-sig, a program that executes administrative tasks after m out of n members have approved. For m greater than one, no single party can unilaterally execute administrative tasks, but we only need to coordinate with m parties to get something done, not with a majority of LDO holders.

## Multisig details

ForLido on Polygon, we use the [gnosis-safe](https://gnosis-safe.io/app/), and we require approval from 3 out of 5 members. The members are:
1. **Shard Labs:** `Jakov`
2. **Lido:** `Vasiliy, Victor`
3. **Polygon:** `Hamzah, Aishwary`

The addresses of the multi-sig members are listed on the [deployments](https://github.com/Shard-Labs/PoLido/blob/main/mainnet-deployment-info.json#L3) page. The multi-sig instance is used both as the upgrade authority of the program and as the manager of theLido on Polygon instance.




