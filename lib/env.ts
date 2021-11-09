export const environment = process.env.NODE_ENV;
export const is_dev = process.env.NODE_ENV === "development";

const env =  {
  environment,
  is_dev,
};

export default env;