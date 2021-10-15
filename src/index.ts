import axios from 'axios';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import { createWriteStream, promises } from 'fs';
import sanitize from 'sanitize-filename';

dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const URL = process.env.URL;

if (!username || !password || !URL)
  throw Error('username, password and URL are required in the .env file!');

const BASE_URL = URL.substring(0, URL.lastIndexOf('/')) + '/';

const auth = { username, password };

async function getPageContent() {
  const response = await axios.get(URL!, {
    auth,
  });

  return response.data as string;
}

async function getVorlesungsWochen(): Promise<VorlesungsWoche[]> {
  const pageContent = await getPageContent();

  const $ = cheerio.load(pageContent);

  const mainDiv = $('.col2');

  const vorlesungsWochen: VorlesungsWoche[] = [];
  let week = 0;
  let vorlesungsWoche: VorlesungsWoche = new VorlesungsWoche(week);
  let name: string;
  let mp4URL: string;
  let pdfURL: string;

  const reset = () => {
    name = '';
    mp4URL = '';
    pdfURL = '';
  };

  reset();

  mainDiv.children().each((i, el) => {
    const element = $(el);
    const elementType = element[0].name;
    const elementText = element.text();
    const href = element.attr('href');

    // checks if a new VorlesungsWoche begins or the last one has ended
    if (elementType === 'h2' || i === mainDiv.children().length - 1) {
      week++;
      vorlesungsWochen.push(vorlesungsWoche);
      vorlesungsWoche = new VorlesungsWoche(week);
      reset();
    }
    if (week === 0) return;

    if (elementType === 'b') name = element.text();
    if (elementType === 'a' && href) {
      if (elementText.includes('[MP4]')) {
        mp4URL = href;
      } else if (elementText.includes('[PDF]')) {
        pdfURL = href;

        vorlesungsWoche.units.push({ name, mp4URL, pdfURL });

        reset();
      }
    }
  });

  return vorlesungsWochen.slice(1);
}

async function downloadFile(fileURL: string, savePath: string) {
  axios
    .get(fileURL, {
      responseType: 'stream',
      auth,
    })
    .then((response) => {
      (response.data as any).pipe(createWriteStream(savePath));
    });
}

async function createFolder(path: string) {
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

async function downloadAllFiles() {
  const downloadFolder = './downloads/';
  const vorlesungsWochen = await getVorlesungsWochen();
  await createFolder(downloadFolder);

  vorlesungsWochen.forEach(async ({ nr, units }) => {
    if (nr !== 1) return;

    // creates Vorlesungs folder if it does not exist
    const path = `${downloadFolder}Vorlesungswoche ${nr}/`;
    await createFolder(path);

    const vorlesungsWocheIndexString = `${nr < 10 ? '0' : ''}${nr}`;

    units.forEach(async ({ name, mp4URL, pdfURL }, index) => {
      const videoIndexString = `${index < 10 ? '0' : ''}${index}`;
      const fileName = sanitize(name);
      const videoFileName = `${path}${vorlesungsWocheIndexString}_${videoIndexString} - ${fileName}.mp4`;
      const pdfFileName = `${path}${vorlesungsWocheIndexString}_${videoIndexString} - ${fileName}.pdf`;
      await downloadFile(`${BASE_URL}${mp4URL}`, videoFileName);
      await downloadFile(`${BASE_URL}${pdfURL}`, pdfFileName);
    });
  });
}

downloadAllFiles();

class VorlesungsWoche {
  nr: number;
  units: Unit[];

  constructor(nr: number) {
    this.nr = nr;
    this.units = [];
  }
}

interface Unit {
  name: string;
  mp4URL: string;
  pdfURL: string;
}
