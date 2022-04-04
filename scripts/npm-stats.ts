import axios from 'axios';
import { JSDOM } from 'jsdom';

async function getStatsForPackage(packageName) {
  const { data } = await axios.get(
    `https://www.npmjs.com/package/${packageName}?activeTab=versions`
  );

  const dom = new JSDOM(data);
  const ul = dom.window.document.querySelector(
    '.a0dff0b1 ~ .c495d29d ~ .a0dff0b1 ~ .c495d29d'
  );
  const versionLines = ul.children;
  const res: any[] = [];

  for (let i = 1; i < versionLines.length; i++) {
    const line = versionLines.item(i);
    const [version, _, downloads] = line.children;
    res.push({
      version: version.textContent,
      downloads: parseInt(downloads.textContent.replace(/,/g, ''))
    });
  }

  return res.reduce((majorVersions, { version, downloads }) => {
    if (version.includes('-')) {
      return majorVersions;
    }
    const [majorVersion] = version.split('.');
    if (majorVersions[majorVersion] === undefined) {
      majorVersions[majorVersion] = 0;
    }
    majorVersions[majorVersion] += downloads;
    return majorVersions;
  }, {});
}

async function getAllStats() {
  return ['@sap-cloud-sdk/util', '@sap/cds'].reduce(
    async (stats, packageName) => ({
      ...(await stats),
      [packageName]: await getStatsForPackage(packageName)
    }),
    {}
  );
}

async function main() {
  console.log(await getAllStats());
}

main();
