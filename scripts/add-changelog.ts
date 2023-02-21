import { getPackageVersion } from './get-package-version';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

const unixEOL = '\n';

function openFile(filePath: string): string {
  return readFileSync(filePath, { encoding: 'utf8' });
}

function getChangelogWithVersion(v: string = getPackageVersion()): string {
  const changelog = openFile('CHANGELOG.md');
  const [, olderLogs] = changelog.split(`${unixEOL}# ${v}`);
  if (!olderLogs) {
    throw new Error(`Can not find version ${v} in CHANGELOG.md`);
  }
  let logs = olderLogs.split(`${unixEOL}# `)[0];
  logs = unixEOL + logs.slice(logs.indexOf(`${unixEOL}##`) + 1);
  logs = logs.replace(/## /g, '### ');

  const date = new Date();
  const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const headerWithVersion = `${unixEOL}## ${v} [Core Modules] - ${month} ${day}, ${year}`;

  return [headerWithVersion, logs].join(unixEOL);
}

function getReleaseNotesFilePath(): string {
  const majorVersion = getPackageVersion().split('.')[0];

  if (isVersioned(majorVersion)) {
    return `./cloud-sdk/docs-js_versioned_docs/version-v${majorVersion}/release-notes.mdx`;
  }
  return './cloud-sdk/docs-js/release-notes.mdx';
}

function isVersioned(majorVersion: string): boolean {
  const versionedInDocusaurus = readdirSync(
    './cloud-sdk/docs-js_versioned_docs/'
  );
  // The docusaurus folders are called version-v1, version-v2 so match regex for ends with v1, v2, ...
  return !!versionedInDocusaurus.find(folder =>
    folder.match(new RegExp(`v${majorVersion}$`))
  );
}

export function addCurrentChangelog(): void {
  const changelog = getChangelogWithVersion();
  const releaseNotesFilePath = getReleaseNotesFilePath();
  const releaseNotes = openFile(releaseNotesFilePath);
  let releaseNotesArray = releaseNotes.split(
    `<!-- This line is used for our release notes automation -->${unixEOL}`
  );
  const newContent = changelog + releaseNotesArray[1];
  releaseNotesArray[1] = newContent;
  const newReleaseNotes = releaseNotesArray.join(
    `<!-- This line is used for our release notes automation -->${unixEOL}`
  );
  writeFileSync(releaseNotesFilePath, newReleaseNotes);
}
