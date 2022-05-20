import { readFileSync } from 'fs';
import { currentSdkVersion } from './current-sdk-version';

const unixEOL = '\n';

function openFile(filePath: string): string {
  return readFileSync(filePath, { encoding: 'utf8' });
}

export function getChangelog(v = currentSdkVersion): string {
  const changelog = openFile('CHANGELOG.md');
  const [, olderLogs] = changelog.split(`${unixEOL}# ${v}`);
  const logs = olderLogs.split(`${unixEOL}# `)[0];
  return logs.slice(logs.indexOf(`${unixEOL}##`) + 1);
}
