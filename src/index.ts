import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const URL = process.env.URL;

if (!username || !password || !URL)
  throw Error('username, password and URL are required in the .env file!');

const auth = { username, password };

async function getPageContent() {
  const response = await axios.get(URL!, {
    auth,
  });

  console.log(response.data);
}

getPageContent();
