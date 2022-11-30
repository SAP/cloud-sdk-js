import { add, commit, tag } from '@changesets/git';
import { getPackageVersion } from './get-package-version';
import { mergeChangelogs } from './merge-changelogs';

async function commitAndTag() {
  const version = getPackageVersion;
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
