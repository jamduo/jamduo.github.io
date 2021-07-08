const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const enviroment = process.env.NODE_ENV || "development";
const isProduction = enviroment === 'production';

module.exports = (phase, { defaultConfig }) => {
  
  const baseConfig = {
      // Use the prefix in production and not development.
      assetPrefix: isProduction ? '' : '',
      ...defaultConfig,
      poweredByHeader: false,
      reactStrictMode: true, // Good Practice apparently
  };

  /* development only config options here */
  if (phase === PHASE_DEVELOPMENT_SERVER) return { ...baseConfig };

  /* config options for all phases except development here */
  return { ...baseConfig };
}
