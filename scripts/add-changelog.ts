import { currentSdkVersion } from './current-sdk-version';
import { readFileSync, writeFileSync } from 'fs';

const unixEOL = '\n';

function openFile(filePath: string): string {
  return readFileSync(filePath, { encoding: 'utf8' });
}

function getChangelogWithVersion(v = currentSdkVersion): string {
  const changelog = openFile('CHANGELOG.md');
  const [, olderLogs] = changelog.split(`${unixEOL}# ${v}`);
  let logs = olderLogs.split(`${unixEOL}# `)[0];
  logs = unixEOL + logs.slice(logs.indexOf(`${unixEOL}##`) + 1);
  logs = logs.replace(/## /g,'### ',)

  const date = new Date();
  const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const headerWithVersion = `${unixEOL}## ${v} [Core Modules] - ${month} ${day}, ${year}`
  const apiReferenceLink= `${unixEOL}**API Reference:** [${v}](https://sap.github.io/cloud-sdk/api/${v})`;

  return [headerWithVersion,apiReferenceLink,logs].join(unixEOL);
}

export function addCurrentChangelog(): void {
  const changelog = getChangelogWithVersion();
  const releaseNotes = openFile('./cloud-sdk/docs-js/release-notes.mdx');
  let releaseNotesArray = releaseNotes.split(
      `<!-- This line is used for our release notes automation -->${unixEOL}`
  );
  const newContent = changelog + releaseNotesArray[1];
  releaseNotesArray[1] = newContent;
  const newReleaseNotes = releaseNotesArray.join(
      `<!-- This line is used for our release notes automation -->${unixEOL}`
  );
  writeFileSync('./cloud-sdk/docs-js/release-notes.mdx', newReleaseNotes);
}
