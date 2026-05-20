import { setFailed } from '@actions/core';
import { context } from '@actions/github';
import { validateTitle, validateBody } from './validators.js';

function capitalizeAfterColon(title: string): string {
  return title.replace(/^([^:]+:\s*)(\w)/, (_, pre, char) =>
    pre + char.toUpperCase()
  );
}

try {
  const pr = context.payload.pull_request;
  const isDependabot = pr?.user?.login === 'dependabot[bot]';
  const title = isDependabot && pr?.title ? capitalizeAfterColon(pr.title) : pr?.title;
  validateTitle(title);
  validateBody(pr?.body?.replace(/\r\n/g, '\n'));
} catch (err: any) {
  setFailed(err);
}
