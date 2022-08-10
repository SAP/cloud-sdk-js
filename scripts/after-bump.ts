import { add, commit, tag } from '@changesets/git';
import { currentSdkVersion } from './current-sdk-version';
import { mergeChangelogs } from './merge-changelogs';

async function commitAndTag() {
  const version = currentSdkVersion;
  const cwd = process.cwd();

  await add('-A', cwd);
  await commit(`v${version}`, cwd);
  await tag(`v${version}`, cwd);
}

async function afterBump() {
  await mergeChangelogs();
  await commitAndTag();
}

afterBump().catch(error => {
  console.error(error);
  process.exit(1);
});
