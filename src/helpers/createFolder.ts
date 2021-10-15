import { promises } from 'fs';

export default async function createFolder(path: string) {
  try {
    await promises.access(path);
  } catch {
    try {
      await promises.mkdir(path);
    } catch (err) {
      console.log(err);
    }
  }
}
