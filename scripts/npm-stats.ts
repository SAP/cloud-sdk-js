import puppeteer from 'puppeteer';

async function getVersionsDownloads(page, packageName) {
  await page.goto(`https://www.npmjs.com/package/${packageName}`);
  // window as a global variable is not recognized by TypeScript, therefore ignore checks for this line
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
  return [
    '@sap-cloud-sdk/util',
    '@sap-cloud-sdk/connectivity',
    '@sap-cloud-sdk/http-client',
    '@sap-cloud-sdk/odata-v2',
    '@sap-cloud-sdk/odata-v4',
    '@sap-cloud-sdk/generator',
    '@sap-cloud-sdk/openapi',
    '@sap-cloud-sdk/openapi-generator',
    '@sap-cloud-sdk/test-util',
    '@sap-cloud-sdk/eslint-config',,
    '@sap-cloud-sdk/temporal-de-serializers',
    '@sap-cloud-sdk/odata-common',
    '@sap/cds'].reduce(
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
