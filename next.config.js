// @ts-check
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const enviroment = process.env.NODE_ENV || "development";
const isProduction = enviroment === 'production';

// eslint-disable-next-line max-lines-per-function
module.exports = (phase, { defaultConfig }) => {
  
  /**
   * @type {import('next').NextConfig}
   **/
  const baseConfig = {
      // // Use the prefix in production and not development. If using a CDN, this should be the CDN URL.
      // assetPrefix: isProduction ? '' : '',
      ...defaultConfig,
      poweredByHeader: false,
      reactStrictMode: true, // Good Practice apparently
      trailingSlash: true,
      // swcMinify: true,
  };

  /* development only config options here */
  if (phase === PHASE_DEVELOPMENT_SERVER) return { ...baseConfig };

  /* config options for all phases except development here */
  return { ...baseConfig };
}
