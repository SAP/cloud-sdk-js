import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { setOutput, setFailed } from '@actions/core';

async function getPackageVersion(): Promise<string> {
  const packageJson = await readFile('package.json', 'utf8');
  return JSON.parse(packageJson).version;
}

async function getChangelog(v?: string): Promise<string> {
  const changelog = readFileSync('CHANGELOG.md', { encoding: 'utf8' });
  const [, olderLogs] = changelog.split(
    `\n# ${v || (await getPackageVersion())}`
  );
  const logs = olderLogs.split('\n# ')[0];
  return logs.slice(logs.indexOf('\n##') + 1);
}

(async () => {
  try {
    setOutput('changelog', await getChangelog());
  } catch (error) {
    setFailed((error as Error).message);
  }
})();
