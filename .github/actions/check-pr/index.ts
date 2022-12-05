import { setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';

console.log(JSON.stringify(context.payload.pull_request, null, 2));

function checkChangeLogExists(title: string) {
  if (!title.startsWith('chore:')) {
    setFailed('No chore:');
  }
}
