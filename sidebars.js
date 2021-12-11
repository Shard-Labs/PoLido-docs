module.exports = {
  docs: [
    'introduction',
    'lido-dao',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/node-operator-manual',
        'guides/oracle-operator-manual',
        'guides/deposit-security-manual',
        'guides/multisig-deployment',
        'guides/protocol-levers',
        'guides/etherscan-voting',
        'guides/easy-track-guide',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: ['integrations/sdk', 'integrations/subgraph'],
    },
    {
      type: 'category',
      label: 'Token guides',
      items: ['token-guides/steth-superuser-functions'],
    },
    {
      type: 'category',
      label: 'Contracts',
      items: [
        'contracts/StMatic',
        'contracts/lido-oracle',
        'contracts/stable-swap-state-oracle',
        'contracts/steth-price-feed',
        'contracts/node-operators-registry',
        'contracts/withdrawals-manager-stub',
        'contracts/wsteth',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: ['security/bugbounty'],
    },
    'deployed-contracts',
  ],
}
