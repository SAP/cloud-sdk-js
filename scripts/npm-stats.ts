import puppeteer from 'puppeteer';

async function getVersionsDownloads(page, packageName) {
  await page.goto(`https://www.npmjs.com/package/${packageName}`);
  // @ts-ignore
  return page.evaluate(() => window.__context__.context.versionsDownloads);
}

async function aggregateStats(versionsDownloads) {
  return Object.entries(versionsDownloads)
    .filter(([version]) => !version.includes('-'))
    .reduce((majorVersions, [version, downloads]) => {
      const [majorVersion] = version.split('.');
      return {
        ...majorVersions,
        [majorVersion]: (majorVersions[majorVersion] ?? 0) + downloads
      };
    }, {});
}

async function getStatsForPackage(page, packageName) {
  const versionsDownloads = await getVersionsDownloads(page, packageName);
  return aggregateStats(versionsDownloads);
}

async function getAllStats(page) {
  return ['@sap-cloud-sdk/util', '@sap/cds'].reduce(
    async (stats, packageName) => ({
      ...(await stats),
      [packageName]: await getStatsForPackage(page, packageName)
    }),
    {}
  );
}

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // eslint-disable-next-line no-console
  console.log(await getAllStats(page));

  await browser.close();
}

main();
