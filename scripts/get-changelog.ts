import { openFile, version } from './util';

export function getChangelog(v = version): string {
  const changelog = openFile('CHANGELOG.md');
  const [, olderLogs] = changelog.split(`\n# ${v}`);
  const logs = olderLogs.split('\n# ')[0];
  return logs.slice(logs.indexOf('\n##') + 1);
}
