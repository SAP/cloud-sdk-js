import { readFile, writeFile } from 'node:fs/promises';
import { exit } from 'node:process';

async function writeChangelog(): Promise<void> {
  if (!process.env.CHANGELOG) {
    throw new Error('CHANGELOG environment variable not set.');
  }
  if (!process.env.VERSION) {
    throw new Error('VERSION environment variable not set.');
  }
  const unifiedChangelog = await readFile('CHANGELOG.md', { encoding: 'utf8' });
  await writeFile(
    'CHANGELOG.md',
    unifiedChangelog.split('\n').slice(0, 30).join('\n') +
      `# ${process.env.VERSION}` +
      '\n' +
      process.env.CHANGELOG +
      '\n\n' +
      unifiedChangelog.split('\n').slice(30).join('\n'),
    { encoding: 'utf8' }
  );
}

writeChangelog().catch(err => {
  console.error(err);
  exit(1);
});
