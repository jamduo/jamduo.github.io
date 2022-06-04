export const environment = process.env.NODE_ENV || "development";
export const basePath = process.env.BASE_PATH || "";
export const assetPrefix = process.env.ASSET_PREFIX || "";
export const is_dev = process.env.NODE_ENV === "development";
export const commit_hash = process.env.COMMIT_HASH || "unknown_development_build";
export const commit_message = process.env.COMMIT_MESSAGE || "unknown_development_build";
export const commit_ref = process.env.COMMIT_REF || "unknown_development_build";

const env =  {
  environment,
  basePath,
  assetPrefix,
  is_dev,
  commit_hash,
  commit_message,
  commit_ref,
};

export default env;