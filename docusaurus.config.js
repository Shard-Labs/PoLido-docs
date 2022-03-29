/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Lido On Polygon Docs',
  tagline: 'DocumentationLido on Polygon staking protocol',
  url: 'https://polygon.lido.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon-32x32.png',
  organizationName: 'Shard-Labs', // Usually your GitHub org/user name.
  projectName: 'Lido-on-polygon-docs', // Usually your repo name.
  themeConfig: {
    prism: {
      additionalLanguages: ['solidity'],
    },
    navbar: {
      title: 'Lido On Polygon Docs',
      logo: {
        alt: 'Lido On Polygon Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/lidofinance',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/Shard-Labs/PoLido-docs/blob/main/',
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      { indexBlog: false, docsRouteBasePath: '/', indexPages: true },
    ],
  ],
}
