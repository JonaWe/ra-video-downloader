import * as cheerio from 'cheerio';
import VorlesungsWoche from '../Types/VorlesungsWoche';

export default async function getVorlesungsWochen(
  htmlPageContent: string
): Promise<VorlesungsWoche[]> {
  const $ = cheerio.load(htmlPageContent);

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
