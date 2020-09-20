require('dotenv').config();

const config = {};

config.siteMetadata = {
  // default language of your site, also used as a html attribute
  lang: 'en',
  // absolute url of your site, e.g https://example.com. Required
  // to build some absolute links.
  siteUrl: process.env.GATSBY_SITE_URL,
  // how many posts are display per page on post list page
  postsPerPage: 3,
  // links for the top menu
  menuLinks: [
    {
      title: 'Home',
      props: {
        to: '/',
      },
    },
    {
      title: 'Back to site',
      props: {
        to: 'https://fireblogcms.com',
        target: '_blank',
        id: 'back-to-site',
      },
    },
  ],
  readMoreText: 'Read more',
  followUsText: 'Follow us',
  // name of the application when site
  // is installed as an application (PWA)
  manifestName: 'Fireblog',
  manifestShortName: 'Fireblog',

  // links to your social accounts.
  // @see components/socials.js
  // Use an empty string as value to disable a specific social network
  socials: {
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
    twitter: 'https://twitter.com/',
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
  },
};

config.plugins = [
  `gatsby-plugin-sass`,
  {
    resolve: 'gatsby-source-graphql',
    options: {
      // This type will contain remote schema Query type
      typeName: 'Fireblog',
      // This is field under which it's accessible
      fieldName: 'fireblog',
      // Url to query from. Use default demo blog if no env variable is found.
      url: process.env.GATSBY_FIREBLOG_GRAPHQL_ENDPOINT,
    },
  },
  // The web app manifest(part of the PWA specification) enabled by this plugin
  // allows users to add your site to their home screen
  // on most mobile browsers.
  // The manifest provides configuration and icons to the phone.
  // this plugin should be listed before the offline plugin so
  // that it can cache the created manifest.webmanifest.
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      icon: `static/images/logo.png`,
      name: config.siteMetadata.manifestName,
      short_name: config.siteMetadata.manifestShortName,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#663399`,
      display: `minimal-ui`,
    },
  },
  // gatsby-plugin-offline MUST be user AFTER manifest !
  `gatsby-plugin-offline`,
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-plugin-purgecss`,
    options: {
      // protect .content class from Bulma
      whitelistPatternsChildren: [/^content$/, /^pagination$/],
      develop: false, // Enable while using `gatsby develop`
    },
  },
];

if (process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID) {
  config.plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID,
    },
  });
}

module.exports = config;
