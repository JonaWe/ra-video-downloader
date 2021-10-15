import dotenv from 'dotenv';

export default function setup() {
  dotenv.config();

  const username = process.env.LOGIN_USERNAME;
  const password = process.env.LOGIN_PASSWORD;
  const URL = process.env.URL;

  if (!username || !password || !URL)
    throw Error('username, password and URL are required in the .env file!');

  const BASE_URL = URL.substring(0, URL.lastIndexOf('/') + 1);

  const auth = { username, password };

  return {
    auth,
    URL,
    BASE_URL,
  };
}
