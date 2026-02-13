import { setFailed } from '@actions/core';
import { context } from '@actions/github';
import { validateTitle, validateBody } from './validators.js';

try {
  validateTitle(context.payload.pull_request.title);
  validateBody(context.payload.pull_request.body.replace(/\r\n/g, '\n'));
} catch (err) {
  setFailed(err);
}
