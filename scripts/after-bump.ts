import { readFile } from 'fs/promises';
import { add, commit, tag } from '@changesets/git';
import { mergeChangelogs } from './merge-changelogs';
import { generateDocs } from './generate-docs';

async function getVersion() {
  const packageJson = await readFile('package.json', { encoding: 'utf8' });
  return JSON.parse(packageJson).version;
}

async function commitAndTag() {
  const version = await getVersion();
  const cwd = process.cwd();

  await add('-A', cwd);
  await commit(`v${version}`, cwd);
  await tag(`v${version}`, cwd);
}

async function afterBump() {
  await mergeChangelogs();
  await generateDocs();
  await commitAndTag();
}

afterBump();
