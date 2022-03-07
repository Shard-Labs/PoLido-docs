module.exports = {
  docs: [
    'introduction',
    'architecture',
    'lido-dao',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/node-operators',
        'guides/node-operator-manual',
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
      items: ['token-guides/stmatic-superuser-functions'],
    },
    {
      type: 'category',
      label: 'Contracts',
      items: [
        'contracts/StMatic',
        'contracts/node-operators-registry',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: ['security/bugbounty'],
    },
    'deployed-contracts',
    'faq'
  ],
}
