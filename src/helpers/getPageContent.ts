import axios from 'axios';

export default async function getPageContent(
  auth: { password: string; username: string },
  URL: string
) {
  const response = await axios.get(URL, {
    auth,
  });

  return response.data as string;
}
