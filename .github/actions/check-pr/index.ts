import { setOutput, getInput, setFailed, info, notice } from '@actions/core';
import { context } from '@actions/github';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const validPreambles = ['feat', 'fix', 'chore'];
interface ParsedTitle {
  preamble?: string;
  topic?: string;
  isBreaking: boolean;
  description?: string;
}

function parseTitle(title: string): ParsedTitle {
  const groups = title.match(
    /(?<preamble>\w+)(\((?<topic>\w+)\))?(?<isBreaking>!)?: (?<description>.*)/
  ).groups;
  if (groups) {
    return { ...groups, isBreaking: !!groups.isBreaking };
  } else {
    throw new Error('Could not parse PR title');
  }
}

function validatePreamble(preamble: string | undefined): void {
  if (!preamble || !validPreambles.includes(preamble)) {
    setFailed(
      `PR title does not adhere to conventional commit guidelines. Commit type found: ${preamble}. Should be one of ${validPreambles.join(
        ', '
      )}`
    );
  } else {
    info('test');
    notice('test');
  }
}

function validateTitle(title: string | undefined): void {
  if (!title) {
    setFailed(
      `PR title does not have a title (after conventional commit preamble).`
    );
  }

  if (title[0] === title[0].toLowerCase()) {
    setFailed(
      `PR title title should be capitalized (after conventional commit preamble).`
    );
  }
}

function getAllowedBumps(commitType: string, isBreaking: boolean): string[] {
  if (isBreaking) {
    return ['major'];
  }
  if (commitType === 'feat') {
    return ['minor'];
  }
  if (commitType === 'fix') {
    return ['minor', 'patch'];
  }
  return [];
}

async function validateChangelog(allowedBumps: string[]): Promise<void> {
  const changedFiles = getInput('changed-files').split(' ');
  const fileContents = await Promise.all(
    changedFiles.map(file => readFile(file, 'utf-8'))
  );
  fileContents.some(fileContent =>
    allowedBumps.some(bump =>
      new RegExp(`'@sap-cloud-sdk\/\w+': ${bump}/`).test(fileContent)
    )
  );
}

async function validateBody() {
  const body = context.payload.pull_request.body;
  const prTemplate = await readFile(
    resolve('.github', 'PULL_REQUEST_TEMPLATE.md'),
    'utf-8'
  );

  if (!body || body === prTemplate) {
    setFailed('PR should have a description');
  }

  console.log(prTemplate === body);
  console.log(prTemplate);
  console.log(body);
}

try {
  const { preamble, isBreaking, description } = parseTitle(
    context.payload.pull_request.title
  );

  validatePreamble(preamble);
  validateTitle(description);
  validateChangelog(getAllowedBumps(preamble, isBreaking));
  validateBody();
} catch (err) {
  setFailed(err);
}
