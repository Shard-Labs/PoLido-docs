module.exports = {
  docs: [
    'overview',
    'architecture',
    'how-lido-for-polygon-works',
    'fees',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/node-operators',
        'guides/protocol-levers',
        'guides/etherscan-voting',
      ],
    },
    {
      type: 'category',
      label: 'Contracts',
      items: [
        'contracts/st-matic',
        'contracts/node-operators-registry',
      ],
    },
    'deployed-contracts',
    'faq'
  ],
}
