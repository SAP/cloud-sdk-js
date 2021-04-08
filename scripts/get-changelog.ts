import { unixEOL } from '@sap-cloud-sdk/util';
import { openFile, version } from './util';

export function getChangelog(v = version): string {
  const changelog = openFile('CHANGELOG.md');
  const [, olderLogs] = changelog.split(`${unixEOL}# ${v}`);
  const logs = olderLogs.split(`${unixEOL}# `)[0];
  return logs.slice(logs.indexOf(`${unixEOL}##`) + 1);
}
