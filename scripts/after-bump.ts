import { add, commit, tag } from '@changesets/git';
import { mergeChangelogs } from './merge-changelogs';
import { generateDocs } from './generate-docs';
import { currentSdkVersion } from './util';

async function commitAndTag() {
  const version = currentSdkVersion;
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
