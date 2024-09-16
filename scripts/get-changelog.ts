import { readFileSync } from 'fs';
import { getPackageVersion } from './get-package-version';

function openFile(filePath: string): string {
  return readFileSync(filePath, { encoding: 'utf8' });
}

export async function getChangelog(v?: string): Promise<string> {
  const changelog = openFile('CHANGELOG.md');
  const [, olderLogs] = changelog.split(
    `\n# ${v || (await getPackageVersion())}`
  );
  const logs = olderLogs.split(`\n# `)[0];
  return logs.slice(logs.indexOf(`\n##`) + 1);
}
