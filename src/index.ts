import sanitize from 'sanitize-filename';
import createFolder from './helpers/createFolder';
import createIndexString from './helpers/createIndexString';
import downloadFile from './helpers/downloadFile';
import getPageContent from './helpers/getPageContent';
import getVorlesungsWochen from './helpers/getVorlesungsWochen';
import setup from './helpers/setup';

async function main() {
  const { auth, URL, BASE_URL } = setup();

  const htmlPageContent = await getPageContent(auth, URL);

  const vorlesungsWochen = await getVorlesungsWochen(htmlPageContent);

  const downloadFolder = './downloads/';

  await createFolder(downloadFolder);
  vorlesungsWochen.forEach(async ({ nr, units }) => {
    const vorlesungsWocheIndexString = createIndexString(nr);
    const weekPath = `${downloadFolder}Vorlesungswoche-${vorlesungsWocheIndexString}/`;
    await createFolder(weekPath);

    units.forEach(async ({ name, mp4URL, pdfURL }, index) => {
      const videoIndexString = createIndexString(index);
      const fileName = sanitize(name);
      const videoFileName = `${weekPath}${vorlesungsWocheIndexString}_${videoIndexString} - ${fileName} - Video.mp4`;
      const pdfFileName = `${weekPath}${vorlesungsWocheIndexString}_${videoIndexString} - ${fileName} - Folien.pdf`;
      await downloadFile(`${BASE_URL}${mp4URL}`, videoFileName, auth);
      await downloadFile(`${BASE_URL}${pdfURL}`, pdfFileName, auth);
    });
  });
}

main();
