import { EOL } from 'os';
import { openFile, version } from './util';

export function getChangelog(v = version): string {
  const changelog = openFile('CHANGELOG.md');
  const [, olderLogs] = changelog.split(`${EOL}# ${v}`);
  const logs = olderLogs.split(`${EOL}# `)[0];
  return logs.slice(logs.indexOf(`${EOL}##`) + 1);
}
