import { resolve, sep } from 'path';
import { readFile, readdir } from 'fs/promises';
import { formatJson, unixEOL } from '@sap-cloud-sdk/util';
import { transformFile, nextSdkVersion } from './util';
import { validMessageTypes } from './merge-changelogs';

function updateRootPackageJson(version: string) {
  transformFile(resolve('package.json'), packageJson =>
    formatJson({
      ...JSON.parse(packageJson),
      version: `${version}`
    })
  );
}

function updateDocumentationMd(version: string) {
  transformFile(resolve('DOCUMENTATION.md'), documentation =>
    documentation
      .split(unixEOL)
      .map(line =>
        line.startsWith('## Version:') ? `## Version: ${version}` : line
      )
      .join(unixEOL)
  );
}

async function checkChangesets() {
  const csFolder = '.changeset';
  const changesets = (await readdir(csFolder))
    .filter(f => f.endsWith('.md'))
    .map(f => `${csFolder}${sep}${f}`);

  // Explanation: https://regex101.com/r/vBKfev/1
  const parseCs =
    /---\n((?<package>.+): (?<level>[a-z]+)\n)+---\n(?<summary>[\w\W]*)/;

  // Explanation: https://regex101.com/r/1JpnOg/1
  const parseSummary = /(\[(?<type>[\w ]+)\])? ?(?<summary>[\w\W]+)/;

  for (const fileName of changesets) {
    const content = await readFile(fileName, { encoding: 'utf-8' });
    const match = content.match(parseCs);
    if (!match) {
      console.error(
        `Error: Changeset file "${fileName}" does not match expected format.`
      );
      process.exit(1);
    }
    const summaryMatch = match?.groups?.summary.trim().match(parseSummary);
    if (!validMessageTypes.includes(summaryMatch?.groups?.type as any)) {
      console.error(
        summaryMatch?.groups?.type
          ? `Error: Type [${summaryMatch?.groups?.type}] is not valid in "${fileName}"`
          : `Error: No type was provided for "${fileName}"`
      );
      process.exit(1);
    }
  }
}

async function beforeBump() {
  checkChangesets();
  const version = await nextSdkVersion();
  updateRootPackageJson(version);
  updateDocumentationMd(version);
}

beforeBump();
