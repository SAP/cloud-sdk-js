import { setFailed, info } from '@actions/core';
import { context } from '@actions/github';
import { validateTitle, validateBody } from './validators.js';

try {
  const pr = context.payload.pull_request;
  if (pr?.user?.login === 'dependabot[bot]') {
    info('Skipping PR checks for dependabot.');
  } else {
    validateTitle(pr?.title);
    validateBody(pr?.body?.replace(/\r\n/g, '\n'));
  }
} catch (err: any) {
  setFailed(err);
}
