const fs = require('fs');
const gracefulFs = require('graceful-fs');

gracefulFs.gracefulify(fs);

module.exports = {
  siteMetadata: {
    title: 'ATF Archive',
    author: 'ayan4m1',
    description: 'A repository of ATF recipes.',
    siteUrl: 'https://atf-archive.diyejuice.org/'
  },
  plugins: [
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data`,
        name: 'data'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590
            }
          }
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GA_TRACKING_ID
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ATF Archive',
        /* eslint-disable camelcase */
        short_name: 'ATF Archive',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#993014',
        /* eslint-enable camelcase */
        display: 'minimal-ui',
        icon: 'content/assets/gatsby-icon.png'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    'gatsby-plugin-eslint'
  ]
};
