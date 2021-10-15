import axios from 'axios';
import { createWriteStream } from 'fs';
import Auth from '../Types/Auth';

export default async function downloadFile(
  fileURL: string,
  savePath: string,
  auth: Auth
) {
  axios
    .get(fileURL, {
      responseType: 'stream',
      auth,
    })
    .then((response) => {
      (response.data as any).pipe(createWriteStream(savePath));
    });
}
