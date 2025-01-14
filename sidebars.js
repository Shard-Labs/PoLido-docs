module.exports = {
  docs: [
    'overview',
    'administration',
    'architecture',
    'how-lido-on-polygon-works',
    'fees',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/node-operators',
        'guides/protocol-levers'
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
    {
      type: 'category',
      label: 'Security',
      items: ['security/bugbounty'],
    },
    'deployed-contracts',
    'faq-node-operators'
  ],
}
