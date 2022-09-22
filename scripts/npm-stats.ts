import puppeteer from 'puppeteer';

async function getVersionsDownloads(browser, packageName) {
  const page = await browser.newPage();
  await page.goto(`https://www.npmjs.com/package/${packageName}`);
  // window as a global variable is not recognized by TypeScript, therefore ignore checks for this line
  return await page.evaluate(
    // @ts-ignore
    () => window.__context__.context.versionsDownloads
  );
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
  return {
    name: packageName,
    downloads: await aggregateStats(versionsDownloads)
  };
}

function getAllStats(browser) {
  return [
    '@sap-cloud-sdk/util',
    '@sap-cloud-sdk/connectivity',
    '@sap-cloud-sdk/http-client',
    '@sap-cloud-sdk/mail-client',
    '@sap-cloud-sdk/odata-v2',
    '@sap-cloud-sdk/odata-v4',
    '@sap-cloud-sdk/generator',
    '@sap-cloud-sdk/openapi',
    '@sap-cloud-sdk/openapi-generator',
    '@sap-cloud-sdk/test-util',
    '@sap-cloud-sdk/eslint-config',
    '@sap-cloud-sdk/temporal-de-serializers',
    '@sap-cloud-sdk/odata-common',
    '@sap/cds'
  ].map(packageName => {
    return getStatsForPackage(browser, packageName);
  });
}

async function main() {
  const browser = await puppeteer.launch();
  // eslint-disable-next-line no-console
  const stats = await Promise.all(getAllStats(browser));
  console.log(
    stats
      .map(
        ({ name, downloads }) =>
          name +
          ':\n' +
          Object.entries(downloads)
            .map(([version, dls]) => `- v${version}: ${dls} downloads`)
            .join('\n'),
        ''
      )
      .join('\n\n')
  );
  await browser.close();
}

main();
