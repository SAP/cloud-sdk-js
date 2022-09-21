import { resolve, relative, sep } from 'path';
import { writeFile, readFile, readdir } from 'fs/promises';
import { formatJson, unixEOL } from '@sap-cloud-sdk/util';
import { apiDocsDir, transformFile, nextSdkVersion } from './util';
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

function updateTypeDocConfig(version: string) {
  transformFile('tsconfig.typedoc.json', config => {
    const parsedConfig = JSON.parse(config);
    return formatJson({
      ...parsedConfig,
      typedocOptions: {
        ...parsedConfig.typedocOptions,
        out: `${relative(resolve(), apiDocsDir)}/${version}`
      }
    });
  });
}

function updateDocsVersions(version: string) {
  transformFile(resolve('docs', 'api', 'versions.json'), versionsJson => {
    const versions = JSON.parse(versionsJson);
    return versions.includes(version)
      ? versionsJson
      : formatJson([version, ...versions]);
  });
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
  updateTypeDocConfig(version);
  updateDocsVersions(version);
}

beforeBump();
