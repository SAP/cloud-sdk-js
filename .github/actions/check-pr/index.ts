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
    info('✓ Preamble: OK');
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
      `PR title title must be capitalized (after conventional commit preamble).`
    );
  } else {
    info('✓ Title: OK');
  }
}

function getAllowedBumps(preamble: string, isBreaking: boolean): string[] {
  if (isBreaking) {
    return ['major'];
  }
  if (preamble === 'feat') {
    return ['minor'];
  }
  if (preamble === 'fix') {
    return ['minor', 'patch'];
  }
  return [];
}

async function validateChangelog(
  preamble: string,
  isBreaking: boolean
): Promise<void> {
  let ok = true;
  const allowedBumps = getAllowedBumps(preamble, isBreaking);
  if (allowedBumps.length) {
    const changedFiles = getInput('changed-files').split(' ');
    const fileContents = await Promise.all(
      changedFiles.map(file => readFile(file, 'utf-8'))
    );
    ok = fileContents.some(fileContent =>
      allowedBumps.some(bump =>
        new RegExp(`'@sap-cloud-sdk\/\w+': ${bump}/`).test(fileContent)
      )
    );
  }

  if (!ok) {
    setFailed(
      `Preamble '${preamble}' requires a changelog file with bump ${allowedBumps.join(
        ' or '
      )}.`
    );
  } else {
    info('✓ Changelog: OK');
  }
}

async function validateBody() {
  const body = context.payload.pull_request.body.replace(/\r\n/g, '\n');
  const prTemplate = await readFile(
    resolve('.github', 'PULL_REQUEST_TEMPLATE.md'),
    'utf-8'
  );

  if (!body || body === prTemplate) {
    setFailed('PR must have a description');
  } else {
    info('✓ Body: OK');
  }
}

try {
  const { preamble, isBreaking, description } = parseTitle(
    context.payload.pull_request.title
  );

  validatePreamble(preamble);
  validateTitle(description);
  validateChangelog(preamble, isBreaking);
  validateBody();
} catch (err) {
  setFailed(err);
}
