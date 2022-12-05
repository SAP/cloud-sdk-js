import { setOutput, getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';

const changedFiles = getInput('changed-files').split(' ');
console.log(changedFiles);
// console.log(JSON.stringify(context.payload.pull_request, null, 2));

function checkChangeLogExists(title: string) {
  if (!title.startsWith('chore:')) {
    setFailed('No chore:');
  }
}
