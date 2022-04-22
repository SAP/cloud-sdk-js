import axios from 'axios';
import { JSDOM, HTMLLIElement } from 'jsdom';

async function getStatsForPackage(packageName) {
  const { data } = await axios.get(
    `https://www.npmjs.com/package/${packageName}?activeTab=versions`
  );

  const dom = new JSDOM(data);

  const ul = dom.window.document.querySelector(
    '#tabpanel-versions > * > ul:last-child'
  );

  return Array.from(ul.children)
    .slice(1)
    .map((line: HTMLLIElement) => ({
      version: line.children[0].textContent,
      downloads: parseInt(line.children[2].textContent.replace(/,/g, ''))
    }))
    .filter(({ version }) => !version.includes('-'))
    .reduce((majorVersions, { version, downloads }) => {
      const [majorVersion] = version.split('.');
      return {
        ...majorVersions,
        [majorVersion]: (majorVersions[majorVersion] ?? 0) + downloads
      };
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
  // eslint-disable-next-line no-console
  console.log(await getAllStats());
}

main();
