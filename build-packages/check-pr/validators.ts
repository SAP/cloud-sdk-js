/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsdoc/require-jsdoc */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { getInput, setFailed, info } from '@actions/core';

const validCommitTypes = ['feat', 'fix', 'chore'];

// Expected format: preamble(topic)!: Title text
export async function validateTitle(title: string): Promise<void> {
  if (!title.includes(':')) {
    return setFailed(
      'PR title does not adhere to conventional commit guidelines. No preamble found.'
    );
  }
  const [preamble, postamble] = title.split(':');

  await validatePreamble(preamble);
  validatePostamble(postamble);
}

async function validatePreamble(preamble: string): Promise<void> {
  const groups = preamble.match(
    /(?<commitType>\w+)?(\((?<topic>\w+)\))?(?<isBreaking>!)?/
  )?.groups;

  if (!groups) {
    return setFailed(
      'Could not parse preamble. Ensure it follows the conventional commit guidelines.'
    );
  }

  const { commitType, isBreaking } = groups;

  validateCommitType(commitType);
  validateChangesets(
    preamble,
    commitType,
    !!isBreaking,
    await extractChangesetFileContents()
  );
}

function validateCommitType(commitType) {
  if (!commitType || !validCommitTypes.includes(commitType)) {
    return setFailed(
      `PR title does not adhere to conventional commit guidelines. Commit type found: ${commitType}. Must be one of ${validCommitTypes.join(
        ', '
      )}`
    );
  }
  info('✓ Commit type: OK');
}

export function validatePostamble(title: string | undefined): void {
  if (!title || !title.trim().length) {
    return setFailed(
      'PR title does not have a title after conventional commit preamble.'
    );
  }

  if (title[0] !== ' ') {
    return setFailed('Space missing after conventional commit preamble.');
  }

  info('✓ Title: OK');
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

function hasMatchingChangeset(
  allowedBumps: string[],
  changedFileContents: string[]
): boolean {
  if (allowedBumps.length) {
    return changedFileContents.some(fileContent =>
      allowedBumps.some(bump =>
        new RegExp(`("|')@sap-cloud-sdk/.*("|'): ${bump}`).test(fileContent)
      )
    );
  }

  return true;
}

async function extractChangesetFileContents(): Promise<string[]> {
  const changeSetFilesStr = getInput('changed-files').trim();
  const changeSetFiles = changeSetFilesStr ? changeSetFilesStr.split(' ') : [];
  const fileContents = await Promise.all(
    changeSetFiles.map(file => readFile(file, 'utf-8'))
  );
  return fileContents;
}

export function validateChangesets(
  preamble: string,
  commitType: string,
  isBreaking: boolean,
  fileContents: string[]
): void {
  const allowedBumps = getAllowedBumps(commitType, isBreaking);
  const allowedChangeTypes = [
    'Known Issue',
    'Compatibility Note',
    'New Functionality',
    'Improvement',
    'Fixed Issue'
  ];

  if (!hasMatchingChangeset(allowedBumps, fileContents)) {
    return setFailed(
      `Preamble '${preamble}' requires a changeset file with bump ${allowedBumps
        .map(bump => `'${bump}'`)
        .join(' or ')}.`
    );
  }

  const changeTypes = fileContents.flatMap(content => {
    const matches = content.match(/\[([^\]]+)\](?!\([^\]]*\))/g);
    return matches ? matches.map(match => match.slice(1, -1)) : [];
  });

  if (!preamble.startsWith('chore') && !changeTypes.length) {
    return setFailed('Missing change type in changeset.');
  }

  const allChangeTypesMatch = changeTypes.every(type =>
    allowedChangeTypes.includes(type)
  );

  if (!allChangeTypesMatch) {
    return setFailed(
      `All change types must match one of the allowed change types ${allowedChangeTypes
        .map(type => `'[${type}]'`)
        .join(' or ')}.`
    );
  }

  info('✓ Changesets: OK');
}

export async function validateBody(body: string) {
  const template = await readFile(
    resolve('.github', 'PULL_REQUEST_TEMPLATE.md'),
    'utf-8'
  );

  if (!body || body === template) {
    return setFailed('PR must have a description.');
  }
  if (body.includes(template)) {
    return setFailed('PR template must not be ignored.');
  }
  info('✓ Body: OK');
}
