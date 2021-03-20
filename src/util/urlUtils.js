const urlCheck = ({ url }) => {
  const REGEX_URL = process.env.REGEX_URL;
  const regex = new RegExp(REGEX_URL);
  if (!url.match(regex)) {
    console.error(`[urlCheck] url is invalid by regex : ${url}`);
    throw new Error(`Url is invalid: ${url}`);
  }
};

export { urlCheck };
