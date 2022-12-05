import { setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';

console.log(context.payload.pull_request.title);

if (!context.payload.pull_request.title.startsWith('chore:')) {
  setFailed('No chore:');
}
