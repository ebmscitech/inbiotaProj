const APP = {
  typeAPI: process.env.NODE_ENV === "development" ? 'dev' : 'prod',

  API_URL: process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD,
};

export default APP;
