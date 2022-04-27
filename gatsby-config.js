module.exports = {
  siteMetadata: {
    siteUrl: 'https://mbb.education',
    title: `${process.env.NODE_ENV !== 'production' ? '[DEV] ' : ''}Music Branding Basics`,
    titleTemplate: `${
      process.env.NODE_ENV !== 'production' ? '[DEV]' : ''
    } %s - Music Branding Basics`,
    description: 'The open-source platform for music branding theory, processes and world renown case studies.',
    image: '/ident-bumper.jpg', // Path to your image you placed in the 'static' folder
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Inter:300,400,500,600,700'],
        },
      },
    },

    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg[\\/](.*)\.svg$/, // It should match all svg in svg folder
        },
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: './src/docs/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'audio',
        path: './src/audio/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'case-studies',
        path: './src/casestudies/',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/Layout.js'),
          docs: require.resolve('./src/components/DocLayout.js'),
          caseStudies: require.resolve('./src/components/CaseStudyLayout.js'),
        },
        gatsbyRemarkPlugins: [
          'gatsby-remark-unwrap-images',
          {
            resolve: `gatsby-remark-footnotes`,
            options: {
              footnoteBackRefPreviousElementDisplay: 'inline',
              footnoteBackRefDisplay: 'inline',
              footnoteBackRefInnerText: '➚', // Defaults to: "↩"
              // use if you want the Wikipedia style ^ link without an underline beneath it
              footnoteBackRefAnchorStyle: `text-decoration: none;`,
              // use "front" for Wikipedia style ^ links
              footnoteBackRefInnerTextStartPosition: 'front',
              useFootnoteMarkerText: true, // Defaults to false
              // useCustomDivider: '<hr/><strong>References:</strong>', // Defaults to <hr/>
            },
          },
        ],
      },
    },
    'gatsby-plugin-meta-redirect',
  ],
};
