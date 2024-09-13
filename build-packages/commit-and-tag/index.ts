import { info, error, getInput } from '@actions/core';
import { command } from 'execa';
import { add, commit, tag } from '@changesets/git';

async function commitAndTag(version: string) {
  const cwd = process.cwd();

  info(`git add`);
  await add('-A', cwd);
  info(`git commit`);
  await commit(`v${version}`, cwd);
  info(`git tag`);
  await tag(`v${version}`, cwd);
  info(`git push`);
  await command('git push --follow-tags');
}

commitAndTag(getInput('version')).catch(err => {
  error(err);
  process.exit(1);
});
