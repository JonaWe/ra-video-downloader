import axios from 'axios';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

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

getVorlesungsWochen();

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
